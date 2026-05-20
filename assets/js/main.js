/**
 * DangGO Landing — Main Script
 *
 * 1. Header  : 스크롤 시 다크 전환
 * 2. Driver  : 자동 슬라이드 + dot 네비 + swipe/drag
 */

(() => {
    'use strict';

    /* ==========================================================
     * 1. Header Scroll Toggle
     * ========================================================== */
    const initHeaderScroll = () => {
        const header = document.querySelector('.header');
        if (!header) return;

        const SCROLL_THRESHOLD = 80;
        const onScroll = () => {
            header.classList.toggle('header--scrolled', window.scrollY > SCROLL_THRESHOLD);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // 초기 상태 동기화
    };


    /* ==========================================================
     * 2. Driver Slider
     *    - 자동 슬라이드 (3.5s)
     *    - dot 네비게이션
     *    - touch swipe / mouse drag
     * ========================================================== */
    const initDriverSlider = () => {
        const items = document.querySelectorAll('.driver__slide-item');
        const dots  = document.querySelectorAll('.driver__dot');
        const track = document.querySelector('.driver__slides');

        if (!items.length || !dots.length || !track) return;

        const AUTO_INTERVAL = 3500;
        const SWIPE_THRESHOLD = 40;

        let currentIndex = 0;
        let autoTimer = null;

        const goTo = (idx) => {
            items[currentIndex].classList.remove('is-active');
            dots[currentIndex].classList.remove('is-active');

            currentIndex = (idx + items.length) % items.length;

            items[currentIndex].classList.add('is-active');
            dots[currentIndex].classList.add('is-active');
        };

        const startAuto = () => {
            stopAuto();
            autoTimer = setInterval(() => goTo(currentIndex + 1), AUTO_INTERVAL);
        };

        const stopAuto = () => {
            if (autoTimer) clearInterval(autoTimer);
            autoTimer = null;
        };

        const restartAuto = () => {
            stopAuto();
            startAuto();
        };

        // dot 클릭
        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.dataset.index, 10);
                if (Number.isNaN(idx)) return;
                goTo(idx);
                restartAuto();
            });
        });

        // touch swipe
        let touchStartX = 0;
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > SWIPE_THRESHOLD) {
                goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
                restartAuto();
            }
        }, { passive: true });

        // mouse drag (PC)
        let mouseStartX = 0;
        let isDragging = false;

        track.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            isDragging = true;
        });

        track.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const diff = mouseStartX - e.clientX;
            if (Math.abs(diff) > SWIPE_THRESHOLD) {
                goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
                restartAuto();
            }
        });

        track.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        startAuto();
    };


    /* ==========================================================
     * 3. Kakao Map - Pet Places
     * ========================================================== */
    const initKakaoMap = () => {
        const mapContainer = document.getElementById('kakao-map');
        if (!mapContainer) {
            console.log('Map container not found');
            return;
        }
        
        if (typeof kakao === 'undefined' || !kakao.maps) {
            console.log('Kakao maps not loaded yet');
            return;
        }

        try {
            // 지도 중심 좌표 (서울 중심)
            const mapCenter = new kakao.maps.LatLng(37.5665, 126.9780);
            
            const mapOption = {
                center: mapCenter,
                level: 8 // 확대 레벨 (1~14, 숫자가 클수록 넓은 범위)
            };

            const map = new kakao.maps.Map(mapContainer, mapOption);

            // 댕고가 엄선한 펫플레이스 데이터
            const petPlaces = [
                // 강남구
                { name: '강남 24시 동물병원', lat: 37.4979, lng: 127.0276, type: '병원' },
                { name: '펫프렌즈 강남점', lat: 37.5012, lng: 127.0396, type: '미용' },
                { name: '도그파크 강남', lat: 37.5089, lng: 127.0632, type: '놀이터' },
                
                // 서초구
                { name: '서초 동물메디컬센터', lat: 37.4833, lng: 127.0322, type: '병원' },
                { name: '펫살롱 서초', lat: 37.4876, lng: 127.0145, type: '미용' },
                
                // 송파구
                { name: '송파 펫케어센터', lat: 37.5145, lng: 127.1059, type: '병원' },
                { name: '몽실펫호텔', lat: 37.5048, lng: 127.0891, type: '호텔' },
                
                // 마포구
                { name: '마포 동물병원', lat: 37.5663, lng: 126.9019, type: '병원' },
                { name: '댕댕이 미용실 홍대점', lat: 37.5563, lng: 126.9236, type: '미용' },
                { name: '펫파크 상암', lat: 37.5794, lng: 126.8895, type: '놀이터' },
                
                // 용산구
                { name: '용산 펫클리닉', lat: 37.5311, lng: 126.9810, type: '병원' },
                { name: '한강 펫파크', lat: 37.5219, lng: 126.9524, type: '놀이터' },
                
                // 성동구
                { name: '성수 동물병원', lat: 37.5443, lng: 127.0557, type: '병원' },
                { name: '펫스파 성수', lat: 37.5465, lng: 127.0467, type: '미용' },
                
                // 광진구
                { name: '건대 24시 동물병원', lat: 37.5403, lng: 127.0695, type: '병원' },
                
                // 강서구
                { name: '마곡 펫메디컬', lat: 37.5614, lng: 126.8253, type: '병원' },
                { name: '펫호텔 강서', lat: 37.5509, lng: 126.8495, type: '호텔' },
                
                // 영등포구
                { name: '여의도 동물병원', lat: 37.5219, lng: 126.9245, type: '병원' },
                
                // 종로구
                { name: '종로 펫클리닉', lat: 37.5720, lng: 126.9910, type: '병원' },
            ];

            // 마커 이미지 설정 (타입별 색상)
            const markerColors = {
                '병원': '#FF6B6B',   // 빨강
                '미용': '#4ECDC4',   // 청록
                '호텔': '#FFD93D',   // 노랑
                '놀이터': '#95E1D3'  // 민트
            };

            // 커스텀 오버레이 스타일
            const createMarkerContent = (place) => {
                const color = markerColors[place.type] || '#FF6B6B';
                const emoji = place.type === '병원' ? '🏥' : 
                             place.type === '미용' ? '✂️' : 
                             place.type === '호텔' ? '🏨' : '🎾';
                
                return `
                    <div style="
                        padding: 8px 12px;
                        background: ${color};
                        color: white;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: 600;
                        white-space: nowrap;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                        cursor: pointer;
                        transition: transform 0.2s;
                    " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                        <span style="margin-right: 4px;">${emoji}</span>
                        ${place.name}
                    </div>
                `;
            };

            // 마커 생성
            petPlaces.forEach(place => {
                const position = new kakao.maps.LatLng(place.lat, place.lng);
                
                // 커스텀 오버레이로 마커 생성
                const customOverlay = new kakao.maps.CustomOverlay({
                    position: position,
                    content: createMarkerContent(place),
                    yAnchor: 1
                });

                customOverlay.setMap(map);
            });

            // 지도 컨트롤 추가
            const zoomControl = new kakao.maps.ZoomControl();
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
            
            console.log('Map initialized successfully with', petPlaces.length, 'places');
        } catch (error) {
            console.error('Error initializing map:', error);
        }
    };


    /* ==========================================================
     * Bootstrap
     * ========================================================== */
    const init = () => {
        initHeaderScroll();
        initDriverSlider();
        
        // 카카오맵은 window.load 이후에 초기화
        if (document.readyState === 'complete') {
            initKakaoMap();
        } else {
            window.addEventListener('load', initKakaoMap);
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
