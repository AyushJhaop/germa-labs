import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
    const navRef = useRef(null);
    const links = [
        { name: 'About', target: '#about' },
        { name: 'Work', target: '#projects' },
        { name: 'Services', target: '#services' },
        { name: 'Contact', target: '#contact' }
    ];

    useEffect(() => {
        // Reset to visible state first to prevent locking
        gsap.set(navRef.current, { y: -100, opacity: 0 });

        gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 2.8 // Wait for Name Preloader + Shutter (approx 2s + 0.8s)
        });
    }, []);

    const scrollToSection = (id) => {
        const el = document.querySelector(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav ref={navRef} className="fixed top-4 md:top-8 left-0 right-0 z-[100] flex justify-center items-center pointer-events-none opacity-0">
            <div className="bg-black/80 backdrop-blur-md border border-white/10 px-6 py-2 md:px-8 md:py-3 rounded-full flex items-center gap-8 pointer-events-auto shadow-2xl">
                <div
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-lg md:text-xl font-heading font-black tracking-widest uppercase cursor-pointer"
                >
                    <span className="text-white">ZERON</span>
                    <span className="text-[#E3FB29] font-lexend font-black text-2xl md:text-3xl">3</span>
                </div>

                <div className="w-px h-6 bg-white/20 hidden md:block"></div>

                <ul className="hidden md:flex gap-6">
                    {links.map((link) => (
                        <li key={link.name}>
                            <button
                                onClick={() => scrollToSection(link.target)}
                                className="text-xs font-body font-bold text-white/70 hover:text-[#E3FB29] transition-colors uppercase tracking-widest"
                            >
                                {link.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
