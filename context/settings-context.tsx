import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const SETTINGS_STORAGE_KEY = 'airtracker.settings.v1';

export type SettingsContextValue = {
  enableAircraftTracker: boolean;
  setEnableAircraftTracker: (value: boolean) => void;
  radiusKm: number;
  setRadiusKm: (value: number) => void;
  useCustomCenter: boolean;
  setUseCustomCenter: (value: boolean) => void;
  customCenter: { latitude: number; longitude: number } | null;
  setCustomCenter: (value: { latitude: number; longitude: number } | null) => void;
  showHslBuses: boolean;
  setShowHslBuses: (value: boolean) => void;
  showHslBus: boolean;
  setShowHslBus: (value: boolean) => void;
  showHslTram: boolean;
  setShowHslTram: (value: boolean) => void;
  showHslMetro: boolean;
  setShowHslMetro: (value: boolean) => void;
  showHslRail: boolean;
  setShowHslRail: (value: boolean) => void;
  showHslFerry: boolean;
  setShowHslFerry: (value: boolean) => void;
  enableTracing: boolean;
  setEnableTracing: (value: boolean) => void;
  enableProximity: boolean;
  setEnableProximity: (value: boolean) => void;
  showFirAirspaces: boolean;
  setShowFirAirspaces: (value: boolean) => void;
  showRussianAircraft: boolean;
  setShowRussianAircraft: (value: boolean) => void;
  showMilitaryAirspace: boolean;
  setShowMilitaryAirspace: (value: boolean) => void;
  showMilitaryRussianZones: boolean;
  setShowMilitaryRussianZones: (value: boolean) => void;
  hslRadiusEnabled: boolean;
  setHslRadiusEnabled: (value: boolean) => void;
  hslRadiusKm: number;
  setHslRadiusKm: (value: number) => void;
  hslLineFilter: string;
  setHslLineFilter: (value: string) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [enableAircraftTracker, setEnableAircraftTracker] = useState(true);
  const [radiusKm, setRadiusKm] = useState(200);
  const [useCustomCenter, setUseCustomCenter] = useState(false);
  const [customCenter, setCustomCenter] = useState<{ latitude: number; longitude: number } | null>(
    null
  );
  const [showHslBuses, setShowHslBuses] = useState(true);
  const [showHslBus, setShowHslBus] = useState(true);
  const [showHslTram, setShowHslTram] = useState(true);
  const [showHslMetro, setShowHslMetro] = useState(true);
  const [showHslRail, setShowHslRail] = useState(true);
  const [showHslFerry, setShowHslFerry] = useState(true);
  const [enableTracing, setEnableTracing] = useState(false);
  const [enableProximity, setEnableProximity] = useState(false);
  const [showFirAirspaces, setShowFirAirspaces] = useState(false);
  const [showRussianAircraft, setShowRussianAircraft] = useState(false);
  const [showMilitaryAirspace, setShowMilitaryAirspace] = useState(false);
  const [showMilitaryRussianZones, setShowMilitaryRussianZones] = useState(false);
  const [hslRadiusEnabled, setHslRadiusEnabled] = useState(true);
  const [hslRadiusKm, setHslRadiusKm] = useState(0.6);
  const [hslLineFilter, setHslLineFilter] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadSettings = async () => {
      try {
        const raw = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw) as Partial<SettingsContextValue> & {
          customCenter?: { latitude?: unknown; longitude?: unknown } | null;
        };
        if (typeof parsed.radiusKm === 'number') setRadiusKm(parsed.radiusKm);
        if (typeof parsed.enableAircraftTracker === 'boolean')
          setEnableAircraftTracker(parsed.enableAircraftTracker);
        if (typeof parsed.useCustomCenter === 'boolean') setUseCustomCenter(parsed.useCustomCenter);
        if (
          parsed.customCenter &&
          typeof parsed.customCenter.latitude === 'number' &&
          typeof parsed.customCenter.longitude === 'number'
        ) {
          setCustomCenter({
            latitude: parsed.customCenter.latitude,
            longitude: parsed.customCenter.longitude,
          });
        }
        if (parsed.customCenter === null) setCustomCenter(null);
        if (typeof parsed.showHslBuses === 'boolean') setShowHslBuses(parsed.showHslBuses);
        if (typeof parsed.showHslBus === 'boolean') setShowHslBus(parsed.showHslBus);
        if (typeof parsed.showHslTram === 'boolean') setShowHslTram(parsed.showHslTram);
        if (typeof parsed.showHslMetro === 'boolean') setShowHslMetro(parsed.showHslMetro);
        if (typeof parsed.showHslRail === 'boolean') setShowHslRail(parsed.showHslRail);
        if (typeof parsed.showHslFerry === 'boolean') setShowHslFerry(parsed.showHslFerry);
        if (typeof parsed.enableTracing === 'boolean') setEnableTracing(parsed.enableTracing);
        if (typeof parsed.enableProximity === 'boolean') setEnableProximity(parsed.enableProximity);
        if (typeof parsed.showFirAirspaces === 'boolean') setShowFirAirspaces(parsed.showFirAirspaces);
        if (typeof parsed.showRussianAircraft === 'boolean') setShowRussianAircraft(parsed.showRussianAircraft);
        if (typeof parsed.showMilitaryAirspace === 'boolean') setShowMilitaryAirspace(parsed.showMilitaryAirspace);
        if (typeof parsed.hslRadiusEnabled === 'boolean')
          setHslRadiusEnabled(parsed.hslRadiusEnabled);
        if (typeof parsed.hslRadiusKm === 'number') setHslRadiusKm(parsed.hslRadiusKm);
        if (typeof parsed.hslLineFilter === 'string') setHslLineFilter(parsed.hslLineFilter);
      } catch (err) {
        // ignore storage parse errors and keep defaults
      } finally {
        if (isMounted) setHydrated(true);
      }
    };
    void loadSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload = {
      enableAircraftTracker,
      radiusKm,
      useCustomCenter,
      customCenter,
      showHslBuses,
      showHslBus,
      showHslTram,
      showHslMetro,
      showHslRail,
      showHslFerry,
      enableTracing,
      enableProximity,
      showFirAirspaces,
      showRussianAircraft,
      showMilitaryAirspace,
      hslRadiusEnabled,
      hslRadiusKm,
      hslLineFilter,
    };
    void AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(payload));
  }, [
    enableAircraftTracker,
    radiusKm,
    useCustomCenter,
    customCenter,
    showHslBuses,
    showHslBus,
    showHslTram,
    showHslMetro,
    showHslRail,
    showHslFerry,
    enableTracing,
    enableProximity,
    showFirAirspaces,
    showRussianAircraft,
    showMilitaryAirspace,
    hslRadiusEnabled,
    hslRadiusKm,
    hslLineFilter,
    hydrated,
  ]);
  const value = useMemo(
    () => ({
      enableAircraftTracker,
      setEnableAircraftTracker,
      radiusKm,
      setRadiusKm,
      useCustomCenter,
      setUseCustomCenter,
      customCenter,
      setCustomCenter,
      showHslBuses,
      setShowHslBuses,
      showHslBus,
      setShowHslBus,
      showHslTram,
      setShowHslTram,
      showHslMetro,
      setShowHslMetro,
      showHslRail,
      setShowHslRail,
      showHslFerry,
      setShowHslFerry,
      enableTracing,
      setEnableTracing,
      enableProximity,
      setEnableProximity,
      showFirAirspaces,
      setShowFirAirspaces,
      showRussianAircraft,
      setShowRussianAircraft,
      showMilitaryAirspace,
      setShowMilitaryAirspace,
      showMilitaryRussianZones,
      setShowMilitaryRussianZones,
      hslRadiusEnabled,
      setHslRadiusEnabled,
      hslRadiusKm,
      setHslRadiusKm,
      hslLineFilter,
      setHslLineFilter,
    }),
    [
      enableAircraftTracker,
      radiusKm,
      useCustomCenter,
      customCenter,
      showHslBuses,
      showHslBus,
      showHslTram,
      showHslMetro,
      showHslRail,
      showHslFerry,
      enableTracing,
      enableProximity,
      showFirAirspaces,
      showRussianAircraft,
      showMilitaryAirspace,
      showMilitaryRussianZones,
      hslRadiusEnabled,
      hslRadiusKm,
      hslLineFilter,
    ]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return ctx;
}
