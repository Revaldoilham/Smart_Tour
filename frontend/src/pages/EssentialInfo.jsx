import React from 'react';
import { Phone, Bus, MessageSquare, ShieldAlert, HeartPulse, Info, Train, Languages, MapPin, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const EssentialInfo = () => {
    const { t } = useLanguage();

    const emergencyServices = [
        { icon: <ShieldAlert className="text-red-500" />, name: t.essential.service_police, phone: "110 / (0274) 584900" },
        { icon: <HeartPulse className="text-pink-500" />, name: t.essential.service_hospital, phone: " (0274) 587333" },
        { icon: <Info className="text-blue-500" />, name: t.essential.service_tourist, phone: "(0274) 589350" },
    ];

    const transportServices = [
        { icon: <Bus className="text-[#c5a059]" />, name: t.essential.transport_trans, detail: "05.30 - 21.30 WIB" },
        { icon: <Train className="text-[#c5a059]" />, name: t.essential.transport_krl, detail: "Yogyakarta - Solo Balapan" },
        { icon: <MapPin className="text-[#c5a059]" />, name: t.essential.transport_station, detail: "Pusat Kitha" },
    ];

    const phrases = [
        { q: t.essential.phrase_thank, a: "Digunakan setelah menerima bantuan atau layanan." },
        { q: t.essential.phrase_sorry, a: "Sangat sopan digunakan saat bertanya atau lewat di depan orang." },
        { q: t.essential.phrase_where, a: "Kalimat dasar untuk mencari lokasi atau gedung." },
    ];

    return (
        <div className="pt-28 max-w-6xl mx-auto px-4 pb-24 batik-overlay min-h-screen">
             <header className="mb-12 text-center md:text-left">
                <div className="flex items-center gap-3 mb-4 bg-[#4a332d]/10 w-fit px-4 py-1.5 rounded-full border border-[#4a332d]/20 mx-auto md:mx-0">
                    <Info size={14} className="text-[#4a332d]" />
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#4a332d]">Smart Guide</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-[#4a332d] mb-4 font-jogja leading-none">
                    {t.essential.title}
                </h1>
                <p className="text-[#4a332d]/60 text-lg font-bold italic max-w-2xl leading-relaxed">
                    {t.essential.subtitle}
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                {/* Emergency Card */}
                <div className="bg-white rounded-[40px] p-8 shadow-xl border-2 border-red-500/10 relative overflow-hidden flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-red-100 rounded-2xl text-red-500">
                            <Phone size={24} />
                        </div>
                        <h2 className="text-2xl font-black text-[#4a332d] font-jogja">{t.essential.emergency_title}</h2>
                    </div>
                    <div className="space-y-6 flex-grow">
                        {emergencyServices.map((s, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-red-500/30 transition">
                                <div className="flex items-center gap-4">
                                    {s.icon}
                                    <span className="text-sm font-bold text-[#4a332d]">{s.name}</span>
                                </div>
                                <span className="text-xs font-black text-red-500 bg-red-50 px-3 py-1.5 rounded-full">{s.phone}</span>
                            </div>
                        ))}
                    </div>
                    <button className="mt-8 w-full py-4 bg-red-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-600 transition shadow-lg shadow-red-500/20">
                        {t.essential.emergency_title} SOS
                    </button>
                </div>

                {/* Transport Card */}
                <div className="bg-[#4a332d] rounded-[40px] p-8 shadow-2xl border-4 border-[#c5a059]/30 text-[#f9f5eb]">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-[#c5a059]/20 rounded-2xl text-[#c5a059]">
                            <Bus size={24} />
                        </div>
                        <h2 className="text-2xl font-black text-[#c5a059] font-jogja">{t.essential.transport_title}</h2>
                    </div>
                    <div className="space-y-6">
                        {transportServices.map((s, i) => (
                            <div key={i} className="flex items-center gap-5 p-4 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition">
                                <div className="p-2.5 bg-[#c5a059] rounded-xl text-[#4a332d]">
                                    {s.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-black uppercase tracking-tight text-[#c5a059]">{s.name}</p>
                                    <p className="text-xs font-bold text-[#f9f5eb]/60">{s.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 p-6 bg-gradient-to-br from-[#c5a059] to-[#a08143] rounded-3xl text-[#4a332d]">
                        <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Pro Tip</p>
                        <p className="text-sm font-bold leading-tight italic">"Gunakaken Kartu Multi Trip (KMT) kagem numpak KRL kanthi gampil!"</p>
                    </div>
                </div>

                {/* Language Card */}
                <div className="bg-[#f9f5eb] rounded-[40px] p-8 shadow-xl border-2 border-[#c5a059]/20 relative overflow-hidden">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-[#c5a059]/20 rounded-2xl text-[#c5a059]">
                            <Languages size={24} />
                        </div>
                        <h2 className="text-2xl font-black text-[#4a332d] font-jogja">{t.essential.phrases_title}</h2>
                    </div>
                    <div className="space-y-6">
                        {phrases.map((p, i) => (
                            <div key={i} className="p-5 bg-white rounded-3xl border border-[#c5a059]/10 shadow-sm hover:translate-x-2 transition-transform cursor-default">
                                <p className="text-lg font-black text-[#4a332d] mb-1 font-jogja">{p.q}</p>
                                <p className="text-[10px] font-bold text-[#4a332d]/50 italic">{p.a}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex gap-3">
                         <div className="flex-1 p-4 bg-white rounded-2xl border border-blue-500/10 text-center">
                            <p className="text-[10px] font-black text-blue-500 uppercase mb-1">Google Translate</p>
                            <p className="text-xs font-bold text-[#4a332d]">Offline Pack OK</p>
                         </div>
                    </div>
                </div>
            </div>

            {/* Cultural Events Section (Simulation) */}
            <div className="bg-white/60 backdrop-blur-md rounded-[50px] p-10 md:p-16 shadow-2xl border-2 border-[#c5a059]/10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl font-black text-[#4a332d] font-jogja mb-2 italic">Agenda Budaya Hari Ini</h2>
                        <p className="text-[#4a332d]/60 font-bold uppercase tracking-widest text-xs">Cultural Heritage Calendar • 2026</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group relative rounded-[40px] overflow-hidden shadow-xl border-4 border-[#c5a059]/20 h-[300px]">
                        <img src="https://images.unsplash.com/photo-1590831627230-01d752ad4372?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt="Wayang" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#4a332d] via-transparent to-transparent opacity-90"></div>
                        <div className="absolute bottom-8 left-8 text-[#f9f5eb]">
                            <span className="bg-[#c5a059] text-[#4a332d] px-3 py-1 rounded-full text-[10px] font-black uppercase mb-3 inline-block">Festival</span>
                            <h3 className="text-2xl font-black font-jogja">Wayang Kulit Semalam Suntuk</h3>
                            <p className="text-sm font-bold text-[#c5a059] mt-1 flex items-center gap-2">
                                <MapPin size={14} /> Alun-Alun Kidul • 20:00 WIB
                            </p>
                        </div>
                    </div>
                    <div className="group relative rounded-[40px] overflow-hidden shadow-xl border-4 border-[#c5a059]/20 h-[300px]">
                        <img src="https://images.unsplash.com/photo-1596402184320-417d7178b2cd?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" alt="Gamelan" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#4a332d] via-transparent to-transparent opacity-90"></div>
                        <div className="absolute bottom-8 left-8 text-[#f9f5eb]">
                            <span className="bg-[#c5a059] text-[#4a332d] px-3 py-1 rounded-full text-[10px] font-black uppercase mb-3 inline-block">Seni</span>
                            <h3 className="text-2xl font-black font-jogja">Latihan Gamelan Keraton</h3>
                            <p className="text-sm font-bold text-[#c5a059] mt-1 flex items-center gap-2">
                                <MapPin size={14} /> Bangsal Pagelaran • 10:00 WIB
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EssentialInfo;
