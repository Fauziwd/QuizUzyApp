import React, { useState, useRef } from 'react';
import { Tilt } from 'react-tilt';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Swal from 'sweetalert2';
import anime from "animejs";

const Start = ({ startQuiz, showStart }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(true);

  const handleCategorySelect = (eventKey) => {
    setSelectedCategory(eventKey);
  };

  const quizContainerRef = useRef(null);

  const handleStartQuiz = () => {
    if (selectedCategory) {
      // Start the fade-out animation
      anime({
        targets: quizContainerRef.current,
        opacity: [1, 0],
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: () => {
          // After the animation is complete, call the startQuiz function
          startQuiz(selectedCategory);
        }
      });
    } else {
      // Category not selected, display a cool alert
      Swal.fire({
        title: 'Oops...',
        text: 'Please select a category before starting the quiz.',
        icon: 'error',
        confirmButtonColor: '#025464',
        background: '#27374D',
        color: 'white',
        confirmButtonText: 'OK',
        didOpen: () => {
          // Panggil audio
          const alertSound = new Audio('/audio/emm-mm.mp3');
          alertSound.play();
        },
      });
    }    
  };
  
  
  return (
    <section
      ref={quizContainerRef}
      className='text-white text-center bg-dark'
      style={{ display: `${showStart ? 'block' : 'none'}` }}
    >
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <h1 className='fw-bold mb-4'>Quiz Pengetahuan Umum</h1>
            <DropdownButton
              variant="light"
              title={selectedCategory || "Select a category"}
              onSelect={handleCategorySelect}
              className="mb-3"
            >
              <Dropdown.Item eventKey="mixed">Mix</Dropdown.Item>
              <Dropdown.Item eventKey="science">Science</Dropdown.Item>
              <Dropdown.Item eventKey="literature">Islam Literature</Dropdown.Item>
            </DropdownButton>
            <button onClick={handleStartQuiz} className="btn px-4 py-2 bg-light text-dark fw-bold">Start Quiz</button>
          </div>
        </div>
      </div>
      
      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#BFCCB5' }}>
          <Tilt className="Tilt" options={{ max: 25, perspective: 1000, glare: true, maxGlare: 0.8, glarePrerender: true, transition: true, axis: null, speed: 1000 }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content" style={{ backgroundColor: '#3C486B', fontFamily: 'Montserrat, sans-serif', color: '#F6BA6F', boxShadow: '0px 0px 20px #2A2F4F' }}>
                <div className="modal-header">
                  <h5 className="modal-title text-center w-100" style={{ fontSize: '2rem' }}>Selamat Datang!</h5>
                </div>
                <Tilt className="Tilt" options={{ max: 25, perspective: 1000, transition: true, axis: null, speed: 1000 }}>
                  <div className="modal-body">
                    <div className="d-flex justify-content-center align-items-center">
                      <div className="text-center">
                        <h4 className="mb-3">Welcome to Quiz Uzy</h4>
                        <p style={{ fontSize: '0.8rem', color: 'white' }}>Anda dapat menguji pengetahuan Anda tentang berbagai mata pelajaran, pada update kali ini anda sekarang bisa menyesuaikan berdasarkan pilihan pada opsi yang tertera.</p>
                        <p className="mb-0" style={{ fontSize: '1.2rem' }}>Selamat Mencoba!</p>
                      </div>
                    </div>
                  </div>
                </Tilt>
                <div className="modal-footer justify-content-center">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal(false)} style={{ backgroundColor: '#FFFFFF',fontFamily: 'Montserrat, sans-serif', color: '#333333', fontWeight: 'bold', letterSpacing: '1px', boxShadow: '0px 0px 20px #393646' }}>Close</button>
                </div>
              </div>
            </div>
          </Tilt>
        </div>
      )}
    </section>
  );
};

export default Start;
