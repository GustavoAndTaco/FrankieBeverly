# PRD: Frankie Beverly & Maze 인터랙티브 디지털 전시 웹사이트

> **부제 (Exhibition Title):** *GOLDEN TIME OF DAY — Maze featuring Frankie Beverly Interactive Digital Exhibition*

---

## 1. 문서 개요 & 프로젝트 정보

| 항목 | 내용 |
| :--- | :--- |
| **프로젝트명** | `FrankieBeverly` |
| **과제 정보** | 멀티미디어 콘텐츠 제작 텀 프로젝트 |
| **작성자** | 20231044 박해신 |
| **문서 버전** | v2.0 (2026-11-24 6섹션 카드 커튼 · 좌측 롤링 메뉴 · 3D 바이닐 셀렉터 · 나눔스퀘어 개편 완료) |
| **GitHub 저장소** | https://github.com/GustavoAndTaco/FrankieBeverly (Public) |
| **배포 목표** | Vercel 무료 웹 호스팅 (과제 제출용 라이브 URL 확보 및 시연) |
| **기술 스택** | Next.js `16.4.6` (App Router, `src/`), React `19.3.0`, TypeScript, Tailwind CSS `4.3.3`, **shadcn/ui** |

---

## 2. 기획 의도 및 핵심 목표

### 2.1 기획 배경
프랭키 베벌리와 메이즈(*Maze featuring Frankie Beverly*)는 1970년대부터 따뜻하고 유연한 소울과 펑크 그루브로 세대를 이어 사랑받아 온 미국의 전설적인 R&B 밴드다. 기존의 단순 텍스트 중심 위키백과형 아티스트 소개에서 벗어나, 관람객이 웹 공간에서 직접 책장을 넘기듯 바이닐을 꺼내 듣고 시대를 탐색하며 아티스트의 음악과 문화를 **경험**하는 인터랙티브 디지털 전시를 구축한다.

### 2.2 핵심 목표
1. **스토리텔링 기반 정보 전달**: 아티스트의 정체성, 필라델피아~샌프란시스코의 뿌리, 시대별 음반사를 구조화해 직관적으로 전달한다.
2. **시그니처 멀티미디어 인터랙션**: 거대한 **‘바이닐 앤솔로지 북(Vinyl Anthology Book)’** 3D 페이지 넘김·LP 회전 재생, 리듬 비주얼라이저, 라이브 영상 임베드, 플로팅 미니 플레이어를 통해 풍부한 시청각 경험을 제공한다.
3. **2024년 이후 유산(Legacy)을 기리는 헌정 아카이브**: 2024년 고별 투어(*"I Wanna Thank You"*)와 같은 해 9월 10일 프랭키 베벌리의 별세(향년 77세) 이후에도 이어지는 음악적·문화적 유산을 정확히 반영해 헌정 전시로서의 깊이를 더한다.
4. **작성자의 개인적 시선 결합**: 객관적 아카이브와 더불어 작성자가 Maze의 음악을 거의 매일 들으며 애정하게 된 이유, 최애곡(`"Can't Get Over You"`, `"We Are One"`)에 대한 개인 큐레이션을 전면에 녹여낸다.

---

## 3. 전체 UX 구조 & 네비게이션 (Information Architecture)

### 3.1 탐색 패턴: 스택 카드 커튼 스크롤 (Stacked Card Curtain Scrollytelling)
- **흐름**: `INTRO`부터 `OUTRO`까지 **총 6개 섹션**(기존 ② Identity 제거)이 화면을 가득 채우는 카드로 쌓여 있으며, 다음 섹션으로 이동할 때 다음 카드가 앞선 카드를 선셋 그라데이션 커튼으로 부드럽게 덮으며 올라온다(GSAP `ScrollTrigger`).
- **좌측 고정 롤링 내비게이션 (`LeftRadialMenu`)**:
  - 상단 가로 바를 제거하고, `메뉴 선택 모션.json`의 곡선 롤링 다이얼과 선셋 점(`#FDF6C8` → `#FEA864` → `#FF5900`) 모션을 구현한 내비게이션이 **화면 왼쪽에 항상 고정**된다.
  - 6개 대문자 메뉴: **`INTRO`** · **`ABOUT MAZE`** · **`DISCOGRAPHY`** · **`RECOMMENDS`** · **`LIVE`** · **`OUTRO`**
  - 본문 컨테이너는 데스크톱 기준 좌측 안전 여백(`lg:pl-[255px]`)을 확보해 좌측 메뉴와 절대 겹치지 않으며 화면을 꽉 채워 가독성을 극대화한다.
