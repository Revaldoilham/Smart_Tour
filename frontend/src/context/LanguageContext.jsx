import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
    id: {
        nav: {
            home: 'Beranda',
            map: 'Peta Wisata',
            weather: 'Cuaca',
            essential: 'Info Penting',
            itinerary: 'Rencana',
            search_placeholder: 'Cari destinasi Jogja...',
            culture_tech: 'Kultur & Teknologi'
        },
        home: {
            hero_tag: 'KECERDASAN BUDAYA',
            hero_title: 'Selamat Datang,',
            hero_subtitle: 'Mau Kemana?',
            hero_loading: 'Menyiapkan panduan wisata...',
            weather_status: 'Langit Jogja sedang',
            weather_clear: 'Cerah',
            weather_rain: 'Hujan',
            weather_clouds: 'Berawan',
            rec_for_you: 'Rekomendasi Untukmu:',
            rec_indoor: 'Wisata Dalam Ruangan (Indoor)',
            rec_outdoor: 'Wisata Luar Ruangan (Outdoor)',
            explore_title: 'Jelajahi Warisan Budaya',
            ticket_label: 'Harga Tiket',
            free: 'Gratis',
            no_results: 'Destinasi tidak ditemukan.',
            featured_title: 'Paling Utama',
            view_location: 'Kunjungi Lokasi',
            recommendations_title: 'Pilihan Khusus',
            traffic_smooth: 'Lancar',
            vibe_title: 'Sesuai Suasana Hati:',
            vibe_calm: 'Tenang',
            vibe_fun: 'Seru',
            vibe_eat: 'Lapar'
        },
        detail: {
            back: 'Kembali',
            description_title: 'Deskripsi Destinasi',
            reviews_title: 'Ulasan Pengunjung',
            write_review: 'Tulis Ulasan Baru +',
            facilities_title: 'Fasilitas Nyaman',
            culture_tips_title: 'Adab Berwisata',
            best_time: 'Waktu Terbaik',
            opening_hours: 'Jam Operasional',
            crowd_status: 'Kepadatan',
            location: 'Lokasi',
            location_text: 'Mapan wonten Ngayogyakarta Hadiningrat',
            ticket_price: 'Harga Tiket',
            get_directions: 'Petunjuk Jalan'
        },
        weather: {
            title: 'Pantauan Cuaca',
            subtitle: 'Ngayogyakarta Hadiningrat • Real-time Monitoring',
            tag: 'Laporan Khusus',
            current_tag: 'Kondisi Saat Ini',
            feels_like: 'Terasa Seperti',
            humidity: 'Kelembaban',
            wind_speed: 'Kec. Angin',
            uv_index: 'Indeks UV',
            uv_high: 'Tinggi',
            uv_low: 'Rendah',
            tips_title: 'Tips Hari Ini',
            forecast_title: 'Prakiraan 12 Jam Ke Depan'
        },
        essential: {
            title: 'Info & Panduan',
            subtitle: 'Segala hal yang Anda butuhkan untuk kenyamanan menjelajah Jogja',
            emergency_title: 'Kontak Darurat',
            transport_title: 'Panduan Transportasi',
            phrases_title: 'Unggah-Ungguh (Bahasa)',
            service_police: 'Polisi (Polda DIY)',
            service_hospital: 'RSUP Dr. Sardjito',
            service_tourist: 'TIC (Tourist Info Center)',
            transport_trans: 'Trans Jogja',
            transport_krl: 'KRL Jogja-Solo',
            transport_station: 'Lempuyangan & Tugu',
            phrase_thank: 'Matur Nuwun (Terima Kasih)',
            phrase_sorry: 'Nyuwun Sewu (Permisi/Maaf)',
            phrase_where: 'Wonten Pundi? (Di Mana?)'
        },
        ai: {
            title: 'Abdi Dalem AI',
            subtitle: 'Asisten Virtual Warisan Budaya',
            intro: 'Sugeng rawuh! Saya Abdi Dalem AI. Ada yang bisa saya bantu tentang sejarah atau wisata Jogja hari ini?',
            placeholder: 'Tanyakan sejarah, kuliner, atau adab...',
            thinking: 'Sedang menimbang...',
            mood_title: 'Bagaimana perasaan Anda?',
            mood_calm: 'Tenang & Damai',
            mood_excited: 'Semangat & Eksploratif',
            mood_hungry: 'Lapar & Kuliner',
            mood_result: 'Rekomendasi suasana untuk Anda:'
        },
        itinerary: {
            title: 'Rencana Perjalanan',
            subtitle: 'Atur langkah Anda menjelajahi warisan budaya Yogyakarta',
            empty: 'Belum ada rencana perjalanan. Tambahkan destinasi melalui halaman detail!',
            add_button: 'Tambah ke Rencana',
            remove_button: 'Hapus',
            day_label: 'HARI KE-',
            summary: 'Ringkasan Rencana',
            total_dest: 'Total Destinasi',
            estimate_time: 'Waktu Tempuh',
            distance: 'Jarak',
            vibe_match: 'Kesesuaian Suasana',
            passport_title: 'Koleksi Perjalanan',
            stamps_label: 'Stempel Budaya'
        },
        footer: {
            tagline: '"Yogyakarta bukan hanya kota, tapi juga rasa."',
            description: 'Menyatukan tradisi leluhur dan kecanggihan teknologi untuk menuntun langkah Anda menjelajahi bumi Ngayogyakarta.',
            guide: 'Petunjuk',
            contact: 'Hubungi',
            copyright: '© 2026 Smart Tour Jogja. Seluruh Hak Dilindungi.',
            made_with: 'Dibuat dengan'
        }
    },
    jv: {
        nav: {
            home: 'Beranda',
            map: 'Peta Wisata',
            weather: 'Langit',
            essential: 'Pitedah',
            itinerary: 'Lampah',
            search_placeholder: 'Pados destinasi Jogja...',
            culture_tech: 'Kultur & Teknologi'
        },
        home: {
            hero_tag: 'KECERDASAN BUDAYA',
            hero_title: 'Sugeng Rawuh,',
            hero_subtitle: 'Wonten Pundi?',
            hero_loading: 'Mranata pitedah wisata...',
            weather_status: 'Jagad Jogja saweg',
            weather_clear: 'Padhang Bulan',
            weather_rain: 'Saweg Jawah',
            weather_clouds: 'Radi Mendhung',
            rec_for_you: 'Mirunggan kagem panjenengan:',
            rec_indoor: 'Plesiran Ing Saktidhinging Griya (Indoor)',
            rec_outdoor: 'Plesiran Ing Jabaning Kitha (Outdoor)',
            explore_title: 'Jelajahi Warisan Budaya',
            ticket_label: 'Pisungsun Tiket',
            free: 'Gratis',
            no_results: 'Boten pinanggih.',
            featured_title: 'Utami Piyambak',
            view_location: 'Dugani Lokasi',
            recommendations_title: 'Pilihan Mirunggan',
            traffic_smooth: 'Lancar',
            vibe_title: 'Ngetutke Rasa:',
            vibe_calm: 'Ayem',
            vibe_fun: 'Gumbira',
            vibe_eat: 'Ngelih'
        },
        detail: {
            back: 'Wangsul',
            description_title: 'Wadhapipun Destinasi',
            reviews_title: 'Atur Pangandikan',
            write_review: 'Atur Ulasan Enggal +',
            facilities_title: 'Fasilitas Nyaman',
            culture_tips_title: 'Unggah-ungguh',
            best_time: 'Wanci Terbaik',
            opening_hours: 'Titi Wanci',
            crowd_status: 'Mranata Tiyang',
            location: 'Mapan Wonten',
            location_text: 'Mapan wonten Ngayogyakarta Hadiningrat',
            ticket_price: 'Pisungsun Tiket',
            get_directions: 'Pituduh Margi'
        },
        weather: {
            title: 'Kawontenan Langit',
            subtitle: 'Ngayogyakarta Hadiningrat • Real-time Monitoring',
            tag: 'Laporan Mirunggan',
            current_tag: 'Haderipun Sapunika',
            feels_like: 'Kasuraos',
            humidity: 'Kelembaban',
            wind_speed: 'Kec. Angin',
            uv_index: 'Indeks UV Langit',
            uv_high: 'Inggil',
            uv_low: 'Andhap',
            tips_title: 'Pitedah Dinten Menika',
            forecast_title: 'Prakiraan 12 Jam Kedepan'
        },
        essential: {
            title: 'Info & Pitedah',
            subtitle: 'Sedaya kaperluan panjenengan kagem njelajah Jogja kanthi prayogi',
            emergency_title: 'Kontak Darurat',
            transport_title: 'Pitedah Transportasi',
            phrases_title: 'Unggah-Ungguh (Basa)',
            service_police: 'Polisi (Polda DIY)',
            service_hospital: 'RSUP Dr. Sardjito',
            service_tourist: 'TIC (Tourist Info Center)',
            transport_trans: 'Trans Jogja',
            transport_krl: 'KRL Jogja-Solo',
            transport_station: 'Lempuyangan & Tugu',
            phrase_thank: 'Matur Nuwun',
            phrase_sorry: 'Nyuwun Sewu',
            phrase_where: 'Wonten Pundi?'
        },
        ai: {
            title: 'Abdi Dalem AI',
            subtitle: 'Asisten Virtual Warisan Budaya',
            intro: 'Sugeng rawuh! Kula Abdi Dalem AI. Wonten ingkang saget kula bantu babagan sejarah utawi wisata Jogja dinten menika?',
            placeholder: 'Nyuwun pirsa sejarah, kuliner, utawi unggah-ungguh...',
            thinking: 'Saweg nimbang...',
            mood_title: 'Kados pundi penggalih panjenengan?',
            mood_calm: 'Ayem & Tentrem',
            mood_excited: 'Semangat & Eksploratif',
            mood_hungry: 'Luwe & Kuliner',
            mood_result: 'Rekomendasi swasana kagem panjenengan:'
        },
        itinerary: {
            title: 'Ngatur Lampah',
            subtitle: 'Rancang lampah budaya panjenengan piyambak kanthi pribadi',
            empty: 'Dereng wonten rencana. Klik tombol "+" wonten detail destinasi kagem nambah.',
            add_button: 'Tambahaken dhateng Rencana',
            remove_button: 'Busak',
            day_label: 'DINTEN KAPING-',
            summary: 'Ringkesan Kunjungan',
            total_dest: 'Total Destinasi',
            estimate_time: 'Estimasi Wanci',
            distance: 'Jarak Tempuh',
            vibe_match: 'Kecocokan Swasana',
            passport_title: 'Capaian Budaya',
            stamps_label: 'Pratandha Lampah'
        },
        footer: {
            tagline: '"Yogyakarta mboten namung kitha, nanging ugi rasa."',
            description: 'Nyawiji antarane tradisi leluhur lan kecanggihan teknologi kagem nuntun langkah panjenengan njelajah bumi Ngayogyakarta.',
            guide: 'Pitedah',
            contact: 'Hubungi',
            copyright: '© 2026 Smart Tour Jogja. Sedaya Hak Dipun Reksa.',
            made_with: 'Damel kanthi'
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(() => {
        try {
            return localStorage.getItem('app_lang') || 'id';
        } catch (e) {
            console.error("Failed to read from localStorage:", e);
            return 'id';
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('app_lang', lang);
        } catch (e) {
            console.error("Failed to write to localStorage:", e);
        }
    }, [lang]);

    const t = translations[lang] || translations['id'];

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
