import React, { useState, useEffect } from 'react';
import { ATDALogo } from './Icons';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const navLinks = [
    { name: 'Sobre Nosotros', href: '#about' },
    { name: 'Áreas de Enfoque', href: '#focus-areas' },
    { name: 'Actividad', href: '#projects' },
    { name: 'Red', href: '#Network' },
    { name: 'Contacto', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    const timer = setTimeout(() => {
      setLogoLoaded(true);
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer);
    };
  }, []);

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
        setIsOpen(false); // Close mobile menu on click
    }
  };


  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} aria-label="Volver a la página de inicio" className={`flex items-center text-white transition-opacity duration-500 ${logoLoaded ? 'logo-animate' : 'opacity-0'}`}>
            <ATDALogo className="h-12 w-auto" showSubtitle={false} />
          </a>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-gray-300 hover:text-white transition-colors font-medium">
                {link.name}
              </a>
            ))}
          </nav>

          <a href="#join-us" onClick={(e) => handleNavClick(e, '#join-us')} className="hidden md:inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
            Quiero ser parte
          </a>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className={`flex flex-col items-center space-y-4 py-4 ${isScrolled || isOpen ? 'bg-gray-900/95' : 'bg-transparent'}`}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-gray-300 hover:text-white transition-colors text-lg">
              {link.name}
            </a>
          ))}
          <a href="#join-us" onClick={(e) => handleNavClick(e, '#join-us')} className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Quiero ser parte
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;