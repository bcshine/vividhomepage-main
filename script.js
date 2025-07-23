// 로그인 버튼 클릭 이벤트
document.querySelector('.login-btn').addEventListener('click', function() {
    alert('로그인 기능은 준비중입니다.');
});

// 스크롤시 헤더 스타일 변경
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'white';
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

// =========================
// 히어로 캐러셀 기능 구현
// =========================

// 슬라이드 요소들을 모두 가져와요
const slides = document.querySelectorAll('.carousel-slide');
// 왼쪽, 오른쪽 화살표 버튼을 가져와요
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');

let currentSlide = 0; // 현재 보여지는 슬라이드 번호
let slideInterval = null; // 자동 슬라이드 타이머

// 슬라이드를 보여주는 함수
function showSlide(idx) {
    // 모든 슬라이드에서 active 클래스 제거
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
    });
    // 선택한 슬라이드에 active 클래스 추가
    slides[idx].classList.add('active');
    currentSlide = idx;
}

// 다음 슬라이드로 이동하는 함수
function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

// 이전 슬라이드로 이동하는 함수
function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
}

// 자동 슬라이드 시작 함수
function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000); // 4초마다 다음 슬라이드로 이동
}

// 자동 슬라이드 멈추기 함수
function stopAutoSlide() {
    clearInterval(slideInterval);
}

// 화살표 버튼에 클릭 이벤트 추가
leftArrow.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});
rightArrow.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
});

// 캐러셀에 마우스를 올리면 자동 슬라이드 멈춤, 내리면 다시 시작
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', stopAutoSlide);
carousel.addEventListener('mouseleave', startAutoSlide);

// 페이지가 열리면 첫 슬라이드 보여주고 자동 슬라이드 시작
showSlide(0);
startAutoSlide(); 

// =========================
// 제품 더보기 버튼 기능 구현
// =========================
// 모든 더보기 버튼을 찾아요
const moreBtns = document.querySelectorAll('.more-btn');

moreBtns.forEach((btn) => {
    btn.addEventListener('click', function() {
        // 버튼이 속한 카드에서 short, full 설명을 찾아요
        const card = btn.closest('.product-card');
        const shortDesc = card.querySelector('.product-desc.short');
        const fullDesc = card.querySelector('.product-desc.full');
        // short가 보이면 full을 보여주고, 버튼 텍스트를 '닫기'로
        if (shortDesc.style.display !== 'none') {
            shortDesc.style.display = 'none';
            fullDesc.style.display = 'block';
            btn.textContent = '닫기';
        } else {
            shortDesc.style.display = '';
            fullDesc.style.display = 'none';
            btn.textContent = '더보기';
        }
    });
}); 

// =========================
// 브랜드 히스토리 더보기 버튼 기능 구현 (사장님 인사말) - 제품 가이드와 동일한 방식
// =========================
// 웹페이지에서 더보기 버튼을 찾아요 (제품 가이드와 동일)
const brandMoreBtn = document.querySelector('.brand-more-btn');
// 짧게 보이는 텍스트 부분을 찾아요 (일부만 보이는 부분)
const brandShort = document.querySelector('.brand-history-desc.short');
// 전체 텍스트 부분을 찾아요 (더보기 클릭시 보이는 부분)
const brandFull = document.querySelector('.brand-history-desc.full');

// 모든 요소가 제대로 있는지 확인해요 (제품 가이드와 동일한 방식)
if (brandMoreBtn && brandShort && brandFull) {
    // 더보기 버튼을 클릭했을 때 실행되는 기능 (제품 가이드처럼 한 버튼으로 처리)
    brandMoreBtn.addEventListener('click', function() {
        // short가 보이면 full을 보여주고, 버튼 텍스트를 '닫기'로 (제품 가이드와 동일한 로직)
        if (brandShort.style.display !== 'none') {
            // 짧은 텍스트는 숨겨요 (안보이게)
            brandShort.style.display = 'none';
            // 전체 텍스트는 보여줘요 (보이게)
            brandFull.style.display = 'block';
            // 버튼 텍스트를 '닫기'로 변경 (제품 가이드와 동일)
            brandMoreBtn.textContent = '닫기';
            
            // 모바일과 웹 모두에서 추가 여백을 제공해요 (텍스트가 길어져서)
            const brandSection = document.querySelector('.brand-history-section');
            if (window.innerWidth <= 600) {
                // 모바일에서는 더 많은 여백을 줘요
                brandSection.style.paddingBottom = '80px';
            } else {
                // 웹에서도 여백을 늘려줘요
                brandSection.style.paddingBottom = '100px';
            }
        } else {
            // 짧은 텍스트는 다시 보여줘요 (일부만 보이는 상태로)
            brandShort.style.display = '';
            // 전체 텍스트는 숨겨요
            brandFull.style.display = 'none';
            // 버튼 텍스트를 '더보기'로 변경
            brandMoreBtn.textContent = '더보기';
            
            // 모바일과 웹 모두에서 원래 여백으로 돌려놔요
            const brandSection = document.querySelector('.brand-history-section');
            if (window.innerWidth <= 600) {
                // 모바일 원래 여백
                brandSection.style.paddingBottom = '50px';
            } else {
                // 웹 원래 여백
                brandSection.style.paddingBottom = '80px';
            }
        }
    });
} 