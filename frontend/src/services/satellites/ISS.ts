import { API_URL } from '../constants';

export class ISSSatelliteService {
  async getNowPosition() {
    const result = await fetch(`${API_URL}/satellite/iss/now`);

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const data = await result.json();

    return {
      timestamp: data.timestamp,
      latitude: parseFloat(data.iss_position.latitude),
      longitude: parseFloat(data.iss_position.longitude),
    };
  }
}
