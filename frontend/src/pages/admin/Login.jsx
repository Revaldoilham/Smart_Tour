import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Lock, User, Sparkles } from 'lucide-react';
import api from '../../services/api';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Simplified for now, just checking if it matches the seeded admin
            // In a real app, this would call /api/login and get a token
            if (credentials.email === 'admin@smarttour.com' && credentials.password === 'admin123') {
                localStorage.setItem('admin_token', 'secret_jogja_token');
                navigate('/admin');
            } else {
                setError('Email atau Password salah.');
            }
        } catch (err) {
            setError('Terjadi kesalahan koneksi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#4a332d] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#c5a059] opacity-5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#c5a059] opacity-5 translate-x-1/2 translate-y-1/2 rounded-full blur-[100px]"></div>
            
            <div className="w-full max-w-md bg-[#f9f5eb] rounded-[40px] p-10 shadow-2xl relative z-10 border-2 border-[#c5a059]/20 batik-overlay">
                <div className="text-center mb-10">
                    <div className="inline-flex p-4 bg-[#4a332d] rounded-2xl text-[#c5a059] shadow-xl mb-6">
                        <MapPin size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-[#4a332d] font-jogja tracking-widest uppercase">Admin Login</h1>
                    <p className="text-[#4a332d]/40 text-xs font-black uppercase tracking-widest mt-2 flex items-center justify-center gap-2">
                        <Sparkles size={12} className="text-[#c5a059]" /> Smart Tour Jogja Control Panel
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-500 rounded-2xl text-xs font-bold border border-red-100 animate-shake">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest ml-4">Email Address</label>
                        <div className="relative">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-[#c5a059]" size={18} />
                            <input 
                                required
                                type="email"
                                placeholder="admin@example.com"
                                className="w-full bg-white border-2 border-[#c5a059]/10 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-[#c5a059] transition-all font-bold text-[#4a332d]"
                                value={credentials.email}
                                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest ml-4">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-[#c5a059]" size={18} />
                            <input 
                                required
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white border-2 border-[#c5a059]/10 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-[#c5a059] transition-all font-bold text-[#4a332d]"
                                value={credentials.password}
                                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <button 
                        disabled={loading}
                        className="w-full py-5 bg-[#4a332d] text-[#c5a059] rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#5d4037] transition shadow-xl border border-[#c5a059]/30 mt-4 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Access Dashboard'}
                    </button>
                    
                    <div className="text-center pt-4">
                        <p className="text-[10px] font-bold text-[#4a332d]/30 uppercase tracking-widest italic">
                            Authorized personnel only
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
