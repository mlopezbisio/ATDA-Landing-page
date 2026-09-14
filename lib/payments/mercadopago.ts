import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { createHmac } from "crypto";
import { getSiteUrl } from "@/lib/utils";

function getClient() {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("Falta MP_ACCESS_TOKEN");
  }
  return new MercadoPagoConfig({ accessToken });
}

export async function createMercadoPagoPreference(input: {
  enrollmentId: string;
  title: string;
  amount: number;
  payer: { name: string; email: string };
}) {
  const preference = new Preference(getClient());
  const siteUrl = getSiteUrl();
  const result = await preference.create({
    body: {
      items: [
        {
          id: input.enrollmentId,
          title: input.title,
          quantity: 1,
          unit_price: input.amount,
          currency_id: "ARS",
        },
      ],
      payer: {
        name: input.payer.name,
        email: input.payer.email,
      },
      external_reference: input.enrollmentId,
      notification_url: `${siteUrl}/api/webhooks/mercadopago`,
      back_urls: {
        success: `${siteUrl}/checkout/exito?enrollment=${input.enrollmentId}`,
        pending: `${siteUrl}/checkout/pendiente?enrollment=${input.enrollmentId}`,
        failure: `${siteUrl}/checkout/error?enrollment=${input.enrollmentId}`,
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_types: [{ id: "ticket" }],
      },
    },
  });

  return {
    id: result.id,
    initPoint: result.init_point ?? result.sandbox_init_point,
  };
}

export async function getMercadoPagoPayment(id: string) {
  const payment = new Payment(getClient());
  return payment.get({ id });
}

export function verifyMercadoPagoSignature(request: Request, rawBody: string) {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return true;

  const signature = request.headers.get("x-signature");
  const requestId = request.headers.get("x-request-id");
  if (!signature) return false;

  const parts = Object.fromEntries(
    signature.split(",").map((part) => {
      const [key, value] = part.split("=");
      return [key.trim(), value];
    }),
  );
  const ts = parts.ts;
  const hash = parts.v1;
  if (!ts || !hash) return false;

  let dataId = "";
  try {
    const payload = JSON.parse(rawBody) as { data?: { id?: string } };
    dataId = payload.data?.id ?? "";
  } catch {
    return false;
  }

  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;
  const computed = createHmac("sha256", secret).update(manifest).digest("hex");
  return computed === hash;
}
