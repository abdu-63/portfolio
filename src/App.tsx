import { I18nProvider } from "./i18n";
import { ThemeProvider } from "./theme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <About />
          <Contact />
        </main>
        <footer className="footer">© {new Date().getFullYear()} Abdu</footer>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;