import { useEffect } from 'react';
import { SatelliteInfoBox } from '../SatelliteInfoBox/SatelliteInfoBox';
import { WorldMap } from '../WorldMap/WorldMap';
import { useSatelliteData } from '../../providers/SatelliteDataProvider';

export const SatellitesPage = () => {
  const { fetchLatestISSPosition, ISSPositionsHistory } = useSatelliteData();

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchLatestISSPosition();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  console.log(ISSPositionsHistory);

  return (
    <div>
      <SatelliteInfoBox />
      <WorldMap />
    </div>
  );
};
