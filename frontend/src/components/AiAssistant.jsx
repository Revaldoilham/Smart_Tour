import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Coffee, Heart, Compass, MapPin, Headphones, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [selectedMood, setSelectedMood] = useState(null);
    const { t, lang } = useLanguage();
    const chatEndRef = useRef(null);
    const audioRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play().catch(e => console.log("Audio play blocked", e));
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                id: 1,
                text: t.ai.intro,
                sender: 'ai',
                timestamp: new Date()
            }]);
        }
    }, [isOpen]);

    useEffect(scrollToBottom, [messages, isThinking]);

    const handleSend = async (text) => {
        const messageText = text || inputValue;
        if (!messageText.trim()) return;

        const userMsg = {
            id: Date.now(),
            text: messageText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsThinking(true);

        // Simulation AI Logic
        setTimeout(() => {
            const aiResponse = generateAiResponse(messageText);
            const aiMsg = {
                id: Date.now() + 1,
                text: aiResponse,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
            setIsThinking(false);
        }, 1500);
    };

    const generateAiResponse = (input) => {
        const text = input.toLowerCase();
        const isJv = lang === 'jv';

        if (text.includes('gudeg') || text.includes('makan') || text.includes('kuliner')) {
            return isJv 
                ? "Gudeg Yu Djum punika legendaris sanget. Menawi kersa kulineran ingkang radi 'modern', saget tindak dhateng daerah Prawirotaman."
                : "Untuk kuliner, Anda wajib mencoba Gudeg Yu Djum. Jika ingin suasana yang lebih santai, area Prawirotaman memiliki banyak kafe unik.";
        }
        if (text.includes('batik') || text.includes('oleh-oleh')) {
            return isJv
                ? "Batik ingkang sae wonten ing Kampung Batik Ngasem utawi Pasar Hamzah (Mirota Batik)."
                : "Pilihan batik terbaik ada di Kampung Batik Ngasem atau Hamzah Batik (Mirota Batik) di Malioboro.";
        }
        if (text.includes('borobudur') || text.includes('candi')) {
            return isJv
                ? "Candi Borobudur saenipun dipun dugani nalika enjang sanget (sunrise). Sampun kesupen pesen tiket online rumiyin."
                : "Candi Borobudur sangat bagus dikunjungi saat matahari terbit. Pastikan memesan tiket secara daring terlebih dahulu.";
        }
        return isJv
            ? "Pangapunten, kula taksih sinau babagan punika. Nanging kagem sejarah Jogja, panjenengan saget tindak dhateng Keraton Yogyakarta."
            : "Maaf, saya masih mempelajari hal tersebut. Namun untuk pengalaman sejarah terbaik, Anda bisa mengunjungi Keraton Yogyakarta.";
    };

    const moods = [
        { id: 'calm', icon: <Heart size={16} />, label: t.ai.mood_calm, color: 'bg-blue-500' },
        { id: 'excited', icon: <Compass size={16} />, label: t.ai.mood_excited, color: 'bg-[#c5a059]' },
        { id: 'hungry', icon: <Coffee size={16} />, label: t.ai.mood_hungry, color: 'bg-orange-500' },
    ];

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
        const text = `${t.ai.mood_title}: ${mood.label}`;
        handleSend(text);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[9999]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[550px] bg-white rounded-[40px] shadow-2xl flex flex-col overflow-hidden border-2 border-[#c5a059]/20"
                    >
                        {/* Header */}
                        <div className="bg-[#4a332d] p-6 text-[#f9f5eb] relative">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-[#c5a059] rounded-2xl shadow-lg relative cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
                                    <Sparkles size={20} className={`text-[#4a332d] ${isPlaying ? 'animate-spin' : ''}`} />
                                    {isPlaying && (
                                        <div className="absolute -bottom-1 -right-1 flex gap-0.5 items-end h-4">
                                            <div className="w-1 bg-[#4a332d] rounded-full soundwave-bar h-2"></div>
                                            <div className="w-1 bg-[#4a332d] rounded-full soundwave-bar h-4"></div>
                                            <div className="w-1 bg-[#4a332d] rounded-full soundwave-bar h-3"></div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-jogja text-xl font-bold leading-none">{t.ai.title}</h3>
                                        {isPlaying && <Music size={12} className="text-[#c5a059] animate-pulse" />}
                                    </div>
                                    <p className="text-[10px] text-[#c5a059] font-black uppercase tracking-widest opacity-80">
                                        {isPlaying ? 'Playing: Gamelan Kebo Giro' : t.ai.subtitle}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 absolute top-6 right-6">
                                <button 
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className={`p-2 rounded-xl transition-all duration-500 ${isPlaying ? 'bg-[#c5a059] text-[#4a332d] shadow-[0_0_15px_rgba(197,160,89,0.5)] animate-pulse' : 'bg-white/10 text-white hover:bg-white/20'}`}
                                >
                                    <Headphones size={20} />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide batik-overlay">
                            {messages.map((m) => (
                                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-4 rounded-3xl text-sm font-medium shadow-sm ${
                                        m.sender === 'user' 
                                            ? 'bg-[#4a332d] text-[#f9f5eb] rounded-tr-none' 
                                            : 'bg-[#f9f5eb] text-[#4a332d] border border-[#c5a059]/30 rounded-tl-none italic'
                                    }`}>
                                        {m.sender === 'ai' && <Sparkles size={12} className="text-[#c5a059] mb-2" />}
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            {isThinking && (
                                <div className="flex justify-start">
                                    <div className="bg-[#f9f5eb] p-4 rounded-3xl rounded-tl-none border border-[#c5a059]/30 italic text-xs text-[#4a332d]/60 flex items-center gap-2">
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                                            <Sparkles size={14} />
                                        </motion.div>
                                        {t.ai.thinking}
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        {/* Mood Picker (Only show at start or when requested) */}
                        {messages.length < 3 && !isThinking && (
                            <div className="px-6 pb-4">
                                <p className="text-[10px] font-black uppercase text-[#c5a059] mb-3 tracking-widest text-center">{t.ai.mood_title}</p>
                                <div className="flex gap-2 justify-center">
                                    {moods.map(m => (
                                        <button 
                                            key={m.id} 
                                            onClick={() => handleMoodSelect(m)}
                                            className="flex items-center gap-2 px-3 py-2 bg-[#f9f5eb] border border-[#c5a059]/20 rounded-xl text-[10px] font-black text-[#4a332d] hover:bg-[#c5a059]/10 transition"
                                        >
                                            <span className={`p-1 ${m.color} text-white rounded-md`}>{m.icon}</span>
                                            {m.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Footer / Input */}
                        <div className="p-6 pt-0">
                            <div className="relative flex items-center">
                                <input 
                                    type="text" 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder={t.ai.placeholder}
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-[#c5a059]/50 transition shadow-inner pr-12 text-[#4a332d]"
                                />
                                <button 
                                    onClick={() => handleSend()}
                                    className="absolute right-3 p-2 bg-[#4a332d] text-[#c5a059] rounded-xl hover:bg-[#5d4037] transition"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Float Button */}
            <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-20 h-20 rounded-full shadow-2xl flex items-center justify-center relative border-4 border-[#c5a059]/30 transition-all ${isOpen ? 'bg-white text-[#4a332d]' : 'bg-[#4a332d] text-[#c5a059]'}`}
            >
                {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
                {!isOpen && (
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-[#c5a059] rounded-full flex items-center justify-center shadow-lg border-2 border-[#4a332d]"
                    >
                        <Sparkles size={12} className="text-[#4a332d]" />
                    </motion.div>
                )}
            </motion.button>
            
            {/* Hidden Audio Element */}
            <audio 
                ref={audioRef} 
                loop 
                src="https://archive.org/download/indonesia-1969-the-jasmine-isle-javanese-gamelan-music-nonesuch-new-blp-cr-02/Indonesia%20%281969%29%20-%20The%20Jasmine%20Isle%2C%20Javanese%20Gamelan%20Music%20Nonesuch%20NEW%20%28BLP%29-cr-09.mp3" 
            />
        </div>
    );
};

export default AiAssistant;
