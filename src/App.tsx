import { BrowserRouter, Route, Routes } from "react-router-dom";
import CuttingMatBackground from "./components/CuttingMatBackground";
import TopNav from "./components/TopNav";
import Hero from "./components/Hero";
import ConceptShowcase from "./components/ConceptShowcase";
import Services from "./components/Services";
import AboutTeam from "./components/AboutTeam";
import Process from "./components/Process";
import StatementBand from "./components/StatementBand";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Admin from "./pages/Admin";
import DemoPage from "./pages/DemoPage";

function Home() {
  return (
    <div id="top" className="relative min-h-screen">
      <CuttingMatBackground />
      <TopNav />
      <main>
        <Hero />
        <ConceptShowcase />
        <Services />
        <AboutTeam />
        <Process />
        <StatementBand />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/demo/:id" element={<DemoPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
