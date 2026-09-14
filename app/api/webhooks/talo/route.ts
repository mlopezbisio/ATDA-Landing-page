import { getTaloPayment, mapTaloStatus } from "@/lib/payments/talo";
import { getEnrollmentByIdFresh } from "@/lib/sanity/fetch";
import { patchDocument } from "@/lib/sanity/write";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { paymentId?: string; externalId?: string };
    const paymentId = payload.paymentId;
    const enrollmentId = payload.externalId;
    if (!paymentId || !enrollmentId) {
      return Response.json({ ok: true });
    }

    const enrollment = await getEnrollmentByIdFresh(enrollmentId);
    if (!enrollment) {
      return Response.json({ ok: true });
    }

    const payment = await getTaloPayment(paymentId);
    const nextStatus = mapTaloStatus(payment.payment_status);
    if (enrollment.status === "paid" && nextStatus === "paid") {
      return Response.json({ ok: true });
    }

    await patchDocument(enrollmentId, {
      status: nextStatus,
      providerPaymentId: payment.id ?? paymentId,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Webhook TaloPay", err);
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}
