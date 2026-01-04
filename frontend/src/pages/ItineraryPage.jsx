import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Trash2, ArrowRight, Sparkles, ChevronRight, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const ItineraryPage = () => {
    const { t, lang } = useLanguage();
    const [items, setItems] = useState([]);

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('itinerary') || '[]');
            setItems(Array.isArray(saved) ? saved : []);
        } catch (e) {
            console.error("LS Error", e);
            setItems([]);
        }
    }, []);

    const removeItem = (id) => {
        const updated = items.filter(i => i.id !== id);
        setItems(updated);
        localStorage.setItem('itinerary', JSON.stringify(updated));
    };

    const clearAll = () => {
        if (window.confirm(lang === 'jv' ? 'Punapa panjenengan yakin badhe mbisak sedaya?' : 'Apakah Anda yakin ingin menghapus semua rencana?')) {
            setItems([]);
            localStorage.setItem('itinerary', JSON.stringify([]));
        }
    };

    const handleShare = () => {
        alert(lang === 'jv' ? 'Rencana sampun kasimpen! Mangga dipun bagiaken.' : 'Rencana perjalanan Anda telah disimpan! Silakan bagikan tautan ini kepada rekan perjalanan Anda.');
    };

    return (
        <div className="pt-28 max-w-6xl mx-auto px-4 pb-24 batik-overlay min-h-screen">
            <header className="mb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4 bg-[#c5a059]/10 w-fit px-4 py-1.5 rounded-full border border-[#c5a059]/20">
                            <Calendar size={14} className="text-[#c5a059]" />
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#4a332d]">Smart Trip</span>
                        </div>
                        <h1 className="text-5xl font-black text-[#4a332d] mb-4 font-jogja leading-none">
                            {t.itinerary.title}
                        </h1>
                        <p className="text-[#4a332d]/60 text-lg font-bold italic max-w-2xl">
                            {t.itinerary.subtitle}
                        </p>
                    </div>
                    {items.length > 0 && (
                        <button 
                            onClick={clearAll}
                            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-500 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition shadow-sm border border-red-200"
                        >
                            <Trash2 size={16} /> {lang === 'jv' ? 'Busak Sedaya' : 'Hapus Semua'}
                        </button>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Timeline Section */}
                <div className="lg:col-span-2 space-y-8">
                    {items.length === 0 ? (
                        <div className="bg-[#f9f5eb] rounded-[40px] p-12 text-center border-4 border-dashed border-[#c5a059]/20">
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border-2 border-[#c5a059]/10">
                                <PlusCircle size={40} className="text-[#c5a059]" />
                            </div>
                            <p className="text-[#4a332d]/60 font-bold max-w-xs mx-auto text-lg leading-relaxed italic">
                                {t.itinerary.empty}
                            </p>
                            <Link to="/" className="mt-8 inline-flex items-center gap-3 bg-[#4a332d] text-[#c5a059] px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition shadow-2xl">
                                {t.nav.home} <ArrowRight size={16} />
                            </Link>
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="absolute left-10 top-0 bottom-0 w-1 bg-gradient-to-b from-[#c5a059] via-[#c5a059]/50 to-transparent"></div>
                            
                            <div className="space-y-10">
                                {items.map((item, index) => (
                                    <motion.div 
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={item.id} 
                                        className="relative pl-24 group"
                                    >
                                        {/* Dot */}
                                        <div className="absolute left-6 top-8 w-10 h-10 bg-[#4a332d] rounded-2xl flex items-center justify-center text-[#c5a059] shadow-xl border-4 border-[#f9f5eb] z-10 group-hover:scale-110 transition">
                                            <span className="text-xs font-black">{index + 1}</span>
                                        </div>

                                        <div className="bg-white rounded-[40px] p-8 shadow-xl border-2 border-[#c5a059]/10 group-hover:border-[#c5a059]/40 transition-all flex flex-col md:flex-row gap-8 relative overflow-hidden">
                                            <div className="w-full md:w-32 h-32 rounded-3xl overflow-hidden shadow-inner border-2 border-[#c5a059]/10 flex-shrink-0">
                                                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-2xl font-black text-[#4a332d] font-jogja">{item.name}</h3>
                                                        <p className="text-xs font-bold text-[#c5a059] uppercase tracking-widest flex items-center gap-2 mt-1">
                                                            <MapPin size={12} /> {item.category}
                                                        </p>
                                                    </div>
                                                    <button 
                                                        onClick={() => removeItem(item.id)}
                                                        className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition shadow-sm"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                                <div className="flex flex-wrap gap-4 mt-6 border-t-2 border-[#f9f5eb] pt-6">
                                                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
                                                        <Clock size={14} className="text-[#4a332d]/40" />
                                                        <span className="text-[10px] font-black text-[#4a332d]">09:00 - 11:00</span>
                                                    </div>
                                                    <Link 
                                                        to={`/destination/${item.id}`} 
                                                        className="ml-auto flex items-center gap-2 text-[10px] font-black text-[#4a332d] hover:text-[#c5a059] transition uppercase tracking-widest"
                                                    >
                                                        Detail <ChevronRight size={14} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Summary Card */}
                <div className="lg:col-span-1">
                    <div className="bg-[#4a332d] rounded-[50px] p-8 md:p-10 shadow-2xl text-[#f9f5eb] sticky top-28 border-4 border-[#c5a059]/30">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-[#c5a059]/20 rounded-2xl text-[#c5a059]">
                                <Sparkles size={24} />
                            </div>
                            <h2 className="text-2xl font-black font-jogja">{t.itinerary.summary}</h2>
                        </div>

                        <div className="space-y-6 mb-10">
                            <div className="flex justify-between items-center bg-white/5 p-5 rounded-3xl border border-white/10">
                                <span className="text-xs font-bold text-white/60">{t.itinerary.total_dest}</span>
                                <span className="text-xl font-black text-[#c5a059]">{items.length}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 p-5 rounded-3xl border border-white/10">
                                <span className="text-xs font-bold text-white/60">{t.itinerary.estimate_time}</span>
                                <span className="text-xl font-black text-[#c5a059]">{items.length * 2} Jam</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 p-5 rounded-3xl border border-white/10">
                                <span className="text-xs font-bold text-white/60">{t.itinerary.distance}</span>
                                <span className="text-xl font-black text-[#c5a059]">~{items.length * 12} KM</span>
                            </div>
                        </div>

                        <div className="p-6 bg-[#c5a059] rounded-3xl text-[#4a332d]">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">Cultural Smart Analysis</p>
                            <p className="text-sm font-bold leading-tight italic">
                                "Rencana panjenengan punika selaras sanget kaliyan swasana Ngayogyakarta ingkang asri."
                            </p>
                        </div>
                        
                        <button 
                            onClick={handleShare}
                            className="mt-8 w-full py-5 bg-[#f9f5eb] text-[#4a332d] rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#ecd4a4] transition shadow-xl border-2 border-[#c5a059]/20"
                        >
                            {lang === 'jv' ? 'Simpen & Bagikaken' : 'Simpan & Bagikan'}
                        </button>
                    </div>

                    {/* Passport Stamps Section */}
                    <div className="mt-8 bg-white/70 backdrop-blur-md rounded-[40px] p-8 border-2 border-[#c5a059]/20 shadow-xl">
                        <h3 className="text-xl font-black text-[#4a332d] font-jogja mb-6 flex items-center gap-2">
                             <Sparkles className="text-[#c5a059]" size={18} /> {t.itinerary.passport_title}
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {items.map((item) => (
                                <motion.div 
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    key={item.id} 
                                    className="aspect-square bg-[#f9f5eb] rounded-full border-4 border-dashed border-[#c5a059]/40 flex flex-col items-center justify-center p-2 text-center"
                                >
                                    <div className="w-10 h-10 bg-[#4a332d] rounded-full flex items-center justify-center text-[#c5a059] mb-1 shadow-lg">
                                        <Sparkles size={16} />
                                    </div>
                                    <span className="text-[7px] font-black text-[#4a332d] uppercase leading-tight line-clamp-1">{item.name}</span>
                                </motion.div>
                            ))}
                            {items.length === 0 && (
                                 <div className="col-span-3 py-6 opacity-30 text-center">
                                    <div className="w-12 h-12 border-2 border-dashed border-gray-400 rounded-full mx-auto mb-2"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{t.itinerary.stamps_label}</span>
                                 </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItineraryPage;
