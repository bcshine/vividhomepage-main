// ===================================
// 비비드뷰티하우스 웹사이트 JavaScript
// - 모든 기능에 초등생도 이해할 수 있는 주석
// - 캐러셀 슬라이드 기능
// - 더보기 버튼 기능
// - 모바일 최적화
// ===================================

// 웹페이지가 모두 로드되면 실행되는 코드
document.addEventListener('DOMContentLoaded', function() {
    // 모든 기능을 초기화해요
    initCarousel(); // 캐러셀 기능 시작
    initMoreButtons(); // 더보기 버튼 기능 시작
    initBrandMoreButton(); // 매장소개 더보기 버튼 시작
    initLoginButton(); // 로그인 버튼 기능 시작
    initScrollEffect(); // 스크롤 효과 시작
});

// ===================================
// 로그인 버튼 기능
// ===================================
function initLoginButton() {
    // 로그인 버튼을 찾아요
    const loginBtn = document.querySelector('.login-btn');
    
    // 로그인 버튼이 있으면 클릭 이벤트를 추가해요
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // 로그인 버튼을 클릭하면 알림창을 보여줘요
            alert('로그인 기능은 준비중입니다. 곧 만나볼 수 있어요!');
        });
    }
}

// ===================================
// 스크롤 효과 (헤더 스타일 변경)
// ===================================
function initScrollEffect() {
    // 스크롤할 때마다 실행되는 함수
    window.addEventListener('scroll', function() {
        // 헤더 요소를 찾아요
        const header = document.querySelector('.header');
        
        // 헤더가 있으면 스크롤 위치에 따라 스타일을 바꿔요
        if (header) {
            if (window.scrollY > 50) {
                // 50px 이상 스크롤하면 헤더 배경을 반투명하게
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                // 50px 미만이면 원래대로
                header.style.backgroundColor = 'white';
                header.style.backdropFilter = 'none';
                header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            }
        }
    });
}

// ===================================
// 히어로 캐러셀 기능
// ===================================
function initCarousel() {
    // 캐러셀에 필요한 요소들을 찾아요
    const slides = document.querySelectorAll('.carousel-slide'); // 모든 슬라이드
    const leftArrow = document.querySelector('.carousel-arrow.left'); // 왼쪽 화살표
    const rightArrow = document.querySelector('.carousel-arrow.right'); // 오른쪽 화살표
    
    // 요소들이 모두 있는지 확인해요
    if (!slides.length || !leftArrow || !rightArrow) {
        console.log('캐러셀 요소를 찾을 수 없어요'); // 개발자용 메시지
        return;
    }
    
    let currentSlide = 0; // 현재 보여지는 슬라이드 번호 (0부터 시작)
    let slideInterval = null; // 자동 슬라이드 타이머를 저장할 변수
    
    // 특정 슬라이드를 보여주는 함수
    function showSlide(index) {
        // 모든 슬라이드에서 active 클래스를 제거해요 (안보이게)
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // 선택한 슬라이드에만 active 클래스를 추가해요 (보이게)
        slides[index].classList.add('active');
        
        // 현재 슬라이드 번호를 업데이트해요
        currentSlide = index;
    }
    
    // 다음 슬라이드로 이동하는 함수
    function nextSlide() {
        // 현재 슬라이드가 마지막이면 첫 번째로, 아니면 다음으로
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    // 이전 슬라이드로 이동하는 함수
    function prevSlide() {
        // 현재 슬라이드가 첫 번째면 마지막으로, 아니면 이전으로
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    // 자동 슬라이드를 시작하는 함수
    function startAutoSlide() {
        // 4초마다 다음 슬라이드로 이동해요
        slideInterval = setInterval(nextSlide, 4000);
    }
    
    // 자동 슬라이드를 멈추는 함수
    function stopAutoSlide() {
        // 타이머를 없애요
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }
    
    // 왼쪽 화살표 클릭 이벤트
    leftArrow.addEventListener('click', function() {
        prevSlide(); // 이전 슬라이드로
        stopAutoSlide(); // 자동 슬라이드 멈춤
        startAutoSlide(); // 자동 슬라이드 다시 시작
    });
    
    // 오른쪽 화살표 클릭 이벤트
    rightArrow.addEventListener('click', function() {
        nextSlide(); // 다음 슬라이드로
        stopAutoSlide(); // 자동 슬라이드 멈춤
        startAutoSlide(); // 자동 슬라이드 다시 시작
    });
    
    // 캐러셀에 마우스를 올리면 자동 슬라이드 멈춤
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
    
    // 키보드 화살표로도 조작할 수 있게 해요
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    });
    
    // 웹페이지가 열리면 첫 번째 슬라이드를 보여주고 자동 슬라이드 시작
    showSlide(0);
    startAutoSlide();
    
    console.log('캐러셀이 성공적으로 시작되었어요!'); // 개발자용 메시지
}

