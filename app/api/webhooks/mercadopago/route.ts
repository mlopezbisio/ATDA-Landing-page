import { getMercadoPagoPayment, verifyMercadoPagoSignature } from "@/lib/payments/mercadopago";
import { getEnrollmentByIdFresh } from "@/lib/sanity/fetch";
import { patchDocument } from "@/lib/sanity/write";

export async function POST(request: Request) {
  const rawBody = await request.text();
  if (!verifyMercadoPagoSignature(request, rawBody)) {
    return Response.json({ error: "Firma inválida" }, { status: 401 });
  }

  let payload: { type?: string; action?: string; data?: { id?: string }; topic?: string };
  try {
    payload = JSON.parse(rawBody) as typeof payload;
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const paymentId = payload.data?.id;
  const isPayment = payload.type === "payment" || payload.topic === "payment" || payload.action?.includes("payment");
  if (!paymentId || !isPayment) {
    return Response.json({ ok: true });
  }

  try {
    const payment = await getMercadoPagoPayment(paymentId);
    const enrollmentId = payment.external_reference;
    if (!enrollmentId) {
      return Response.json({ ok: true });
    }
    const enrollment = await getEnrollmentByIdFresh(enrollmentId);
    if (!enrollment) {
      return Response.json({ ok: true });
    }
    if (enrollment.status === "paid") {
      return Response.json({ ok: true });
    }

    const mpStatus = payment.status;
    const nextStatus =
      mpStatus === "approved" ? "paid" : mpStatus === "rejected" || mpStatus === "cancelled" ? "failed" : "pending";

    await patchDocument(enrollmentId, {
      status: nextStatus,
      providerPaymentId: String(payment.id ?? paymentId),
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Webhook Mercado Pago", err);
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}
