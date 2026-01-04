import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Plus, Edit2, Trash2, Search, X, MapPin } from 'lucide-react';

const ManageDestinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingDest, setEditingDest] = useState(null);
    const [formData, setFormData] = useState({
        name: '', description: '', address: '', latitude: -7.7956, longitude: 110.3695,
        category: 'Budaya', type: 'outdoor', opening_hours: '08:00 - 17:00', 
        ticket_price: 10000, image_url: ''
    });

    const categories = ['Budaya', 'Alam', 'Sejarah', 'Belanja', 'Kuliner', 'Hiburan', 'Petualangan'];

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
        try {
            const res = await api.get('/destinations');
            setDestinations(res.data.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingDest) {
                await api.put(`/destinations/${editingDest.id}`, formData);
            } else {
                await api.post('/destinations', formData);
            }
            fetchDestinations();
            closeModal();
        } catch (err) { console.error(err); alert("Gagal menyimpan data."); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Hapus destinasi ini?")) return;
        try {
            await api.delete(`/destinations/${id}`);
            fetchDestinations();
        } catch (err) { console.error(err); }
    };

    const openModal = (dest = null) => {
        if (dest) {
            setEditingDest(dest);
            setFormData({ ...dest });
        } else {
            setEditingDest(null);
            setFormData({
                name: '', description: '', address: '', latitude: -7.7956, longitude: 110.3695,
                category: 'Budaya', type: 'outdoor', opening_hours: '08:00 - 17:00', 
                ticket_price: 10000, image_url: ''
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingDest(null);
    };

    const filtered = destinations.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-[#4a332d] font-jogja uppercase tracking-widest">Manajemen Destinasi</h1>
                    <p className="text-[#4a332d]/60 font-medium">Tambah, edit, atau hapus destinasi wisata Yogyakarta.</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-[#4a332d] text-[#c5a059] px-8 py-4 rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-[#5d4037] transition shadow-xl"
                >
                    <Plus size={18} /> Tambah Destinasi
                </button>
            </header>

            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c5a059]" size={18} />
                <input 
                    type="text" 
                    placeholder="Cari destinasi..." 
                    className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-[#c5a059]/20 focus:border-[#c5a059] outline-none shadow-sm transition font-bold"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-[40px] shadow-xl border border-[#c5a059]/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#4a332d] text-[#c5a059] uppercase text-[10px] font-black tracking-widest">
                            <tr>
                                <th className="px-8 py-6">Destinasi</th>
                                <th className="px-8 py-6">Kategori</th>
                                <th className="px-8 py-6">Tipe</th>
                                <th className="px-8 py-6">Harga Tiket</th>
                                <th className="px-8 py-6 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#c5a059]/10">
                            {filtered.map(dest => (
                                <tr key={dest.id} className="hover:bg-[#f9f5eb]/50 transition duration-300">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <img src={dest.image_url} className="w-12 h-12 rounded-xl object-cover border border-[#c5a059]/20 shadow-sm" alt="" />
                                            <div>
                                                <p className="font-black text-[#4a332d] uppercase tracking-wider text-sm">{dest.name}</p>
                                                <p className="text-[10px] text-[#4a332d]/40 flex items-center gap-1 font-bold mt-0.5 uppercase"><MapPin size={8} /> {dest.address.substring(0, 30)}...</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-bold text-[#c5a059] text-xs uppercase tracking-widest">{dest.category}</td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${dest.type === 'indoor' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                            {dest.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 font-bold text-[#4a332d] text-sm">Rp {dest.ticket_price.toLocaleString()}</td>
                                    <td className="px-8 py-6 text-right space-x-2">
                                        <button onClick={() => openModal(dest)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition shadow-sm border border-blue-100"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(dest.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm border border-red-100"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4a332d]/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden border-2 border-[#c5a059]/20 max-h-[90vh] flex flex-col">
                        <div className="p-8 bg-[#4a332d] flex justify-between items-center batik-overlay shadow-lg relative">
                            <h3 className="text-2xl font-black text-[#f9f5eb] font-jogja tracking-widest uppercase">{editingDest ? 'Edit Destinasi' : 'Tambah Destinasi Baru'}</h3>
                            <button onClick={closeModal} className="text-[#c5a059] hover:text-white transition"><X size={32} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-10 space-y-8 overflow-y-auto flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest block">Nama Destinasi</label>
                                    <input 
                                        required 
                                        className="w-full bg-[#f9f5eb] border-2 border-[#c5a059]/10 rounded-2xl px-6 py-4 outline-none focus:border-[#c5a059] transition font-bold"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest block">Kategori</label>
                                    <select 
                                        className="w-full bg-[#f9f5eb] border-2 border-[#c5a059]/10 rounded-2xl px-6 py-4 outline-none focus:border-[#c5a059] transition font-bold appearance-none cursor-pointer"
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    >
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-4 md:col-span-2">
                                    <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest block">URL Gambar (Unsplash)</label>
                                    <input 
                                        className="w-full bg-[#f9f5eb] border-2 border-[#c5a059]/10 rounded-2xl px-6 py-4 outline-none focus:border-[#c5a059] transition font-medium italic"
                                        placeholder="https://images.unsplash.com/..."
                                        value={formData.image_url}
                                        onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-4 md:col-span-2">
                                    <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest block">Deskripsi</label>
                                    <textarea 
                                        rows="4"
                                        required
                                        className="w-full bg-[#f9f5eb] border-2 border-[#c5a059]/10 rounded-2xl px-6 py-4 outline-none focus:border-[#c5a059] transition font-medium italic"
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest block">Tipe</label>
                                    <div className="flex gap-4">
                                        {['outdoor', 'indoor'].map(t => (
                                            <button 
                                                key={t}
                                                type="button"
                                                onClick={() => setFormData({...formData, type: t})}
                                                className={`flex-1 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] border-2 transition ${formData.type === t ? 'bg-[#c5a059] text-white border-[#c5a059] shadow-lg shadow-[#c5a059]/30' : 'bg-white text-[#c5a059] border-[#c5a059]/10'}`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest block">Harga Tiket (Rp)</label>
                                    <input 
                                        type="number"
                                        required
                                        className="w-full bg-[#f9f5eb] border-2 border-[#c5a059]/10 rounded-2xl px-6 py-4 outline-none focus:border-[#c5a059] transition font-bold"
                                        value={formData.ticket_price}
                                        onChange={(e) => setFormData({...formData, ticket_price: parseInt(e.target.value)})}
                                    />
                                </div>
                            </div>
                            <button className="w-full py-6 bg-[#4a332d] text-[#c5a059] rounded-[24px] font-black uppercase tracking-widest hover:bg-[#5d4037] transition shadow-2xl mt-4 border border-[#c5a059]/30">
                                {editingDest ? 'Update Destinasi' : 'Simpan Destinasi'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageDestinations;
