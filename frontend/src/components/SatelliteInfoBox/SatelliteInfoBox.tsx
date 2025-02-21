import { useState } from 'react';
import dayjs from 'dayjs';

import { Position } from '../../types/types';

const SATELLITE_STATIC_INFO = {
  height: '370-460 km',
  velocity: '27500 km/h',
  period: '90 min',
} as const;

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) => (
  <div>
    {label}: {value}
  </div>
);

export const SatelliteInfoBox = ({
  onRefresh,
  lastPosition,
}: {
  onRefresh: () => Promise<Position>;
  lastPosition: Position | null;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const formattedTimestamp = lastPosition?.timestamp
    ? dayjs(lastPosition.timestamp * 1000).format('L LT')
    : '-';

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
      <InfoRow label="Updated at" value={formattedTimestamp} />
      <InfoRow label="Latittude" value={lastPosition?.lat ?? '-'} />
      <InfoRow label="Longitude" value={lastPosition?.lng ?? '-'} />
      <InfoRow label="Height" value={SATELLITE_STATIC_INFO.height} />
      <InfoRow label="Velocity" value={SATELLITE_STATIC_INFO.velocity} />
      <InfoRow label="Period" value={SATELLITE_STATIC_INFO.period} />
      <br />
      <button
        onClick={() => {
          setIsLoading(true);
          onRefresh().finally(() => setIsLoading(false));
        }}
        disabled={isLoading}
      >
        Refresh {isLoading ? '(Loading...)' : ''}
      </button>
    </div>
  );
};
