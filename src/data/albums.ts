export interface AlbumItem {
  id: string;
  pageNumber: string;
  year: number;
  approxRelease: string;
  title: string;
  label: string;
  category: string;
  shortDescription: string;
  featuredTrack: string;
  itunesQuery: string;
  spotifySearchUrl: string;
  youtubeSearchUrl: string;
  vinylLabelColor: string;
  isFavorite?: boolean;
  isSpecialLive?: boolean;
}

/** 9-spread anthology dataset (1977–1993 studio albums + 1981 Live in New Orleans). */
export const ALBUMS: AlbumItem[] = [
  {
    id: "maze-1977",
    pageNumber: "01",
    year: 1977,
    approxRelease: "1977년경",
    title: "Maze Featuring Frankie Beverly",
    label: "Capitol Records",
    category: "정규 1집",
    shortDescription:
      "마빈 게이의 제안으로 이름을 바꾼 뒤 내놓은 데뷔작. 따뜻한 소울 그루브의 출발점이다.",
    featuredTrack: "Happy Feelin's",
    itunesQuery: "Maze Frankie Beverly Happy Feelin's",
    spotifySearchUrl:
      "https://open.spotify.com/search/Maze%20Frankie%20Beverly%20Happy%20Feelins",
    youtubeSearchUrl:
      "https://www.youtube.com/results?search_query=Maze+Frankie+Beverly+Happy+Feelins",
    vinylLabelColor: "#C4492D",
  },
  {
    id: "golden-time-of-day",
    pageNumber: "02",
    year: 1978,
    approxRelease: "1978년경",
    title: "Golden Time of Day",
    label: "Capitol Records",
    category: "정규 2집",
    shortDescription:
      "해가 지는 황혼 무렵처럼 포근한 일렉트릭 피아노와 온화한 보컬이 어우러진 2집.",
    featuredTrack: "Golden Time of Day",
    itunesQuery: "Maze Golden Time of Day",
    spotifySearchUrl:
      "https://open.spotify.com/search/Maze%20Golden%20Time%20of%20Day",
    youtubeSearchUrl:
      "https://www.youtube.com/results?search_query=Maze+Frankie+Beverly+Golden+Time+of+Day",
    vinylLabelColor: "#E07A2F",
  },
  {
    id: "inspiration",
    pageNumber: "03",
    year: 1979,
    approxRelease: "1979년경",
    title: "Inspiration",
    label: "Capitol Records",
    category: "정규 3집",
    shortDescription:
      "부드러운 발라드와 탄력 있는 펑크 리듬이 매끄럽게 교차하며 완숙기에 접어든 앨범.",
    featuredTrack: "Feel That You're Feelin'",
    itunesQuery: "Maze Feel That You're Feelin",
    spotifySearchUrl:
      "https://open.spotify.com/search/Maze%20Feel%20That%20Youre%20Feelin",
    youtubeSearchUrl:
      "https://www.youtube.com/results?search_query=Maze+Frankie+Beverly+Feel+That+Youre+Feelin",
    vinylLabelColor: "#B35A2E",
  },
  {
    id: "joy-and-pain",
    pageNumber: "04",
    year: 1980,
    approxRelease: "1980년경",
    title: "Joy and Pain",
    label: "Capitol Records",
    category: "정규 4집",
    shortDescription:
      "삶의 기쁨과 슬픔을 정직하게 노래해 세대를 넘어 사랑받는 밴드의 대표 명반.",
    featuredTrack: "Joy and Pain",
    itunesQuery: "Maze Joy and Pain",
    spotifySearchUrl:
      "https://open.spotify.com/search/Maze%20Joy%20and%20Pain",
    youtubeSearchUrl:
      "https://www.youtube.com/results?search_query=Maze+Frankie+Beverly+Joy+and+Pain",
    vinylLabelColor: "#D47A32",
  },
  {
    id: "live-in-new-orleans",
    pageNumber: "05",
    year: 1981,
    approxRelease: "1981년경",
    title: "Live in New Orleans",
    label: "Capitol Records",
    category: "스페셜 라이브",
    shortDescription:
      "뉴올리언스 실황과 스튜디오 트랙을 담은 더블 앨범. 시그니처 앤섬 'Before I Let Go' 수록.",
    featuredTrack: "Before I Let Go",
    itunesQuery: "Maze Before I Let Go",
    spotifySearchUrl:
      "https://open.spotify.com/search/Maze%20Before%20I%20Let%20Go",
    youtubeSearchUrl:
      "https://www.youtube.com/results?search_query=Maze+Frankie+Beverly+Before+I+Let+Go",
    vinylLabelColor: "#F4B942",
    isSpecialLive: true,
  },
  {
    id: "we-are-one",
    pageNumber: "06",
    year: 1983,
    approxRelease: "1983년경",
    title: "We Are One",
    label: "Capitol Records",
    category: "정규 5집",
    shortDescription:
      "연대의 메시지를 따뜻한 그루브로 감싼 5집.",
    featuredTrack: "We Are One",
    itunesQuery: "Maze We Are One Frankie Beverly",
    spotifySearchUrl:
      "https://open.spotify.com/search/Maze%20We%20Are%20One",
    youtubeSearchUrl:
      "https://www.youtube.com/results?search_query=Maze+Frankie+Beverly+We+Are+One",
    vinylLabelColor: "#D98636",
    isFavorite: true,
  },
  {
    id: "cant-stop-the-love",
    pageNumber: "07",
    year: 1985,
    approxRelease: "1985년경",
    title: "Can't Stop the Love",
    label: "Capitol Records",
    category: "정규 6집",
    shortDescription:
      "어쿠스틱 온기를 잃지 않으면서 R&B 싱글 차트 정상에 오른 'Back in Stride'를 담은 6집.",
    featuredTrack: "Back in Stride",
    itunesQuery: "Maze Back in Stride",
    spotifySearchUrl:
      "https://open.spotify.com/search/Maze%20Back%20in%20Stride",
    youtubeSearchUrl:
      "https://www.youtube.com/results?search_query=Maze+Frankie+Beverly+Back+in+Stride",
    vinylLabelColor: "#A64B2A",
  },
  {
    id: "silky-soul",
    pageNumber: "08",
    year: 1989,
    approxRelease: "1989년경",
    title: "Silky Soul",
    label: "Warner Bros. Records",
    category: "정규 7집",
    shortDescription:
      "Warner Bros. 이적 후 선보인 성숙한 콰이어트 스톰 명반. 'Can't Get Over You' 수록.",
    featuredTrack: "Can't Get Over You",
    itunesQuery: "Maze Can't Get Over You",
    spotifySearchUrl:
      "https://open.spotify.com/search/Maze%20Cant%20Get%20Over%20You",
    youtubeSearchUrl:
      "https://www.youtube.com/results?search_query=Maze+Frankie+Beverly+Cant+Get+Over+You",
    vinylLabelColor: "#E07A2F",
    isFavorite: true,
  },
  {
    id: "back-to-basics",
    pageNumber: "09",
    year: 1993,
    approxRelease: "1993년경",
    title: "Back to Basics",
    label: "Warner Bros. Records",
    category: "정규 8집",
    shortDescription:
      "정통 밴드 사운드의 본질로 돌아간 마지막 정규 스튜디오 앨범으로 묵직한 여운을 남긴다.",
    featuredTrack: "Laid Back Girl",
    itunesQuery: "Maze Laid Back Girl Frankie Beverly",
    spotifySearchUrl:
      "https://open.spotify.com/search/Maze%20Laid%20Back%20Girl",
    youtubeSearchUrl:
      "https://www.youtube.com/results?search_query=Maze+Frankie+Beverly+Laid+Back+Girl",
    vinylLabelColor: "#8C5432",
  },
];
