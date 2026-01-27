import React from 'react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-gray-800/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Actividad</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Iniciativas que marcan la diferencia, impulsando la innovación y la competitividad de la industria argentina.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-800 rounded-2xl border border-gray-700/50 mx-auto max-w-3xl shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">En Proceso</h3>
          <p className="text-gray-400 text-center max-w-lg text-lg">
            Estamos gestionando y desarrollando nuevos proyectos. Pronto estarán disponibles en esta sección.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
