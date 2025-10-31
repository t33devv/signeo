import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ensureSeed, getSet, initDb } from '../data/flashcards.repo.sqlite';
import { getLastIndex, initProgress, setLastIndex } from '../data/progress.repo.sqlite';
import { Flashcard, FlashSetId } from '../models/flashcards.types';

import { VideoView } from 'expo-video';
import { useFlashcardVideo } from '../hooks/useVideoPlayer';

const ASLSet = () => {
  

  const { id } = useLocalSearchParams();
  const setId = (id as FlashSetId);

  // state
  const [cards, setCards] = useState<Flashcard[] | null>(null);
  const [idx, setIdx] = useState(0);

  const card = cards?.[idx];

  const { player: videoPlayer, hasVideo } = useFlashcardVideo(card?.videoPath, card?.videoTitle);

  // flip animation
  const flip = useRef(new Animated.Value(0)).current;
  const [isBack, setIsBack] = useState(false);
  const rotateFront = flip.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const rotateBack  = flip.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  // scroll animation
  const scrollAnim = useRef(new Animated.Value(0)).current;

  const flipCard = () =>
    Animated.timing(flip, { toValue: isBack ? 0 : 1, duration: 300, easing: Easing.out(Easing.cubic), useNativeDriver: true })
      .start(() => setIsBack(!isBack));

  // ONE init/load effect: init DBs, seed, load cards, restore last index
  useEffect(() => {
    let mounted = true;
    (async () => {
      await initDb();
      await ensureSeed();
      await initProgress();

      const data = await getSet(setId);
      if (!mounted) return;
      setCards(data);

      const saved = await getLastIndex(setId);
      const clamped = Math.max(0, Math.min(saved, Math.max(0, data.length - 1)));
      setIdx(clamped);
    })();
    return () => { mounted = false; };
  }, [setId]);

  // persist last index whenever it changes (and cards are present)
  useEffect(() => {
    if (!cards || cards.length === 0) return;
    setLastIndex(setId, idx);
  }, [idx, setId, cards]);

  if (!cards) {
    return <SafeAreaView style={styles.center}><ActivityIndicator /><Text>Loading…</Text></SafeAreaView>;
  }
  if (cards.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>No cards found for "{setId}".</Text>
        <TouchableOpacity onPress={() => router.replace('/')}><Text>Go Home</Text></TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.replace('/')} style={styles.backButton}>
            <Text style={styles.backButtonText}>‹ Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{setId.toUpperCase()} ({idx + 1}/{cards.length})</Text>
          <View style={{ width: 60 }} />
        </View>

        <View style={styles.cardWrapper}>
          <TouchableOpacity activeOpacity={0.9} onPress={flipCard}>
              <View style={styles.flipContainer}>
                <Animated.View style={[styles.face, styles.front, { transform: [{ perspective: 1000 }, { rotateY: rotateFront }] }]}>
                  {hasVideo && (
                          <VideoView 
                            player={videoPlayer} 
                            style={{ width: 500, height: 450}} 
                            nativeControls={false}
                          />
                        )}
                </Animated.View>
                <Animated.View style={[styles.face, styles.back,  { transform: [{ perspective: 1000 }, { rotateY: rotateBack }]  }]}>
                  <Text style={styles.cardText}>{card?.back}</Text>
                </Animated.View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.button, idx === 0 && styles.buttonDisabled]}
            // FIX THE FLIPPING GLITCH
            onPress={() => { if (idx > 0) setIdx(idx - 1); if (isBack) setIsBack(false); }}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => { if (idx < cards.length - 1) setIdx(idx + 1); if (isBack) setIsBack(false); }}
          >
            <Text style={styles.buttonText}>{idx < cards.length - 1 ? 'Next' : 'Finish'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { flex: 1, padding: 20, gap: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#F3F4F6' },
  backButtonText: { fontSize: 16, fontWeight: '600', color: '#111827' },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', flex: 1 },
  cardWrapper: {
    flex: 1, width: '100%', backgroundColor: 'transparent',
    borderColor: 'transparent', padding: 16, justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3
  },
  flipContainer: { width: '100%', height: '95%' },
  face: { position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
          borderRadius: 12, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  front: {},
  back: { transform: [{ rotateY: '180deg' }] },
  cardText: { fontSize: 20, textAlign: 'center' },
  controls: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: '5%'},
  button: { backgroundColor: '#007AFF', paddingHorizontal: 18, paddingVertical: 12, borderRadius: 8, flex: 1, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#9CA3AF' },
  buttonText: { color: 'white', fontWeight: '600' }
});

export default ASLSet;