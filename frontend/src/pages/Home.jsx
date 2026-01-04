import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, CloudRain, Sun, Navigation, Sparkles, Users, Coffee, Heart } from 'lucide-react';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const [destinations, setDestinations] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeVibe, setActiveVibe] = useState(null);
    const [weatherContext, setWeatherContext] = useState(null);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Parallel fetch for better performance
                const [destRes, recRes] = await Promise.all([
                    api.get('/destinations'),
                    api.get('/recommendations/smart')
                ]);
                
                const updatedDests = destRes?.data?.data || [];
                setDestinations(updatedDests);
                setRecommendations(recRes?.data?.data || []);
                setWeatherContext(recRes?.data?.context || null);
            } catch (error) {
                console.error("Error fetching data:", error);
                setDestinations([]);
                setRecommendations([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const openInMaps = (e, dest) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(`https://www.google.com/maps/search/?api=1&query=${dest.latitude},${dest.longitude}`, '_blank');
    };

    const filteredDestinations = destinations.filter(dest => {
        const matchesSearch = (dest.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                             (dest.category?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        
        if (activeVibe) {
            const cat = dest.category?.toLowerCase() || '';
            const name = dest.name?.toLowerCase() || '';
            if (activeVibe === 'calm') {
                return matchesSearch && (cat.includes('candi') || cat.includes('museum') || cat.includes('keraton') || cat.includes('alam') || cat.includes('sejarah') || cat.includes('budaya'));
            }
            if (activeVibe === 'fun') {
                return matchesSearch && (cat.includes('belanja') || cat.includes('pantai') || cat.includes('edupark') || cat.includes('petualangan') || cat.includes('hiburan'));
            }
            if (activeVibe === 'eat') {
                return matchesSearch && (cat.includes('kuliner') || name.includes('gudeg') || cat.includes('pasar') || name.includes('makan'));
            }
        }
        
        return matchesSearch;
    });

    return (
        <div className="space-y-12 mt-20 pb-12 batik-overlay">
            {/* Hero Section */}
            <div className="relative w-full min-h-[450px] md:min-h-[500px] rounded-[40px] overflow-hidden shadow-2xl mb-12 group border-4 border-[#c5a059]/20">
                 {/* Latar Belakang Gambar Nyata */}
                 <div className="absolute inset-0">
                <img 
                    src="/assets/images/hero.png" 
                    alt="Keraton Jogja" 
                    className="w-full h-full object-cover transition duration-1000 group-hover:scale-105"
                />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4a332d]/90 via-[#4a332d]/40 to-transparent"></div>
                 </div>
                 
                 <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 text-[#f9f5eb] relative z-10">
                     <div className="flex items-center gap-2 mb-6 bg-[#c5a059]/30 backdrop-blur-md w-fit px-5 py-2 rounded-full border border-[#c5a059]/40 slide-up">
                        <Sparkles size={18} className="text-[#ecd4a4]" />
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#ecd4a4]">{t.home.hero_tag}</span>
                     </div>
                     <h1 className="text-4xl md:text-7xl font-black mb-6 leading-none font-jogja">
                        {t.home.hero_title} <br/>
                        <span className="text-[#c5a059] italic">{t.home.hero_subtitle}</span>
                    </h1>
                     <p className="opacity-95 max-w-lg text-lg mb-10 leading-relaxed font-medium text-[#f9f5eb]/80">
                        {loading ? t.home.hero_loading : (
                            <>
                                {t.home.weather_status} <span className="text-[#c5a059] font-bold underlineDecoration">
                                    {weatherContext?.weather === 'Clear' ? t.home.weather_clear : 
                                     weatherContext?.weather === 'Rain' ? t.home.weather_rain : 
                                     t.home.weather_clouds}
                                </span>. 
                                {t.home.rec_for_you} <span className="font-bold underlineDecoration text-[#ecd4a4]">
                                    {weatherContext?.is_raining ? t.home.rec_indoor : t.home.rec_outdoor}
                                </span>.
                            </>
                        )}
                     </p>
                     
                     <div className="relative max-w-md group mb-6">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#4a332d]/50 group-focus-within:text-[#c5a059] transition" size={24} />
                        <input 
                            type="text" 
                            placeholder={t.nav.search_placeholder} 
                            className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#f9f5eb] text-[#4a332d] shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#c5a059]/40 transition-all placeholder:text-[#4a332d]/40 font-bold border-2 border-[#c5a059]/20"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setActiveVibe(null);
                            }}
                        />
                     </div>

                     {/* Vibe Picker */}
                     <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-black text-[#f9f5eb]/60 uppercase tracking-widest">{t.home.vibe_title}</span>
                        {[
                            { id: 'calm', label: t.home.vibe_calm, icon: <Heart size={14} />, colors: 'bg-blue-500/20 text-blue-200 border-blue-500/30' },
                            { id: 'fun', label: t.home.vibe_fun, icon: <Sparkles size={14} />, colors: 'bg-[#c5a059]/20 text-[#ecd4a4] border-[#c5a059]/30' },
                            { id: 'eat', label: t.home.vibe_eat, icon: <Coffee size={14} />, colors: 'bg-orange-500/20 text-orange-200 border-orange-500/30' }
                        ].map(v => (
                            <button 
                                key={v.id}
                                onClick={() => {
                                    setActiveVibe(v.id === activeVibe ? null : v.id);
                                    setSearchTerm('');
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all border-2 ${activeVibe === v.id ? 'bg-[#c5a059] text-[#4a332d] border-[#c5a059]' : `${v.colors} hover:scale-105`}`}
                            >
                                {v.icon} {v.label}
                            </button>
                        ))}
                     </div>
                  </div>

                 {recommendations.length > 0 && (
                    <div className="hidden lg:block absolute bottom-12 right-20 w-72 bg-[#4a332d]/80 backdrop-blur-xl border-2 border-[#c5a059]/40 p-6 rounded-[32px] shadow-2xl scale-110 hover:scale-115 transition duration-500 cursor-default animate-float">
                        <p className="text-[10px] text-[#c5a059] uppercase font-black mb-3 tracking-[0.2em]">{t.home.featured_title}</p>
                        <h4 className="font-jogja text-2xl font-bold text-[#f9f5eb] mb-2 line-clamp-1">{recommendations[0]?.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-[#f9f5eb]/60 mb-5">
                            <MapPin size={12} className="text-[#c5a059]" /> {recommendations[0]?.category}
                        </div>
                        <Link to={`/destination/${recommendations[0]?.id}`} className="text-xs bg-[#c5a059] text-[#4a332d] px-4 py-3 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-[#ecd4a4] transition shadow-lg">
                            {t.home.view_location}
                        </Link>
                    </div>
                 )}
            </div>

            {/* Smart Section: Recommendations */}
            {!searchTerm && Array.isArray(recommendations) && recommendations.length > 0 && (
                <div className="space-y-6 mb-16">
                    <div className="flex items-center gap-4 px-2">
                        <div className="h-10 w-1 bg-[#c5a059] rounded-full"></div>
                        <h2 className="text-3xl font-black text-[#4a332d] font-jogja tracking-tight">{t.home.recommendations_title} ✨</h2>
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-6 px-2 scrollbar-hide">
                        {recommendations.map(dest => (
                            <Link key={dest?.id} to={`/destination/${dest?.id}`} className="min-w-[320px] bg-[#f9f5eb] rounded-[32px] p-5 shadow-xl border-2 border-[#c5a059]/10 flex gap-5 hover:border-[#c5a059]/40 transition-all group relative overflow-hidden">
                                <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-4 -translate-y-4">
                                    <Sparkles size={80} className="text-[#c5a059]" />
                                </div>
                                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-[#c5a059]/20 shadow-inner">
                                    <img src={dest?.image_url || 'https://via.placeholder.com/100'} alt={dest?.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                </div>
                                <div className="flex flex-col justify-center gap-1">
                                    <h3 className="font-jogja text-xl font-bold text-[#4a332d] group-hover:text-[#c5a059] transition line-clamp-1">{dest?.name}</h3>
                                    <p className="text-[10px] text-[#4a332d]/60 font-bold flex items-center gap-1 uppercase tracking-wider">
                                        <MapPin size={10} className="text-[#c5a059]" /> {dest?.category}
                                    </p>
                                    <span className={`text-[10px] w-fit px-3 py-1 rounded-full font-black mt-1 ${dest?.type === 'outdoor' ? 'bg-[#c5a059]/10 text-[#4a332d]' : 'bg-[#4a332d]/10 text-[#4a332d]'}`}>
                                         {dest?.type === 'outdoor' ? t.home.rec_outdoor : t.home.rec_indoor}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Grid: Explore */}
            <div className="space-y-8">
                <div className="flex items-center gap-4 px-2">
                    <div className="h-10 w-1 bg-[#4a332d] rounded-full"></div>
                    <h2 className="text-3xl font-black text-[#4a332d] font-jogja tracking-tight px-2">{t.home.explore_title} 📍</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-2">
                    {loading ? (
                        <div className="col-span-full flex flex-col items-center py-24 text-[#4a332d]/40 gap-6">
                            <div className="w-16 h-16 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin shadow-xl"></div>
                            <p className="font-black text-xl font-jogja">{t.home.hero_loading}</p>
                        </div>
                    ) : Array.isArray(filteredDestinations) && filteredDestinations.length > 0 ? (
                        filteredDestinations.map((dest) => (
                            <Link to={`/destination/${dest?.id}`} key={dest?.id} className="group bg-[#f9f5eb] rounded-[40px] shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-[#c5a059]/10 overflow-hidden flex flex-col">
                                <div className="h-64 bg-gray-200 relative overflow-hidden">
                                    <img src={dest?.image_url || 'https://via.placeholder.com/400x300'} alt={dest?.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#4a332d]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="absolute top-5 left-5 flex gap-2">
                                        <div className="bg-[#f9f5eb]/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-[#4a332d] shadow-2xl flex items-center gap-2 uppercase border border-[#c5a059]/30">
                                            {dest?.type === 'outdoor' ? <Sun size={14} className="text-[#c5a059]"/> : <CloudRain size={14} className="text-[#c5a059]"/>}
                                            {dest?.type === 'outdoor' ? t.home.rec_outdoor : t.home.rec_indoor}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-5 right-5 flex flex-col items-end gap-2">
                                        <div className="bg-[#4a332d] text-[#c5a059] text-[10px] font-black px-4 py-2 rounded-2xl shadow-2xl border border-[#c5a059]/30">
                                            {dest?.opening_hours}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow bg-white/50">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-jogja text-2xl font-bold text-[#4a332d] group-hover:text-[#c5a059] transition leading-tight">{dest?.name}</h3>
                                        <span className={`text-[10px] flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black uppercase tracking-tighter ${
                                            dest?.live_traffic?.level === 'stalled' ? 'bg-red-100 text-red-600' :
                                            dest?.live_traffic?.level === 'heavy' ? 'bg-orange-100 text-orange-600' :
                                            dest?.live_traffic?.level === 'moderate' ? 'bg-blue-100 text-blue-600' :
                                            'bg-green-100 text-green-600'
                                        }`}>
                                            <Users size={12} /> {dest?.live_traffic?.label || t.home.traffic_smooth}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-[#4a332d]/50 text-xs mb-6 font-bold gap-2">
                                        <MapPin size={14} className="text-[#c5a059]" /> {dest?.category?.toUpperCase()}
                                    </div>
                                    
                                    <p className="text-[#4a332d]/70 text-sm line-clamp-2 mb-8 flex-grow leading-relaxed font-medium">
                                        {dest?.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-[#c5a059]/20 mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-[#c5a059] uppercase font-black tracking-[0.2em] mb-1">{t.home.ticket_label}</span>
                                            <span className="text-xl font-black text-[#4a332d]">{Number(dest?.ticket_price) === 0 ? t.home.free : `Rp ${Number(dest?.ticket_price).toLocaleString()}`}</span>
                                        </div>
                                        <button 
                                            onClick={(e) => openInMaps(e, dest)}
                                            className="bg-[#4a332d] text-[#c5a059] p-4 rounded-2xl group-hover:scale-110 transition-all shadow-xl hover:bg-[#5d4037] border border-[#c5a059]/30"
                                        >
                                            <Navigation size={22} />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-24 bg-white/30 rounded-[60px] border-4 border-dashed border-[#c5a059]/20 batik-overlay">
                            <p className="text-[#4a332d]/40 font-black text-xl font-jogja">{t.home.no_results}</p>
                        </div>
                    )}
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes float {
                    0%, 100% { transform: translateY(0) scale(1.1); }
                    50% { transform: translateY(-15px) scale(1.1); }
                }
                .animate-float { animation: float 5s ease-in-out infinite; }
                .underlineDecoration { text-decoration: underline wavy #c5a059; text-underline-offset: 6px; }
            `}} />
        </div>
    );
};

export default Home;
