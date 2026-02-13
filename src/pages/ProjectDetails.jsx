import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === parseInt(id));

    if (!project) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link to="/" className="text-primary hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-text-primary font-body selection:bg-primary selection:text-black py-12 md:py-20 px-4 md:px-10 lg:px-20">
            <Link to="/" className="inline-flex items-center text-text-secondary hover:text-primary transition-colors mb-10">
                <ArrowLeft className="mr-2" size={20} />
                Back to Projects
            </Link>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-4">
                        {project.title}
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-primary font-light">
                        {project.subtitle}
                    </h2>
                </div>

                {/* Media Section */}
                <div className="w-full aspect-video bg-[#1a1a1a] rounded-2xl overflow-hidden mb-16 border border-white/10">
                    {project.video ? (
                        <video
                            src={project.video}
                            controls
                            className="w-full h-full object-cover"
                            poster={project.image}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] relative">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">Overview</h3>
                            <p className="text-lg text-text-secondary leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.features.map((feature, index) => (
                                    <li key={index} className="flex items-start text-text-secondary">
                                        <span className="w-2 h-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-10">
                        {/* Links */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-white transition-colors mb-4"
                                >
                                    <ExternalLink className="mr-2" size={20} />
                                    Live Demo
                                </a>
                            )}
                            {/* Assuming github link might be added later or available in data, if not hidden */}
                        </div>

                        {/* Tech Stack */}
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6">Technologies</h3>
                            <div className="space-y-6">
                                {Object.entries(project.techStack).map(([category, techs]) => (
                                    <div key={category}>
                                        <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-3">{category}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {techs.map((tech) => (
                                                <span key={tech} className="px-3 py-1 rounded-full bg-white/10 text-xs text-white border border-white/5">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
