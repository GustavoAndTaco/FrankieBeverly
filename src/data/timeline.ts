export interface TimelineMilestone {
  id: "S1" | "S2" | "S3" | "S4";
  era: string;
  title: string;
  summary: string;
  photoSrc?: string;
  photoAlt?: string;
  albumIdForArt?: string;
}

/** 4 major career chapters rendered as a 2x2 Bento Grid (S1 -> S2 -> S3 -> S4) with A-style photos. */
export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: "S1",
    era: "1960s–1976",
    title: "뿌리와 탄생",
    summary:
      "필라델피아 The Butlers에서 시작해 샌프란시스코 Raw Soul로 활동하던 중 마빈 게이에게 발탁되었고, 그의 제안으로 1976년 'Maze'가 탄생했다.",
    photoSrc: "/images/maze-origins.jpg",
    photoAlt: "초기 Maze featuring Frankie Beverly 밴드 멤버 단체 흑백 사진",
  },
  {
    id: "S2",
    era: "1977–1986",
    title: "골든 에라와 라이브 전설",
    summary:
      "1977년 Capitol 데뷔 후 연속 골드 앨범을 기록했다. Golden Time of Day, 'Before I Let Go'의 Live in New Orleans(1981), We Are One(1983)으로 최전성기를 열었다.",
    albumIdForArt: "live-in-new-orleans",
    photoAlt: "Live in New Orleans 앨범 아트워크",
  },
  {
    id: "S3",
    era: "1989–1995",
    title: "Warner Bros. 성숙기와 런던 실황",
    summary:
      "Warner Bros.로 이적해 Silky Soul(1989, 'Can't Get Over You')과 Back to Basics(1993)를 발표했고, 1995년 런던 해머스미스 실황으로 밴드 사운드의 정수를 남겼다.",
    albumIdForArt: "silky-soul",
    photoAlt: "Silky Soul 앨범 아트워크",
  },
  {
    id: "S4",
    era: "2000s–2024+",
    title: "세대를 잇는 유산과 헌정",
    summary:
      "Essence Festival 최초 15년 연속 폐막 헤드라이너, 비욘세의 리메이크, 2024년 고별 투어와 영면에 이르기까지 세대를 넘어 흐르는 음악적 유산.",
    photoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/Frankie_Beverly.jpg",
    photoAlt: "올화이트 무대 의상을 입은 프랭키 베벌리 공연 사진",
  },
];
