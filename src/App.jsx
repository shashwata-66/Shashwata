import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Skills2 from "./Components/Skills2";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import PageLoader from "./components/PageLoader";
import ScrollProgress from "./components/ScrollProgress";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <>
      <PageLoader />
      {/* <CustomCursor /> */}
      <ScrollProgress />

      <div className={darkMode ? "dark bg-[#0a0a0f] min-h-screen" : "bg-gray-50 min-h-screen"}>
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

        <main>
          <Hero darkMode={darkMode} />

          <About darkMode={darkMode} />

          {/* <Skills darkMode={darkMode} /> */}
          <Skills2 darkMode={darkMode} />

          <Projects darkMode={darkMode} />
          <Experience darkMode={darkMode} />
          <Contact darkMode={darkMode} />
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}