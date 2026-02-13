import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const imageRef = useRef(null);

    // Dynamic hover type based on index for variety
    const hoverType = index % 2 === 0 ? "scale-glow" : "tilt-glow";

    const handleMouseEnter = () => {
        if (hoverType === "scale-glow") {
            gsap.to(cardRef.current, { scale: 1.02, duration: 0.3, ease: "power2.out", boxShadow: "0 0 30px rgba(227, 251, 41, 0.3)" });
            gsap.to(cardRef.current, { borderColor: "#E3FB29", duration: 0.3 });
        } else if (hoverType === "tilt-glow") {
            gsap.to(cardRef.current, { rotationZ: index % 2 === 0 ? -2 : 2, scale: 1.02, duration: 0.3, ease: "power2.out", boxShadow: "0 0 30px rgba(227, 251, 41, 0.3)" });
        }
    };

    const handleMouseLeave = () => {
        if (hoverType === "scale-glow") {
            gsap.to(cardRef.current, { scale: 1, duration: 0.3, ease: "power2.out", boxShadow: "none" });
            gsap.to(cardRef.current, { borderColor: "transparent", duration: 0.3 });
        } else if (hoverType === "tilt-glow") {
            gsap.to(cardRef.current, { rotationZ: 0, scale: 1, duration: 0.3, ease: "power2.out", boxShadow: "none" });
        }
    };

    return (
        <div
            ref={cardRef}
            className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent transition-colors shadow-lg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="aspect-video overflow-hidden">
                <img
                    ref={imageRef}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 flex flex-col justify-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 transform">
                    <h3 className="text-2xl font-heading font-bold text-white mb-1">
                        {project.title}
                    </h3>
                    <p className="text-primary text-sm font-bold mb-2 uppercase tracking-wide">
                        {project.subtitle}
                    </p>
                </div>

                <div className="flex justify-between items-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75 transform">
                    <p className="text-text-secondary font-body text-sm line-clamp-2 max-w-[70%]">
                        {project.description}
                    </p>
                    <Link
                        to={`/projects/${project.id}`}
                        className="p-3 bg-primary rounded-full text-black hover:bg-white transition-colors"
                        title="View Details"
                    >
                        <ArrowUpRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    const sectionRef = useRef(null);
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    // Split projects for grid layout
    const midPoint = Math.ceil(projects.length / 2);
    const row1Projects = projects.slice(0, midPoint);
    const row2Projects = projects.slice(midPoint);

    React.useEffect(() => {
        const ctx = gsap.context(() => {
            // Row 1 Animation: Reveal Stagger
            if (row1Ref.current) {
                gsap.from(row1Ref.current.children, {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: row1Ref.current,
                        start: "top 80%",
                    }
                });
            }

            // Row 2 Animation: Fade Up Stagger
            if (row2Ref.current) {
                gsap.from(row2Ref.current.children, {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: row2Ref.current,
                        start: "top 80%",
                    }
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-background">
            <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-20">

                <div className="flex flex-col gap-8">
                    <h2 className="text-4xl font-heading font-bold text-white mb-4">Featured <span className="text-primary opacity-80">Work</span></h2>

                    {/* Grid Setup mimicking original rows */}
                    <div ref={row1Ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {row1Projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>

                    <div ref={row2Ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-0 md:pt-10">
                        {row2Projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index + row1Projects.length} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Projects;
