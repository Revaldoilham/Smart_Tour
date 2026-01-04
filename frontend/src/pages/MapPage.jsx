import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, Info, ArrowLeft } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../services/api';
import { useLanguage } from '../context/LanguageContext';

// Fix Leaflet marker icon issue
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Custom Jogja Gold Icon
const jogjaIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapPage = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await api.get('/destinations');
                setDestinations(response.data.data);
            } catch (error) {
                console.error("Error fetching destinations for map:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#f9f5eb] pt-20">
            <div className="w-16 h-16 border-4 border-[#c5a059] border-t-transparent rounded-full animate-spin mb-4 shadow-xl"></div>
            <p className="font-jogja text-xl text-[#4a332d]">{t.home.hero_loading}</p>
        </div>
    );

    return (
        <div className="h-[calc(100vh-80px)] w-full relative mt-20 rounded-[40px] overflow-hidden border-4 border-[#c5a059]/20 shadow-2xl">
            {/* Overlay UI */}
            <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-4">
                <Link to="/" className="bg-[#f9f5eb] text-[#4a332d] px-5 py-3 rounded-2xl shadow-2xl border border-[#c5a059]/30 flex items-center gap-2 font-black uppercase text-xs hover:bg-[#c5a059] transition-all group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition" /> {t.detail.back}
                </Link>
                <div className="bg-[#4a332d] text-[#c5a059] px-6 py-4 rounded-[30px] shadow-2xl border border-[#c5a059]/40 backdrop-blur-md">
                    <h1 className="font-jogja text-2xl font-bold flex items-center gap-3">
                        <MapPin size={24} /> {t.nav.map}
                    </h1>
                </div>
            </div>

            <MapContainer 
                center={[-7.7956, 110.3695]} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                
                <ZoomControl position="bottomright" />

                {destinations.map((dest) => (
                    <Marker 
                        key={dest.id} 
                        position={[parseFloat(dest.latitude), parseFloat(dest.longitude)]}
                        icon={jogjaIcon}
                    >
                        <Popup className="jogja-popup">
                            <div className="p-2 min-w-[200px] font-sans">
                                <h3 className="font-jogja font-bold text-[#4a332d] text-lg mb-1">{dest.name}</h3>
                                <p className="text-[10px] text-[#c5a059] font-black uppercase mb-3 flex items-center gap-1">
                                    <MapPin size={10} /> {dest.category}
                                </p>
                                <div className="flex gap-2 mt-4 pt-4 border-t border-[#c5a059]/10">
                                    <Link 
                                        to={`/destination/${dest.id}`} 
                                        className="flex-1 text-[10px] bg-[#4a332d] text-[#c5a059] px-3 py-2 rounded-xl text-center font-black uppercase"
                                    >
                                        Detail
                                    </Link>
                                    <a 
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${dest.latitude},${dest.longitude}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-[10px] bg-[#c5a059] text-[#4a332d] px-3 py-2 rounded-xl text-center font-black uppercase"
                                    >
                                        {t.detail.get_directions}
                                    </a>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <style dangerouslySetInnerHTML={{ __html: `
                .leaflet-popup-content-wrapper {
                    background: #f9f5eb;
                    border-radius: 24px;
                    border: 2px solid rgba(197, 160, 89, 0.3);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                }
                .leaflet-popup-tip { background: #f9f5eb; }
                .leaflet-container { font-family: 'Plus Jakarta Sans', sans-serif; }
            `}} />
        </div>
    );
};

export default MapPage;
