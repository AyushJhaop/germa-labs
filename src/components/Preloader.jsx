import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            // 0. Initial State: Name Visible, Panels Visible
            // (Handled by CSS/Default render, but we ensure correct z-index/opacity order)

            // 1. ZERON3 Name Animation
            tl.fromTo(".preloader-name",
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
            )
                .to(".preloader-name", {
                    opacity: 0,
                    scale: 1.1,
                    duration: 0.5,
                    ease: "power2.in",
                    delay: 0.5
                })

                // 2. Shutter Columns Reveal (Alternating Up/Down)
                .to(".reveal-panel", {
                    height: 0,
                    duration: 0.8,
                    ease: "power4.inOut",
                    stagger: {
                        amount: 0.25,
                        from: "center"
                    }
                }, "-=0.1");

        }, containerRef);

        return () => ctx.revert();
    }, []); // Empty dependency array to run only once on mount

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] flex pointer-events-none">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="reveal-panel w-1/5 h-full bg-[#E3FB29] relative">
                    {/* Name Preloader Centered High Z-Index */}
                    {i === 2 && (
                        <div className="absolute inset-0 flex items-center justify-center overflow-visible">
                            <h1 className="preloader-name text-6xl md:text-9xl font-heading font-black text-black z-[70] opacity-0 whitespace-nowrap tracking-tighter">
                                ZERON<span className="font-lexend font-black text-6xl md:text-9xl">3</span>
                            </h1>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Preloader;
