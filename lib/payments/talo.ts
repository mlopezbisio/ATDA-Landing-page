import { getSiteUrl } from "@/lib/utils";

type TaloEnv = "sandbox" | "production";

function getTaloBaseUrl() {
  const env = (process.env.TALO_ENV ?? "sandbox") as TaloEnv;
  return env === "production" ? "https://api.talo.com.ar" : "https://sandbox-api.talo.com.ar";
}

export type TaloPayment = {
  id: string;
  payment_status: string;
  payment_url?: string;
  quotes?: Array<{ cvu?: string; alias?: string; address?: string }>;
};

function unwrapPayment(payload: unknown): TaloPayment {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: TaloPayment }).data;
  }
  return payload as TaloPayment;
}

export async function createTaloPayment(input: {
  enrollmentId: string;
  amount: number;
  motive: string;
  client: { first_name: string; last_name: string; email: string; dni: string; phone: string };
}) {
  const userId = process.env.TALO_USER_ID;
  if (!userId) {
    throw new Error("Falta TALO_USER_ID");
  }

  const siteUrl = getSiteUrl();
  const response = await fetch(`${getTaloBaseUrl()}/payments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      price: { amount: input.amount, currency: "ARS" },
      payment_options: ["transfer"],
      external_id: input.enrollmentId,
      webhook_url: `${siteUrl}/api/webhooks/talo`,
      redirect_url: `${siteUrl}/checkout/exito?enrollment=${input.enrollmentId}`,
      motive: input.motive,
      client_data: {
        first_name: input.client.first_name,
        last_name: input.client.last_name,
        email: input.client.email,
        dni: input.client.dni,
        phone: input.client.phone,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`TaloPay no pudo crear el pago: ${text}`);
  }

  const payment = unwrapPayment(await response.json());
  const quote = payment.quotes?.[0];
  return {
    id: payment.id,
    status: payment.payment_status,
    paymentUrl: payment.payment_url,
    cvu: quote?.cvu ?? quote?.address,
    alias: quote?.alias,
  };
}

export async function getTaloPayment(paymentId: string) {
  const token = process.env.TALO_TOKEN;
  if (!token) {
    throw new Error("Falta TALO_TOKEN");
  }

  const response = await fetch(`${getTaloBaseUrl()}/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`No se pudo consultar TaloPay: ${text}`);
  }

  return unwrapPayment(await response.json());
}

export function mapTaloStatus(status: string) {
  switch (status) {
    case "SUCCESS":
      return "paid" as const;
    case "EXPIRED":
      return "expired" as const;
    case "UNDERPAID":
      return "underpaid" as const;
    case "OVERPAID":
      return "overpaid" as const;
    case "PENDING":
      return "pending" as const;
    default:
      return "pending" as const;
  }
}
