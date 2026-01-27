import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';

import Projects from './components/Projects';
import Red from './components/Network';
import JoinUs from './components/JoinUs';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />

        <Projects />
        <Red />
        <JoinUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;