import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import Loader from './Loader'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import L from "leaflet";

import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
    iconUrl: require("../resources/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
});

const Map = ({ address }) => {
    console.log(address);
    const [coordinates, setCoordinates] = useState([44.7866, 20.4489]); // Default na Beograd
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (address) {
            axios.get('https://nominatim.openstreetmap.org/search?format=json&q=' + address)
                .then((geocodingResponse) => {
                    if (geocodingResponse.data.length > 0) {
                        const { lat, lon } = geocodingResponse.data[0];
                        setCoordinates([parseFloat(lat), parseFloat(lon)]);
                    } else {
                        console.error('No coordinates found for the given address.');
                    }
                })
                .catch((geocodingError) => {
                    console.error('Error fetching coordinates:', geocodingError);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            //setLoading(false);
        }
    }, [address]);

    return (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', height: '30vh' }}>
            {loading ? (
                <div className='d-flex flex-wrap justify-content-center align-item-center' style={{ width: "100%" }}>
                    <Loader marginT="100px"></Loader>
                </div>
            ) : (
                <MapContainer center={coordinates} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=nlOItf9wjqVOGD5qNhTo'
                        attribution='&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={coordinates} icon={markerIcon}>
                        <Popup>{address || 'Marker Content'}</Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
};

export default Map;