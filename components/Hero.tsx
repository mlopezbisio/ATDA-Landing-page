
import React from 'react';

const Hero: React.FC = () => {

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
    <section id="home" className="relative h-screen flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')" }}></div>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      <div className="relative z-10 p-6 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          Conectar saberes. Impulsar desarrollo. Construir soberanía.
        </h1>
        <p className="max-w-4xl mx-auto text-lg md:text-xl text-gray-300 mb-8">
          Promovemos debates estratégicos con la convicción de que la transformación productiva y tecnológica es esencial para alcanzar el desarrollo inclusivo y sostenible de la Argentina.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Conocenos
          </a>
          <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Actividad
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;