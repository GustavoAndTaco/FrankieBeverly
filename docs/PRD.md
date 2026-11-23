# PRD: Frankie Beverly & Maze 인터랙티브 디지털 전시 웹사이트

> **부제 (Exhibition Title):** *GOLDEN TIME OF DAY — Maze featuring Frankie Beverly Interactive Digital Exhibition*

---

## 1. 문서 개요 & 프로젝트 정보

| 항목 | 내용 |
| :--- | :--- |
| **프로젝트명** | `FrankieBeverly` |
| **과제 정보** | 멀티미디어 콘텐츠 제작 텀 프로젝트 |
| **작성자** | 20231044 박해신 |
| **문서 버전** | v1.0 (2026-11-24 확정) |
| **GitHub 저장소** | https://github.com/GustavoAndTaco/FrankieBeverly (Public) |
| **배포 목표** | Vercel 무료 웹 호스팅 (과제 제출용 라이브 URL 확보 및 시연) |
| **기술 스택** | Next.js `16.4.6` (App Router, `src/`), React `19.3.0`, TypeScript, Tailwind CSS `4.3.3` |

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

### 3.1 탐색 패턴: 원페이지 스크롤리텔링 (Scrollytelling)
- **흐름**: 인트로(①)부터 헌정 엔딩(⑦)까지 7개 섹션이 하나의 전시 동선처럼 세로 스크롤 서사로 이어진다.
- **고정 미니 내비게이션**:
  - 데스크톱: 상단 미니 바 또는 우측 도트/챕터 인디케이터로 현재 감상 중인 섹션을 실시간 하이라이트하며, 클릭 시 해당 섹션으로 부드럽게 스크롤(`scroll-behavior: smooth`)한다.
  - 모바일: 상단 컴팩트 드롭다운/칩 바 형태로 섹션 점프를 지원한다.
- **글로벌 하단 플로팅 미니 플레이어**:
  - 섹션 ④(바이닐 북)나 섹션 ⑥(나의 큐레이션)에서 곡을 재생한 뒤 다른 섹션으로 스크롤해도 음악이 끊기지 않고 화면 하단에 미니 플레이어가 유지된다.
  - 표시 요소: 회전하는 미니 바이닐 썸네일, 곡명 · 앨범명(연도), 재생/일시정지 버튼, 30초 미리듣기 진행 프로그레스 바, 현재 재생 위치(`0:14 / 0:30`), 닫기/음소거 컨트롤.

### 3.2 언어 및 반응형 기준
- **언어 구성**: 한국어 본문 및 내비게이션 + 영문 아티스트명 · 앨범명 · 곡명 · 에디토리얼 타이포그래피 포인트
- **뷰포트 지원**: 데스크톱 대형 전시 화면(`1280px ~ 1440px+`) 기준의 2면 펼침 경험을 최우선으로 설계하고, 태블릿(`768px ~ 1279px`) 및 모바일(`< 768px`)에서도 깨짐 없이 탐색 가능한 반응형 레이아웃을 제공한다.

---

## 4. 비주얼 디자인 시스템 (Visual Identity & Typography)

### 4.1 컬러 팔레트: 웜 다크 리스닝 룸 + 올화이트 드라마틱 전환
70년대 심야 소울 리스닝 룸의 따뜻하고 깊은 분위기 속에, Maze의 상징인 **올화이트(All-White) 드레스코드**를 공간 배경 전환으로 극대화한다.

