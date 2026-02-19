/**
 * Service to fetch Russian aircraft tracks from the backend
 */

// Backend URL - set this to your Railway deployment URL or local dev server
const BACKEND_URL = process.env.EXPO_PUBLIC_TRACKER_BACKEND_URL || 'http://localhost:3000';

export interface Position {
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  velocity: number | null;
  heading: number | null;
  timestamp: string;
}

export interface AircraftTrack {
  icao24: string;
  callsign: string | null;
  aircraft_type: string | null;
  positions: Position[];
  is_military: boolean;
}

export interface TracksResponse {
  timestamp: string;
  count: number;
  tracks: AircraftTrack[];
}

/**
 * Fetch all Russian aircraft tracks from the last 24 hours
 * Optionally filter by center point and radius
 */
export async function fetchRussianTracks(
  centerLat?: number,
  centerLon?: number,
  radiusKm?: number
): Promise<AircraftTrack[]> {
  try {
    let url = `${BACKEND_URL}/api/aircraft/tracks`;
    
    // Add query params if center and radius are provided
    if (centerLat !== undefined && centerLon !== undefined && radiusKm !== undefined) {
      url += `?lat=${centerLat}&lon=${centerLon}&radius=${radiusKm}`;
    }
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch Russian tracks: ${response.status}`);
      return [];
    }

    const data: TracksResponse = await response.json();
    console.log(`📡 Fetched ${data.count} Russian aircraft tracks${radiusKm ? ` within ${radiusKm}km radius` : ''}`);
    return data.tracks;
  } catch (error) {
    console.error('Error fetching Russian tracks:', error);
    return [];
  }
}

/**
 * Clear all Russian aircraft data from the database
 */
export async function clearRussianTracks(): Promise<{ success: boolean; deleted?: { aircraft: number; positions: number } }> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/aircraft/russian`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Failed to clear Russian tracks: ${response.status}`);
      return { success: false };
    }

    const data = await response.json();
    console.log(`🗑️ Cleared ${data.deleted?.aircraft || 0} aircraft and ${data.deleted?.positions || 0} positions`);
    return data;
  } catch (error) {
    console.error('Error clearing Russian tracks:', error);
    return { success: false };
  }
}

/**
 * Check if the backend is available
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_URL}/health`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}
