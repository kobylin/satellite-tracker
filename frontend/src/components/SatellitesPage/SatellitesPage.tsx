import { useEffect } from 'react';
import { SatelliteInfoBox } from '../SatelliteInfoBox/SatelliteInfoBox';
import { WorldMap } from '../WorldMap/WorldMap';
import { useSatelliteData } from '../../providers/SatelliteDataProvider';

export const SatellitesPage = () => {
  const { fetchLatestISSPosition, ISSPositionsHistory } = useSatelliteData();

  useEffect(() => {
    fetchLatestISSPosition();

    const intervalId = setInterval(() => {
      fetchLatestISSPosition();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const lastPosition = ISSPositionsHistory.length
    ? ISSPositionsHistory[ISSPositionsHistory.length - 1]
    : null;

  return (
    <div>
      <SatelliteInfoBox
        onRefresh={fetchLatestISSPosition}
        lastPosition={lastPosition}
      />
      <WorldMap />
    </div>
  );
};
