import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Websites from "@/components/Websites";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Preloader />
      <CustomCursor />
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Websites />
      <Contact />
      <Footer />
    </main>
  );
}
