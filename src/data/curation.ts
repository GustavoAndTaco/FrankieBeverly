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
  heading: "내가 거의 매일 Maze를 듣게 된 이유",
  body: "화려한 기교보다 진심을 얹어 부르는 프랭키 베벌리의 목소리와 느긋한 그루브는, 하루의 끝에 해가 지는 노을처럼 가장 오래 곁에 남아 마음을 다독여 줍니다.",
};

/** 4 personal track picks shown in the 2x2 Bento grid. */
export const CURATION_PICKS: CurationPick[] = [
  {
    pickLabel: "★ MY PICK 01",
    albumId: "silky-soul",
    trackTitle: "Can't Get Over You",
    albumTitle: "Silky Soul",
    approxYear: "1989년경",
    note: "서늘한 밤공기 속에 흐르는 매끄러운 신스와 담담한 보컬이 가장 먼저 마음을 놓이게 하는 최애곡.",
    isTopFavorite: true,
  },
  {
    pickLabel: "★ MY PICK 02",
    albumId: "we-are-one",
    trackTitle: "We Are One",
    albumTitle: "We Are One",
    approxYear: "1983년경",
    note: "단순하고 따뜻한 연대의 메시지가 묵직한 그루브와 만나 혼자 듣다가도 깊은 온기를 건네는 곡.",
    isTopFavorite: true,
  },
  {
    pickLabel: "ENTRY PICK 03",
    albumId: "live-in-new-orleans",
    trackTitle: "Before I Let Go",
    albumTitle: "Live in New Orleans",
    approxYear: "1981년경",
    note: "Maze의 라이브가 왜 전설로 불리는지 단번에 체감하게 만드는 시그니처 입문 트랙.",
  },
  {
    pickLabel: "MOOD PICK 04",
    albumId: "golden-time-of-day",
    trackTitle: "Golden Time of Day",
    albumTitle: "Golden Time of Day",
    approxYear: "1978년경",
    note: "해가 지는 황금빛 시간을 그대로 소리로 옮겨 놓은 듯한, 노을 감성에 가장 어울리는 명곡.",
  },
];
