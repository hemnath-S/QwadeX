import React, { useRef, useEffect, useState, forwardRef } from 'react';
import TextPressure from './TextPressure';
import VariableProximity from './VariableProximity';
import LightRays from './LightRays';
import TargetCursor from './TargetCursor';
import DotGrid from './DotGrid';
import RotatingText from './RotatingText';
import MagicBento from './MagicBento';
import TextType from './TextType';
import Counter from './Counter';
import Aurora from './Aurora';
import './App.css';

const Hero = forwardRef((props, ref) => {
  const containerRef = useRef(null);

  return (
    <section id="hero" className="section hero" ref={ref}>
      <div className="hero-background">
        <LightRays
          raysOrigin="top-center"
          raysColor="#B57EDC"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="hero-light-rays"
        />
      </div>
      
      <div className="hero-content" ref={containerRef}>
        <div className="hero-text-container">
          <TextPressure
            text="GradeX"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#B57EDC"
            minFontSize={48}
          />
        </div>
        
        <div className="hero-bottom-content">
          <div className="hero-buttons">
            <button className="btn btn-minimal cursor-target">
              <span className="button-text">Try Demo</span>
              <span className="button-glare"></span>
            </button>
            <button className="btn btn-minimal cursor-target">
              <span className="button-text">Learn More</span>
              <span className="button-glare"></span>
            </button>
          </div>
          
          <div className="hero-subtitle-container">
            <VariableProximity
              label="Revolutionizing Academic Assessment with AI"
              className="hero-subtitle"
              fromFontVariationSettings="'wght' 400, 'opsz' 16"
              toFontVariationSettings="'wght' 800, 'opsz' 24"
              containerRef={containerRef}
              radius={150}
              falloff="linear"
            />
          </div>
        </div>
      </div>
      
      <div className="hero-scroll-indicator">
        <div className="scroll-indicator-dot"></div>
      </div>
    </section>
  );
});

const WhatIsGradeX = forwardRef((props, ref) => {
  return (
    <section id="what-is-gradex" className="section what-is-gradex" ref={ref}>
      <div className="dot-grid-container">
        <DotGrid
          dotSize={8}
          gap={35}
          baseColor="#2D1B69"
          activeColor="#B57EDC"
          proximity={180}
          shockRadius={350}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      
      <div className="rotating-text-top-right">
        <span className="static-prefix">GradeX</span>
        <RotatingText
          texts={['Faster.', 'Fairer.', 'Smarter.']}
          mainClassName="rotating-text-large"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </div>
      
      <div className="what-is-content">
        <div className="magic-bento-container">
          <MagicBento 
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="181, 126, 220"
          />
        </div>
      </div>
    </section>
  );
});