| 테마 영역 | 토큰명 | HEX | 용도 |
| :--- | :--- | :--- | :--- |
| **Dark Listening Room**<br>(섹션 ①, ③, ④, ⑤, ⑥) | `Warm Espresso` | `#120E0C` | 기본 배경 |
| | `Vinyl Charcoal` | `#1C1512` | 카드 · 북 커버 · 패널 표면 |
| | `Groove Border` | `#2E231D` | 미세 구분선 · LP 슬리브 보더 |
| | `Cream Text` | `#F5EFE6` | 기본 본문 텍스트 |
| | `Muted Warm Gray` | `#A89B8C` | 캡션 · 메타 정보 · 보조 텍스트 |
| **Retro Sunset Accents**<br>(70s 소울 & 강조) | `Sunset Gold` | `#F4B942` | 주요 CTA · 활성 탭 · 타임라인 포인트 |
| | `Warm Amber` | `#E07A2F` | 인트로 로고 그라데이션 · 호버 하이라이트 |
| | `Soul Terracotta` | `#C4492D` | 70s 선셋 깊이와 포인트 라인 |
| **All-White Gallery**<br>(섹션 ② 정체성, 섹션 ⑦ 헌정) | `Gallery Ivory` | `#FAF8F5` | 올화이트 전환 섹션 배경 |
| | `Crisp White` | `#FFFFFF` | 카드 · 강조 프레임 표면 |
| | `Deep Ink` | `#181310` | 라이트 섹션 본문 텍스트 |
| | `Warm Bronze` | `#8C6A4A` | 라이트 섹션 포인트 라벨 · 구분선 |

- **아날로그 텍스처**: 전체 화면에 아주 낮은 불투명도(`opacity: 0.03~0.04`)의 SVG/CSS 필름 그레인 오버레이(`pointer-events: none`)를 적용해 과도한 GPU 부담 없이 빈티지 LP 슬리브 질감을 살린다.

### 4.2 타이포그래피 시스템

#### ① 인트로 메인 로고 (`Monoton` + 레트로 선셋 그라데이션)
- **전용 폰트**: Google Fonts **`Monoton`** (`weight: 400`)
- **적용 대상**: 인트로(섹션 ①)의 `MAZE featuring FRANKIE BEVERLY` 메인 디스플레이 로고
- **레트로 그라데이션 스타일**: 70년대 네온·선셋 바이닐 포스터 감성을 살리기 위해 텍스트 클리핑 그라데이션(`background-clip: text; color: transparent;`)과 은은한 앰버 글로우(`drop-shadow`)를 조합한다.
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

#### ② 에디토리얼 헤딩 & 본문 폰트
- **영문 세리프 헤딩 · 연도 · 인용구**: `Cormorant Garamond` 또는 `Playfair Display` (`next/font/google`) — 전시 도록의 우아한 대비 형성
- **한국어 본문 · UI · 트랙리스트**: `Noto Sans KR` (`next/font/google`) 또는 `Pretendard` — 긴 해설 텍스트의 가독성 확보

---

## 5. 전체 와이어프레임 & 7개 섹션 상세 명세

### 5.1 전체 원페이지 스크롤 와이어프레임 (Desktop View)

