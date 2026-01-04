import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Instagram, Twitter, Facebook, Mail, Phone, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-[#4a332d] text-[#f9f5eb] pt-20 pb-10 relative overflow-hidden batik-overlay mt-20 border-t-4 border-[#c5a059]/30">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#c5a059] p-2 rounded-xl text-[#4a332d]">
                                <MapPin size={24} />
                            </div>
                            <span className="text-3xl font-black font-jogja tracking-tight uppercase">SMART TOUR JOGJA</span>
                        </div>
                        <div className="space-y-4">
                            <p className="text-[#c5a059] text-xl font-bold font-jogja tracking-wide italic">
                                {t.footer.tagline}
                            </p>
                            <p className="text-[#f9f5eb]/70 max-w-md leading-relaxed font-bold italic">
                                {t.footer.description}
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <a href="#" className="p-3 bg-[#f9f5eb]/10 rounded-2xl hover:bg-[#c5a059] hover:text-[#4a332d] transition-all"><Instagram size={20} /></a>
                            <a href="#" className="p-3 bg-[#f9f5eb]/10 rounded-2xl hover:bg-[#c5a059] hover:text-[#4a332d] transition-all"><Twitter size={20} /></a>
                            <a href="#" className="p-3 bg-[#f9f5eb]/10 rounded-2xl hover:bg-[#c5a059] hover:text-[#4a332d] transition-all"><Facebook size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold font-jogja text-[#c5a059]">{t.footer.guide}</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><Link to="/" className="hover:text-[#c5a059] transition flex items-center gap-2">{t.nav.home}</Link></li>
                            <li><Link to="/map" className="hover:text-[#c5a059] transition flex items-center gap-2">{t.nav.map}</Link></li>
                            <li><Link to="/itinerary" className="hover:text-[#c5a059] transition flex items-center gap-2">{t.nav.itinerary}</Link></li>
                            <li><Link to="/essential" className="hover:text-[#c5a059] transition flex items-center gap-2">{t.nav.essential}</Link></li>
                            <li><Link to="/ai-assistant" className="hover:text-[#c5a059] transition flex items-center gap-2">AI Dalem</Link></li>
                            <li><Link to="/weather" className="hover:text-[#c5a059] transition flex items-center gap-2">{t.nav.weather}</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-xl font-bold font-jogja text-[#c5a059]">{t.footer.contact}</h4>
                        <ul className="space-y-4 text-sm font-medium opacity-80">
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-[#c5a059]" /> support@smarttourjogja.com
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-[#c5a059]" /> +62 274 123 456
                            </li>
                            <li className="flex items-center gap-2 leading-tight">
                                <MapPin size={18} className="text-[#c5a059] flex-shrink-0" /> Jl. Malioboro No. 1, <br/> Ngayogyakarta
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-[#f9f5eb]/10 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold opacity-60">
                    <p>{t.footer.copyright}</p>
                    <p className="flex items-center gap-1">
                        {t.footer.made_with} <Heart size={14} className="text-red-500 fill-red-500" /> kagem Ngayogyakarta
                    </p>
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .underlineDecoration { text-decoration: underline wavy #c5a059; text-underline-offset: 4px; }
            `}} />
        </footer>
    );
};

export default Footer;
