import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Preloader from '../components/Preloader';

const Home = () => {
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [loading]);

    return (
        <div className="min-h-screen bg-background text-text-primary font-body overflow-x-hidden selection:bg-primary selection:text-black">
            {loading && <Preloader onComplete={() => setLoading(false)} />}
            <Navbar />
            <div id="hero"><Hero /></div>
            <div id="about"><About /></div>
            <div id="projects"><Projects /></div>
            <div id="services"><Services /></div>
            <div id="contact"><Contact /></div>
        </div>
    );
};

export default Home;
