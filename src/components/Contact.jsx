import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const buttonRef = useRef(null);

    React.useEffect(() => {
        const ctx = gsap.context(() => {
            // Scroll Enter Animation
            gsap.from(contentRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = () => {
        gsap.to(buttonRef.current, { scale: 1.1, duration: 0.3, ease: "back.out(1.7)", boxShadow: "0 0 20px rgba(227, 251, 41, 0.5)" });
    };

    const handleMouseLeave = () => {
        gsap.to(buttonRef.current, { scale: 1, duration: 0.3, ease: "power2.out", boxShadow: "none" });
    };

    return (
        <section ref={sectionRef} className="py-16 md:py-32 bg-background flex flex-col items-center justify-center text-center px-4">
            <div ref={contentRef} className="max-w-3xl flex flex-col gap-8 items-center">
                <h2 className="text-4xl md:text-7xl font-heading font-black text-white leading-tight">
                    Let’s Build Something <span className="text-primary">Powerful</span>
                </h2>
                <p className="text-xl text-text-secondary font-body">
                    Have a project in mind? Let’s talk.
                </p>

                <button
                    ref={buttonRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="mt-8 px-10 py-4 bg-primary text-black font-heading font-bold text-lg rounded-full"
                >
                    Get in Touch
                </button>
            </div>

            <footer className="mt-32 text-text-secondary font-body text-sm opacity-50">
                © 2026 ZERON3. All rights reserved.
            </footer>
        </section>
    );
};

export default Contact;
