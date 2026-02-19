import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useSettings } from '@/context/settings-context';
import { clearRussianTracks } from '@/services/russian-tracker-service';

export default function ExploreScreen() {
  const [hslExpanded, setHslExpanded] = useState(false);
  const [aircraftExpanded, setAircraftExpanded] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const {
    radiusKm,
    setRadiusKm,
    useCustomCenter,
    setUseCustomCenter,
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
    hslRadiusEnabled,
    setHslRadiusEnabled,
    hslRadiusKm,
    setHslRadiusKm,
  } = useSettings();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.section}>
        <Pressable style={styles.sectionHeader} onPress={() => setAircraftExpanded((prev) => !prev)}>
          <ThemedText style={styles.subtitle}>Aircraft Tracker</ThemedText>
          <Text style={styles.arrow}>{aircraftExpanded ? 'v' : '>'}</Text>
        </Pressable>
        {aircraftExpanded ? (
          <View style={styles.hslPanel}>
      <ThemedText style={styles.label}>Radius: {Math.round(radiusKm)} km</ThemedText>

      <View style={styles.sliderCard}>
        <Slider
          minimumValue={10}
          maximumValue={430}
          step={5}
          value={radiusKm}
          minimumTrackTintColor="#f7c948"
          maximumTrackTintColor="#2b2f36"
          thumbTintColor="#f7c948"
          onValueChange={(value) => setRadiusKm(value)}
        />
        <View style={styles.rangeRow}>
          <Text style={styles.rangeText}>10 km</Text>
          <Text style={styles.rangeText}>430 km</Text>
        </View>
      </View>

        <View style={styles.toggleRow}>
          <Text style={styles.label}>Enable map pick</Text>
          <Switch
            value={useCustomCenter}
            onValueChange={(value) => setUseCustomCenter(value)}
            trackColor={{ false: '#2b2f36', true: '#f7c948' }}
            thumbColor={useCustomCenter ? '#0f1116' : '#9aa4b2'}
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.label}>Enable tracing</Text>
          <Switch
            value={enableTracing}
            onValueChange={(value) => setEnableTracing(value)}
            trackColor={{ false: '#2b2f36', true: '#a66cff' }}
            thumbColor={enableTracing ? '#0f1116' : '#9aa4b2'}
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.label}>Enable proximity</Text>
          <Switch
            value={enableProximity}
            onValueChange={(value) => setEnableProximity(value)}
            trackColor={{ false: '#2b2f36', true: '#4fd1c5' }}
            thumbColor={enableProximity ? '#0f1116' : '#9aa4b2'}
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.label}>FIR Airspaces</Text>
          <Switch
            value={showFirAirspaces}
            onValueChange={(value) => setShowFirAirspaces(value)}
            trackColor={{ false: '#2b2f36', true: '#ff6b6b' }}
            thumbColor={showFirAirspaces ? '#0f1116' : '#9aa4b2'}
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.label}>Russian Aircraft Tracks</Text>
          <Switch
            value={showRussianAircraft}
            onValueChange={(value) => setShowRussianAircraft(value)}
            trackColor={{ false: '#2b2f36', true: '#ff4444' }}
            thumbColor={showRussianAircraft ? '#0f1116' : '#9aa4b2'}
          />
        </View>
        <Pressable
          style={[styles.clearButton, isClearing && styles.clearButtonDisabled]}
          disabled={isClearing}
          onPress={() => {
            Alert.alert(
              'Clear Russian Aircraft Data',
              'This will permanently delete all stored Russian aircraft tracks from the database. Are you sure?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Clear All Data',
                  style: 'destructive',
                  onPress: async () => {
                    setIsClearing(true);
                    const result = await clearRussianTracks();
                    setIsClearing(false);
                    if (result.success) {
                      Alert.alert(
                        'Data Cleared',
                        `Deleted ${result.deleted?.aircraft || 0} aircraft and ${result.deleted?.positions || 0} positions.`
                      );
                    } else {
                      Alert.alert('Error', 'Failed to clear data. Please try again.');
                    }
                  },
                },
              ]
            );
          }}
        >
          <Text style={styles.clearButtonText}>
            {isClearing ? 'Clearing...' : 'Clear Russian Aircraft Data'}
          </Text>
        </Pressable>
          </View>
        ) : null}
      </ThemedView>

      <ThemedView style={styles.section}>
        <Pressable style={styles.sectionHeader} onPress={() => setHslExpanded((prev) => !prev)}>
          <ThemedText style={styles.subtitle}>HSL</ThemedText>
          <Text style={styles.arrow}>{hslExpanded ? 'v' : '>'}</Text>
        </Pressable>
        {hslExpanded ? (
          <View style={styles.hslPanel}>
            <View style={styles.toggleRow}>
              <Text style={styles.label}>Enable HSL</Text>
              <Switch
                value={showHslBuses}
                onValueChange={(value) => setShowHslBuses(value)}
                trackColor={{ false: '#2b2f36', true: '#3fa9f5' }}
                thumbColor={showHslBuses ? '#0f1116' : '#9aa4b2'}
              />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.label}>Limit by radius</Text>
              <Switch
                value={hslRadiusEnabled}
                onValueChange={(value) => setHslRadiusEnabled(value)}
                trackColor={{ false: '#2b2f36', true: '#3fa9f5' }}
                thumbColor={hslRadiusEnabled ? '#0f1116' : '#9aa4b2'}
              />
            </View>
            {hslRadiusEnabled ? (
              <>
                <ThemedText style={styles.label}>HSL radius: {hslRadiusKm.toFixed(1)} km</ThemedText>
                <View style={styles.sliderCard}>
                  <Slider
                    minimumValue={0}
                    maximumValue={3}
                    step={0.2}
                    value={hslRadiusKm}
                    minimumTrackTintColor="#3fa9f5"
                    maximumTrackTintColor="#2b2f36"
                    thumbTintColor="#3fa9f5"
                    onValueChange={(value) => setHslRadiusKm(value)}
                  />
                  <View style={styles.rangeRow}>
                    <Text style={styles.rangeText}>0 km</Text>
                    <Text style={styles.rangeText}>3 km</Text>
                  </View>
                </View>
              </>
            ) : null}
            <View style={styles.toggleRow}>
              <Text style={styles.label}>Bus</Text>
              <Switch
                value={showHslBus}
                onValueChange={(value) => setShowHslBus(value)}
                trackColor={{ false: '#2b2f36', true: '#3fa9f5' }}
                thumbColor={showHslBus ? '#0f1116' : '#9aa4b2'}
              />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.label}>Tram</Text>
              <Switch
                value={showHslTram}
                onValueChange={(value) => setShowHslTram(value)}
                trackColor={{ false: '#2b2f36', true: '#2ecc71' }}
                thumbColor={showHslTram ? '#0f1116' : '#9aa4b2'}
              />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.label}>Metro</Text>
              <Switch
                value={showHslMetro}
                onValueChange={(value) => setShowHslMetro(value)}
                trackColor={{ false: '#2b2f36', true: '#ff6b6b' }}
                thumbColor={showHslMetro ? '#0f1116' : '#9aa4b2'}
              />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.label}>Rail</Text>
              <Switch
                value={showHslRail}
                onValueChange={(value) => setShowHslRail(value)}
                trackColor={{ false: '#2b2f36', true: '#a66cff' }}
                thumbColor={showHslRail ? '#0f1116' : '#9aa4b2'}
              />
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.label}>Ferry</Text>
              <Switch
                value={showHslFerry}
                onValueChange={(value) => setShowHslFerry(value)}
                trackColor={{ false: '#2b2f36', true: '#00b3b3' }}
                thumbColor={showHslFerry ? '#0f1116' : '#9aa4b2'}
              />
            </View>
            <ThemedText style={styles.hint}>
              Live vehicles are displayed only in the Helsinki area.
            </ThemedText>
          </View>
        ) : null}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 38,
    gap: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    color: '#9aa4b2',
    marginBottom: 4,
  },
  sliderCard: {
    paddingVertical: 4,
  },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  rangeText: {
    color: '#7f8a99',
    fontSize: 11,
  },
  hint: {
    color: '#7f8a99',
    fontSize: 11,
    marginTop: 4,
  },
  section: {
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrow: {
    color: '#9aa4b2',
    fontSize: 14,
    marginLeft: 8,
  },
  hslPanel: {
    marginTop: 2,
    gap: 2,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  clearButton: {
    marginTop: 8,
    backgroundColor: '#ff4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  clearButtonDisabled: {
    backgroundColor: '#663333',
    opacity: 0.7,
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
