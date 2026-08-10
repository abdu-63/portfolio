import { I18nProvider } from "./i18n";
import { ThemeProvider } from "./theme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Projects />
          <Testimonials />
          <About />
          <Contact />
        </main>
        <footer className="footer">
          <div>© {new Date().getFullYear()} Abdu — Fullstack & Mobile Engineer</div>
          <div>Built with React, TypeScript & Framer Motion</div>
        </footer>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;