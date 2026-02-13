import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const lensRef = useRef(null);
    const cursorRef = useRef(null);
    const revealRef = useRef(null);

    // Track mouse and smooth position
    const mouse = useRef({ x: 0, y: 0 });
    const smoothMouse = useRef({ x: 0, y: 0 });

    // Mouse Move Listener
    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // GSAP Ticker for Smooth Animation Loop
    useEffect(() => {
        const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
        const ySet = gsap.quickSetter(cursorRef.current, "y", "px");

        const loop = () => {
            // Smooth lerp
            smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.1;
            smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.1;

            if (lensRef.current) {
                const x = smoothMouse.current.x;
                const y = smoothMouse.current.y;

                // Use standard clip-path for performance
                lensRef.current.style.clipPath = `circle(180px at ${x}px ${y}px)`;
                lensRef.current.style.webkitClipPath = `circle(180px at ${x}px ${y}px)`;
            }

            if (cursorRef.current) {
                xSet(smoothMouse.current.x);
                ySet(smoothMouse.current.y);
            }
        };

        gsap.ticker.add(loop);
        return () => gsap.ticker.remove(loop);
    }, []);

    // Initial Intro Animations (Triggered after global preloader)
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Wait for Preloader (~2.5s total duration)
            const preloaderDelay = 2.4;

            // 1. Hero Content Scale & Fade In
            tl.fromTo(".hero-content",
                { opacity: 0, scale: 1.1, filter: "blur(20px)" },
                { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out", delay: preloaderDelay }
            )
                // 2. Footer Elements Slide Up
                .fromTo(".hero-footer",
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
                    "-=0.6"
                );

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const MainTitle = () => (
        <div className="flex flex-col items-center leading-[0.85] tracking-tighter cursor-default select-none">
            <span className="block">BUILD YOUR</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-white">DIGITAL FUTURE</span>
        </div>
    );

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col justify-center items-center text-center cursor-none"
        >

            {/* Custom Cursor */}
            <div
                ref={cursorRef}
                className="fixed w-8 h-8 rounded-full border border-white/30 pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 top-0 left-0"
            />

            {/* --- LAYER 1: Background Text --- */}
            <div className="hero-content relative z-10 w-full px-4">
                <h1 className="font-heading font-black text-[10vw] md:text-[14vw] text-[#333] uppercase">
                    <MainTitle />
                </h1>
            </div>

            {/* --- LAYER 2: The "Focus/Zoom" Lens with Liquid Filter --- */}
            <div
                ref={lensRef}
                className="absolute inset-0 z-20 pointer-events-none overflow-hidden flex flex-col justify-center items-center text-center w-full h-full px-4"
                style={{
                    clipPath: `circle(0px at 0px 0px)`,
                    WebkitClipPath: `circle(0px at 0px 0px)`,
                }}
            >
                {/* 
                   Apply the liquid filter to the magnified content. 
                   The scaling + distortion creates the "liquid lens" feeling.
                */}
                <div
                    className="hero-content w-full h-full flex flex-col justify-center items-center transform scale-110 md:scale-[1.15]"
                >
                    <div className="absolute inset-0 bg-[#E3FB29] opacity-5 mix-blend-overlay pointer-events-none"></div>
                    <h1 className="font-heading font-black text-[10vw] md:text-[14vw] text-white uppercase drop-shadow-[0_0_30px_rgba(227,251,41,0.5)]">
                        <MainTitle />
                    </h1>
                </div>
            </div>

            {/* --- Footer Info --- */}
            <div className="hero-footer absolute bottom-12 w-full px-4 md:px-16 flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left z-30 pointer-events-auto cursor-auto gap-6 md:gap-0">
                <div className="max-w-xs">
                    <p className="text-white/60 text-sm md:text-base font-body font-medium leading-relaxed">
                        <span className="block text-white mb-2">ZERON3</span>
                        Strategy, Design, <br />
                        Performance & AI.
                    </p>
                </div>
                <div className="flex flex-col items-center md:items-end gap-2">
                    <button className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-[#E3FB29] hover:text-black hover:border-[#E3FB29] transition-all duration-300 group">
                        <span className="text-xs font-bold tracking-widest uppercase">Start Project</span>
                        <div className="w-2 h-2 bg-[#E3FB29] rounded-full group-hover:bg-black transition-colors" />
                    </button>
                </div>
            </div>

            <div className="hero-footer absolute bottom-8 left-1/2 -translate-x-1/2">
                <ArrowDown className="text-white/30 animate-bounce w-5 h-5" />
            </div>

        </section >
    );
};

export default Hero;
