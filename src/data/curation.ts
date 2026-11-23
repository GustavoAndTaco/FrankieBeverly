export interface CurationPick {
  pickLabel: string;
  albumId: string;
  trackTitle: string;
  albumTitle: string;
  approxYear: string;
  note: string;
  isTopFavorite?: boolean;
}

/** Personal curator liner note essay (RECOMMENDS section). */
export const CURATOR_ESSAY = {
  heading: "Maze와 Frankie Beverly에게 빠지게 된 이유",
  body: "화려한 기교보다 진심을 얹어 부르는 프랭키 베벌리의 소울감 충만한 목소리와 느긋한 그루브에 빠지지 않고는 배길 수 없었다.",
};

/** 4 personal track picks shown in the 2x2 Bento grid. */
export const CURATION_PICKS: CurationPick[] = [
  {
    pickLabel: "★ MY PICK 01",
    albumId: "silky-soul",
    trackTitle: "Can't Get Over You",
    albumTitle: "Silky Soul",
    approxYear: "1989",
    note: "서늘한 밤공기 속에 흐르는 매끄러운 신스와 담담한 보컬이 가장 먼저 마음을 놓이게 하는 최애곡.",
    isTopFavorite: true,
  },
  {
    pickLabel: "★ MY PICK 02",
    albumId: "we-are-one",
    trackTitle: "We Are One",
    albumTitle: "We Are One",
    approxYear: "1983",
    note: "인트로에서부터 바로 감기는 Maze에 결정적으로 입문하게 된 곡",
    isTopFavorite: true,
  },
  {
    pickLabel: "ENTRY PICK 03",
    albumId: "live-in-new-orleans",
    trackTitle: "Before I Let Go",
    albumTitle: "Live in New Orleans",
    approxYear: "1981",
    note: "Maze의 라이브가 왜 전설로 불리는지 단번에 체감하게 만드는 시그니처 트랙.",
  },
  {
    pickLabel: "MOOD PICK 04",
    albumId: "golden-time-of-day",
    trackTitle: "Golden Time of Day",
    albumTitle: "Golden Time of Day",
    approxYear: "1978",
    note: "해가 지는 황금빛 시간을 그대로 소리로 옮겨 놓은 듯한, 노을 감성에 가장 어울리는 명곡.",
  },
];
