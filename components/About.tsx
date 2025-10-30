import React from 'react';
import { CollaborationIcon, DebateIcon, DevelopmentIcon, KnowledgeIcon } from './Icons';

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
      title: 'Vinculación Tecnológica',
      description: 'Promovemos la conexión y colaboración entre instituciones, profesionales y empresas para potenciar el sistema tecnológico nacional.',
    },
    {
      icon: <DebateIcon className="h-8 w-8 text-blue-400" />,
      title: 'Debate y Perspectiva',
      description: 'Aportamos una mirada técnica sobre los grandes temas del país, propiciando un espacio de debate constructivo y federal.',
    },
    {
      icon: <DevelopmentIcon className="h-8 w-8 text-blue-400" />,
      title: 'Desarrollo Nacional',
      description: ' Aportamos e impulsamos el análisis de la enseñanza, la investigación, el ejercicio profesional y la planificación de obras públicas y privadas.',
    },
    {
      icon: <KnowledgeIcon className="h-8 w-8 text-blue-400" />,
      title: 'Democratización del conocimiento',
      description: 'Difundimos saberes especializados de forma comprensible, ofreciendo herramientas para entender la realidad tecnológica y económica del país.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Quiénes somos</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-4xl mx-auto">
            ATDA nace del compromiso de integrantes de la Universidad Tecnológica Nacional que, a partir de sus trayectorias en el sector público y privado, decidieron formar un grupo interdisciplinario de profesionales de la ingeniería, la ciencia, la técnica y la tecnología, con el propósito de generar un espacio de participación activa para la promoción del desarrollo industrial y tecnológico de Argentina.
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
