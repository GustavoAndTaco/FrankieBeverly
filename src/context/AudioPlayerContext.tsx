"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { AlbumMediaResult } from "@/app/api/itunes/route";
import { ALBUMS } from "@/data/albums";

interface AudioPlayerContextValue {
  mediaMap: Record<string, AlbumMediaResult>;
  isMediaLoading: boolean;
  currentAlbumId: string | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackNotice: string | null;
  playAlbum: (albumId: string) => void;
  togglePlay: () => void;
  seek: (seconds: number) => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
  closePlayer: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

/** Global single-<audio> provider managing iTunes preview metadata, volume, and playback. */
export function AudioPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [mediaMap, setMediaMap] = useState<Record<string, AlbumMediaResult>>(
    {},
  );
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [currentAlbumId, setCurrentAlbumId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackNotice, setPlaybackNotice] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadMedia() {
      try {
        const res = await fetch("/api/itunes");
        if (!res.ok) return;
        const data = (await res.json()) as {
          items?: Record<string, AlbumMediaResult>;
        };
        if (!cancelled && data.items) {
          setMediaMap(data.items);
        }
      } catch {
        // Fallback links remain functional even without network access
      } finally {
        if (!cancelled) {
          setIsMediaLoading(false);
        }
      }
    }

    void loadMedia();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const ensureAudioElement = useCallback(() => {
    if (audioRef.current) return audioRef.current;

    const audio = new Audio();
    audio.preload = "none";

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });
    audio.addEventListener("loadedmetadata", () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    });
    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
    audio.addEventListener("pause", () => {
      setIsPlaying(false);
    });
    audio.addEventListener("play", () => {
      setIsPlaying(true);
    });
    audio.addEventListener("error", () => {
      setIsPlaying(false);
      setPlaybackNotice(
        "미리듣기 스트림 연결이 원활하지 않습니다. Spotify 또는 YouTube 링크를 이용해주세요.",
      );
    });

    audioRef.current = audio;
    return audio;
  }, []);

  const playAlbum = useCallback(
    (albumId: string) => {
      const album = ALBUMS.find((item) => item.id === albumId);
      if (!album) return;

      const media = mediaMap[albumId];
      const previewUrl = media?.previewUrl ?? null;

      if (currentAlbumId === albumId && audioRef.current && previewUrl) {
        if (audioRef.current.paused) {
          void audioRef.current.play().catch(() => {
            setIsPlaying(false);
            setPlaybackNotice(
              "브라우저 자동재생 정책으로 차단되었습니다. 재생 버튼을 다시 눌러주세요.",
            );
          });
        } else {
          audioRef.current.pause();
        }
        return;
      }

      setCurrentAlbumId(albumId);
      setCurrentTime(0);
      setDuration(30);

      if (!previewUrl) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setIsPlaying(false);
        setPlaybackNotice(
          "30초 미리듣기를 불러올 수 없어 Spotify·YouTube 링크로 안내합니다.",
        );
        return;
      }

      setPlaybackNotice(null);
      const audio = ensureAudioElement();
      audio.volume = volume;
      audio.muted = isMuted;
      audio.src = previewUrl;
      audio.currentTime = 0;

      void audio.play().catch(() => {
        setIsPlaying(false);
        setPlaybackNotice(
          "음원 재생에 실패했습니다. Spotify 또는 YouTube에서 전체 곡을 감상할 수 있습니다.",
        );
      });
    },
    [currentAlbumId, ensureAudioElement, isMuted, mediaMap, volume],
  );

  const togglePlay = useCallback(() => {
    if (!currentAlbumId) return;
    playAlbum(currentAlbumId);
  }, [currentAlbumId, playAlbum]);

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(seconds)) return;
    const clamped = Math.max(0, Math.min(seconds, audio.duration || 30));
    audio.currentTime = clamped;
    setCurrentTime(clamped);
  }, []);

  const setVolume = useCallback((value: number) => {
    const clamped = Math.max(0, Math.min(1, value));
    setVolumeState(clamped);
    const shouldMute = clamped === 0;
    setIsMuted(shouldMute);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
      audioRef.current.muted = shouldMute;
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      return next;
    });
  }, []);

  const closePlayer = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentAlbumId(null);
    setPlaybackNotice(null);
  }, []);

  const value = useMemo<AudioPlayerContextValue>(
    () => ({
      mediaMap,
      isMediaLoading,
      currentAlbumId,
      isPlaying,
      currentTime,
      duration,
      volume,
      isMuted,
      playbackNotice,
      playAlbum,
      togglePlay,
      seek,
      setVolume,
      toggleMute,
      closePlayer,
    }),
    [
      closePlayer,
      currentAlbumId,
      currentTime,
      duration,
      isMediaLoading,
      isMuted,
      isPlaying,
      mediaMap,
      playAlbum,
      playbackNotice,
      seek,
      setVolume,
      toggleMute,
      togglePlay,
      volume,
    ],
  );

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

/** Consume global exhibition audio playback state and media cache. */
export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) {
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  }
  return ctx;
}
