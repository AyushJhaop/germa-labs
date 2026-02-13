import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);

    const handleMouseEnter = () => {
        gsap.to(cardRef.current, { scale: 1.02, duration: 0.3, ease: "power2.out", boxShadow: "0 0 30px rgba(227, 251, 41, 0.15)" });
        gsap.to(cardRef.current, { borderColor: "#E3FB29", duration: 0.3 });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, { scale: 1, duration: 0.3, ease: "power2.out", boxShadow: "none" });
        gsap.to(cardRef.current, { borderColor: "rgba(255, 255, 255, 0.1)", duration: 0.3 });
    };

    return (
        <div
            ref={cardRef}
            className="group relative bg-[#0A0A0A] rounded-3xl p-6 cursor-pointer border border-white/10 transition-colors shadow-lg flex flex-col justify-between h-[400px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Top Row: Thumbnail + Link */}
            <div className="flex justify-between items-start mb-6">
                <div className="w-24 h-24 rounded-2xl bg-[#151515] overflow-hidden p-2">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain mix-blend-screen"
                    />
                </div>

                <Link
                    to={`/projects/${project.id}`}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:bg-white hover:text-black hover:border-transparent transition-all duration-300"
                >
                    <ArrowUpRight size={20} />
                </Link>
            </div>

            {/* Content Body */}
            <div>
                <h3 className="text-3xl font-heading font-black text-white mb-2 leading-tight">
                    {project.title}
                </h3>
                <p className="text-text-secondary text-base font-body tracking-wide opacity-80">
                    {project.subtitle}
                </p>
            </div>

            {/* Footer Price */}
            <div className="mt-8">
                <p className="text-4xl font-heading font-black text-white">
                    {project.price}
                </p>
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
