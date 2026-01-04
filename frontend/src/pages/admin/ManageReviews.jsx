import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Trash2, MessageSquare, Star, MapPin, User } from 'lucide-react';

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const res = await api.get('/reviews');
            setReviews(res.data.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Hapus ulasan ini?")) return;
        try {
            await api.delete(`/reviews/${id}`);
            fetchReviews();
        } catch (err) { console.error(err); }
    };

    if (loading) return <div className="text-center py-20 font-jogja text-[#4a332d]">Loading Reviews...</div>;

    return (
        <div className="space-y-10 animate-fade-in">
             <header>
                <h1 className="text-4xl font-black text-[#4a332d] font-jogja uppercase tracking-widest">Manajemen Ulasan</h1>
                <p className="text-[#4a332d]/60 font-medium">Pantau dan moderasi apa yang dikatakan wisatawan tentang Jogja.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map(review => (
                    <div key={review.id} className="bg-white rounded-[40px] p-8 shadow-xl border border-[#c5a059]/10 flex flex-col justify-between group hover:border-[#c5a059]/30 transition-all duration-500 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                            <MessageSquare size={100} className="text-[#4a332d]" />
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[#f9f5eb] flex items-center justify-center text-[#c5a059] border border-[#c5a059]/20 shadow-inner">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <p className="font-black text-[#4a332d] uppercase tracking-widest text-sm">{review.user?.name || 'Wisatawan'}</p>
                                        <div className="flex text-[#c5a059] mt-1">
                                            {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDelete(review.id)}
                                    className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition shadow-sm border border-red-100"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-[10px] font-black text-[#c5a059] uppercase tracking-widest">
                                    <MapPin size={12} /> {review.destination?.name || 'Destinasi Tidak Diketahui'}
                                </div>
                                <p className="text-[#4a332d]/80 italic leading-relaxed font-medium">
                                    "{review.comment}"
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-[#f9f5eb] flex justify-between items-center">
                            <span className="text-[10px] font-bold text-[#4a332d]/40 uppercase tracking-tighter">Dikirim pada {new Date(review.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]/20"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]/40"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]/60"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {reviews.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-[#c5a059]/20">
                    <MessageSquare size={64} className="mx-auto text-[#c5a059]/20 mb-4" />
                    <p className="text-[#4a332d]/40 font-bold italic">Belum ada ulasan untuk dimoderasi.</p>
                </div>
            )}
        </div>
    );
};

export default ManageReviews;
