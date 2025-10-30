import React from 'react';
import { ATDALogo, TwitterIcon, LinkedInIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <a href="#home" aria-label="Volver a la página de inicio" className="flex items-center mb-4 sm:mb-0 text-gray-400">
            <ATDALogo className="h-12 w-auto" />
          </a>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <TwitterIcon className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <LinkedInIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-8">
          <p>&copy; {new Date().getFullYear()} Asociación Tecnológica por el Desarrollo Argentino. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;