import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { MapPinned, MessageSquare, Users, Star, TrendingUp, Eye, BarChart3, Compass } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/admin/stats');
                setStats(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="text-center py-20 font-jogja text-[#4a332d]">Loading Statistics...</div>;
    if (!stats) return <div className="text-center py-20 font-jogja text-red-500">Gagal memuat statistik. Pastikan server backend berjalan.</div>;

    const cards = [
        { label: 'Total Destinasi', value: stats.total_destinations, icon: <MapPinned />, color: 'bg-blue-500' },
        { label: 'Total Ulasan', value: stats.total_reviews, icon: <MessageSquare />, color: 'bg-[#c5a059]' },
        { label: 'Total Kunjungan', value: stats.total_visitors, icon: <Eye />, color: 'bg-emerald-500' },
        { label: 'Tamu Hari Ini', value: stats.unique_visitors_today, icon: <Users />, color: 'bg-indigo-500' },
    ];

    return (
        <div className="space-y-10 animate-fade-in">
            <header>
                <h1 className="text-4xl font-black text-[#4a332d] font-jogja uppercase tracking-widest">Dashboard Analitik</h1>
                <p className="text-[#4a332d]/60 font-medium">Laporan pengunjung dan performa destinasi Smart Tour Jogja.</p>
            </header>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] shadow-xl border border-[#c5a059]/10 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                        <div className={`absolute top-0 right-0 w-24 h-24 ${card.color} opacity-5 -mr-12 -mt-12 rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[10px] uppercase font-black tracking-widest text-[#c5a059] mb-1">{card.label}</p>
                                <p className="text-4xl font-black text-[#4a332d] font-jogja">{card.value}</p>
                            </div>
                            <div className={`p-3 ${card.color} text-white rounded-xl shadow-lg`}>
                                {card.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Visitor Charts & Top Pages */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[40px] p-8 shadow-xl border border-[#c5a059]/10">
                    <h2 className="text-2xl font-black text-[#4a332d] font-jogja mb-8 flex items-center gap-3">
                        <BarChart3 className="text-[#c5a059]" /> Tren Trafik (7 Hari Terakhir)
                    </h2>
                    <div className="h-64 flex items-end gap-3 px-4">
                        {stats.visitors_chart?.map((day, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                <div className="w-full relative">
                                    <div 
                                        className="w-full bg-[#c5a059]/20 rounded-t-xl group-hover:bg-[#c5a059]/40 transition-all duration-500"
                                        style={{ height: `${(day.count / Math.max(...stats.visitors_chart.map(d => d.count), 1)) * 200}px` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#4a332d] text-[#c5a059] text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            {day.count}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-[#4a332d]/40 uppercase tracking-tighter truncate w-full text-center">
                                    {new Date(day.visit_date).toLocaleDateString('id-ID', { weekday: 'short' })}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[40px] p-8 shadow-xl border border-[#c5a059]/10">
                    <h2 className="text-2xl font-black text-[#4a332d] font-jogja mb-8 flex items-center gap-3">
                        <Compass className="text-[#c5a059]" /> Halaman Populer
                    </h2>
                    <div className="space-y-4">
                        {stats.top_pages?.map((page, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[#f9f5eb]/50 border border-[#c5a059]/5 hover:border-[#c5a059]/20 transition-all group">
                                <div className="flex-1 truncate">
                                    <p className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest mb-1">/{page.path === '/' ? 'Home' : page.path.split('/').pop()}</p>
                                    <p className="text-xs text-[#4a332d]/40 font-bold truncate italic group-hover:text-[#4a332d] transition-colors">{page.path}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-black text-[#4a332d] font-jogja">{page.count}</p>
                                    <p className="text-[8px] font-bold text-[#c5a059] uppercase">Hits</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Recent Reviews */}
                <div className="bg-white rounded-[40px] p-8 shadow-xl border border-[#c5a059]/10">
                    <h2 className="text-2xl font-black text-[#4a332d] font-jogja mb-8 flex items-center gap-3">
                        <MessageSquare className="text-[#c5a059]" /> Ulasan Terbaru
                    </h2>
                    <div className="space-y-6">
                        {stats.recent_reviews.map(review => (
                            <div key={review.id} className="p-5 rounded-3xl bg-[#f9f5eb]/50 border border-[#c5a059]/5 flex items-start gap-4">
                                <div className="p-3 bg-[#c5a059]/10 rounded-2xl text-[#c5a059] font-bold text-xs">
                                    {review.rating} <Star size={12} className="inline ml-1" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-black text-[#4a332d] text-xs uppercase tracking-widest">{review.user?.name || 'Wisatawan'}</p>
                                    <p className="text-xs text-[#c5a059] font-bold mb-2">{review.destination?.name}</p>
                                    <p className="text-sm text-[#4a332d]/60 italic">"{review.comment}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Destinations */}
                <div className="bg-white rounded-[40px] p-8 shadow-xl border border-[#c5a059]/10">
                    <h2 className="text-2xl font-black text-[#4a332d] font-jogja mb-8 flex items-center gap-3">
                        <TrendingUp className="text-[#c5a059]" /> Destinasi Terpopuler
                    </h2>
                    <div className="space-y-6">
                        {stats.top_destinations.map((dest, idx) => (
                            <div key={dest.id} className="flex items-center gap-5 p-4 rounded-3xl hover:bg-[#f9f5eb] transition">
                                <span className="text-2xl font-black text-[#c5a059]/20 font-jogja">0{idx + 1}</span>
                                <div className="flex-1">
                                    <p className="font-black text-[#4a332d] uppercase tracking-widest text-sm">{dest.name}</p>
                                    <p className="text-xs text-[#4a332d]/40 mt-1">{dest.reviews_count} Ulasan Total</p>
                                </div>
                                <div className="h-2 w-24 bg-[#f9f5eb] rounded-full overflow-hidden">
                                     <div 
                                        className="h-full bg-[#c5a059]" 
                                        style={{ width: `${stats.top_destinations[0]?.reviews_count > 0 ? (dest.reviews_count / stats.top_destinations[0].reviews_count) * 100 : 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
