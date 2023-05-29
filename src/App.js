import React, { useEffect, useState } from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { Howl } from 'howler';
import './App.css';
import Swal from 'sweetalert2';

function App() {
  // All Quizs, Current Question, Index of Current Question, Answer, Selected Answer, Total Marks
  const [quizs, setQuizs] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [marks, setMarks] = useState(0);

  // Display Controlling States
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Load JSON Data
  useEffect(() => {
    const fetchData = async () => {
      let jsonFile;

      if (selectedCategory === 'mixed') {
        jsonFile = '/soal/mixed.json';
      } else if (selectedCategory === 'science') {
        jsonFile = '/soal/science.json';
      } else if (selectedCategory === 'literature') {
        jsonFile = '/soal/literature.json';
      } else {
        // Jika kategori belum dipilih, jangan memuat data
        return;
      }

      const response = await fetch(jsonFile);
      const data = await response.json();

      // Menggunakan sort() dan Math.random()
      const randomQuizs = data.sort(() => Math.random() - 0.5);
      setQuizs(randomQuizs);
    };

    fetchData();
  }, [selectedCategory]);

  // Set a Single Question
  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuestion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex]);

  // Start Quiz
  const startQuiz = (category) => {
    setSelectedCategory(category);
    setShowStart(false);
    setShowQuiz(true);
  };

  // Membuat instance audio
  const correctSound = new Howl({
    src: ['/audio/wonsound.wav'],
  });

  const incorrectSound = new Howl({
    src: ['/audio/losesound.wav'],
  });

  // Check Answer
  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);

      if (selected === question.answer) {
        event.target.classList.add('bg-success');
        Swal.fire({
          icon: 'success',
          title: 'Anda Benar!',
          text: question.reason,
          showConfirmButton: true,
          background: '#fff url(/images/party.gif)',
          didOpen: () => {
            // Panggil audio
            correctSound.play();
          },
          customClass: {
            container: 'custom-swal-container',
            title: 'custom-swal-title',
            content: 'custom-swal-content',
          },
        }).then(() => {
          setMarks(marks + 10);
          (questionIndex + 1) !== quizs.length ? nextQuestion() : showTheResult();
        });
      } else {
        event.target.classList.add('bg-danger');
        Swal.fire({
          icon: 'error',
          title: 'Anda Salah!',
          text: `Jawaban yang benar adalah ${question.answer}, ${question.reason}`,
          showConfirmButton: true,
          didOpen: () => {
            // Panggil audio
            incorrectSound.play();
          },
        }).then(() => {
          (questionIndex + 1) !== quizs.length ? nextQuestion() : showTheResult();
        });
      }
    }
  };

  // Next Question
  const nextQuestion = () => {
    setCorrectAnswer('');
    setSelectedAnswer('');
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
    setQuestionIndex(questionIndex + 1);
  };

  // Show Result
  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
    // Play sound
    const resultSound = new Howl({
      src: marks >= 50 ? ['/audio/win-fanfare.mp3'] : ['/audio/loseresult.wav'],
      volume: 1,
    });
    resultSound.play();
  };

  // Start Over
  const startOver = () => {
    setSelectedCategory('');
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(0);
    setMarks(0);
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
  };

  return (
    <>
      {/* Welcome Page */}
      <Start
        startQuiz={startQuiz}
        showStart={showStart}
        selectedCategory={selectedCategory}
      />

      {/* Quiz Page */}
      <Quiz
        showQuiz={showQuiz}
        question={question}
        quizs={quizs}
        checkAnswer={checkAnswer}
        correctAnswer={correctAnswer}
        selectedAnswer={selectedAnswer}
        questionIndex={questionIndex}
        nextQuestion={nextQuestion}
        showTheResult={showTheResult}
      />

      {/* Result Page */}
      <Result showResult={showResult} quizs={quizs} marks={marks} startOver={startOver} />
    </>
  );
}

export default App;