```text
+------------------------------------------------------------------------------+
| [LOGO] MAZE / F.BEVERLY   [①인트로][②정체성][③타임라인][④바이닐북][⑤라이브][⑥큐레이션][⑦헌정] |
+------------------------------------------------------------------------------+
|                                                                              |
|  [① 인트로: Warm Dark Stage (#120E0C)]                                        |
|     - 배경: 느리게 회전하는 반투명 대형 바이닐 실루엣 + 선셋 글로우           |
|     - 중앙: Monoton 폰트 + 레트로 선셋 그라데이션 로고                        |
|             "MAZE featuring FRANKIE BEVERLY"                                 |
|     - 부제: "GOLDEN TIME OF DAY · 디지털 소울 아카이브 전시"                  |
|     - CTA : [ 전시 관람 시작 ↓ ]                                             |
|                                                                              |
+==============================================================================+
|  [② 아티스트 정체성: Dramatic All-White 전환 (#FAF8F5)]                        |
|     +-----------------------------+  +------------------------------------+  |
|     | [CC 아티스트 사진 /         |  | 공식 명칭: Maze featuring Frankie   |  |
|     |  올화이트 상징 SVG 프레임]   |  |  Beverly (작사·작곡·프로듀싱 총괄)  |  |
|     |  "All-White Dress Code"     |  | · 마빈 게이(Marvin Gaye)와의 인연    |  |
|     +-----------------------------+  | · Essence Festival 15년 폐막 헤드라이너|
|                                      +------------------------------------+  |
+==============================================================================+
|  [③ 시대별 타임라인: Warm Dark (#120E0C)]                                     |
|     [ 1960s ] ── [ 1970s ] ── [ 1980s ] ── [ 1990s ] ── [ 2000s–2024+ ]      |
|     +--------------------------------------------------------------------+   |
|     | 선택된 시대의 스토리 카드 · 핵심 키워드 · 대표 전환점 인포그래픽     |   |
|     +--------------------------------------------------------------------+   |
+==============================================================================+
|  [④ 디스코그래피: 거대한 바이닐 앤솔로지 북 (Core Showcase)]                   |
|     < 책장 넘기기 >  [ 9 Spreads: 1977 ~ 1993 정규 8장 + Live in New Orleans ]|
|     +----------------------------------+----------------------------------+  |
|     |  LEFT PAGE: 앨범 커버 & 해설      |  RIGHT PAGE: LP 슬리브 & 바이닐  |  |
|     |  (트랙리스트 / 레이블 / 연도)     |  (재생 시 LP가 빠져나와 회전)    |  |
|     +----------------------------------+----------------------------------+  |
|     [ 01 ] [ 02 ] [ 03 ] [ 04 ] [ 05 ★Live ] [ 06 ] [ 07 ] [ 08 ] [ 09 ]    |
+==============================================================================+
|  [⑤ 사운드 & 라이브: Warm Dark (#1C1512)]                                     |
|     [시그니처 사운드 3요소 카드] + [실시간 리듬 비주얼라이저 바]              |
|     +--------------------------------------------------------------------+   |
|     | YouTube 공식 라이브 퍼포먼스 Embed + Live in LA(86)/London(95) 해설 |   |
|     +--------------------------------------------------------------------+   |
+==============================================================================+
|  [⑥ 나의 큐레이션: Personal Liner Notes (#120E0C)]                           |
|     "내가 거의 매일 Maze를 듣는 이유" (개인 감상 에세이)                      |
|     [Pick 1: Can't Get Over You] [Pick 2: We Are One] [Pick 3~4: 입문 추천]  |
+==============================================================================+
|  [⑦ 엔딩 & 헌정 크레딧: All-White 회귀 (#FAF8F5)]                             |
|     "In Loving Memory of Frankie Beverly (1946–2024)"                        |
|     [ 맨 위로 ↑ ] [ 바이닐 북 다시 보기 ]                                     |
|     비상업적 교육 과제 고지 & 음원·영상·이미지 출처 크레딧                   |
+------------------------------------------------------------------------------+
| [● 미니 LP]  Can't Get Over You — Silky Soul (1989)    [▶/❚❚]  ────●─── 0:14 |
+------------------------------------------------------------------------------+
```

### 5.2 섹션별 상세 명세

#### ① 인트로 (Hero)
- **목적**: 전시의 주제와 레트로 소울 무드를 첫 화면(First Fold)에서 강렬하게 각인
- **구성 요소**:
  - `Monoton` 폰트 + 레트로 선셋 그라데이션이 적용된 메인 로고 (`MAZE` / `featuring FRANKIE BEVERLY`)
  - 1977–2024 연대 뱃지 및 한국어 전시 부제
  - 배경 중앙/우측에 아주 느리게 회전하는 바이닐 그루브 SVG 실루엣과 선셋 앰버 오라
  - `[전시 관람 시작 ↓]` 버튼 클릭 시 섹션 ②로 부드럽게 스크롤

