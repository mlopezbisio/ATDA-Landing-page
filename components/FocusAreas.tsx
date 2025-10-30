import React from 'react';
import { EnergyIcon, Industry40Icon, BiotechIcon } from './Icons';

interface FocusCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FocusCard: React.FC<FocusCardProps> = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-teal-500/20 transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
    <div className="flex items-center justify-center h-20 w-20 rounded-full bg-teal-600/20 mx-auto mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);


const FocusAreas: React.FC = () => {
    const areas = [
        {
          icon: <EnergyIcon className="h-10 w-10 text-teal-400" />,
          title: 'Energías Renovables y Sostenibilidad',
          description: 'Impulsamos proyectos que promueven la transición energética, optimizando el uso de recursos y desarrollando soluciones de energía limpia para la industria nacional.',
        },
        {
          icon: <Industry40Icon className="h-10 w-10 text-teal-400" />,
          title: 'Industria 4.0 y Digitalización',
          description: 'Fomentamos la adopción de automatización, IoT y análisis de datos para modernizar los procesos productivos, aumentando la eficiencia y competitividad de las empresas.',
        },
        {
          icon: <BiotechIcon className="h-10 w-10 text-teal-400" />,
          title: 'Biotecnología y Agroindustria',
          description: 'Apoyamos la innovación en el sector agroindustrial, aplicando biotecnología para mejorar la producción, agregar valor y desarrollar nuevos productos de base nacional.',
        },
      ];

  return (
    <section id="focus-areas" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Nuestras Áreas de Enfoque</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Concentramos nuestros esfuerzos en sectores estratégicos para el crecimiento soberano y sostenible de Argentina.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {areas.map((area, index) => (
                <FocusCard key={index} {...area} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;