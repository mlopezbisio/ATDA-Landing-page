import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-700 to-teal-600">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Forma Parte del Cambio</h2>
        <p className="max-w-3xl mx-auto text-lg text-blue-100 mb-8">
          Si eres ingeniero, estudiante o representas a una empresa, tu participación es fundamental para construir el futuro industrial de Argentina. Juntos podemos lograrlo.
        </p>
        <a 
          href="#join-us" 
          className="bg-white text-blue-700 font-bold text-lg px-10 py-4 rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-2xl"
        >
          Únete Ahora
        </a>
      </div>
    </section>
  );
};

export default CTA;