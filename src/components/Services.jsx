import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Bot, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Web Development",
        icon: Code,
        gradient: "linear-gradient(135deg, #E3FB29, #9EFF00)"
    },
    {
        title: "UI/UX Design",
        icon: Palette,
        gradient: "linear-gradient(135deg, #E3FB29, #B4FF4D)"
    },
    {
        title: "AI Automation",
        icon: Bot,
        gradient: "linear-gradient(135deg, #E3FB29, #7CFF00)"
    },
    {
        title: "Branding",
        icon: Zap,
        gradient: "linear-gradient(135deg, #E3FB29, #C8FF6A)"
    }
];

const ServiceCard = ({ service }) => {
    const cardRef = useRef(null);

    const onEnter = () => {
        gsap.to(cardRef.current, { y: -10, duration: 0.3, ease: "power2.out", boxShadow: "0 10px 30px rgba(227, 251, 41, 0.4)" });
    };

    const onLeave = () => {
        gsap.to(cardRef.current, { y: 0, duration: 0.3, ease: "power2.out", boxShadow: "none" });
    };

    const Icon = service.icon;

    return (
        <div
            ref={cardRef}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="p-8 rounded-2xl w-72 md:w-80 h-96 flex-shrink-0 flex flex-col justify-between cursor-pointer transition-transform bg-white/5 backdrop-blur-sm border border-white/10"
            style={{ background: service.gradient }}
        >
            <div className="flex-1 flex items-center justify-center w-full">
                <div className="w-32 h-32 rounded-full bg-black/10 flex items-center justify-center">
                    <Icon size={64} className="text-black" />
                </div>
            </div>
            <h3 className="text-3xl font-heading font-black text-black text-center">
                {service.title}
            </h3>
        </div>
    );
};

const Services = () => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);

    // Duplicate usage to seamless loop
    const seamlessServices = [...services, ...services, ...services];

    React.useEffect(() => {
        let ctx = gsap.context(() => {

            // Entrance Animation
            gsap.from(".service-title", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            gsap.from(trackRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                delay: 0.2, // Stagger slightly after title
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });

            const totalWidth = trackRef.current.scrollWidth / 3; // we trippled content

            const tween = gsap.to(trackRef.current, {
                x: -totalWidth,
                duration: 20,
                ease: "none",
                repeat: -1,
            });

            // Pause on hover
            trackRef.current.addEventListener('mouseenter', () => tween.pause());
            trackRef.current.addEventListener('mouseleave', () => tween.play());

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-16 md:py-32 bg-background overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 mb-12">
                <h2 className="service-title text-4xl md:text-5xl font-heading font-bold text-white">
                    Our <span className="text-primary">Services</span>
                </h2>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradients masks for fade effect on edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

                <div ref={trackRef} className="flex gap-8 px-8 w-max">
                    {seamlessServices.map((service, index) => (
                        <ServiceCard key={`${service.title}-${index}`} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
