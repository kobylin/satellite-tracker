import './App.css';
import { WorldMap } from './components/WorldMap/WorldMap';
import { SatelliteInfoBox } from './components/SatelliteInfoBox/SatelliteInfoBox';

function App() {
  return (
    <div>
      <SatelliteInfoBox />
      <WorldMap />
    </div>
  );
}

export default App;
