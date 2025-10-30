import React from 'react';
import { CollaborationIcon } from './Icons';

const JoinUs: React.FC = () => {
  const benefits = [
    'Conecta con una red interdisciplinaria de profesionales, instituciones y empresas del sector.',
    'Participa en debates y análisis sobre los grandes temas tecnológicos que definen el futuro del país.',
    'Accede y contribuye a la difusión de conocimiento especializado y al perfeccionamiento de la tecnología argentina.',
    'Impulsa iniciativas concretas que fortalezcan la soberanía y el desarrollo industrial nacional.',
  ];

  const eligibility = [
    { title: 'Profesionales', description: 'Ingenieros, tecnólogos y especialistas de diversas disciplinas comprometidos con el desarrollo nacional.' },
    { title: 'Estudiantes', description: 'Jóvenes talentos de carreras técnicas y de ingeniería con ganas de aprender y aportar.' },
    { title: 'Empresas', description: 'Organizaciones nacionales que apuestan por la innovación, la vinculación y el fortalecimiento del tejido industrial.' },
  ];

  return (
    <section id="join-us" className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Involúcrate y Sé Protagonista</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Tu talento y visión son esenciales para impulsar el desarrollo tecnológico argentino. Descubre cómo puedes formar parte.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Benefits & Eligibility */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Beneficios de ser Miembro</h3>
              <ul className="space-y-3 list-disc list-inside text-gray-300">
                {benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">¿Quiénes pueden unirse?</h3>
              <div className="space-y-4">
                {eligibility.map((item, index) => (
                  <div key={index}>
                    <p className="font-semibold text-white text-lg">{item.title}</p>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: CTA Card */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-xl border border-blue-500/30 flex flex-col items-center text-center">
             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600/20 mx-auto mb-4">
               <CollaborationIcon className="h-8 w-8 text-blue-400" /> 
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">¿Listo para dar el paso?</h3>
            <p className="text-gray-400 mb-6">
              Contacta con nosotros para iniciar tu proceso de membresía y empezar a colaborar en la construcción de un futuro industrial próspero.
            </p>
            <a 
              href="#contact" 
              className="w-full text-center bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Contactar Ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
