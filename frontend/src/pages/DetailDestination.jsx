import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Star, Navigation, Users, Thermometer, Sun, PlusCircle, CheckCircle } from 'lucide-react';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';

const DetailDestination = () => {
    const { t } = useLanguage();
    const { id } = useParams();
    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('itinerary') || '[]');
            setIsAdded(Array.isArray(saved) && saved.some(i => i && i.id === Number(id)));
        } catch (e) {
            console.error("LS Error", e);
            setIsAdded(false);
        }
    }, [id]);

    const addToItinerary = () => {
        const saved = JSON.parse(localStorage.getItem('itinerary') || '[]');
        if (!isAdded) {
            const newItem = {
                id: destination.id,
                name: destination.name,
                image_url: destination.image_url,
                category: destination.category,
                latitude: destination.latitude,
                longitude: destination.longitude
            };
            const updated = [...saved, newItem];
            localStorage.setItem('itinerary', JSON.stringify(updated));
            setIsAdded(true);
        } else {
            const updated = saved.filter(i => i.id !== destination.id);
            localStorage.setItem('itinerary', JSON.stringify(updated));
            setIsAdded(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/destinations/${id}`);
                const fetchedDest = response.data.data;
                setDestination(fetchedDest);
            } catch (error) {
                console.error("Error fetching detail:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="text-center py-20 font-jogja text-2xl text-[#4a332d]">{t.home.hero_loading}</div>;
    if (!destination) return <div className="text-center py-20 font-jogja text-2xl text-[#4a332d]">{t.home.no_results}</div>;

    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '', user_name: '' });
    const [submitting, setSubmitting] = useState(false);

    const submitReview = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await api.post(`/destinations/${id}/reviews`, newReview);
            if (res.data.status === 'success') {
                setDestination({
                    ...destination,
                    reviews: [res.data.data, ...(destination.reviews || [])]
                });
                setNewReview({ rating: 5, comment: '', user_name: '' });
                setShowReviewForm(false);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Gagal mengirim ulasan. Silakan coba lagi.");
        } finally {
            setSubmitting(false);
        }
    };

    const latestWeather = destination.live_weather || { temp: 28, description: 'Cerah Berawan' };
    const latestTraffic = destination.live_traffic || { level: 'clear', label: 'Lancar' };
    const crowdStatus = latestTraffic.label;

    return (
        <div className="mt-24 max-w-5xl mx-auto pb-24 px-4 batik-overlay font-medium">
            <Link to="/" className="inline-flex items-center gap-2 text-[#4a332d] mb-8 hover:text-[#c5a059] transition font-black uppercase text-xs tracking-widest bg-white/50 px-5 py-3 rounded-2xl border border-[#c5a059]/20 shadow-sm">
                <ArrowLeft size={16} /> {t.detail.back}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Side: Photo and Description */}
                <div className="lg:col-span-2 space-y-12">
                    <section className="relative rounded-[60px] overflow-hidden shadow-2xl border-4 border-[#c5a059]/20 group">
                        <img src={destination.image_url} alt={destination.name} className="w-full h-[500px] object-cover transition duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#4a332d]/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                            <div>
                                <h1 className="text-5xl font-black text-[#f9f5eb] font-jogja mb-2 drop-shadow-2xl">{destination.name}</h1>
                                <div className="flex items-center gap-2 text-[#ecd4a4] font-bold">
                                    <MapPin size={18} /> {destination.category}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white/70 backdrop-blur-md rounded-[40px] p-10 shadow-xl border border-[#c5a059]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                            <MapPin size={120} className="text-[#4a332d]" />
                        </div>
                        <h2 className="text-3xl font-bold font-jogja mb-6 text-[#4a332d] flex items-center gap-3">
                            <div className="h-8 w-1.5 bg-[#c5a059] rounded-full"></div>
                            {t.detail.description_title}
                        </h2>
                        <p className="text-[#4a332d]/80 leading-relaxed text-lg italic">
                            {destination.description}
                        </p>
                    </section>

                    {/* Fasilitas & Unggah-ungguh */}
                    {destination.extra_info && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-[#f9f5eb] p-8 rounded-[40px] border-2 border-[#c5a059]/10 shadow-lg">
                                <h4 className="text-xl font-black text-[#4a332d] font-jogja mb-6">{t.detail.facilities_title}</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {destination.extra_info.facilities.map((f, i) => (
                                        <div key={i} className="flex items-center gap-2 text-[10px] font-black text-[#4a332d]/70 bg-white px-3 py-2 rounded-xl shadow-sm border border-[#c5a059]/5 uppercase tracking-tighter">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></div>
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-[#4a332d] p-8 rounded-[40px] border-2 border-[#c5a059]/20 shadow-lg text-[#f9f5eb] relative overflow-hidden">
                                <div className="absolute -top-4 -right-4 opacity-10">
                                    <Star size={80} className="text-[#c5a059]" />
                                </div>
                                <h4 className="text-xl font-black text-[#c5a059] font-jogja mb-4">{t.detail.culture_tips_title}</h4>
                                <p className="text-sm font-medium italic leading-relaxed text-[#f9f5eb]/80">
                                    "{destination.extra_info.cultural_tip}"
                                </p>
                                <div className="mt-6 pt-6 border-t border-[#f9f5eb]/10">
                                    <p className="text-[10px] text-[#c5a059] uppercase font-black tracking-widest">{t.detail.best_time}</p>
                                    <p className="text-lg font-bold font-jogja">{destination.extra_info.best_time}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <section className="bg-white/70 backdrop-blur-md rounded-[40px] p-10 shadow-xl border border-[#c5a059]/20">
                        <h2 className="text-3xl font-bold font-jogja mb-8 text-[#4a332d] flex items-center gap-3">
                            <div className="h-8 w-1.5 bg-[#4a332d] rounded-full"></div>
                            {t.detail.reviews_title}
                        </h2>
                        
                        {showReviewForm ? (
                            <form onSubmit={submitReview} className="mb-12 bg-white p-8 rounded-3xl border-2 border-[#c5a059]/20 shadow-inner space-y-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-jogja text-xl text-[#4a332d]">{t.detail.write_review}</h3>
                                    <button type="button" onClick={() => setShowReviewForm(false)} className="text-[#4a332d]/40 hover:text-red-500 transition">Tutup</button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest mb-2 block">Nama Anda</label>
                                        <input 
                                            required
                                            type="text" 
                                            value={newReview.user_name}
                                            onChange={(e) => setNewReview({...newReview, user_name: e.target.value})}
                                            className="w-full bg-[#f9f5eb] border-2 border-[#c5a059]/10 rounded-xl px-4 py-3 outline-none focus:border-[#c5a059] transition font-bold"
                                            placeholder="Masukkan nama..."
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest mb-2 block">Rating</label>
                                        <div className="flex gap-2">
                                            {[1,2,3,4,5].map(star => (
                                                <button 
                                                    key={star} 
                                                    type="button"
                                                    onClick={() => setNewReview({...newReview, rating: star})}
                                                    className={`transition ${newReview.rating >= star ? 'text-[#c5a059]' : 'text-[#c5a059]/20'}`}
                                                >
                                                    <Star size={32} fill={newReview.rating >= star ? "currentColor" : "none"} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest mb-2 block">Komentar</label>
                                        <textarea 
                                            required
                                            rows="4"
                                            value={newReview.comment}
                                            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                                            className="w-full bg-[#f9f5eb] border-2 border-[#c5a059]/10 rounded-xl px-4 py-3 outline-none focus:border-[#c5a059] transition font-medium italic"
                                            placeholder="Bagaimana pengalaman Anda di sini?"
                                        ></textarea>
                                    </div>
                                    <button 
                                        disabled={submitting}
                                        className="w-full py-4 bg-[#4a332d] text-[#c5a059] rounded-2xl font-black uppercase tracking-widest hover:bg-[#5d4037] transition disabled:opacity-50"
                                    >
                                        {submitting ? 'Mengirim...' : 'Kirim Ulasan'}
                                    </button>
                                </div>
                            </form>
                        ) : null}

                        <div className="space-y-8">
                            {destination.reviews && destination.reviews.length > 0 ? (
                                destination.reviews.map(review => (
                                    <div key={review.id} className="pb-8 border-b border-[#c5a059]/10 last:border-0 last:pb-0 group">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-black text-[#4a332d] text-lg uppercase tracking-wider">{review.user?.name || 'Wisatawan'}</span>
                                            <div className="flex text-[#c5a059]">
                                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                            </div>
                                        </div>
                                        <p className="text-[#4a332d]/60 italic font-medium leading-relaxed group-hover:text-[#4a332d] transition">"{review.comment}"</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center py-10 text-[#4a332d]/40 italic">Belum ada ulasan. Jadilah yang pertama memberikan ulasan!</p>
                            )}
                        </div>
                        {!showReviewForm && (
                            <button 
                                onClick={() => setShowReviewForm(true)}
                                className="mt-10 w-full py-4 border-2 border-dashed border-[#c5a059]/40 rounded-2xl text-[#c5a059] font-black hover:bg-[#c5a059]/10 transition uppercase tracking-widest"
                            >
                                {t.detail.write_review}
                            </button>
                        )}
                    </section>
                </div>

                {/* Right Side: Sidebar */}
                <div className="space-y-8">
                    {/* Status Card */}
                    <div className="bg-[#4a332d] rounded-[40px] p-8 shadow-2xl border-2 border-[#c5a059]/30 space-y-8 relative overflow-hidden batik-overlay">
                        <div className="flex items-center gap-5 text-[#f9f5eb] group">
                            <div className="p-3 bg-[#c5a059]/20 rounded-2xl group-hover:bg-[#c5a059] transition">
                                <Clock size={24} className="text-[#c5a059] group-hover:text-[#4a332d]" />
                            </div>
                            <div>
                                <p className="text-[10px] text-[#c5a059] uppercase font-black tracking-widest mb-1">{t.detail.opening_hours}</p>
                                <p className="text-lg font-bold font-jogja">{destination.opening_hours}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 text-[#f9f5eb] group">
                            <div className="p-3 bg-blue-500/20 rounded-2xl group-hover:bg-blue-500 transition">
                                <Users size={24} className="text-blue-400 group-hover:text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] text-blue-400 uppercase font-black tracking-widest mb-1">{t.detail.crowd_status}</p>
                                <p className="text-lg font-bold font-jogja">{crowdStatus}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-5 text-[#f9f5eb] group">
                            <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-white transition">
                                <Sun size={24} className="text-[#c5a059]" />
                            </div>
                            <div>
                                <p className="text-[10px] text-[#c5a059] uppercase font-black tracking-widest mb-1">{t.nav.weather}</p>
                                <p className="text-lg font-bold font-jogja uppercase">{latestWeather.temp}°C • {latestWeather.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Location Card */}
                    <div className="bg-white rounded-[40px] p-8 shadow-xl border border-[#c5a059]/20 space-y-6">
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] text-[#c5a059] uppercase font-black tracking-widest">{t.detail.location}</span>
                            <div className="flex items-start gap-3">
                                <MapPin className="text-[#4a332d] mt-1 shrink-0" size={20} />
                                <p className="text-sm font-bold text-[#4a332d]">{destination.location_url ? t.detail.location_text : 'Yogyakarta, Indonesia'}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 pt-6 border-t border-[#c5a059]/10">
                            <span className="text-[10px] text-[#c5a059] uppercase font-black tracking-widest">{t.detail.ticket_price}</span>
                            <p className="text-3xl font-black text-[#4a332d]">
                                {Number(destination.ticket_price) === 0 ? t.home.free : `Rp ${Number(destination.ticket_price).toLocaleString()}`}
                            </p>
                        </div>
                        <button 
                            onClick={addToItinerary}
                            className={`w-full py-5 rounded-[24px] font-black flex items-center justify-center gap-3 transition shadow-xl uppercase tracking-widest text-xs border-2 ${isAdded ? 'bg-[#c5a059] text-[#4a332d] border-[#c5a059]' : 'bg-white text-[#c5a059] border-[#c5a059]/30 hover:bg-[#c5a059]/5'}`}
                        >
                            {isAdded ? <CheckCircle size={18} /> : <PlusCircle size={18} />}
                            {isAdded ? t.itinerary.remove_button : t.itinerary.add_button}
                        </button>
                        <button 
                            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${destination.latitude},${destination.longitude}`, '_blank')}
                            className="w-full bg-[#4a332d] text-[#c5a059] py-5 rounded-[24px] font-black flex items-center justify-center gap-3 hover:bg-[#5d4037] transition shadow-xl border border-[#c5a059]/30 uppercase tracking-widest text-xs mt-4"
                        >
                            <Navigation size={18} /> {t.detail.get_directions}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailDestination;
