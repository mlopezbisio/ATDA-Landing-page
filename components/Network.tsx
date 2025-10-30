import React from 'react';

const Network: React.FC = () => {
  const memberLogos = [
    'Universidad Tecnológica Nacional', 'Instituto Nacional de Tecnología Industrial', 'Instituto Argentino de Soldadura', 'Ingecoop LTDA'
  ];

  return (
    <section id="Network" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Nuestra Red</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Construimos alianzas con un ecosistema de instituciones, empresas y organizaciones que potencian el desarrollo tecnológico nacional.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {memberLogos.map((logo, index) => (
            <div key={index} className="text-center">
              <span className="text-xl font-semibold text-gray-500 hover:text-gray-300 transition-colors duration-300 filter grayscale hover:grayscale-0">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Network;