// ===================================
// 디자이너 소개 더보기 버튼 기능
// ===================================
function initMoreButtons() {
    // 모든 더보기 버튼들을 찾아요
    const moreBtns = document.querySelectorAll('.more-btn');
    
    // 더보기 버튼이 없으면 함수를 종료해요
    if (!moreBtns.length) {
        console.log('더보기 버튼을 찾을 수 없어요');
        return;
    }
    
    // 각각의 더보기 버튼에 이벤트를 추가해요
    moreBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            // 버튼이 속한 카드를 찾아요
            const card = btn.closest('.product-card');
            if (!card) return;
            
            // 카드 안에서 짧은 설명과 전체 설명을 찾아요
            const shortDesc = card.querySelector('.product-desc.short');
            const fullDesc = card.querySelector('.product-desc.full');
            
            // 필요한 요소들이 있는지 확인해요
            if (!shortDesc || !fullDesc) {
                console.log(`${index + 1}번째 카드에서 설명을 찾을 수 없어요`);
                return;
            }
            
            // 현재 짧은 설명이 보이고 있으면
            if (shortDesc.style.display !== 'none') {
                // 짧은 설명은 숨기고 전체 설명을 보여줘요
                shortDesc.style.display = 'none';
                fullDesc.style.display = 'block';
                btn.textContent = '닫기'; // 버튼 텍스트를 '닫기'로 변경
                
                console.log(`${index + 1}번째 디자이너의 전체 설명을 보여줘요`);
            } else {
                // 전체 설명은 숨기고 짧은 설명을 보여줘요
                shortDesc.style.display = '';
                fullDesc.style.display = 'none';
                btn.textContent = '더보기'; // 버튼 텍스트를 '더보기'로 변경
                
                console.log(`${index + 1}번째 디자이너의 짧은 설명을 보여줘요`);
            }
        });
    });
    
    console.log(`${moreBtns.length}개의 더보기 버튼이 준비되었어요!`);
}

