import Navbar from "../components/Navbar";

import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Statistics from "../components/home/Statistics";
import Leaders from "../components/home/Leaders";
import NoticeBoard from "../components/home/NoticeBoard";
import Gallery from "../components/home/Gallery";
import Contact from "../components/home/Contact";

import Footer from "../components/layout/Footer";


function Home() {

    return (
        <>
            <Navbar />

            <Hero />

            <About />

            <Statistics />

            <Leaders />

            <NoticeBoard />

            <Gallery />

            <Contact />

            <Footer />
        </>
    );
}


export default Home;