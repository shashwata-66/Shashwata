import { useState } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import About from "./components/About";
// import Skills from "./Components/Skills";
import Skills2 from "./Components/Skills2";
import Projects from "./Components/Projects";
import Experience from "./Components/Experience";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import CustomCursor from "./Components/CustomCursor";
import PageLoader from "./Components/PageLoader";
import ScrollProgress from "./Components/ScrollProgress";

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