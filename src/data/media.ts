export interface ArtistPhotoCredit {
  url: string;
  alt: string;
  author: string;
  license: string;
  sourceUrl: string;
}

export interface LiveVideoItem {
  id: string;
  tabLabel: string;
  title: string;
  youtubeId: string;
  watchUrl: string;
}

export interface SoundTrait {
  title: string;
  description: string;
}

/** Verified Wikimedia Commons CC BY 2.0 portrait of Frankie Beverly (used in S4). */
export const ARTIST_PHOTO: ArtistPhotoCredit = {
  url: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Frankie_Beverly.jpg",
  alt: "Frankie Beverly performing live on stage in white attire",
  author: "William Henderson (darkfiber22)",
  license: "CC BY 2.0",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:Frankie_Beverly.jpg",
};

/** Verified live performance embeds for LIVE section (YouTube privacy-enhanced mode). */
export const LIVE_VIDEOS: LiveVideoItem[] = [
  {
    id: "live-london-1995",
    tabLabel: "Live in London '95",
    title: "Maze Featuring Frankie Beverly — Live in London (1995)",
    youtubeId: "qlwYAvyHCXY",
    watchUrl: "https://www.youtube.com/watch?v=qlwYAvyHCXY",
  },
  {
    id: "live-la-1986",
    tabLabel: "Before I Let Go (LA '86)",
    title: "Before I Let Go — Live in Los Angeles (1986)",
    youtubeId: "Rq84B5Xq918",
    watchUrl: "https://www.youtube.com/watch?v=Rq84B5Xq918",
  },
];

/** 3 core traits defining the Maze live sound — clean & compact. */
export const SOUND_TRAITS: SoundTrait[] = [
  {
    title: "온기 있는 보컬",
    description: "과장된 기교 대신 담백한 진정성과 여운으로 스며드는 음색.",
  },
  {
    title: "콩가 & 그루브",
    description: "넉넉한 콩가 퍼커션과 베이스라인이 만드는 여유로운 리듬.",
  },
  {
    title: "콜 앤 리스폰스",
    description: "올화이트 관객과 무대가 한목소리로 완성하는 라이브 호흡.",
  },
];

/** Official educational non-commercial copyright notice. */
export const EDUCATIONAL_DISCLAIMER =
  "본 웹사이트는 멀티미디어 콘텐츠 제작 수업을 위한 비상업적 교육용 디지털 전시 과제로 제작되었습니다. 수록된 음원 미리듣기 및 앨범 아트워크는 Apple iTunes API의 공식 공개 데이터를 활용하며, 라이브 영상과 전체 곡 링크는 YouTube 및 Spotify를 통해 제공됩니다. 모든 저작권은 원저작권자(Frankie Beverly, Maze, Capitol Records, Warner Records 등 각 권리사)에게 귀속됩니다.";
