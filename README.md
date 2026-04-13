# DangGO 펫택시 랜딩페이지

반려동물 전용 택시 서비스 DangGO의 반응형 랜딩페이지입니다.

실제 서비스가 아닌 UI/UX 설계와 퍼블리싱 역량을 정리한 포트폴리오 작업물입니다.

---

## 목차

1. [디자인 시스템](#1-디자인-시스템)
2. [타이포그래피](#2-타이포그래피)
3. [컬러 시스템](#3-컬러-시스템)
4. [스페이싱 & 그리드](#4-스페이싱--그리드)
5. [컴포넌트](#5-컴포넌트)
6. [섹션 구성](#6-섹션-구성)
7. [UX/UI 기획 포인트](#7-uxui-기획-포인트)
8. [반응형 전략](#8-반응형-전략)

---

## 1. 디자인 시스템

CSS Custom Properties로 디자인 토큰을 정의했습니다.
`common.css`에 전역 시스템을 두고, `style.css`는 섹션별 스타일만 담당합니다.

```
assets/css/
├── reset.css       브라우저 기본 스타일 초기화
├── common.css      토큰, 타이포, 컴포넌트, 유틸리티
└── style.css       섹션별 레이아웃
```

---

## 2. 타이포그래피

### 폰트 패밀리

| 역할 | 폰트 | 쓰는 곳 |
|------|------|---------|
| Headline | TmoneyRoundWind | 섹션 타이틀, KV 제목, 카드 제목 |
| Body | Pretendard | 본문, 설명, 배지, 버튼 |

브랜드 톤에 맞게 헤드라인은 둥글고 친근한 TmoneyRoundWind,
본문은 가독성 높은 Pretendard로 역할을 분리했습니다.

### 폰트 스케일

| 토큰 | Desktop | ≤1200px | ≤1024px | ≤767px |
|------|---------|---------|---------|--------|
| `--fs-h1` | 3rem | 2.75rem | 2.5rem | 2.25rem |
| `--fs-h2` | 2.5rem | 2.25rem | 2rem | 1.75rem |
| `--fs-h3` | 2rem | 1.875rem | 1.5rem | 1.25rem |
| `--fs-h4` | 1.5rem | 1.375rem | 1.25rem | 1rem |
| `--fs-b1` | 1rem | 1rem | 0.875rem | 0.875rem |
| `--fs-b2` | 0.875rem | 0.875rem | 0.8125rem | 0.75rem |
| `--fs-badge` | 0.75rem | 0.75rem | 0.75rem | 0.75rem |

### 폰트 웨이트

| 토큰 | 값 | 쓰는 곳 |
|------|-----|---------|
| `--fw-regular` | 400 | 본문, 설명 |
| `--fw-medium` | 500 | 네비게이션, 서브텍스트 |
| `--fw-semibold` | 600 | 배지, 레이블 |
| `--fw-bold` | 700 | 버튼, 카드 제목 |
| `--fw-extrabold` | 800 | 섹션 타이틀, 헤드라인 |

---

## 3. 컬러 시스템

### 토큰

| 토큰 | 값 | 역할 |
|------|-----|------|
| `--color-primary` | `#F5F278` | 브랜드 옐로우. KV 배경, 헤더, 강조 포인트 |
| `--color-point` | `#FF99B0` | 포인트 핑크. 키워드 하이라이트 |
| `--color-black` | `#1E1E1E` | 다크 텍스트, 버튼 |
| `--color-bg` | `#302F32` | 다크 섹션 배경 |
| `--color-text` | `#F9F4EE` | 다크 배경 위 텍스트. 따뜻한 화이트 |
| `--color-white` | `#FFFFFF` | 라이트 섹션 배경 |

### 섹션 배경 흐름

다크 ↔ 라이트를 교차 배치해 스크롤 시 리듬감을 만들었습니다.

```
KV            #F5F278   브랜드 옐로우
About         #302F32   다크
How it works  #FFFFFF   라이트
Features      #302F32   다크
Driver        #FFFFFF   라이트
Review        #302F32   다크
CTA           #FFFFFF   라이트
Footer        #1E1E1E   블랙
```

### 그림자 토큰

| 토큰 | 값 | 쓰는 곳 |
|------|-----|---------|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,.20)` | 카드, 버튼 기본 |
| `--shadow-md` | `0 6px 20px rgba(0,0,0,.30)` | 호버 |
| `--shadow-lg` | `0 12px 40px rgba(0,0,0,.38)` | 플로팅 요소 |
| `--shadow-glow-primary` | `0 4px 20px rgba(245,242,120,.50)` | 옐로우 글로우 |
| `--shadow-glow-point` | `0 4px 20px rgba(255,153,176,.50)` | 핑크 글로우 |

---

## 4. 스페이싱 & 그리드

### 4px 배수 원칙

모든 gap, margin, padding을 4px 배수로 맞췄습니다.

| 토큰 | 값 |
|------|-----|
| `--sp-xs` | 1.25rem (20px) |
| `--sp-sm` | 2.5rem (40px) |
| `--sp-md` | 3.75rem (60px) |
| `--sp-section` | 6.875rem → 모바일 3.75rem |

### 컨테이너

- 최대 너비 `1320px`, 좌우 패딩 `40px`
- 모바일에서 패딩 `20px`으로 축소

### 그리드

| 클래스 | Desktop | Tablet | Mobile |
|--------|---------|--------|--------|
| `.grid-12` | 12컬럼 / gap 24px | 6컬럼 | 1컬럼 |
| `.grid-4` | 4컬럼 / gap 20px | 2컬럼 | 2컬럼 / gap 12px |
| `.grid-2` | 2컬럼 / gap 20px | 2컬럼 | 1컬럼 |

---

## 5. 컴포넌트

### Pill Badge

KV 플로팅 배지, 드라이버 카드 배지에 쓰는 공통 컴포넌트입니다.
CSS 변수로 색상을 주입해 하나의 컴포넌트로 7가지 컬러 변형을 지원합니다.

```
컬러 변형: --yellow / --pink / --white / --dark / --purple / --orange / --green
사이즈 변형: --sm / --lg
```

`border` + `::after` inset border 이중 구조로 입체감을 표현했습니다.

### Button

| 클래스 | 용도 |
|--------|------|
| `.btn-primary` | 옐로우 CTA 버튼 |
| `.btn-app` | 헤더 예약 버튼 |
| `.btn-store` | 앱 다운로드 버튼 |

모든 버튼에 `translateY(-2px)` 호버 인터랙션을 적용했습니다.

### Card

`.card` 기본 클래스에 `#F5F278` 배경, `border-radius: 20px`, 호버 시 `translateY(-4px)`.

---

## 6. 섹션 구성

| # | 섹션 | 목적 |
|---|------|------|
| 1 | Header | 고정 네비게이션. 스크롤 시 다크 전환 |
| 2 | KV | 브랜드 첫인상. 앱 다운로드 유도 |
| 3 | About | 브랜드 슬로건 각인 |
| 4 | How it works | 서비스 이용 흐름 3단계 설명 |
| 5 | Features | 주요 기능 4가지 |
| 6 | Driver | 드라이버 신뢰도 증명 |
| 7 | Review | 사용자 후기로 사회적 증거 제공 |
| 8 | CTA | 앱 다운로드 최종 전환 |
| 9 | Footer | 사업자 정보, SNS |

---

## 7. UX/UI 기획 포인트

### 헤더 스크롤 전환
스크롤 80px 이상이면 헤더가 옐로우에서 다크 반투명(`rgba(30,30,30,0.92)`) + blur로 바뀝니다.
네비 링크 색상도 함께 전환해 어떤 배경에서도 읽힙니다.

### KV 플로팅 배지
4개 배지가 각각 다른 주기(`2.8s ~ 3.6s`)와 딜레이(`0s ~ 1.2s`)로 떠다닙니다.
서비스 핵심 키워드를 자연스럽게 노출하면서 페이지에 생동감을 줍니다.

### How it works 탭
탭이 sticky로 고정되고, 스크롤 위치에 따라 active 상태가 자동으로 바뀝니다.
버튼 클릭 시 smooth scroll 후 800ms 동안 scroll 이벤트의 active 덮어쓰기를 막아
클릭한 탭이 즉시 검은색으로 유지됩니다.

### Driver 카드 슬라이더
- 3.5초 자동 슬라이드 + dot 네비게이션
- `transparent → rgba(0,0,0,0.85)` 그라디언트 오버레이로 자연스러운 페이드
- frosted glass 패널(`backdrop-filter: blur`)로 기사 정보 표시
- `aspect-ratio: 480/620`으로 고정 px 없이 반응형 크기 유지

### Review 마퀴
카드 4장을 복제해 끊김 없는 무한 루프를 만들었습니다.
`width: max-content`로 전체 너비를 자동 계산하고, `calc(-50% - 12px)`로 정확히 절반 이동 후 반복합니다.

### 텍스트 선택 색상
드래그할 때도 브랜드 경험이 이어집니다.
```css
::selection { background-color: #F5F278; color: #1E1E1E; }
```

---

## 8. 반응형 전략

| 구간 | 범위 | 주요 변화 |
|------|------|-----------|
| Desktop | 1025px~ | 기본 레이아웃 |
| Tablet | 768~1024px | 2컬럼 → 1컬럼, 폰트 축소 |
| Mobile | 320~767px | 단일 컬럼, 네비 숨김, 패딩 축소 |

**섹션별 처리**

- Header — 모바일에서 네비, 예약 버튼 숨김
- KV — 2컬럼 → 1컬럼, 택시 이미지 높이 축소
- How it works — 모바일에서 탭 숨김, 단일 컬럼 전환
- Driver — `aspect-ratio` 유지, `max-width: 340px`로 카드 크기 제한
- Features — 4컬럼 → 2컬럼
- CTA — 목업 이미지 상단 배치, 텍스트 중앙 정렬
- Footer — 전체 중앙 정렬, 세로 스택

---

## 기술 스택

- HTML5 / CSS3 (Vanilla)
- CSS Custom Properties
- CSS Grid + Flexbox
- CSS Animation
- Vanilla JavaScript

---

© Danggo Corp. All Rights Reserved
