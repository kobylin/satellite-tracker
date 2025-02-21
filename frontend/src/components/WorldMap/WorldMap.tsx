import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const WorldMap = () => {
  const mapRoot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRoot.current) {
      return;
    }

    const map = L.map(mapRoot.current).setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        border: '1px solid black',
      }}
      ref={mapRoot}
    ></div>
  );
};
