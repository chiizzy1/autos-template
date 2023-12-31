import { About, Gallery, Hero, Services, Testimonials } from "@/components";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Stats from "@/components/home/Stats";


export default function Home() {
  return (
    <>
      <Navbar />
      <main className=" mt-16 max-w-7xl w-full mx-auto">
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Stats />
        <Gallery />
      </main>
      <Footer/>
    </>
  );
}
