import React from 'react';
import { CollaborationIcon } from './Icons';

const JoinUs: React.FC = () => {
  const benefits = [
    'Conectá con una red interdisciplinaria de profesionales, instituciones y empresas del sector.',
    'Participá en debates y análisis sobre los grandes temas tecnológicos que definen el futuro del país.',
    'Accedé y contribuí a la difusión de conocimiento especializado y al perfeccionamiento de la tecnología argentina.',
    'Impulsá iniciativas concretas que fortalezcan la soberanía y el desarrollo industrial nacional.',
  ];

  const eligibility = [
    { title: 'Profesionales', description: 'Especialistas de diversas disciplinas, duras o blandas, comprometidos con el desarrollo nacional.' },
    { title: 'Estudiantes', description: 'Personas con ganas de aprender y aportar.' },
    { title: 'Empresas', description: 'Organizaciones nacionales que apuestan por la innovación, la vinculación y el fortalecimiento del tejido industrial.' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="join-us" className="py-20 bg-gradient-to-r from-blue-700 to-teal-600">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Involucrate y sé protagonista</h2>
          <p className="mt-4 text-lg text-blue-100 max-w-3xl mx-auto">
            Tu talento y visión son esenciales para impulsar el desarrollo tecnológico argentino. Descubrí cómo podés formar parte.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Benefits & Eligibility */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Beneficios de ser Miembro</h3>
              <ul className="space-y-3 list-disc list-inside text-blue-100">
                {benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">¿Quiénes pueden unirse?</h3>
              <div className="space-y-4">
                {eligibility.map((item, index) => (
                  <div key={index}>
                    <p className="font-semibold text-white text-lg">{item.title}</p>
                    <p className="text-blue-200">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: CTA Card */}
          <div className="bg-black/20 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white/20 flex flex-col items-center text-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white/20 mx-auto mb-4">
              <CollaborationIcon className="h-8 w-8 text-white" />
            </div>
            <p className="text-blue-100 mb-6">
              Contactanos para iniciar tu proceso de membresía y empezar a colaborar en la construcción de un futuro industrial soberano.
            </p>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full text-center bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Quiero sumar mi potencial
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;