import { createEnrollment, patchDocument } from "@/lib/sanity/write";
import { getCourseById } from "@/lib/sanity/fetch";
import { createMercadoPagoPreference } from "@/lib/payments/mercadopago";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      courseId?: string;
      name?: string;
      email?: string;
      dni?: string;
      phone?: string;
    };
    if (!body.courseId || !body.name || !body.email || !body.dni || !body.phone) {
      return Response.json({ error: "Completá todos los datos" }, { status: 400 });
    }
    const course = await getCourseById(body.courseId);
    if (!course || !course.active) {
      return Response.json({ error: "El curso no está disponible" }, { status: 404 });
    }

    const enrollment = await createEnrollment({
      course: { _type: "reference", _ref: course._id },
      buyer: { name: body.name, email: body.email, dni: body.dni, phone: body.phone },
      amount: course.price,
      provider: "mercadopago",
      status: "pending",
    });

    const preference = await createMercadoPagoPreference({
      enrollmentId: enrollment._id,
      title: course.title,
      amount: course.price,
      payer: { name: body.name, email: body.email },
    });

    await patchDocument(enrollment._id, { providerPaymentId: preference.id });

    return Response.json({ enrollmentId: enrollment._id, initPoint: preference.initPoint });
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : "Error al crear el pago" }, { status: 500 });
  }
}
