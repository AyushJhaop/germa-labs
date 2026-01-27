import React, { useState, useEffect } from 'react';
import { ArrowLeft, Lock, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        // Simple client-side check first (or direct API call)
        // We will hit the API auth endpoint to verify
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/admin/auth`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });

            if (response.ok) {
                setIsAuthenticated(true);
                fetchMessages(password);
            } else {
                setError('Invalid Password');
            }
        } catch (err) {
            setError('Server Error');
        }
    };

    const fetchMessages = async (pwd) => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/messages`, {
                headers: {
                    'x-admin-password': pwd || password
                }
            });
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
                <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-2xl border border-white/10">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                            <Lock className="text-primary" size={32} />
                        </div>
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-white text-center mb-6">Admin Access</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 bg-black/20 border border-white/10 rounded-xl text-white focus:border-primary transition-colors outline-none"
                        />
                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-white transition-colors"
                        >
                            Unlock Dashboard
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <Link to="/" className="text-text-secondary hover:text-white transition-colors text-sm">Return Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-text-primary font-body p-4 md:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <Link to="/" className="flex items-center text-text-secondary hover:text-white transition-colors">
                        <ArrowLeft size={20} className="mr-2" />
                        Back to Site
                    </Link>
                    <h1 className="text-3xl font-heading font-bold text-white">Message <span className="text-primary">Inbox</span></h1>
                    <button 
                        onClick={() => { setIsAuthenticated(false); setPassword(''); setMessages([]); }}
                        className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        Logout
                    </button>
                </div>

                {loading ? (
                    <div className="text-center text-white">Loading messages...</div>
                ) : (
                    <div className="grid gap-4">
                        {messages.length === 0 ? (
                            <div className="text-center text-text-secondary py-20 bg-[#1a1a1a] rounded-2xl border border-white/5">
                                No messages yet.
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div key={msg._id} className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                                    <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{msg.name}</h3>
                                            <p className="text-primary text-sm">{msg.email}</p>
                                            <p className="text-text-secondary text-sm">{msg.phone}</p>
                                        </div>
                                        <div className="text-text-secondary text-sm">
                                            {new Date(msg.date).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="bg-black/20 p-4 rounded-lg text-text-secondary">
                                        {msg.message}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