const LiveDemo = forwardRef((props, ref) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingResult, setProcessingResult] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('forward');
  const [stepsVisible, setStepsVisible] = useState(true);
  const [cursorKey, setCursorKey] = useState(0); // Add key to force cursor re-render
  
  // Form states
  const [subjectName, setSubjectName] = useState('');
  const [pdfCount, setPdfCount] = useState(1);
  const [studentName, setStudentName] = useState('');
  
  // File states
  const [rubricFile, setRubricFile] = useState(null);
  const [questionPaperFile, setQuestionPaperFile] = useState(null);
  const [answerSheetFile, setAnswerSheetFile] = useState(null);
  
  // UI states
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const handleFileUpload = (event, fileType) => {
    const file = event.target.files[0];
    if (file) {
      switch(fileType) {
        case 'rubric':
          setRubricFile(file);
          break;
        case 'question':
          setQuestionPaperFile(file);
          break;
        case 'answer':
          if (file.type === 'application/pdf') {
            setAnswerSheetFile(file);
          } else {
            alert('Please upload a PDF file for the answer sheet');
          }
          break;
      }
    }
  };

  const handleProcessFile = () => {
    setIsProcessing(true);
    
    // Force cursor re-render to prevent freezing
    setCursorKey(prev => prev + 1);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setProcessingResult({
        score: Math.floor(Math.random() * 30) + 70,
        feedback: "Good analysis of the with clear examples. Consider adding more supporting evidence for your main arguments.",
        timeSpent: `${Math.floor(Math.random() * 5) + 2} seconds`,
        studentName: studentName,
        subject: subjectName
      });
      
      // Hide steps after processing is complete
      setTimeout(() => {
        setStepsVisible(false);
        // Force cursor re-render again when steps are hidden
        setCursorKey(prev => prev + 1);
      }, 1000);
    }, 3000);
  };

  const handleReset = () => {
    // Force cursor re-render before reset
    setCursorKey(prev => prev + 1);
    
    setSubjectName('');
    setPdfCount(1);
    setStudentName('');
    setRubricFile(null);
    setQuestionPaperFile(null);
    setProcessingResult(null);
    setConfirmed(false);
    setIsProcessing(false);
    setCurrentStep(1);
    setStepsVisible(true); // Show steps again when resetting
    
    // Force cursor re-render after reset
    setTimeout(() => {
      setCursorKey(prev => prev + 1);
    }, 100);
  };

  const removeFile = (fileType) => {
    switch(fileType) {
      case 'rubric':
        setRubricFile(null);
        break;
      case 'question':
        setQuestionPaperFile(null);
        break;
      case 'answer':
        setAnswerSheetFile(null);
        break;
    }
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setIsTransitioning(true);
      setAnimationDirection('forward');
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setIsTransitioning(true);
      setAnimationDirection('backward');
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const renderStep = () => {
    const stepContent = (
      <div className={`step-content ${isTransitioning ? 'transitioning' : ''} ${animationDirection}`}>
        {currentStep === 1 && (
          <>
            <h3>Welcome to GradeX</h3>
            <p>Experience the future of academic assessment with our AI-powered grading system</p>
            <div className="welcome-features">
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h4>Lightning Fast</h4>
                <p>Grade documents in seconds, not hours</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h4>Precise Analysis</h4>
                <p>AI-driven evaluation with consistent results</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h4>Detailed Reports</h4>
                <p>Comprehensive feedback for improvement</p>
              </div>
            </div>
          </>
        )}
        
        {currentStep === 2 && (
          <>
            <h3>Enter Details</h3>
            <div className="input-group animated-input">
              <label htmlFor="subject-name">Subject Name</label>
              <input
                type="text"
                id="subject-name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="e.g., Computer Science 101"
                className="demo-input"
              />
              <div className="input-underline"></div>
            </div>
            <div className="input-group animated-input">
              <label htmlFor="pdf-count">Number of PDFs to Upload</label>
              <div className="pdf-counter-container">
                <div className="pdf-counter-label">PDFs</div>
                <div className="pdf-counter-controls">
                  <button
                    className="pdf-counter-button cursor-target pulse-hover"
                    onClick={() => setPdfCount(Math.max(1, pdfCount - 1))}
                    disabled={pdfCount <= 1}
                  >
                    -
                  </button>
                  <div className="pdf-counter-value">
                    <Counter
                      value={pdfCount}
                      places={[10, 1]}
                      fontSize={40}
                      padding={5}
                      gap={2}
                      textColor="#B57EDC"
                      fontWeight={900}
                      gradientHeight={0}
                      gradientFrom="transparent"
                      gradientTo="transparent"
                      backgroundColor="transparent"
                    />
                  </div>
                  <button
                    className="pdf-counter-button cursor-target pulse-hover"
                    onClick={() => setPdfCount(Math.min(10, pdfCount + 1))}
                    disabled={pdfCount >= 10}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="input-group animated-input">
              <label htmlFor="student-name">Student Name</label>
              <input
                type="text"
                id="student-name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name"
                className="demo-input"
              />
              <div className="input-underline"></div>
            </div>
          </>
        )}
        
        {currentStep === 3 && (
          <>
            <h3>Upload Reference Documents</h3>
            <div className="file-upload-group">
              <div className="file-upload-container animated-upload">
                <input
                  type="file"
                  accept=".pdf,.doc,.doc,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'rubric')}
                  className="file-input"
                  id="rubric-upload"
                />
                <label htmlFor="rubric-upload" className="file-upload-label">
                  <div className="upload-icon">📋</div>
                  <span className="upload-text">
                    {rubricFile ? rubricFile.name : "Upload Rubric"}
                  </span>
                  <span className="upload-subtext">PDF, DOC, DOCX</span>
                </label>
                {rubricFile && (
                  <div className="file-info slide-in">
                    <div className="file-details">
                      <span className="file-name">{rubricFile.name}</span>
                      <span className="file-size">
                        {(rubricFile.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                    <button 
                      className="remove-file scale-hover" 
                      onClick={() => removeFile('rubric')}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
              
              <div className="file-upload-container animated-upload">
                <input
                  type="file"
                  accept=".pdf,.doc,.doc,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'question')}
                  className="file-input"
                  id="question-upload"
                />
                <label htmlFor="question-upload" className="file-upload-label">
                  <div className="upload-icon">📝</div>
                  <span className="upload-text">
                    {questionPaperFile ? questionPaperFile.name : "Upload Question Paper"}
                  </span>
                  <span className="upload-subtext">PDF, DOC, DOCX</span>
                </label>
                {questionPaperFile && (
                  <div className="file-info slide-in">
                    <div className="file-details">
                      <span className="file-name">{questionPaperFile.name}</span>
                      <span className="file-size">
                        {(questionPaperFile.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                    <button 
                      className="remove-file scale-hover" 
                      onClick={() => removeFile('question')}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        
        {currentStep === 4 && (
          <>
            <h3>Upload Answer Sheet</h3>
            <div className="file-upload-container animated-upload">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileUpload(e, 'answer')}
                className="file-input"
                id="answer-upload"
              />
              <label htmlFor="answer-upload" className="file-upload-label">
                <div className="upload-icon">📄</div>
                <span className="upload-text">
                  {answerSheetFile ? answerSheetFile.name : "Upload Answer Sheet (PDF)"}
                </span>
                <span className="upload-subtext">PDF files only</span>
              </label>
            </div>
            
            {answerSheetFile && (
              <div className="file-info slide-in">
                <div className="file-details">
                  <span className="file-name">{answerSheetFile.name}</span>
                  <span className="file-size">
                    {(answerSheetFile.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
                <button 
                  className="remove-file scale-hover" 
                  onClick={() => removeFile('answer')}
                >
                  ×
                </button>
              </div>
            )}
          </>
        )}
        
        {currentStep === 5 && (
          <>
            <h3>Confirm Uploads</h3>
            <div className="confirmation-list animated-list">
              <div className="confirm-item fade-in" style={{animationDelay: '0.1s'}}>
                <span className="confirm-label">Subject:</span>
                <span className="confirm-value">{subjectName || 'Not specified'}</span>
              </div>
              <div className="confirm-item fade-in" style={{animationDelay: '0.2s'}}>
                <span className="confirm-label">Student:</span>
                <span className="confirm-value">{studentName || 'Not specified'}</span>
              </div>
              <div className="confirm-item fade-in" style={{animationDelay: '0.3s'}}>
                <span className="confirm-label">Number of PDFs:</span>
                <span className="confirm-value">{pdfCount}</span>
              </div>
              <div className="confirm-item fade-in" style={{animationDelay: '0.4s'}}>
                <span className="confirm-label">Rubric:</span>
                <span className="confirm-value">{rubricFile ? rubricFile.name : 'Not uploaded'}</span>
              </div>
              <div className="confirm-item fade-in" style={{animationDelay: '0.5s'}}>
                <span className="confirm-label">Question Paper:</span>
                <span className="confirm-value">{questionPaperFile ? questionPaperFile.name : 'Not uploaded'}</span>
              </div>
              <div className="confirm-item fade-in" style={{animationDelay: '0.6s'}}>
                <span className="confirm-label">Answer Sheet:</span>
                <span className="confirm-value">{answerSheetFile ? answerSheetFile.name : 'Not uploaded'}</span>
              </div>
            </div>
            <div className="confirmation-checkbox animated-checkbox">
              <input
                type="checkbox"
                id="confirm-checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />
              <label htmlFor="confirm-checkbox">I confirm all information is correct</label>
            </div>
          </>
        )}
        
        {currentStep === 6 && (
          <>
            {!isProcessing && !processingResult && (
              <>
                <h3>Start Processing</h3>
                <p>Click below to begin AI analysis</p>
                <div className="process-trigger cursor-target glow-hover" onClick={handleProcessFile}>
                  <p>Start Processing</p>
                  <div className="process-particles"></div>
                </div>
              </>
            )}
            
            {isProcessing && (
              <>
                <h3>Processing Documents</h3>
                <div className="processing-animation">
                  <div className="processing-spinner enhanced"></div>
                  <p>Analyzing content...</p>
                  <div className="processing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </>
            )}
            
            {processingResult && (
              <>
                <h3>Processing Complete</h3>
                <div className="processing-result animated-result">
                  <div className="result-header">
                    <div className="result-student">
                      <span className="result-label">Student</span>
                      <span className="result-value">{processingResult.studentName}</span>
                    </div>
                    <div className="result-subject">
                      <span className="result-label">Subject</span>
                      <span className="result-value">{processingResult.subject}</span>
                    </div>
                  </div>
                  
                  <div className="result-score">
                    <span className="score-label">Score</span>
                    <span className="score-value">{processingResult.score}/100</span>
                    <div className="score-bar">
                      <div className="score-fill" style={{width: `${processingResult.score}%`}}></div>
                    </div>
                  </div>
                  
                  <div className="result-feedback">
                    <span className="feedback-label">Feedback</span>
                    <p>{processingResult.feedback}</p>
                  </div>
                  
                  <div className="result-time">
                    <span className="time-label">Processing Time</span>
                    <span>{processingResult.timeSpent}</span>
                  </div>
                  
                  <div className="result-actions">
                    <button className="reset-trigger cursor-target bounce-hover" onClick={handleReset}>
                      Process Another Document
                    </button>
                    <button className="download-trigger cursor-target bounce-hover">
                      Download Report
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    );

    return stepContent;
  };

  return (
    <section id="live-demo" className="section live-demo" ref={ref}>
      <div className="aurora-background">
        <Aurora 
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          amplitude={1.0}
          blend={0.5}
          speed={0.5}
        />
      </div>
      
      <div className="demo-content">
        <div className="demo-header">
          <TextType 
            text={["Live Demo", "Try It Yourself", "MVP"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            className="demo-title"
          />
        </div>
        
        <div className="stepper-wrapper">
          <div className={`stepper-container ${stepsVisible ? '' : 'steps-hidden'}`}>
            {/* Step Indicators */}
            <div className={`step-indicators ${stepsVisible ? '' : 'fade-out'}`}>
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div key={step} className="step-indicator">
                  <div className={`step-circle ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}>
                    <span className="step-number">{step}</span>
                    <div className="step-ripple"></div>
                  </div>
                  <span className="step-label">
                    {step === 1 && 'Welcome'}
                    {step === 2 && 'Details'}
                    {step === 3 && 'References'}
                    {step === 4 && 'Answer Sheet'}
                    {step === 5 && 'Confirm'}
                    {step === 6 && 'Process'}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Progress Line */}
            <div className={`progress-line ${stepsVisible ? '' : 'fade-out'}`}>
              <div className="progress-fill" style={{width: `${((currentStep - 1) / 5) * 100}%`}}></div>
            </div>
            
            {/* Step Content */}
            <div className="step-content-wrapper">
              {renderStep()}
            </div>
            
            {/* Navigation Buttons */}
            <div className={`step-navigation ${stepsVisible ? '' : 'fade-out'}`}>
              <button 
                className="nav-button prev-button cursor-target slide-hover" 
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <span className="button-icon">←</span>
                Previous
              </button>
              <button 
                className="nav-button next-button cursor-target slide-hover" 
                onClick={nextStep}
                disabled={currentStep === 6 || (currentStep === 5 && !confirmed)}
              >
                {currentStep === 5 ? 'Confirm' : 'Next'}
                <span className="button-icon">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [cursorKey, setCursorKey] = useState(0); // Global cursor key for forcing re-renders
  const heroRef = useRef(null);
  const whatIsRef = useRef(null);
  const demoRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const sectionsRef = useRef([heroRef, whatIsRef, demoRef]);

  // Navigate to a specific section
  const navigateToSection = (sectionIndex) => {
    // Always allow navigation, but prevent rapid successive calls
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    setIsScrolling(true);
    setCurrentSection(sectionIndex);
    
    // Force cursor re-render when changing sections
    setCursorKey(prev => prev + 1);
    
    const targetSection = sectionsRef.current[sectionIndex]?.current;
    
    if (targetSection) {
      // Use scrollIntoView with smooth behavior and block set to 'start'
      targetSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
    
    // Re-enable scrolling after a shorter delay
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      scrollTimeoutRef.current = null;
    }, 1000); // Increased timeout to ensure smooth transition completes
  };

  // Handle intersection observer for automatic section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isScrolling) {
            const sectionIndex = sectionsRef.current.findIndex(
              (ref) => ref.current === entry.target
            );
            if (sectionIndex !== -1 && sectionIndex !== currentSection) {
              setCurrentSection(sectionIndex);
              // Force cursor re-render when section changes automatically
              setCursorKey(prev => prev + 1);
            }
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
        rootMargin: '0px'
      }
    );

    // Observe all sections
    sectionsRef.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionsRef.current.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [currentSection, isScrolling]);

  useEffect(() => {
    // Handle wheel scroll
    const handleWheel = (e) => {
      // Allow normal scrolling in the demo section
      if (currentSection === 2) return;
      
      e.preventDefault();
      
      // Calculate direction
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = Math.max(0, Math.min(2, currentSection + direction));
      
      // Only navigate if we're actually changing sections
      if (nextSection !== currentSection) {
        navigateToSection(nextSection);
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        // Allow normal scrolling in the demo section
        if (currentSection === 2) return;
        
        e.preventDefault();
        
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        const nextSection = Math.max(0, Math.min(2, currentSection + direction));
        
        if (nextSection !== currentSection) {
          navigateToSection(nextSection);
        }
      }
    };

    // Handle touch navigation
    let touchStartY = 0;
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e) => {
      // Allow normal scrolling in the demo section
      if (currentSection === 2) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50) {
        const direction = diff > 0 ? 1 : -1;
        const nextSection = Math.max(0, Math.min(2, currentSection + direction));
        
        if (nextSection !== currentSection) {
          navigateToSection(nextSection);
        }
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentSection]); // Only depend on currentSection

  return (
    <div className="app">
      <Hero ref={heroRef} />
      <WhatIsGradeX ref={whatIsRef} />
      <LiveDemo ref={demoRef} />
      
      {/* Single global TargetCursor instance */}
      <TargetCursor 
        key={cursorKey}
        spinDuration={2}
        hideDefaultCursor={true}
        color="#ffffff"
      />
    </div>
  );
}

export default App;