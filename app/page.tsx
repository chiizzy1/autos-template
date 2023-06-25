import { About, Gallery, Hero, Services, Testimonials } from "@/components";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div className={``}>
      <Navbar />
      <div className=" mt-[5rem] max-w-7xl w-full mx-auto">
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Gallery />
      </div>
      <Footer/>
    </div>
  );
}
