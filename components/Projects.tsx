
import React from 'react';

interface ProjectCardProps {
  imageUrl: string;
  title: string;
  description: string;
  category: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ imageUrl, title, description, category }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-blue-500/20">
    <div className="relative overflow-hidden h-56">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
    </div>
    <div className="p-6">
      <span className="inline-block bg-blue-600/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">{category}</span>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-base">{description}</p>
    </div>
  </div>
);

const Projects: React.FC = () => {
  const projectData = [
    {
      imageUrl: 'https://picsum.photos/seed/project1/600/400',
      title: 'Innovación en Energías Renovables',
      description: 'Desarrollo e implementación de soluciones de energía solar y eólica para optimizar el consumo en PyMEs industriales.',
      category: 'ENERGÍA',
    },
    {
      imageUrl: 'https://picsum.photos/seed/project2/600/400',
      title: 'Software de Gestión para la Industria 4.0',
      description: 'Creación de una plataforma SaaS para la digitalización y automatización de procesos productivos en empresas nacionales.',
      category: 'SOFTWARE',
    },
    {
      imageUrl: 'https://picsum.photos/seed/project3/600/400',
      title: 'Optimización de Cadenas de Suministro',
      description: 'Aplicación de modelos de simulación y machine learning para mejorar la logística y distribución de productos locales.',
      category: 'LOGÍSTICA',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Actividad</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Iniciativas que marcan la diferencia, impulsando la innovación y la competitividad de la industria argentina.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
