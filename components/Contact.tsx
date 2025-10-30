
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Ponte en Contacto</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            ¿Tienes una idea, un proyecto o quieres unirte a nosotros? Nos encantaría saber de ti.
          </p>
        </div>
        <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
          <form action="https://formspree.io/f/xjvnelgy" method="POST">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 font-medium mb-2">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-300 font-medium mb-2">Tema del Contacto</label>
              <select
                id="subject"
                name="subject"
                className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
                defaultValue=""
              >
                <option value="" disabled>Selecciona un tema...</option>
                <option value="unirme">Unirme</option>
                <option value="consulta">Consulta</option>
                <option value="propuesta">Propuesta</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-300 font-medium mb-2">Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
