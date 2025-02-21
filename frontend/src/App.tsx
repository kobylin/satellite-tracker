import './App.css';
import { WorldMap } from './components/WorldMap/WorldMap';
import { SatelliteInfoBox } from './components/SatelliteInfoBox/SatelliteInfoBox';
import { SatelliteDataProvider } from './providers/SatelliteDataProvider';
import { SatellitesPage } from './components/SatellitesPage/SatellitesPage';

function App() {
  return (
    <div>
      <SatelliteDataProvider>
        <SatellitesPage />
      </SatelliteDataProvider>
    </div>
  );
}

export default App;