#### ② 아티스트 정체성 (All-White 드라마틱 전환)
- **목적**: 짙은 다크 배경에서 밝은 아이보리/화이트(`#FAF8F5`)로 배경이 전환되며, Maze를 상징하는 **올화이트(All-White)** 미학을 시각적으로 체험시킴
- **핵심 콘텐츠 (팩트 체크 반영)**:
  - **공식 표기**: *Maze featuring Frankie Beverly* (거의 모든 곡을 프랭키 베벌리가 직접 작사·작곡·프로듀싱한 싱어송라이터 주도 밴드)
  - **마빈 게이(Marvin Gaye)와의 인연**: 샌프란시스코에서 *Raw Soul*로 활동하던 시절 마빈 게이에게 발탁되어 투어 오프닝을 맡았고, 마빈 게이의 제안으로 1976년 **Maze**로 개명하며 Capitol Records 계약을 성사시킴
  - **올화이트 드레스코드 & 커뮤니티**: 무대 위 멤버들이 입던 흰색 의상을 팬들이 객석에서 똑같이 맞춰 입기 시작하며 전설적인 전통으로 자리 잡음. 뉴올리언스 **Essence Festival** 최초 15년 연속 폐막 헤드라이너로서 흑인 음악·가족·공동체 문화를 대표

#### ③ 시대별 타임라인 (Timeline)
- **목적**: 밴드의 반세기 역사를 5개 시대로 나누어 탐색(상단/좌측 시대 버튼 클릭 + 스크롤 전환 연동)
- **5단계 연대기 (팩트 체크 반영)**:
  1. **`1960s` 필라델피아 뿌리**: 본명 Howard Stanley Beverly(1946년 12월 6일 필라델피아 출생). 고스펠·두왑으로 음악을 시작해 1963년 *The Butlers* 결성, 프로듀서 Kenny Gamble과 작업하며 영국 Northern Soul 씬에서 컬트적 지지를 얻음
  2. **`1970s` 서부 이주와 도약**: 1970년경 샌프란시스코로 거점을 옮겨 *Raw Soul*로 개명 → 마빈 게이 투어 오프닝 발탁 → 1976년 *Maze*로 팀명 변경 → 1977년 Capitol Records 데뷔작 발표 후 골드 앨범 행진 시작
  3. **`1980s` 골든 에라와 라이브 전설**: *Joy and Pain*(1980), 대표곡 `"Before I Let Go"`가 담긴 더블 라이브 앨범 *Live in New Orleans*(1981), *We Are One*(1983), *Can't Stop the Love*(1985), *Live in Los Angeles*(1986)로 R&B 최전성기 구가
  4. **`1990s` Warner Bros. 이적과 성숙기**: Warner Bros. Records로 레이블을 옮겨 *Silky Soul*(1989)과 *Back to Basics*(1993) 발매, 1995년 런던 해머스미스 오데온 공연(*Live in London*, 2003 DVD)으로 해외 라이브 역량 입증
  5. **`2000s–2024+` 세대를 잇는 유산**: Essence Festival의 상징적 존재감, 2019년 비욘세(Beyoncé)의 `"Before I Let Go"` 리메이크로 신세대에 재발견, 2024년 3월 *"I Wanna Thank You"* 고별 투어 및 후계 밴드(*Maze Honoring Frankie Beverly*, 보컬 Tony Lindsay) 출범, **2024년 9월 10일 향년 77세 별세** 이후까지 살아 숨 쉬는 유산

#### ④ 디스코그래피 — 핵심 쇼케이스: “거대한 바이닐 앤솔로지 북 (Vinyl Gatefold Book)”
- **핵심 컨셉**: 화면 중앙에 거대한 하드커버 게이트폴드(Gatefold) 아카이브 북이 펼쳐진다. 책의 각 장은 단순한 종이가 아니라 **앨범 슬리브(좌측)와 LP 바이닐 포켓(우측)이 한 쌍을 이루는 하나의 음반 장(Spread)**이다.

