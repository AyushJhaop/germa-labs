import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Home, Ruler, Package, Bot } from 'lucide-react';

const Navbar = () => {
    const navRef = useRef(null);

    // Icon based navigation
    const links = [
        { icon: Home, target: '#hero', label: 'Home' },
        { icon: Ruler, target: '#about', label: 'Measurement' },
        { icon: Package, target: '#projects', label: 'Products' },
        { icon: Bot, target: '#services', label: 'Chatbots' }
    ];

    useEffect(() => {
        // Reset to visible state first to prevent locking
        gsap.set(navRef.current, { y: -100, opacity: 0 });

        gsap.to(navRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 2.8
        });
    }, []);

    const scrollToSection = (id) => {
        const el = document.querySelector(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        } else if (id === '#hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <nav ref={navRef} className="fixed top-4 md:top-8 left-0 right-0 z-[100] flex justify-center items-center pointer-events-none opacity-0">
            <div className="flex items-center gap-4 pointer-events-auto">
                {links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <button
                            key={link.label}
                            onClick={() => scrollToSection(link.target)}
                            className="group relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[#E3FB29] shadow-lg hover:shadow-[0_0_20px_rgba(227,251,41,0.3)]"
                            title={link.label}
                        >
                            <Icon
                                size={24}
                                className="text-white/70 group-hover:text-[#E3FB29] transition-colors duration-300"
                                strokeWidth={1.5}
                            />
                            {/* Hover tooltip/glow could be added here if needed */}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navbar;
