import { useState } from 'react';
import { Position } from '../../types';

export const SatelliteInfoBox = ({
  onRefresh,
  lastPosition,
}: {
  onRefresh: () => Promise<Position>;
  lastPosition: Position | null;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        padding: '20px',
        background: 'white',
        borderRadius: '10px',
        zIndex: 1100,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          fontSize: '1.2em',
        }}
      >
        ISS
      </div>
      <br />
      <div>Latittude: {lastPosition?.lat}</div>
      <div>Longitude: {lastPosition?.lng}</div>
      <div>Height: 370-460 km</div>
      <div>Velocity: 27500 km/h</div>
      <div>Period: 90 min</div>
      <br />
      <button
        onClick={() => {
          setIsLoading(true);
          onRefresh().finally(() => setIsLoading(false));
        }}
      >
        Refresh {isLoading ? '(Loading...)' : ''}
      </button>
    </div>
  );
};