##### 바이닐 북 상세 와이어프레임 (2면 펼침 구조)
```text
   [ Page 08 / 09 ]  Warner Bros. Era · 1989
  +-----------------------------------+-----------------------------------+
  |  ◀ 이전 장                        |                        다음 장 ▶  |
  |                                   |                                   |
  |   +---------------------------+   |        . - ~ ~ ~ - .              |
  |   |                           |   |     . '   _______   ' .           |
  |   |     [ Album Artwork ]     |   |    /    /  LP   \    \ ──▶ (재생 시 |
  |   |        Silky Soul         |   |   |    | (●) ●●  |   |   슬리브에서|
  |   |                           |   |    \    \_______/    /   나와 회전)|
  |   +---------------------------+   |     ' .           . '             |
  |                                   |        ' - . . - '                |
  |   1989 · Warner Bros. Records     |   +---------------------------+   |
  |   Silky Soul                      |   | ★ Featured Track (30s)    |   |
  |   ─────────────────────────────   |   |   "Can't Get Over You"    |   |
  |   [해설] 레이블 이적 후 발표한     |   |   [ ▶ 30초 미리듣기 ]      |   |
  |   성숙한 Quiet Storm 사운드...    |   |   [ Spotify ] [ YouTube ] |   |
  |                                   |   +---------------------------+   |
  |   [Tracklist] 1. Silky Soul ...   |                                   |
  |   4. Can't Get Over You ★ ...     |                  [모서리 플립 ↗]  |
  +-----------------------------------+-----------------------------------+
  [ 01 '77 ][ 02 '78 ][ 03 '79 ][ 04 '80 ][ 05 '81★ ][ 06 '83 ][ 07 '85 ][ 08 '89 ][ 09 '93 ]
```
- **인터랙션 명세**:
  - **LP 꺼내기 & 회전**: 우측 페이지의 `[▶ 30초 미리듣기]` 또는 LP 디스크를 클릭하면 바이닐이 슬리브 포켓에서 부드럽게 미끄러져 나와(`translateX`) 33⅓ RPM 감성으로 회전(`rotate`)하며 오디오가 재생된다.
  - **책장 넘기기 (3D Flip)**: 좌/우 네비게이션 버튼, 우측 하단 접힌 모서리(Page Curl) 클릭, 키보드 `←`/`→` 방향키, 하단 9장 챕터 탭 클릭을 모두 지원한다.
  - **장 전환 시퀀스**: 다른 장으로 넘기면 빠져나와 있던 LP가 슬리브 안으로 복귀한 뒤, 중앙 스파인(Spine)을 축으로 3D `perspective(1800px)` + `rotateY` 플립 모션과 그림자 이동이 일어나며 다음 앨범 장이 펼쳐진다.
  - **모바일 반응형**: 좁은 화면에서는 위/아래 스택 또는 스와이프 가능한 단일 카드 뷰로 전환되어 커버·해설·회전 바이닐을 불편 없이 감상할 수 있다.

- **확정 수록 9장 데이터 (1977~1993 정규 8장 + 스페셜 라이브 1장, 앨범당 대표곡 1곡)**:

