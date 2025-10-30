
import React from 'react';
import { CollaborationIcon, InnovationIcon, CommitmentIcon, ExcellenceIcon } from './Icons';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-2 transition-all duration-300">
    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600/20 mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-center mb-2 text-white">{title}</h3>
    <p className="text-gray-400 text-center">{description}</p>
  </div>
);

const About: React.FC = () => {
  const values = [
    {
      icon: <CollaborationIcon className="h-8 w-8 text-blue-400" />,
      title: 'Colaboración',
      description: 'Unimos talentos y disciplinas para crear soluciones integrales y potenciar el tejido industrial nacional.',
    },
    {
      icon: <InnovationIcon className="h-8 w-8 text-blue-400" />,
      title: 'Innovación',
      description: 'Impulsamos la investigación y el desarrollo de tecnologías de vanguardia aplicadas a la industria argentina.',
    },
    {
      icon: <CommitmentIcon className="h-8 w-8 text-blue-400" />,
      title: 'Compromiso Nacional',
      description: 'Trabajamos por la soberanía tecnológica y el fortalecimiento de las empresas de nuestro país.',
    },
    {
      icon: <ExcellenceIcon className="h-8 w-8 text-blue-400" />,
      title: 'Excelencia',
      description: 'Promovemos los más altos estándares de calidad y profesionalismo en cada proyecto que emprendemos.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Nuestra Misión: Construir Futuro</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Somos una asociación sin fines de lucro que busca la integración ingenieril para un desarrollo industrial sostenible y soberano del país, apoyando a empresas nacionales en sus vías de crecimiento.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
