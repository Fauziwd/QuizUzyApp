import React, { useRef } from 'react';

const Result = ({ showResult, quizs, marks, startOver }) => {
  const quizContainerRef = useRef(null);

  const handleStartQuiz = () => {
    startOver();
  };

  return (
    <section
      ref={quizContainerRef}
      className='text-white text-center'
      style={{ display: `${showResult ? 'block' : 'none'}`, backgroundColor: '#E8AA42' }}
    >
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-6">
            <div className={`text-center p-5 rounded ${marks > (quizs.length * 10 / 2) ? 'bg-light text-dark' : 'bg-danger text-light'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {marks > (quizs.length * 10 / 2) ? (
                <>
                  <img src="/images/hasilresultwon.gif" alt="Alhamdulillah.." style={{ maxWidth: '100%', height: 'auto' }} />
                  <h1 className='mb-2 fw-bold'>Congratulations!</h1>
                </>
              ) : (
                <>
                  <img src="/images/lose.gif" alt="Your GIF" />
                  <h1 className='mb-2 fw-bold'>Yaah! coba lagi</h1>
                </>
              )}
              <h3 className='mb-3 fw-bold'>Total skor anda {marks} dari {quizs.length * 10}</h3>
              <button
                onClick={handleStartQuiz}
                className={`btn text-light py-2 px-4 fw-bold d-inline ${marks > (quizs.length * 10 / 2) ? 'btn-danger' : 'btn-warning'}`}
                style={{
                  backgroundColor: `${marks > (quizs.length * 10 / 2) ? '#E55807' : '#FFB84C'}`,
                  boxShadow: ` 1px 2px 20px 0px ${marks > (quizs.length * 10 / 2) ? 'darkorange' : '#570530'}`,
                }}
              >
                {marks > (quizs.length * 10 / 2) ? 'Start Over' : 'Try Again'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Result;
