export const SatelliteInfoBox = ({ onRefresh }: { onRefresh: () => void }) => {
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
      <div>Satelite info</div>
      <button onClick={onRefresh}>Refresh</button>
    </div>
  );
};