| 장 | 연도 | 앨범명 | 레이블 | 구분 | 대표곡 (30초 미리듣기 1곡) | 비고 |
| :-: | :-: | :--- | :--- | :---: | :--- | :--- |
| **01** | 1977 | *Maze Featuring Frankie Beverly* | Capitol Records | 정규 1집 | `"Happy Feelin's"` | 데뷔작, 골드 인증 |
| **02** | 1978 | *Golden Time of Day* | Capitol Records | 정규 2집 | `"Golden Time of Day"` | 전시 부제 동명 명반 |
| **03** | 1979 | *Inspiration* | Capitol Records | 정규 3집 | `"Feel That You're Feelin'"` | 소울·펑크 완숙기 |
| **04** | 1980 | *Joy and Pain* | Capitol Records | 정규 4집 | `"Joy and Pain"` | `"Southern Girl"` 수록 |
| **05** | 1981 | ***Live in New Orleans*** | Capitol Records | **스페셜 라이브** | **`"Before I Let Go"`** | Saenger Theatre 실황 + 스튜디오 4트랙 |
| **06** | 1983 | *We Are One* | Capitol Records | 정규 5집 | **`"We Are One"`** | **작성자 최애곡 ★** |
| **07** | 1985 | *Can't Stop the Love* | Capitol Records | 정규 6집 | `"Back in Stride"` | R&B 차트 1위 싱글 수록 |
| **08** | 1989 | *Silky Soul* | Warner Bros. Records | 정규 7집 | **`"Can't Get Over You"`** | **작성자 최애곡 ★ (지정)** |
| **09** | 1993 | *Back to Basics* | Warner Bros. Records | 정규 8집 | `"Laid Back Girl"` *(또는 `"The Morning After"`)* | 마지막 정규 스튜디오 앨범 |

> *참고: 1986년 Capitol 라이브 앨범 `Live in Los Angeles` 및 1995년/2003년 DVD `Live in London`은 정규 8장+`Live in New Orleans` 중심 책 구성의 응집도를 지키기 위해 섹션 ⑤(사운드 & 라이브)에서 핵심 아카이브로 다룬다.*

#### ⑤ 사운드 & 라이브 (Sound & Live)
- **목적**: Maze가 단순한 스튜디오 밴드가 아니라 ‘라이브에서 완성되는 밴드’임을 청각적·시각적으로 설명
- **구성 요소**:
  - **시그니처 사운드 3요소 카드**:
    1. *온기 있는 보컬 & 프레이징*: 과장된 고음 기교보다 진정성과 여운으로 파고드는 프랭키 베벌리의 보컬
    2. *콩가(Conga) & 느긋한 그루브*: 자극적인 비트 대신 몸을 맡기게 되는 퍼커션과 베이스라인
    3. *콜 앤 리스폰스(Call & Response)*: 무대와 올화이트 관객이 한목소리로 완성하는 라이브 호흡
  - **리듬 비주얼라이저**: 현재 오디오 재생 상태에 반응해 물결치는 웜 골드/앰버 이퀄라이저 바(재생 중일 때 활성, 정지 시 대기 웨이브)
  - **공식 라이브 영상 Embed**: YouTube(`youtube-nocookie.com`) 공식 라이브 퍼포먼스 영상 1~2편 임베드 + *Live in Los Angeles*(1986), *Live in London*(1995/2003 DVD) 해설 카드

#### ⑥ 나의 큐레이션 (Personal Liner Notes)
- **목적**: 계획서 `나. 제작 목표`의 **‘개인적인 관점의 표현’**과 `추천` 섹션을 전시의 진정성 있는 클라이맥스로 구현
- **구성 요소**:
  - **큐레이터 노트(에세이)**: 소울·R&B 장르를 접한 뒤 거의 매일 들을 정도로 Maze에 빠지게 된 계기와 개인적 감상 (`src/data/curation.ts`에 분리하여 언제든 손쉽게 수정·확장 가능)
  - **인터랙티브 ‘라이너 노트’ 카드 (4곡)**: 카드를 클릭/확장하면 작성자의 개인 감상평과 함께 **30초 미리듣기** 또는 **Spotify/YouTube 전체 곡 링크**를 바로 실행할 수 있다.
    - **Pick 01 (최애곡 ★)**: `"Can't Get Over You"` (*Silky Soul*, 1989)
    - **Pick 02 (최애곡 ★)**: `"We Are One"` (*We Are One*, 1983)
    - **Pick 03 (입문 추천)**: `"Before I Let Go"` (*Live in New Orleans*, 1981)
    - **Pick 04 (분위기 추천)**: `"Golden Time of Day"` (*Golden Time of Day*, 1978)