// ===================================
// 매장소개 더보기 버튼 기능
// ===================================
function initBrandMoreButton() {
    // 매장소개 더보기 버튼과 관련 요소들을 찾아요
    const brandMoreBtn = document.querySelector('.brand-more-btn');
    const brandShort = document.querySelector('.brand-history-desc.short');
    const brandFull = document.querySelector('.brand-history-desc.full');
    
    // 필요한 요소들이 모두 있는지 확인해요
    if (!brandMoreBtn || !brandShort || !brandFull) {
        console.log('매장소개 더보기 버튼 요소를 찾을 수 없어요');
        return;
    }
    
    // 더보기 버튼 클릭 이벤트
    brandMoreBtn.addEventListener('click', function() {
        // 현재 짧은 설명이 보이고 있으면
        if (brandShort.style.display !== 'none') {
            // 짧은 설명은 숨기고 전체 설명을 보여줘요
            brandShort.style.display = 'none';
            brandFull.style.display = 'block';
            brandMoreBtn.textContent = '닫기'; // 버튼 텍스트를 '닫기'로 변경
            
            // 모바일과 웹에서 추가 여백을 제공해요 (텍스트가 길어져서)
            const brandSection = document.querySelector('.brand-history-section');
            if (brandSection) {
                if (window.innerWidth <= 600) {
                    // 모바일에서는 더 많은 여백을 줘요
                    brandSection.style.paddingBottom = '100px';
                } else {
                    // 웹에서도 여백을 늘려줘요
                    brandSection.style.paddingBottom = '120px';
                }
            }
            
            console.log('매장소개 전체 설명을 보여줘요');
        } else {
            // 전체 설명은 숨기고 짧은 설명을 보여줘요
            brandShort.style.display = '';
            brandFull.style.display = 'none';
            brandMoreBtn.textContent = '더보기'; // 버튼 텍스트를 '더보기'로 변경
            
            // 원래 여백으로 돌려놔요
            const brandSection = document.querySelector('.brand-history-section');
            if (brandSection) {
                if (window.innerWidth <= 600) {
                    // 모바일 원래 여백
                    brandSection.style.paddingBottom = '50px';
                } else {
                    // 웹 원래 여백
                    brandSection.style.paddingBottom = '80px';
                }
            }
            
            console.log('매장소개 짧은 설명을 보여줘요');
        }
    });
    
    console.log('매장소개 더보기 버튼이 준비되었어요!');
}

// ===================================
// 유틸리티 함수들 (도움 함수들)
// ===================================

// 부드러운 스크롤 함수 (링크 클릭시 부드럽게 이동)
function initSmoothScroll() {
    // 네비게이션 링크들을 찾아요
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 링크가 #으로 시작하면 (페이지 내 링크)
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault(); // 기본 동작 막기
                
                // 해당 섹션을 찾아요
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // 부드럽게 스크롤해서 이동해요
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    console.log(`${targetId} 섹션으로 이동해요`);
                }
            }
        });
    });
}

// 웹페이지 로드 완료 후 추가 기능들 초기화
window.addEventListener('load', function() {
    initSmoothScroll(); // 부드러운 스크롤 기능 시작
    
    // 이미지 로딩 에러 처리
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log(`이미지 로딩 실패: ${this.src}`);
            // 기본 이미지로 대체하거나 숨기기
            this.style.display = 'none';
        });
    });
    
    console.log('모든 기능이 준비되었어요! 비비드뷰티하우스 웹사이트를 즐겨보세요 🎉');
});

// ===================================
// 반응형 처리 (화면 크기 변경시)
// ===================================
window.addEventListener('resize', function() {
    // 화면 크기가 변경될 때마다 실행되는 코드
    
    // 모바일과 데스크톱 간 전환시 매장소개 여백 조정
    const brandSection = document.querySelector('.brand-history-section');
    const brandMoreBtn = document.querySelector('.brand-more-btn');
    
    if (brandSection && brandMoreBtn) {
        // 현재 '닫기' 상태인지 확인
        if (brandMoreBtn.textContent === '닫기') {
            // 화면 크기에 맞게 여백 재조정
            if (window.innerWidth <= 600) {
                brandSection.style.paddingBottom = '100px';
            } else {
                brandSection.style.paddingBottom = '120px';
            }
        }
    }
    
    // 화면 크기 변경 로그 (개발자용)
    console.log(`화면 크기 변경: ${window.innerWidth}px × ${window.innerHeight}px`);
});

// ===================================
// 에러 처리 (문제 발생시 대응)
// ===================================
window.addEventListener('error', function(event) {
    // JavaScript 에러가 발생하면 콘솔에 기록해요
    console.error('에러 발생:', event.error);
    
    // 사용자에게는 에러를 보이지 않고 조용히 처리해요
    event.preventDefault();
});

// 개발자용 메시지
console.log(`
🎨 비비드뷰티하우스 웹사이트
✨ 김해 1등 아이롱펌 전문 헤어살롱
📱 반응형 디자인으로 제작
💻 JavaScript 로딩 완료!
`); 