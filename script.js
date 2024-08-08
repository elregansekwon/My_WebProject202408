// script.js

document.addEventListener('DOMContentLoaded', init);

function init() {
    const questionForm = document.getElementById('questionForm');
    const questionList = document.getElementById('questionList');

    // 기존 질문을 로드
    loadQuestions();

    // 질문 제출 이벤트 리스너
    questionForm.addEventListener('submit', (event) => {
        event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

        const name = document.getElementById('name').value.trim();
        const question = document.getElementById('question').value.trim();

        // 이름과 질문이 입력되었는지 확인
        if (name && question) {
            // 사용자 알림창
            const userConfirmed = confirm("욕설이나 부적절한 내용은 인터넷 가이드 준수사항에 따라 삭제될 수 있습니다.");
            if (userConfirmed) {
                // 새로운 질문 추가
                addQuestion(name, question);

                // 폼 초기화
                questionForm.reset();
            }
        } else {
            alert('이름과 질문을 모두 입력해주세요.');
        }
    });

    // 스크롤 버튼 초기화
    initScrollButton();
}

// 질문 목록을 로컬 저장소에서 불러오는 함수
function loadQuestions() {
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    questions.forEach(displayQuestion); // 각 질문을 화면에 표시
}

// 질문을 목록에 추가하고 로컬 저장소에 저장하는 함수
function addQuestion(name, question) {
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    const newQuestion = { id: Date.now(), name, question, answer: '' }; // 질문 객체 생성
    questions.push(newQuestion); // 목록에 추가
    localStorage.setItem('questions', JSON.stringify(questions)); // 로컬 저장소에 저장
    displayQuestion(newQuestion); // 화면에 표시
}

// 질문을 HTML에 표시하는 함수
function displayQuestion(question) {
    const questionList = document.getElementById('questionList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>${question.name}</strong>: ${question.question}
        <button onclick="editQuestion(${question.id})">수정</button>
        <button onclick="deleteQuestion(${question.id})">삭제</button>
        <div>
            <label>답변:</label>
            <textarea id="answer_${question.id}" rows="2" cols="30">${question.answer}</textarea>
            <button onclick="submitAnswer(${question.id})">답변 제출</button>
        </div>
        <div id="answerDisplay_${question.id}" style="margin-top: 10px;">
            ${question.answer ? `<strong>답변:</strong> ${question.answer}` : ''}
        </div>
    `;
    questionList.appendChild(listItem); // 질문을 목록에 추가
}

// 답변을 제출하는 함수
function submitAnswer(id) {
    const answerTextarea = document.getElementById(`answer_${id}`);
    const answer = answerTextarea.value.trim();
    if (answer) {
        updateAnswer(id, answer);
        const answerDisplay = document.getElementById(`answerDisplay_${id}`);
        answerDisplay.innerHTML = `<strong>답변:</strong> ${answer}`;
        answerTextarea.value = ''; // 답변 입력란 초기화
    } else {
        alert('답변을 입력해주세요.');
    }
}

// 질문을 수정하는 함수
function editQuestion(id) {
    const questions = JSON.parse(localStorage.getItem('questions'));
    const question = questions.find(q => q.id === id); // 수정할 질문 찾기
    if (question) {
        const newQuestion = prompt('새로운 질문을 입력하세요:', question.question); // 수정 입력
        if (newQuestion !== null) {
            question.question = newQuestion.trim();
            localStorage.setItem('questions', JSON.stringify(questions));
            location.reload(); // 페이지 새로고침으로 변경된 내용 반영
        }
    }
}

// 질문을 삭제하는 함수
function deleteQuestion(id) {
    let questions = JSON.parse(localStorage.getItem('questions'));
    questions = questions.filter(q => q.id !== id); // 해당 질문 제거
    localStorage.setItem('questions', JSON.stringify(questions));
    location.reload(); // 페이지 새로고침으로 삭제 반영
}

// 답변을 업데이트하는 함수
function updateAnswer(id, answer) {
    const questions = JSON.parse(localStorage.getItem('questions'));
    const question = questions.find(q => q.id === id); // 해당 질문 찾기
    if (question) {
        question.answer = answer.trim();
        localStorage.setItem('questions', JSON.stringify(questions)); // 로컬 저장소에 업데이트
    }
}

// 스크롤 버튼 초기화 및 이벤트 설정 함수
function initScrollButton() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => handleScroll(scrollToTopBtn));
    scrollToTopBtn.addEventListener('click', scrollToTop);
    scrollToTopBtn.style.display = 'none'; // 초기에는 버튼 숨기기
}

// 스크롤 시 버튼 표시/숨김
function handleScroll(button) {
    if (window.pageYOffset > 20) {
        button.style.display = 'block'; // 스크롤 시 버튼 표시
    } else {
        button.style.display = 'none'; // 위로 스크롤 시 버튼 숨김
    }
}

// 페이지 맨 위로 부드럽게 스크롤
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 부드러운 스크롤
    });
}