#### ⑦ 엔딩 & 헌정 크레딧 (All-White 전환)
- **목적**: 다시 순백의 올화이트 공간(`#FAF8F5`)으로 전환하며 여운 있는 마무리와 저작권/출처 고지 제공
- **구성 요소**:
  - 헌정 메시지: *In Loving Memory of Frankie Beverly (1946–2024)*
  - 액션 버튼: `[ 처음(인트로)으로 돌아가기 ↑ ]` · `[ 바이닐 북 다시 펼쳐보기 ]`
  - **비상업적 교육 과제 고지 & 멀티미디어 출처 크레딧 블록**

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
- **추가 도입 예정 패키지**:
  - `lucide-react`: 미니 플레이어, 책장 넘김 화살표, 사운드/외부 링크 아이콘
  - `motion` (Framer Motion의 React 19 호환 최신 패키지): 3D 바이닐 북 플립, 슬리브에서 LP 꺼내기, 스크롤 섹션 전환 애니메이션
- **`next.config.ts` 설정 계획**:
  - `images.remotePatterns`에 `is1-ssl.mzstatic.com`(iTunes 앨범 커버) 및 `upload.wikimedia.org`(Wikimedia CC 이미지) 등록

### 7.2 성능 최적화 전략 (9장 바이닐 북이 무거워지지 않는 설계)
1. **온디맨드 단일 오디오 스트리밍 (`AudioPlayerContext`)**: 페이지 로드 시 9곡을 미리 받지 않고, 사용자가 특정 장에서 재생을 클릭할 때만 단 1개의 전역 `<audio>` 인스턴스에 `previewUrl`을 연결한다.
2. **인접 스프레드 프리페치**: 바이닐 북은 현재 펼쳐진 장(`activeIndex`)과 직전·직후 장(`activeIndex ± 1`)의 커버 이미지만 우선 로드하고 나머지는 지연 로딩한다.
3. **GPU 합성 레이어 모션**: 페이지 3D 플립과 LP 회전은 레이아웃 재계산(Reflow)을 유발하지 않는 `transform`(`rotateY`, `translate3d`, `rotate`)과 `opacity`만 사용한다.
4. **접근성 배려**: OS의 `prefers-reduced-motion: reduce` 설정이 켜진 경우 과도한 3D 회전/플립 모션을 부드러운 페이드로 자동 완화한다.

### 7.3 제안 디렉터리 구조 (`src/`)

```text
src/
├── app/
│   ├── api/
│   │   └── itunes/
│   │       └── route.ts          # Apple iTunes Search API 서버 프록시 & 캐시
│   ├── globals.css               # 컬러 토큰, 그레인 오버레이, 바이닐/책장 유틸리티
│   ├── layout.tsx                # Monoton, Cormorant Garamond, Noto Sans KR 폰트 & AudioProvider
│   └── page.tsx                  # 7개 섹션 원페이지 스크롤리텔링 조립
├── context/
│   └── AudioPlayerContext.tsx    # 전역 단일 <audio> 제어, 진행률, 현재 재생 트랙 상태
├── data/
│   ├── albums.ts                 # 1977~1993 9장 바이닐 북 데이터 (트랙리스트, 대표곡, 해설)
│   ├── timeline.ts               # 5단계 시대별 타임라인 데이터 (1960s~2024+)
│   ├── curation.ts               # 작성자 에세이 & 최애곡/추천곡 라이너 노트 데이터
│   └── media.ts                  # YouTube 라이브 영상 ID, Wikimedia CC 이미지 출처 메타데이터
└── components/
    ├── layout/
    │   ├── StickyNav.tsx         # 섹션 추적 고정 미니 내비게이션
    │   └── MiniPlayer.tsx        # 하단 플로팅 미니 바이닐 플레이어
    ├── sections/
    │   ├── IntroSection.tsx      # ① Monoton 레트로 그라데이션 로고 히어로
    │   ├── IdentitySection.tsx   # ② All-White 드라마틱 전환 & 정체성
    │   ├── TimelineSection.tsx   # ③ 5단계 시대별 타임라인
    │   ├── DiscographySection.tsx# ④ 바이닐 앤솔로지 북 래퍼
    │   ├── SoundLiveSection.tsx  # ⑤ 사운드 특징, 비주얼라이저, YouTube 라이브
    │   ├── CurationSection.tsx   # ⑥ 개인 에세이 & 라이너 노트 카드
    │   └── EndingSection.tsx     # ⑦ All-White 헌정 엔딩 & 저작권 크레딧
    └── vinyl-book/
        ├── VinylBook.tsx         # 2면 스프레드 3D 플립 컨테이너 & 키보드/버튼 제어
        ├── AlbumLeftPage.tsx     # 좌측: 커버, 레이블/연도, 해설, 트랙리스트
        └── VinylRightPage.tsx    # 우측: 슬리브 포켓, LP 꺼내기/회전, 30초 재생 컨트롤
```

