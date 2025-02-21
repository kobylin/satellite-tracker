import './App.css';
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
