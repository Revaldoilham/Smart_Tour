import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Cloud, Sun, CloudRain, Thermometer, Wind, Droplets, MapPin, Navigation, Sparkles } from 'lucide-react';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const WeatherPage = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await api.get('/weather/current');
                setWeatherData(response.data.data);
            } catch (error) {
                console.error("Error fetching weather:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, []);

    if (loading) return (
        <div className="pt-40 flex flex-col items-center justify-center gap-6 batik-overlay h-screen">
            <div className="w-16 h-16 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin shadow-xl"></div>
            <p className="text-[#4a332d] font-black font-jogja text-xl">{t.home.hero_loading}</p>
        </div>
    );

    if (!weatherData) return <div className="pt-32 text-center text-[#4a332d] font-black font-jogja batik-overlay h-screen">{t.home.no_results}</div>;

    const current = weatherData.current;
    const weather = current.weather[0];

    return (
        <div className="pt-28 max-w-5xl mx-auto px-4 pb-24 batik-overlay min-h-screen">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 px-2 text-center md:text-left">
                <div>
                    <div className="flex items-center gap-3 mb-4 bg-[#c5a059]/10 w-fit px-4 py-1.5 rounded-full border border-[#c5a059]/20 mx-auto md:mx-0">
                        <Sparkles size={14} className="text-[#c5a059]" />
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#4a332d]">{t.weather.tag}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-[#4a332d] mb-3 font-jogja leading-none flex items-center justify-center md:justify-start gap-4">
                        <Cloud size={48} className="text-[#c5a059]" /> {t.weather.title}
                    </h1>
                    <p className="text-[#4a332d]/60 flex items-center justify-center md:justify-start gap-2 font-bold italic">
                        <MapPin size={18} className="text-[#c5a059]" /> {t.weather.subtitle}
                    </p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16 px-2">
                {/* Main Dashboard Card */}
                <div className="lg:col-span-2 bg-[#4a332d] rounded-[50px] p-12 text-[#f9f5eb] shadow-2xl relative overflow-hidden group border-4 border-[#c5a059]/20">
                    <div className="absolute top-0 right-0 opacity-10 transform scale-150 rotate-12 pointer-events-none group-hover:rotate-45 transition duration-1000">
                        {weather.main === 'Clear' ? <Sun size={400} /> : <Cloud size={400} />}
                    </div>

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex justify-between items-start mb-16">
                            <div>
                                <span className="bg-[#c5a059] text-[#4a332d] px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                                    {t.weather.current_tag}
                                </span>
                                <h2 className="text-8xl md:text-9xl font-black mt-8 tracking-tighter font-jogja text-[#c5a059]">
                                    {Math.round(current.temp)}°<span className="text-[#ecd4a4]">c</span>
                                </h2>
                                <p className="text-2xl font-bold mt-4 text-[#f9f5eb]/80 italic">
                                    "{weather.main === 'Clear' ? t.home.weather_clear : weather.main === 'Rain' ? t.home.weather_rain : t.home.weather_clouds}"
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <img src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`} alt="icon" className="w-48 h-48 filter drop-shadow-2xl" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-8 bg-[#f9f5eb]/5 backdrop-blur-xl p-10 rounded-[40px] border border-[#c5a059]/20">
                            <div className="flex flex-col items-center border-r border-[#c5a059]/20">
                                <Droplets size={28} className="mb-3 text-[#c5a059]" />
                                <span className="text-[10px] text-[#c5a059] uppercase font-black tracking-widest mb-2">{t.weather.humidity}</span>
                                <span className="text-2xl font-black text-[#f9f5eb]">{current.humidity}%</span>
                            </div>
                            <div className="flex flex-col items-center border-r border-[#c5a059]/20">
                                <Wind size={28} className="mb-3 text-[#ecd4a4]" />
                                <span className="text-[10px] text-[#ecd4a4] uppercase font-black tracking-widest mb-2">{t.weather.wind_speed}</span>
                                <span className="text-2xl font-black text-[#f9f5eb]">{current.wind_speed || 0} <span className="text-xs">km/h</span></span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Thermometer size={28} className="mb-3 text-[#c5a059]" />
                                <span className="text-[10px] text-[#c5a059] uppercase font-black tracking-widest mb-2">{t.weather.feels_like}</span>
                                <span className="text-2xl font-black text-[#f9f5eb]">{Math.round(current.feels_like)}°</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info & Recommendations */}
                <div className="flex flex-col gap-8">
                    <div className="bg-[#f9f5eb] rounded-[50px] p-10 shadow-xl border-2 border-[#c5a059]/20 flex-grow relative overflow-hidden">
                        <div className="absolute -top-4 -right-4 opacity-5">
                             <Sparkles size={80} className="text-[#4a332d]" />
                        </div>
                        <h3 className="font-black text-2xl text-[#4a332d] mb-6 tracking-tight font-jogja">{t.weather.tips_title}</h3>
                        <p className="text-[#4a332d]/70 leading-relaxed mb-10 text-lg font-bold italic">
                            {current.temp > 30 
                                ? (t.nav.home === 'Beranda' ? "Cuaca sangat terik. Gunakan tabir surya dan bawa air minum." : "Béntér sanget dinten menika. Ampun kesupen ngunjuk toya bening.") 
                                : weather.main === 'Rain' 
                                ? (t.nav.home === 'Beranda' ? "Sedang hujan, disarankan mencari tempat wisata dalam ruangan." : "Saweg jawah, prayoginipun madosi papan ingkang mboten kenging toya.") 
                                : (t.nav.home === 'Beranda' ? "Cuaca cerah, waktu yang tepat untuk menjelajah Malioboro." : "Kawontenan padhang bulan, prayogi kagem mlampah-mlampah wonten Malioboro.")}
                        </p>
                        <Link to="/" className="w-full inline-flex items-center justify-center gap-3 bg-[#4a332d] text-[#c5a059] px-8 py-5 rounded-[24px] font-black hover:bg-[#5d4037] transition-all shadow-xl uppercase tracking-widest text-sm border border-[#c5a059]/30">
                            {t.home.view_location} <Navigation size={20} />
                        </Link>
                    </div>
                    
                    <div className="bg-gradient-to-br from-[#c5a059] to-[#a08143] rounded-[40px] p-8 text-[#4a332d] shadow-xl flex items-center gap-6 border-2 border-[#4a332d]/10">
                        <div className="bg-[#4a332d]/10 p-5 rounded-3xl">
                             <Thermometer className="text-[#4a332d]" size={32} />
                        </div>
                        <div>
                            <p className="text-[10px] text-[#4a332d] uppercase font-black tracking-widest mb-1 opacity-70">{t.weather.uv_index}</p>
                            <p className="text-3xl font-black font-jogja">{current.uvi} <span className="text-sm font-bold opacity-60 ml-1">{t.weather.uv_high}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hourly Forecast */}
            <div className="px-2">
                <div className="flex items-center gap-4 mb-10">
                    <div className="h-10 w-1 bg-[#c5a059] rounded-full"></div>
                    <h3 className="text-3xl font-black text-[#4a332d] font-jogja tracking-tight">{t.weather.forecast_title}</h3>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide">
                    {weatherData.hourly.map((h, i) => (
                        <div key={i} className="min-w-[140px] bg-white/60 backdrop-blur-md p-8 rounded-[40px] shadow-xl border-2 border-[#c5a059]/10 flex flex-col items-center transition-all hover:border-[#c5a059]/40 hover:-translate-y-2 group">
                            <span className="text-sm font-black text-[#4a332d]/40 mb-6 group-hover:text-[#c5a059] transition">
                                {new Date(h.dt * 1000).getHours()}:00
                            </span>
                            <div className="bg-[#f9f5eb] p-4 rounded-3xl shadow-inner mb-6 group-hover:scale-110 transition duration-500">
                                <img src={`https://openweathermap.org/img/wn/${h.weather[0].icon}.png`} alt="icon" className="w-12 h-12" />
                            </div>
                            <span className="text-3xl font-black text-[#4a332d] font-jogja">{Math.round(h.temp)}°</span>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </div>
    );
};

export default WeatherPage;

