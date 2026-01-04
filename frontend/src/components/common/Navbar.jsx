import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Menu, CloudSun, Calendar, Music, Headphones, Sparkles, X, Info, LayoutDashboard } from 'lucide-react';
import api from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
    const [temp, setTemp] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { lang, setLang, t } = useLanguage();
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await api.get('/weather/current');
                if (res.data?.data?.current) {
                    setTemp(Math.round(res.data.data.current.temp));
                }
            } catch (error) {
                console.error("Nav weather error", error);
            }
        };
        fetchWeather();
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Audio play blocked", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const navLinks = [
        { path: '/', label: t.nav.home },
        { path: '/map', label: t.nav.map },
        { path: '/itinerary', label: t.nav.itinerary, icon: <Calendar size={16} /> },
        { path: '/essential', label: t.nav.essential }
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#f9f5eb]/90 backdrop-blur-md border-b-2 border-[#c5a059]/30 shadow-sm">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo Area */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="bg-[#4a332d] p-2.5 rounded-xl text-[#c5a059] shadow-lg group-hover:scale-105 transition border border-[#c5a059]/30">
                         <MapPin size={24} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black text-[#4a332d] leading-none tracking-tight font-jogja uppercase">
                            SMART TOUR JOGJA
                        </span>
                        <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.2em]">{t.nav.culture_tech}</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center bg-[#4a332d]/5 p-1 rounded-2xl border border-[#c5a059]/10">
                    {navLinks.map(link => (
                        <NavLink 
                            key={link.path}
                            to={link.path} 
                            className={({ isActive }) => `px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${isActive ? 'bg-[#4a332d] text-[#c5a059] shadow-md' : 'text-[#4a332d]/60 hover:text-[#4a332d]'}`}
                        >
                            {link.icon || null} {link.label}
                        </NavLink>
                    ))}
                </div>
                    
                <div className="hidden md:flex items-center gap-2 bg-[#4a332d]/5 p-1 rounded-2xl border border-[#c5a059]/20">
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-500 ${isPlaying ? 'bg-[#c5a059] text-[#4a332d] border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.4)]' : 'bg-white/80 text-[#4a332d]/60 border-[#c5a059]/30 hover:bg-white'}`}
                    >
                        {isPlaying ? <Music size={18} className="animate-bounce" /> : <Headphones size={18} />}
                        <span className="text-[10px] font-black hidden lg:inline">{isPlaying ? 'GAMELAN ON' : 'AMBIENT'}</span>
                    </button>

                    <div className="flex bg-white/50 p-1 rounded-xl border border-[#c5a059]/10 shadow-inner">
                        <button onClick={() => setLang('id')} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${lang === 'id' ? 'bg-[#4a332d] text-[#c5a059] shadow-md' : 'text-[#4a332d]/30 hover:text-[#4a332d]'}`}>ID</button>
                        <button onClick={() => setLang('jv')} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${lang === 'jv' ? 'bg-[#4a332d] text-[#c5a059] shadow-md' : 'text-[#4a332d]/30 hover:text-[#4a332d]'}`}>JV</button>
                    </div>

                    <Link to="/weather" className="flex items-center gap-2 bg-white/80 text-[#4a332d] px-3 py-1.5 rounded-xl border border-[#c5a059]/30 shadow-sm hover:bg-white transition">
                        <CloudSun size={18} className="text-[#c5a059]" /> 
                        <span className="text-[10px] font-black">{temp ? `${temp}°C` : '--°C'}</span>
                    </Link>
                </div>

                <audio ref={audioRef} loop src="https://archive.org/download/indonesia-1969-the-jasmine-isle-javanese-gamelan-music-nonesuch-new-blp-cr-02/Indonesia%20%281969%29%20-%20The%20Jasmine%20Isle%2C%20Javanese%20Gamelan%20Music%20Nonesuch%20NEW%20%28BLP%29-cr-09.mp3" />

                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-3 bg-[#4a332d] text-[#c5a059] rounded-xl shadow-lg border border-[#c5a059]/30">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div 
                            key="mobile-sidebar"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-[280px] bg-[#f9f5eb] shadow-2xl z-[60] border-l-4 border-[#c5a059]/30 flex flex-col md:hidden"
                        >
                            <div className="p-8 bg-[#4a332d] text-[#f9f5eb] batik-overlay">
                                <h3 className="font-jogja text-2xl font-black mb-2 uppercase">Menu Utama</h3>
                                <p className="text-[10px] text-[#c5a059] font-black uppercase tracking-widest">{t.nav.culture_tech}</p>
                            </div>

                            <div className="flex-grow py-8 px-4 flex flex-col gap-2">
                                {navLinks.map(link => (
                                    <NavLink 
                                        key={link.path} 
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={({ isActive }) => `flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${isActive ? 'bg-[#4a332d] text-[#c5a059] shadow-xl' : 'text-[#4a332d]/60 hover:bg-[#c5a059]/10'}`}
                                    >
                                        {link.icon || <MapPin size={18} />} {link.label}
                                    </NavLink>
                                ))}
                            </div>

                            <div className="p-8 border-t-2 border-[#c5a059]/10 space-y-4">
                                <div className="flex justify-center bg-[#4a332d]/5 p-2 rounded-2xl">
                                    <button onClick={() => { setLang('id'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-xl text-xs font-black ${lang === 'id' ? 'bg-[#4a332d] text-[#c5a059]' : 'text-[#4a332d]/30'}`}>ID</button>
                                    <button onClick={() => { setLang('jv'); setIsMobileMenuOpen(false); }} className={`px-4 py-2 rounded-xl text-xs font-black ${lang === 'jv' ? 'bg-[#4a332d] text-[#c5a059]' : 'text-[#4a332d]/30'}`}>JV</button>
                                </div>
                                <button onClick={() => setIsPlaying(!isPlaying)} className={`w-full flex items-center justify-center gap-4 py-4 rounded-2xl border-2 transition-all ${isPlaying ? 'bg-[#c5a059] text-[#4a332d] border-[#c5a059]' : 'bg-white text-[#4a332d] border-[#c5a059]/20'}`}>
                                    {isPlaying ? <Music size={18} /> : <Headphones size={18} />}
                                    <span className="text-[10px] font-black uppercase tracking-widest">{isPlaying ? 'Gamelan ON' : 'Ambient Mode'}</span>
                                </button>
                            </div>
                        </motion.div>
                        <motion.div 
                            key="mobile-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] md:hidden"
                        />
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
