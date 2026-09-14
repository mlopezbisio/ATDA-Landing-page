import { createTaloPayment } from "@/lib/payments/talo";
import { getCourseById } from "@/lib/sanity/fetch";
import { createEnrollment, patchDocument } from "@/lib/sanity/write";

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
      provider: "talopay",
      status: "pending",
    });

    const [firstName, ...rest] = body.name.trim().split(" ");
    const payment = await createTaloPayment({
      enrollmentId: enrollment._id,
      amount: course.price,
      motive: `Curso ATDA: ${course.title}`,
      client: {
        first_name: firstName,
        last_name: rest.join(" ") || firstName,
        email: body.email,
        dni: body.dni,
        phone: body.phone,
      },
    });

    await patchDocument(enrollment._id, {
      providerPaymentId: payment.id,
      taloCvu: payment.cvu,
      taloAlias: payment.alias,
      taloPaymentUrl: payment.paymentUrl,
    });

    return Response.json({ enrollmentId: enrollment._id });
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : "Error al crear el pago" }, { status: 500 });
  }
}