- **글로벌 하단 플로팅 미니 플레이어**:
  - 곡 재생 시 화면 하단에 미니 플레이어가 유지된다.
  - 표시 요소: 회전 미니 바이닐 썸네일, 곡명 · 대략적 발매 시기, 재생/일시정지, 30초 진행 바, **음량 조절 슬라이더(Mute 포함)**, 닫기 컨트롤.

### 3.2 언어 및 반응형 기준
- **언어 구성**: 한국어 본문 및 내비게이션 + 영문 아티스트명 · 앨범명 · 곡명 · 에디토리얼 타이포그래피 포인트
- **뷰포트 지원**: 데스크톱 대형 전시 화면(`1280px ~ 1440px+`) 기준의 2면 펼침 경험을 최우선으로 설계하고, 태블릿(`768px ~ 1279px`) 및 모바일(`< 768px`)에서도 깨짐 없이 탐색 가능한 반응형 레이아웃을 제공한다.

---

## 4. 비주얼 디자인 시스템 (Visual Identity & Typography)

### 4.1 컬러 팔레트 & 디자인 레퍼런스: `droppable.app` 스타일 컴팩트 다크 + 선셋 포인트
전체 웹사이트는 레퍼런스 사이트([droppable.app](https://www.droppable.app/))의 **깔끔하고 컴팩트한 다크 미니멀리즘**을 설계 기준으로 삼는다.
- **레이아웃·서피스 규격 (`droppable.app` 벤치마크 + shadcn/ui 연동)**:
  - 깊은 매트 다크 캔버스(`#110E0C`) 위에 살짝 밝은 차콜 카드 서피스(`#181412`)를 배치한다.
  - 얇은 `1px` 미세 보더(`rgba(255,255,255,0.08)` / `#2A221E`), 둥근 모서리(`16~20px`), `12px`의 촘촘한 벤토(Bento) 그리드 간격, 중앙 정렬 컨테이너(`max-width: 1000px`), `1px` 점선(`dashed`) 푸터 구분선으로 정갈한 밀도를 만든다.
  - **shadcn/ui 시맨틱 토큰 매핑**: `src/app/globals.css`의 `--background`, `--foreground`, `--card`, `--border`, `--muted`, `--primary`, `--ring` 변수를 위 다크 + 선셋 팔레트에 직접 연결해 모든 UI 프리미티브(`Button`, `Card`, `Badge`, `Tabs`, `Separator`, `Progress`)가 일관된 톤을 유지하도록 한다.
  - **원-액센트 절제(Single-Accent Discipline)**: 노을빛 **선셋 그라데이션**을 유일한 고채도 포인트로 두고, 상단 스크롤 바·보조 라벨·보더는 무채색 회색 톤으로 눌러 시각적 피로도를 없앤다.

| 테마 영역 | 토큰명 | HEX | 용도 |
| :--- | :--- | :--- | :--- |
| **Compact Dark Canvas**<br>(전 섹션 일관된 다크 톤) | `Deep Matte Dark` | `#110E0C` | 기본 다크 배경 |
| | `Vinyl Charcoal` | `#181412` | 벤토 카드 · 북 커버 · 패널 표면 |
| | `Hairline Border` | `#2A221E` *(rgba 0.08)* | `1px` 미세 카드 보더 · 점선(`dashed`) 구분선 |
| | `Cream Text` | `#F5EFE6` | 기본 본문 텍스트 |
| | `Muted Warm Gray` | `#A89B8C` | 캡션 · 메타 정보 · 보조 텍스트 |
| **Muted UI Chrome**<br>(무채색 절제 크롬) | `Muted Slate Gray` | `#6E6863` | 상단 고정 회색 스크롤 바 진행률 · 비활성 탭 |
| | `Subtle Track Gray` | `rgba(255,255,255,0.16)` | 상단 스크롤 바 트랙 · 미세 인디케이터 |
| **Sunset Gradient Accents**<br>(유일한 해가 지는 노을 포인트) | `Sunset Horizon` | `#FFF3D1` | 그라데이션 상단 하이라이트 |
| | `Sunset Gold` | `#F4B942` | 주요 CTA · 활성 포인트 · 엔딩 타이포 |
| | `Warm Amber` | `#E07A2F` | 인트로 로고 그라데이션 · 호버 하이라이트 |
| | `Soul Terracotta` | `#C4492D` | 70s 선셋 하단 딥 톤 · 포인트 라인 |
| **All-White 포인트 (확정)**<br>(섹션 ② 아티스트 프레임 한정) | `Gallery Ivory` / `Crisp White` | `#FAF8F5` / `#FFFFFF` | *전체 배경 전환 없이 다크 톤 유지, 섹션 ② 사진 프레임·배지 포인트로만 활용* |
| | `Deep Ink` / `Warm Bronze` | `#181310` / `#8C6A4A` | *화이트 프레임 내부 캡션·라벨* |

- **아날로그 텍스처**: 전체 화면에 아주 낮은 불투명도(`opacity: 0.03~0.04`)의 SVG/CSS 필름 그레인 오버레이(`pointer-events: none`)를 적용해 과도한 GPU 부담 없이 빈티지 LP 슬리브 질감을 살린다.

### 4.2 타이포그래피 시스템

#### ① 인트로 메인 로고 (`Monoton` + 해가 지는 선셋 그라데이션)
- **전용 폰트**: Google Fonts **`Monoton`** (`weight: 400`)
- **2단 비대칭 로고 락업 구성 (1번째 참고 스케치 반영)**:
  - **상단 행**: 크게 **`Maze`** 배치 + 바로 오른쪽 아래에 작게 **`ft`**(featuring) 배치
  - **하단 행**: 그 바로 아래 중앙에 **`Frankie Beverly`** 배치
  - *(참고: `Monoton` 폰트는 인라인 스트라이프가 들어간 대문자 기반 레트로 디스플레이 서체이므로, `Maze` / `ft` / `Frankie Beverly` 모두 고유의 레트로 스트라이프 조형미를 유지하며 `ft`만 크기를 낮춰 우측 하단에 정돈한다.)*
- **선셋 그라데이션 스타일**: 해가 지는 노을을 연상시키는 수직 선셋 그라데이션 텍스트 클리핑(`background-clip: text; color: transparent;`)과 은은한 앰버 글로우(`drop-shadow`)를 조합한다.
  ```css
  background: linear-gradient(180deg, #FFF3D1 0%, #F4B942 42%, #E07A2F 75%, #C4492D 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 6px 24px rgba(224, 122, 47, 0.28));
  ```
- **참고 웹 폰트 스펙 (작성자 지정 Google Fonts 코드)**:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Monoton&display=swap" rel="stylesheet">
  ```
  ```css
  .monoton-regular {
    font-family: "Monoton", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  ```
- **Next.js 16 구현 방식**: Next.js App Router 프로덕션 최적화(외부 네트워크 요청 제거 및 자동 셀프 호스팅, CLS 방지)를 위해 `src/app/layout.tsx`에서 `next/font/google`의 `Monoton`을 불러와 CSS 변수(`--font-monoton`)로 연결하고 `.monoton-regular` 유틸리티와 동일하게 적용한다.

#### ② 에디토리얼 헤딩 & 본문 폰트 (`NanumSquare`)
- **영문 세리프 헤딩 · 연도 · 인용구**: `Cormorant Garamond` (`next/font/google`)
- **한국어 본문 · 포인트 헤딩 · 메뉴**: 로컬 **`나눔스퀘어(NanumSquare)`** OTF (`300 / 400 / 700 / 800`, `next/font/local`)를 적용하고, 섹션 타이틀·강조 문구에 **NanumSquare Bold/ExtraBold**를 사용해 시원한 가독성을 확보한다.

---

## 5. 전체 6개 섹션 상세 명세 (v2.0 확정)

*(※ 좌측에 고정된 `LeftRadialMenu`가 섹션 전환을 명확히 안내하므로, 각 섹션 내부의 불필요한 번호·제목·짜잘한 부제와 장황한 설명은 전부 제거하고 콘텐츠 박스 자체의 크기와 가독성을 화면에 맞게 극대화한다.)*

1. **`INTRO` (`IntroSection.tsx`)**: 어두운 화면 정중앙(좌측 메뉴 여백 제외 영역)에 기존 대비 **약 150% 확대된** `Monoton` 선셋 그라데이션 로고(`MAZE ft` / `FRANKIE BEVERLY`)와 마우스 3D 패럴랙스 단독 구성.
2. **`ABOUT MAZE` (`TimelineSection.tsx`)**: 기존 Identity 섹션을 통합/제거하고, 화면을 크게 채우는 `2×2` 대형 벤토 카드(`S1` 1960s–1976 → `S2` 1977–1986 → `S3` 1989–1995 → `S4` 2000s–2024+)와 NanumSquare Bold 제목, 핵심 요약만 깔끔하게 배치.
3. **`DISCOGRAPHY` (`DiscographySection.tsx` + `VinylSelector3D.tsx`)**: `vinyl-selector.riv` 감성의 **마우스 반응형 9장 3D 비스듬한 바이닐 셀렉터**. 마우스를 올리면 레코드들이 웨이브처럼 벌어지며 올라오고, 앨범을 클릭하면 **3D 입체 LP판이 앨범 커버 위로 솟아 회전**하며 바로 우측 허공에 컴팩트한 설명(앨범명·대략적 발매 시기·1~2줄 소개·대표곡 재생)이 떠오른다.

| 장 | 연도 | 앨범명 | 레이블 | 구분 | 대표곡 (30초 미리듣기 1곡) | 비고 |
| :-: | :-: | :--- | :--- | :---: | :--- | :--- |
| **01** | 1977 | *Maze Featuring Frankie Beverly* | Capitol Records | 정규 1집 | `"Happy Feelin's"` | 데뷔작, 골드 인증 |
| **02** | 1978 | *Golden Time of Day* | Capitol Records | 정규 2집 | `"Golden Time of Day"` | 전시 부제 동명 명반 |
| **03** | 1979 | *Inspiration* | Capitol Records | 정규 3집 | `"Feel That You're Feelin'"` | 소울·펑크 완숙기 |
| **04** | 1980 | *Joy and Pain* | Capitol Records | 정규 4집 | `"Joy and Pain"` | `"Southern Girl"` 수록 |
| **05** | 1981 | ***Live in New Orleans*** | Capitol Records | **스페셜 라이브** | **`"Before I Let Go"`** | Saenger Theatre 실황 |
| **06** | 1983 | *We Are One* | Capitol Records | 정규 5집 | **`"We Are One"`** | **작성자 최애곡 ★** |
| **07** | 1985 | *Can't Stop the Love* | Capitol Records | 정규 6집 | `"Back in Stride"` | R&B 차트 1위 싱글 수록 |
| **08** | 1989 | *Silky Soul* | Warner Bros. Records | 정규 7집 | **`"Can't Get Over You"`** | **작성자 최애곡 ★ (지정)** |
| **09** | 1993 | *Back to Basics* | Warner Bros. Records | 정규 8집 | `"Laid Back Girl"` | 마지막 정규 스튜디오 앨범 |

4. **`RECOMMENDS` (`CurationSection.tsx`)**: 상단 굵은 NanumSquare Bold 개인 노트 + 하단 4곡(`Can't Get Over You`, `We Are One`, `Before I Let Go`, `Golden Time of Day`) `2×2` 대형 트랙 카드.
5. **`LIVE` (`SoundLiveSection.tsx`)**: 공연장·연도·서술형 짜잘한 텍스트를 모두 제거한 깔끔한 YouTube 라이브 탭(`Live in London '95` / `Before I Let Go LA '86`) + 우측 시그니처 사운드 3요소 카드 + 하단 슬림 리듬 비주얼라이저.
6. **`OUTRO` (`EndingSection.tsx`)**: 확대된 선셋 헌정 타이포(`In Loving Memory of Frankie Beverly`, `1946 — 2024`) + 액션 버튼 + `1px` 점선 3단 교육용 출처 푸터.

---

## 6. 멀티미디어 소스 및 저작권 준수 정책 (Copyright & Asset Strategy)

Public GitHub 저장소(`GustavoAndTaco/FrankieBeverly`) 및 Vercel 공개 웹 배포를 전제로, 저작권 리스크가 없는 **하이브리드 방식**을 엄격히 준수한다.

1. **음원 파일 커밋 금지**: `.mp3`, `.m4a`, `.wav`, `.flac` 등 상업 음원 바이너리는 절대 GitHub 리포지토리에 포함하지 않는다.
2. **커스텀 바이닐 재생(30초 미리듣기) & 공식 앨범 커버**:
   - **Apple iTunes Search API**를 Next.js 서버 Route Handler(`src/app/api/itunes/route.ts`)에서 조회·캐싱하여 공식 `previewUrl`(30초 M4A 스트리밍 URL)과 `600x600bb` 공식 앨범 아트워크 URL을 제공한다.
   - **Graceful Fallback**: 네트워크 오류나 API 상 특정 곡의 `previewUrl` 누락 시 UI가 깨지지 않도록 **Spotify/YouTube 공식 임베드 또는 외부 감상 링크 버튼**으로 자동 폴백한다.
3. **전체 곡 감상 & 라이브 퍼포먼스 영상**:
   - YouTube 공식 프라이버시 강화 임베드(`https://www.youtube-nocookie.com/embed/...`) 및 Spotify 공식 Embed(`https://open.spotify.com/embed/...`)를 사용한다.
4. **아티스트·라이브 이미지 에셋**:
   - 인물/공연 사진은 **Wikimedia Commons**의 Creative Commons(CC BY / CC BY-SA / Public Domain) 검증 이미지에만 한정해 사용하며, 이미지 하단 또는 엔딩 크레딧에 **촬영자·라이선스·원본 URL**을 반드시 명시한다.
   - 그 외 인트로·타임라인·배경 연출은 자체 제작 SVG 일러스트(바이닐·턴테이블·올화이트 모티프)와 CSS 타이포그래피로 완성도를 높인다.
5. **전시 엔딩 고지 문구 (필수 삽입 초안)**:
   > 본 웹사이트는 멀티미디어 콘텐츠 제작 수업을 위한 **비상업적 교육용 디지털 전시 과제**로 제작되었습니다. 수록된 모든 음원 미리듣기 및 앨범 아트워크는 Apple iTunes API의 공식 공개 미리듣기 데이터를 활용하며, 라이브 영상과 전체 곡 링크는 YouTube 및 Spotify의 공식 임베드를 통해 제공됩니다. 모든 음악·아트워크의 저작권은 원저작권자(Frankie Beverly, Maze, Capitol Records, Warner Records 등 각 권리사)에게 귀속됩니다.

---

## 7. 기술 아키텍처, 성능 최적화 & 디렉터리 구조

### 7.1 기술 스택 및 추가 패키지
- **코어**: Next.js `16.4.6` (App Router, `src/`), React `19.3.0`, TypeScript, Tailwind CSS `4.3.3`
- **UI 컴포넌트 시스템**: **shadcn/ui** (`components.json`, `src/lib/utils.ts`, `clsx`, `tailwind-merge`, `class-variance-authority`, `@radix-ui/react-slot`, `@radix-ui/react-tabs`, `@radix-ui/react-separator`, `@radix-ui/react-progress`)
- **추가 도입 패키지 (모션·인터랙티브 그래픽 스택 포함)**:
  - `lucide-react`: 미니 플레이어, 책장 넘김 화살표, 사운드/외부 링크 아이콘
  - `motion` (motion.dev): 3D 바이닐 북 플립, 슬리브에서 LP 꺼내기, 섹션 전환 및 마우스 제스처 애니메이션
  - `gsap` · `@gsap/react` (gsap.com): ScrollTrigger 기반 스크롤 시네마틱, 타임라인·텍스트 정밀 타임라인 모션
  - `@rive-app/react-canvas` (rive.app): 마우스·상태 머신 반응형 인터랙티브 캔버스 모션 (`.riv`)
  - `@splinetool/react-spline` · `@splinetool/runtime` (spline.design): 3D 오브젝트/마우스 인터랙션 씬 연동 (`.splinecode`)
  - `@lottiefiles/dotlottie-react` (lottiefiles.com): 경량 벡터 모션 그래픽 재생 (`.lottie` / `.json`)
- **`next.config.ts` 설정 계획**:
  - `images.remotePatterns`에 `**.mzstatic.com`(iTunes 앨범 커버) 및 `upload.wikimedia.org`(Wikimedia CC 이미지) 등록

### 7.2 성능 최적화 전략 (9장 바이닐 북이 무거워지지 않는 설계)
1. **온디맨드 단일 오디오 스트리밍 (`AudioPlayerContext`)**: 페이지 로드 시 9곡을 미리 받지 않고, 사용자가 특정 장에서 재생을 클릭할 때만 단 1개의 전역 `<audio>` 인스턴스에 `previewUrl`을 연결한다.
2. **인접 스프레드 프리페치**: 바이닐 북은 현재 펼쳐진 장(`activeIndex`)과 직전·직후 장(`activeIndex ± 1`)의 커버 이미지만 우선 로드하고 나머지는 지연 로딩한다.
3. **GPU 합성 레이어 모션**: 페이지 3D 플립과 LP 회전은 레이아웃 재계산(Reflow)을 유발하지 않는 `transform`(`rotateY`, `translate3d`, `rotate`)과 `opacity`만 사용한다.
4. **접근성 배려**: OS의 `prefers-reduced-motion: reduce` 설정이 켜진 경우 과도한 3D 회전/플립 모션을 부드러운 페이드로 자동 완화한다.

### 7.3 제안 디렉터리 구조 (`src/` & 루트 설정)

```text
public/animations/menu-motion.json # 데스크톱 좌측 메뉴 모션 참고 에셋
components.json                   # shadcn/ui (New York 스타일, Tailwind v4) 설정
src/
├── lib/
│   └── utils.ts                  # cn() 클래스 병합 유틸리티 (clsx + tailwind-merge)
├── app/
│   ├── api/
│   │   └── itunes/
│   │       └── route.ts          # Apple iTunes Search API 서버 프록시 & 캐시
│   ├── fonts/                    # 로컬 나눔스퀘어 OTF (L/R/B/EB)
│   ├── globals.css               # shadcn/ui 다크 토큰, 그레인, 3D 바이닐/볼륨 슬라이더 스타일
│   ├── layout.tsx                # Monoton, Cormorant Garamond, NanumSquare, JetBrains Mono & AudioProvider
│   └── page.tsx                  # 6개 스택 카드 섹션 조립
├── context/
│   └── AudioPlayerContext.tsx    # 전역 단일 <audio> 제어, 진행률, 볼륨 조절, 현재 재생 트랙 상태
├── data/
│   ├── albums.ts                 # 1977~1993 9장 바이닐 셀렉터 데이터
│   ├── timeline.ts               # 4단계 굵직한 시대별 타임라인 데이터 (S1~S4, 2×2 벤토 그리드)
│   ├── curation.ts               # 작성자 짧은 노트 & 최애곡/추천곡 2×2 라이너 노트 데이터
│   └── media.ts                  # YouTube 라이브 영상 ID, 사운드 3요소, 교육 과제 고지
└── components/
    ├── ui/                       # shadcn/ui 공용 프리미티브
    │   ├── badge.tsx
    │   ├── button.tsx
    │   ├── card.tsx
    │   ├── progress.tsx
    │   ├── separator.tsx
    │   └── tabs.tsx
    ├── layout/
    │   ├── LeftRadialMenu.tsx    # 화면 좌측 고정 6대메뉴 곡선 롤링 내비게이션
    │   └── MiniPlayer.tsx        # 하단 플로팅 미니 바이닐 플레이어 (+ 음량 조절 슬라이더)
    ├── motion/                   # Next.js 16 SSR 안전 모션 그래픽 · 카드 스택 래퍼
    │   ├── SectionCard.tsx       # GSAP ScrollTrigger 기반 스택 카드 + 선셋 그라데이션 커튼
    │   ├── RiveCanvas.tsx        # Rive State Machine 인터랙티브 캔버스 래퍼
    │   ├── SplineScene.tsx       # Spline 3D 씬 클라이언트 동적 래퍼
    │   └── LottiePlayer.tsx      # DotLottie 벡터 모션 클라이언트 래퍼
    ├── sections/
    │   ├── IntroSection.tsx      # ① 150% 확대 Monoton 선셋 로고 & 마우스 3D 패럴랙스
    │   ├── TimelineSection.tsx   # ② ABOUT MAZE — 2×2 대형 벤토 타임라인 (S1~S4)
    │   ├── DiscographySection.tsx# ③ DISCOGRAPHY — 3D 바이닐 셀렉터 래퍼
    │   ├── CurationSection.tsx   # ④ RECOMMENDS — 개인 노트 + 2×2 대형 트랙 카드
    │   ├── SoundLiveSection.tsx  # ⑤ LIVE — 깔끔한 YouTube 임베드 + 사운드 3요소 + 비주얼라이저
    │   └── EndingSection.tsx     # ⑥ OUTRO — 선셋 헌정 클로징 + 1px 점선 3단 푸터
    └── vinyl-book/
        └── VinylSelector3D.tsx   # 마우스 반응형 9장 3D 비스듬한 셀렉터 + 상단 3D 회전 LP + 허공 설명
```

---

## 8. 단계별 구현 로드맵 & 완료 기준 (Acceptance Criteria)

### 8.1 구현 마일스톤
- **Phase 1 — 디자인 시스템 & 모션·폰트 스택 구축**: shadcn/ui 초기화, 로컬 `NanumSquare` 폰트(`L/R/B/EB`) 연결, 5대 모션 그래픽 런타임(`motion`, `gsap`, `rive`, `spline`, `dotlottie`) 세팅, `/api/itunes` Route Handler 구현
- **Phase 2 — 좌측 고정 메뉴 · GSAP 스택 커튼 · 6섹션 재구성**: 상단 바 및 Identity 제거, 좌측 고정 롤링 메뉴(`INTRO`~`OUTRO`) 구축, GSAP `ScrollTrigger` 기반 그라데이션 덮임 모션 적용, 전 섹션 내부 제목/짜잘한 부제 제거 및 가독성 확대
- **Phase 3 — 3D 바이닐 셀렉터 & 볼륨 조절 미니 플레이어**: 9장 비스듬한 마우스 반응형 레코드 셀렉터 + 클릭 시 3D LP 상승 회전 + 허공 설명 플로팅, `MiniPlayer` 볼륨 슬라이더 구현
- **Phase 4 — 검수 · 빌드 검증 & GitHub 푸시**: ESLint & Next.js 프로덕션 빌드 통과, 로컬 개발 서버 확인, 변경사항 커밋 및 `origin/main` 푸시

### 8.2 최종 완료 기준 (Checklist)
- [x] `npm run lint` 및 `npm run build`가 오류 없이 통과한다.
- [x] 좌측에 `INTRO`, `ABOUT MAZE`, `DISCOGRAPHY`, `RECOMMENDS`, `LIVE`, `OUTRO` 대문자 롤링 메뉴가 항상 고정되며 본문과 겹치지 않는다.
- [x] 인트로 로고가 150% 확대된 `Monoton` 선셋 그라데이션으로 시선을 집중시킨다.
- [x] 섹션 이동 시 다음 카드가 앞선 카드를 선셋 그라데이션 커튼으로 덮는 GSAP 스크롤 모션이 작동한다.
- [x] 3D 바이닐 셀렉터에서 9장 앨범을 마우스로 탐색·클릭하면 3D LP가 위로 나와 회전하고 우측 허공에 설명이 떠오르며 재생된다.
- [x] 하단 미니 플레이어에서 재생 제어와 음량 조절이 정상 동작한다.
- [x] 상업 음원 파일이 리포지토리에 포함되지 않았으며, 엔딩 푸터에 비상업적 교육 과제 고지가 표기되어 있다.
