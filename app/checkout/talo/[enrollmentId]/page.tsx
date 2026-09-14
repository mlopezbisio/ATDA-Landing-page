import Link from "next/link";
import { notFound } from "next/navigation";
import { getEnrollmentById } from "@/lib/sanity/fetch";
import { formatARS } from "@/lib/utils";

type Props = { params: Promise<{ enrollmentId: string }> };

export default async function TaloCheckoutPage({ params }: Props) {
  const { enrollmentId } = await params;
  const enrollment = await getEnrollmentById(enrollmentId);
  if (!enrollment) notFound();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-6 py-16">
      <div className="w-full max-w-lg rounded-xl bg-gray-800 p-8">
        <h1 className="text-3xl font-bold text-white">Transferencia inmediata</h1>
        <p className="mt-3 text-gray-300">
          Transferí exactamente {formatARS(enrollment.amount)} al CVU o alias. El pago vence si no se acredita.
        </p>
        <dl className="mt-6 space-y-3 text-gray-200">
          <Row label="CVU" value={enrollment.taloCvu ?? "Generando..."} />
          <Row label="Alias" value={enrollment.taloAlias ?? "—"} />
          <Row label="Importe" value={formatARS(enrollment.amount)} />
          <Row label="Estado" value={enrollment.status} />
        </dl>
        {enrollment.taloPaymentUrl ? (
          <a
            href={enrollment.taloPaymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Abrir pago en Talo
          </a>
        ) : null}
        <p className="mt-6 text-sm text-gray-400">
          Cuando se acredite, un administrador de ATDA te asignará el acceso al aula virtual a mano.
        </p>
        <Link href="/" className="mt-6 inline-block text-blue-400">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-700 py-2">
      <dt className="text-gray-400">{label}</dt>
      <dd className="font-mono text-right">{value}</dd>
    </div>
  );
}
