import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    _subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch("https://formspree.io/f/xjgwjpaj", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          _subject: '',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Contactanos</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            ¿Tenés una idea, un proyecto o querés unirte a nosotros? Nos encantaría saber de vos.
          </p>
        </div>
        <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 font-medium mb-2">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                  disabled={status === 'submitting' || status === 'success'}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                  disabled={status === 'submitting' || status === 'success'}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-300 font-medium mb-2">Número de contacto</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                  disabled={status === 'submitting' || status === 'success'}
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-300 font-medium mb-2">Tema del Contacto</label>
                <select
                  id="subject"
                  name="_subject"
                  value={formData._subject}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                  disabled={status === 'submitting' || status === 'success'}
                >
                  <option value="" disabled>Seleccioná un tema...</option>
                  <option value="Unirme">Unirme/Asociarme</option>
                  <option value="Consulta">Consulta</option>
                  <option value="Propuesta">Propuesta</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-300 font-medium mb-2">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-gray-700 text-white p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
                disabled={status === 'submitting' || status === 'success'}
              ></textarea>
            </div>

            <div className="text-center h-20 flex items-center justify-center">
              {status === 'success' ? (
                <div className="flex flex-col items-center animate-pulse">
                  <div className="bg-green-500/20 p-2 rounded-full mb-1">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-green-400 font-semibold text-lg">¡Enviado! Te vamos a contactar</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                  {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              )}
            </div>
            {status === 'error' && (
              <div className="text-center mt-4">
                <p className="text-red-400">Hubo un error al enviar el mensaje. Por favor intenta nuevamente.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
