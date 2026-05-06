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
     * Bootstrap
     * ========================================================== */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initHeaderScroll();
            initDriverSlider();
        });
    } else {
        initHeaderScroll();
        initDriverSlider();
    }
})();
