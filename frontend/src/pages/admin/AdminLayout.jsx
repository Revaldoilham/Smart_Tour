import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, MapPinned, MessageSquare, LogOut, Home } from 'lucide-react';

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/destinations', icon: <MapPinned size={20} />, label: 'Destinasi' },
        { path: '/admin/reviews', icon: <MessageSquare size={20} />, label: 'Ulasan' },
    ];

    return (
        <div className="min-h-screen bg-[#f9f5eb] flex font-medium">
            {/* Sidebar */}
            <aside className="w-64 bg-[#4a332d] p-6 flex flex-col shadow-2xl">
                <div className="mb-12 flex items-center gap-3">
                    <div className="p-2 bg-[#c5a059] rounded-xl shadow-lg">
                        <MapPinned className="text-white" size={24} />
                    </div>
                    <span className="text-xl font-black text-[#f9f5eb] font-jogja tracking-widest uppercase">Admin Panel</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${
                                location.pathname === item.path
                                    ? 'bg-[#c5a059] text-white shadow-xl translate-x-1'
                                    : 'text-[#f9f5eb]/60 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {item.icon}
                            <span className="font-bold uppercase tracking-widest text-xs">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="pt-6 border-t border-[#f9f5eb]/10 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center gap-4 px-4 py-4 rounded-2xl text-[#f9f5eb]/60 hover:text-[#c5a059] hover:bg-white/5 transition-all"
                    >
                        <Home size={20} />
                        <span className="font-bold uppercase tracking-widest text-xs">Ke Website</span>
                    </Link>
                    <button
                        onClick={() => {
                            localStorage.removeItem('admin_token');
                            navigate('/admin/login');
                        }}
                        className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-400 hover:text-red-500 hover:bg-red-500/5 transition-all"
                    >
                        <LogOut size={20} />
                        <span className="font-bold uppercase tracking-widest text-xs">Keluar</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto max-h-screen">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
