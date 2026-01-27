import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Contact = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const buttonRef = useRef(null);
    
    // Form State
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = React.useState('idle'); // idle, sending, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
                // Reset success message after 3 seconds
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

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
        <section ref={sectionRef} className="py-32 bg-background flex flex-col items-center justify-center text-center px-4">
            <div ref={contentRef} className="max-w-xl w-full flex flex-col gap-8 items-center">
                <h2 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight">
                    Let’s Build Something <span className="text-primary">Powerful</span>
                </h2>
                <p className="text-xl text-text-secondary font-body">
                    Have a project in mind? Let’s talk.
                </p>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-8">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors resize-none"
                    ></textarea>

                    <button
                        type="submit"
                        ref={buttonRef}
                        disabled={status === 'sending'}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="mt-4 w-full py-4 bg-primary text-black font-heading font-bold text-lg rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>

                    {status === 'success' && (
                        <p className="text-green-400 font-bold mt-2">Message sent successfully!</p>
                    )}
                    {status === 'error' && (
                        <p className="text-red-400 font-bold mt-2">Failed to send message. Please try again.</p>
                    )}
                </form>
            </div>

            <footer className="mt-32 text-text-secondary font-body text-sm opacity-50">
                © 2026 ZERON3. All rights reserved.
            </footer>
        </section>
    );
};

export default Contact;
