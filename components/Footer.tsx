import React from 'react';
import { ATDALogo, TwitterIcon, LinkedInIcon, InstagramIcon } from './Icons';

const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} aria-label="Volver a la página de inicio" className="flex items-center mb-4 sm:mb-0 text-gray-400">
            <ATDALogo className="h-12 w-auto" />
          </a>
          <div className="flex space-x-6">
            <a href="https://x.com/atda_arg" target="_blank" rel="noopener noreferrer" aria-label="Perfil de ATDA en X/Twitter" className="text-gray-400 hover:text-white transition-colors">
              <TwitterIcon className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/atda_arg" target="_blank" rel="noopener noreferrer" aria-label="Perfil de ATDA en Instagram" className="text-gray-400 hover:text-white transition-colors">
              <InstagramIcon className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/company/atda-arg/" target="_blank" rel="noopener noreferrer" aria-label="Perfil de ATDA en LinkedIn" className="text-gray-400 hover:text-white transition-colors">
              <LinkedInIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-8">
          <p>&copy; {new Date().getFullYear()} Sitio oficial de la Asociación Civil Tecnológica por el Desarrollo Argentino (ATDA) - Dominio: atda.org.ar </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;