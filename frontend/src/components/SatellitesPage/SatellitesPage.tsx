import { useEffect } from 'react';
import { SatelliteInfoBox } from '../SatelliteInfoBox/SatelliteInfoBox';
import { WorldMap } from '../WorldMap/WorldMap';
import { useSatelliteData } from '../../providers/SatelliteDataProvider';

const POLLING_INTERVAL_MS = 10000;

export const SatellitesPage = () => {
  const { fetchLatestISSPosition, ISSPositionsHistory } = useSatelliteData();

  useEffect(() => {
    const pollISSPosition = () => {
      fetchLatestISSPosition();
    };

    // Initial fetch
    pollISSPosition();

    const intervalId = setInterval(pollISSPosition, POLLING_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, []);

  const lastPosition = ISSPositionsHistory.length
    ? ISSPositionsHistory[ISSPositionsHistory.length - 1]
    : null;

  return (
    <div className="satellites-page">
      <SatelliteInfoBox
        onRefresh={fetchLatestISSPosition}
        lastPosition={lastPosition}
      />
      <WorldMap showDayNight />
    </div>
  );
};
