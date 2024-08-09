document.addEventListener('DOMContentLoaded', init);

function init() {
    const questionForm = document.getElementById('questionForm');
    const questionList = document.getElementById('questionList');

    loadQuestions();

    questionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const question = document.getElementById('question').value.trim();

        if (name && question) {
            const userConfirmed = confirm("욕설이나 부적절한 내용은 인터넷 가이드 준수사항에 따라 삭제될 수 있습니다.");
            if (userConfirmed) {
                addQuestion(name, question);
                questionForm.reset();
            }
        } else {
            alert('이름과 질문을 모두 입력해주세요.');
        }
    });

    initScrollButton();
}

function loadQuestions() {
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    questions.forEach(displayQuestion);
}

function addQuestion(name, question) {
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    const newQuestion = { id: Date.now(), name, question, answer: '' };
    questions.push(newQuestion);
    localStorage.setItem('questions', JSON.stringify(questions));
    displayQuestion(newQuestion);
}

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
    questionList.appendChild(listItem);
}

function submitAnswer(id) {
    const answerTextarea = document.getElementById(`answer_${id}`);
    const answer = answerTextarea.value.trim();
    if (answer) {
        updateAnswer(id, answer);
        const answerDisplay = document.getElementById(`answerDisplay_${id}`);
        answerDisplay.innerHTML = `<strong>답변:</strong> ${answer}`;
        answerTextarea.value = '';
    } else {
        alert('답변을 입력해주세요.');
    }
}

function editQuestion(id) {
    const questions = JSON.parse(localStorage.getItem('questions'));
    const question = questions.find(q => q.id === id);
    if (question) {
        const newQuestion = prompt('새로운 질문을 입력하세요:', question.question);
        if (newQuestion !== null) {
            question.question = newQuestion.trim();
            localStorage.setItem('questions', JSON.stringify(questions));
            location.reload();
        }
    }
}

function deleteQuestion(id) {
    let questions = JSON.parse(localStorage.getItem('questions'));
    questions = questions.filter(q => q.id !== id);
    localStorage.setItem('questions', JSON.stringify(questions));
    location.reload();
}

function updateAnswer(id, answer) {
    const questions = JSON.parse(localStorage.getItem('questions'));
    const question = questions.find(q => q.id === id);
    if (question) {
        question.answer = answer.trim();
        localStorage.setItem('questions', JSON.stringify(questions));
    }
}

function initScrollButton() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => handleScroll(scrollToTopBtn));
    scrollToTopBtn.addEventListener('click', scrollToTop);
    scrollToTopBtn.style.display = 'none';
}

function handleScroll(button) {
    if (window.pageYOffset > 20) {
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
