import { useEffect, useRef, useState } from 'react';
import L, { Map, Marker, Polyline } from 'leaflet';
import terminator from '@joergdietrich/leaflet.terminator';
import 'leaflet/dist/leaflet.css';
import { useSatelliteData } from '../../providers/SatelliteDataProvider';

import iconImage from '../../../public/satellite.png';

const satelliteIcon = L.icon({
  iconUrl: iconImage, // or use imported SVG
  iconSize: [32, 32], // size of the icon in pixels
  iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -16], // point from which popups should open relative to iconAnchor
});

export const WorldMap = ({ showDayNight }: { showDayNight?: boolean }) => {
  const mapRoot = useRef<HTMLDivElement>(null);
  const issPathRef = useRef<Polyline>(null);
  const issSatelliteMarker = useRef<Marker>(null);

  const [map, setMap] = useState<Map | null>(null);

  const { ISSPositionsHistory } = useSatelliteData();

  useEffect(() => {
    if (!mapRoot.current) {
      return;
    }

    const map = L.map(mapRoot.current).setView([0, 0], 2);
    if (showDayNight) {
      terminator().addTo(map);
    }
    setMap(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [showDayNight]);

  useEffect(() => {
    if (!map || ISSPositionsHistory.length === 0) {
      return;
    }

    // Create array of coordinates for the polyline
    const coordinates: [number, number][] = ISSPositionsHistory.map(pos => [
      pos.lat,
      pos.lng,
    ]);

    if (issPathRef.current) {
      issPathRef.current.remove();
    }

    // Draw the polyline connecting all points
    issPathRef.current = L.polyline(coordinates, {
      color: 'red',
      weight: 2,
      opacity: 0.7,
    });

    issPathRef.current.addTo(map);

    if (issSatelliteMarker.current) {
      issSatelliteMarker.current.remove();
    }

    const lastPosition = ISSPositionsHistory[ISSPositionsHistory.length - 1];
    issSatelliteMarker.current = L.marker(
      {
        lat: lastPosition.lat,
        lng: lastPosition.lng,
      },
      {
        icon: satelliteIcon,
      }
    );
    issSatelliteMarker.current.addTo(map);
  }, [ISSPositionsHistory, map]);

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