---

## 8. 단계별 구현 로드맵 & 완료 기준 (Acceptance Criteria)

### 8.1 구현 마일스톤
- **Phase 1 — 디자인 시스템 & 데이터 레이어 구축**: 컬러 토큰/폰트(`Monoton` 포함) 세팅, `src/data/*` 팩트 기반 데이터 작성, `/api/itunes` Route Handler 구현 및 커버·미리듣기 URL 검증
- **Phase 2 — 상단 서사 섹션(①~③) & 내비게이션 구현**: 인트로 레트로 그라데이션 로고, 올화이트 전환 섹션 ②, 시대별 타임라인 섹션 ③, `StickyNav` 연동
- **Phase 3 — 핵심 쇼케이스 ④ ‘바이닐 앤솔로지 북’ & 미니 플레이어**: 9장 3D 책장 넘김, LP 슬리브 출입/회전 애니메이션, `AudioPlayerContext` 및 하단 `MiniPlayer` 완성
- **Phase 4 — 하단 서사 섹션(⑤~⑦) 완성**: 사운드 특징 & 리듬 비주얼라이저, YouTube 라이브 임베드, 나의 큐레이션 카드(`Can't Get Over You`, `We Are One` 강조), 헌정 엔딩 & 저작권 크레딧
- **Phase 5 — 반응형·성능 검수 & Vercel 배포**: 모바일/데스크톱 크로스 체크, `npm run lint` & `npm run build` 통과, Vercel 프로덕션 배포 및 최종 발표 테스트

### 8.2 최종 완료 기준 (Checklist)
- [ ] `npm run lint` 및 `npm run build`가 오류 없이 통과한다.
- [ ] 인트로 메인 로고에 Google Fonts `Monoton`과 레트로 선셋 그라데이션이 선명하게 적용된다.
- [ ] 섹션 ②와 ⑦에서 웜 다크 배경에서 올화이트(`#FAF8F5`)로의 시각적 전환이 자연스럽게 작동한다.
- [ ] 바이닐 앤솔로지 북의 **9장 전체(1977~1993 정규 8장 + *Live in New Orleans* 1981)**를 넘길 수 있으며, *Silky Soul* 대표곡 `"Can't Get Over You"`와 *We Are One* 대표곡 `"We Are One"`을 포함해 9곡 모두 30초 미리듣기(또는 폴백 임베드)와 LP 회전 모션이 정상 동작한다.
- [ ] 스크롤 이동 시에도 하단 플로팅 미니 플레이어가 재생 상태를 유지한다.
- [ ] 상업 음원 파일이 리포지토리에 포함되지 않았으며, 엔딩 섹션에 비상업적 교육 과제 고지 및 이미지·음원·영상 출처가 빠짐없이 표기되어 있다.
- [ ] Vercel 배포 URL에서 데스크톱 및 모바일 화면 모두 레이아웃 깨짐 없이 동작한다.
