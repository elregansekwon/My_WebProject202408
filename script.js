// script.js
// 사용자가 스크롤하면 버튼을 표시하는 함수
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

// 버튼을 클릭하면 페이지 맨 위로 스크롤하는 함수
document.getElementById("scrollToTopBtn").addEventListener("click", function() {
    document.body.scrollTop = 0; // 사파리
    document.documentElement.scrollTop = 0; // 크롬, 파이어폭스, IE
});
