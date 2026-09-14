"use client";

import { useEffect, useState } from "react";
import { ATDALogo } from "@/components/Icons";
import type { NavLink } from "@/lib/sanity/types";

function scrollToHash(href: string) {
  if (!href.startsWith("#")) return;
  const target = document.getElementById(href.slice(1));
  if (!target) return;
  const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
  window.scrollTo({ top: offset, behavior: "smooth" });
}

export function Header({ links }: { links: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    const timer = setTimeout(() => setLogoLoaded(true), 100);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      event.preventDefault();
      scrollToHash(href);
      setIsOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/80 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            onClick={(event) => handleClick(event, "#home")}
            aria-label="Volver a la página de inicio"
            className={`flex items-center text-white transition-opacity duration-500 ${
              logoLoaded ? "logo-animate" : "opacity-0"
            }`}
          >
            <ATDALogo className="h-12 w-auto" showSubtitle={false} />
          </a>

          <nav className="hidden items-center space-x-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => handleClick(event, link.href)}
                className="font-medium text-gray-300 transition-colors hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <a
            href="#join-us"
            onClick={(event) => handleClick(event, "#join-us")}
            className="hidden rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 md:inline-block"
          >
            Quiero ser parte
          </a>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="text-gray-300 focus:outline-none md:hidden"
            aria-label="Abrir menú"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`flex flex-col items-center space-y-4 py-4 ${
            isScrolled || isOpen ? "bg-gray-900/95" : "bg-transparent"
          }`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleClick(event, link.href)}
              className="text-lg text-gray-300 transition-colors hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#join-us"
            onClick={(event) => handleClick(event, "#join-us")}
            className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Quiero ser parte
          </a>
        </div>
      </div>
    </header>
  );
}
