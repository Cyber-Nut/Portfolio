import { useState } from 'react';
import Background from './components/layout/Background';
import CursorGlow from './components/layout/CursorGlow';
import Footer from './components/layout/Footer';
import Loader from './components/layout/Loader';
import Navbar from './components/layout/Navbar';
import ScrollProgress from './components/layout/ScrollProgress';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Experience from './components/sections/Experience';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Stats from './components/sections/Stats';
import Tech from './components/sections/Tech';

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <a
        href="#about"
        className="sr-only z-[110] rounded-lg bg-flutter px-4 py-2 font-semibold text-[#031120] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Loader onDone={() => setReady(true)} />
      <Background />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="overflow-x-clip">
        <Hero ready={ready} />
        <About />
        <Stats />
        <Tech />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
