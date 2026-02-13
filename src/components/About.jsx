import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    // Local team image
    const teamImage = "/team.png";

    React.useEffect(() => {
        const ctx = gsap.context(() => {
            // Scroll Slide-in Animations
            gsap.from(textRef.current, {
                x: -100,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%", // Start when top of section is 80% down viewport
                    toggleActions: "play none none reverse"
                }
            });

            gsap.from(imageRef.current, {
                x: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });

            // Simple Parallax for Image
            gsap.to(imageRef.current, {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.3
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

                {/* Text Column */}
                <div ref={textRef} className="flex flex-col gap-6">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
                        About <span className="text-primary">Us</span>
                    </h2>
                    <p className="text-lg text-text-secondary leading-relaxed font-body max-w-lg">
                        We are a modern creative agency focused on building scalable, animated, and conversion-driven digital products.
                        We blend aesthetics with performance to deliver experiences that leave a lasting impact.
                    </p>
                    <div className="pt-4">
                        <button className="px-8 py-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 font-bold uppercase tracking-wider text-sm">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Image Column */}
                <div ref={imageRef} className="relative group">
                    <div className="absolute -inset-2 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                        src={teamImage}
                        alt="Our Team"
                        className="relative w-full h-auto object-cover rounded-2xl shadow-soft-glow grayscale hover:grayscale-0 transition-all duration-500"
                    />
                </div>

            </div>
        </section>
    );
};

export default About;
