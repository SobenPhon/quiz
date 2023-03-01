const startBtn = document.getElementById('start-btn')
const nextBtn = document.getElementById('next-btn')
const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerListElement = document.getElementById('answer-list')
const resultContainer = document.getElementById('result-container')
const quizNo = document.getElementById('quizNo')
const message = document.querySelector('.message')

const correct = document.querySelector('.correct')
const wrong = document.querySelector('.wrong')
const score = document.querySelector('.score')
const sum = document.querySelector('.sum')
const info = document.querySelector('.info-container')

let shuffledQuestions
let selectedAnswer = null
let currentQuestionIndex = 0
let correctCount = 0
let wrongCount = 0

startBtn.addEventListener('click', startGame)
nextBtn.addEventListener('click', nextQuestion)

function playAgain() {
  selectedAnswer = null
  correctCount = 0
  wrongCount = 0
  info.classList.add('hide')
}

function startGame() {
  playAgain()
  resultContainer.classList.add('hide')
  startBtn.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainer.classList.remove('hide')
  nextBtn.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showResult() {
  resultContainer.classList.remove('hide')
  questionContainer.classList.add('hide')
  nextBtn.classList.add('hide')
  startBtn.classList.remove('hide')
  startBtn.innerText = 'ម្ដងទៀត'

  correct.innerText = `ចម្លើយត្រឹមត្រូវ៖ ${correctCount}`
  wrong.innerText = `ចម្លើយមិនត្រឹមត្រូវ៖ ${wrongCount}`
  score.innerText = `ពិន្ទុកសរុប​​៖ ${correctCount * 10}pts`
  sum.innerText = `អ្នកបានឆ្លើយត្រូវ ${correctCount} នៃ ${questions.length} ទាំងអស់`
}

function showQuestion(question) {
  if (currentQuestionIndex === shuffledQuestions.length) return showResult()

  selectedAnswer = null
  quizNo.innerText = `សំណួរ ${currentQuestionIndex + 1} នៃ ${shuffledQuestions.length}`
  questionElement.innerText = question.question
  answerListElement.innerHTML = question.answers.map((an, index) => {
    return (
      `
      <div class="answer">
        <input type="radio" id="${index}" name="answer" value="${an.isCorrect}" />
        <label for="${index}">${an.answer}</label>
      </div>
      `
    )
  }).join('')

  selectAnswer()
}

function selectAnswer() {
  answerListElement.querySelectorAll('input').forEach(an => {
    an.addEventListener('click', e => {
      msg('')
      selectedAnswer = e.target.value
    })
  })
}

function nextQuestion() {
  if (selectedAnswer !== null) {
    selectedAnswer === 'true' ? correctCount++ : wrongCount++
    currentQuestionIndex++
    setNextQuestion()
  } else {
    msg('សូមជ្រើសរើសចម្លើយ!')
  }
}

function msg(msg) {
  message.innerText = msg
}

const questions = [
  {
    id: 1,
    question: 'តើនិមិត្តសញ្ញាគីមីសម្រាប់ប្រាក់គឺជាអ្វី?',
    answers: [
      { answer: 'Zn', isCorrect: false },
      { answer: 'Ag', isCorrect: true },
      { answer: 'Bg', isCorrect: false },
      { answer: 'Pb', isCorrect: false }
    ]
  },
  {
    id: 2,
    question: 'តើក្រុមហ៊ុនបច្ចេកវិទ្យាធំជាងគេនៅកូរ៉េខាងត្បូងមានឈ្មោះអ្វី?',
    answers: [
      { answer: 'ក្រុមហ៊ុន LG', isCorrect: false },
      { answer: 'ក្រុមហ៊ុន Sony', isCorrect: false },
      { answer: 'ក្រុមហ៊ុន Xiaomi', isCorrect: false },
      { answer: 'ក្រុមហ៊ុន Samsung', isCorrect: true }
    ]
  },
  {
    id: 3,
    question: 'តើប្រទេសកម្ពុជាមានផ្ទៃដីប៉ុន្មាន?',
    answers: [
      { answer: '183,035 km²', isCorrect: false },
      { answer: '184,035 km²', isCorrect: false },
      { answer: '181,035 km²', isCorrect: true },
      { answer: '182,035 km²', isCorrect: false }
    ]
  },
  {
    id: 4,
    question: 'តើប្រទេសកម្ពុជចូលជាសមាជិកAEANនៅពេលណា?',
    answers: [
      { answer: '1989', isCorrect: false },
      { answer: '1999', isCorrect: true },
      { answer: '1994', isCorrect: false },
      { answer: '1987', isCorrect: false }
    ]
  },
  {
    id: 5,
    question: 'តើនៅក្នុងប្រព័ន្ធព្រះអាទិត្យមានភពចំនួនប៉ុន្មាន?',
    answers: [
      { answer: 'ប្រាំបួន', isCorrect: false },
      { answer: 'ប្រាំមួយ', isCorrect: false },
      { answer: 'ប្រាំពីរ', isCorrect: false },
      { answer: 'ប្រាំបី', isCorrect: true }
    ]
  }
]