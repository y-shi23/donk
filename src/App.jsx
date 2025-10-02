import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTrophy, FaChartLine, FaPlay } from 'react-icons/fa';
import { BsCamera, BsPlayCircle, BsPauseCircle } from 'react-icons/bs';
import { carouselVideos, highlightVideos } from './data/videos';
import Gallery from './components/Gallery';
import useTypewriter from './hooks/useTypewriter';
import { backgroundImages } from './data/backgroundImages';

const Home = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { text } = useTypewriter('每一个不曾起舞的日子，都是对生活的辜负', 200);
  const [currentBgIndex, setCurrentBgIndex] = useState(Math.floor(Math.random() * backgroundImages.length));
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [playingHighlightId, setPlayingHighlightId] = useState(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentBgIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
        setIsTransitioning(false);
      }, 500); // 等待动画完成
    }, 5000); // 每3秒切换一次

    return () => clearInterval(interval);
  }, []);

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [highlightsRef, highlightsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBgIndex}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              <img
                src={backgroundImages[currentBgIndex]}
                alt="Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </motion.div>
          </AnimatePresence>
        </div>
        <nav className="absolute top-0 right-0 z-20 p-4 mr-8">
          <Link to="/gallery" className="text-white hover:text-accent transition-colors duration-300">
            <BsCamera className="w-6 h-6" />
          </Link>
        </nav>
        <div className="relative z-10 py-12 md:py-20 w-full px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 md:mb-6 animate-fade-in">
              donk
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-300 animate-slide-up">
              Champion
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="min-h-[2em] flex items-center justify-center"
            >
              <p className="text-lg sm:text-xl font-bold text-white">{text}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary w-full" ref={statsRef}>
        <div className="w-full px-4">
          <h2 className="section-title">职业生涯数据</h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, staggerChildren: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[2000px] mx-auto"
          >
            <div className="stats-card">
              <FaTrophy className="text-4xl text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-2">冠军荣誉</h3>
              <div className="flex flex-col gap-2">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={statsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-accent/5 rounded p-2 hover:bg-accent/10 transition-colors duration-300"
                >
                  <p className="text-gray-300">Major winner x 1</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={statsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-accent/5 rounded p-2 hover:bg-accent/10 transition-colors duration-300"
                >
                  <p className="text-gray-300">Major MVP x 1</p>
                </motion.div>
              </div>
            </div>
            <div className="stats-card">
              <FaChartLine className="text-4xl text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-2">击杀数据</h3>
              <div className="flex flex-col gap-2">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={statsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-accent/5 rounded p-2 hover:bg-accent/10 transition-colors duration-300"
                >
                  <p className="text-gray-300">Total kills 11228</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={statsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-accent/5 rounded p-2 hover:bg-accent/10 transition-colors duration-300"
                >
                  <p className="text-gray-300">Maps played 543</p>
                </motion.div>
              </div>
            </div>
            <div className="stats-card">
              <FaPlay className="text-4xl text-accent mb-4" />
              <h3 className="text-2xl font-bold mb-2">比赛场次</h3>
              <div className="flex flex-col gap-2">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={statsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-accent/5 rounded p-2 hover:bg-accent/10 transition-colors duration-300"
                >
                  <p className="text-gray-300">Rounds played 13206</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={statsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-accent/5 rounded p-2 hover:bg-accent/10 transition-colors duration-300"
                >
                  <p className="text-gray-300">K/D Ratio 1.261</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Carousel Section */}
      <section className="py-20 bg-secondary w-full">
        <div className="w-full px-4">
          <h2 className="section-title">精彩时刻</h2>
          <div className="max-w-[2000px] mx-auto">
            <div className="relative bg-gray-800 rounded-lg overflow-hidden">
              {carouselVideos.map((video, index) => (
                <div key={video.id} className="relative">
                  <video
                    src={video.url}
                    className="w-full h-auto object-contain cursor-pointer"
                    autoPlay
                    muted={isMuted}
                    playsInline
                    nocontrols
                    style={{ display: currentVideoIndex === index ? 'block' : 'none' }}
                    onEnded={() => setCurrentVideoIndex((prev) => (prev + 1) % carouselVideos.length)}
                  />
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute bottom-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-300"
                  >
                    {isMuted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 w-full" ref={highlightsRef}>
        <div className="w-full px-4">
          <h2 className="section-title">精彩集锦</h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={highlightsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, staggerChildren: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[2000px] mx-auto"
          >
            {highlightVideos.map((video) => {
              const isPlaying = playingHighlightId === video.id;

              return (
                <motion.div
                  key={video.id}
                  className="card overflow-hidden"
                  whileHover={{ scale: 1.03, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative bg-gray-800 mb-4 group">
                    <video
                      src={video.url}
                      className="w-full h-auto object-contain cursor-pointer"
                      controls
                      controlsList="nodownload"
                      onPlay={() => setPlayingHighlightId(video.id)}
                      onPause={() =>
                        setPlayingHighlightId((current) => (current === video.id ? null : current))
                      }
                      onEnded={() =>
                        setPlayingHighlightId((current) => (current === video.id ? null : current))
                      }
                    />
                    <AnimatePresence initial={false} mode="wait">
                      {isPlaying ? (
                        <motion.div
                          key="pause"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="absolute inset-0 flex justify-end items-end p-4 pointer-events-none"
                        >
                          <motion.span
                            initial={{ scale: 0.85 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="text-white/90 drop-shadow-lg"
                          >
                            <BsPauseCircle className="text-4xl md:text-5xl" />
                          </motion.span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="play"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="absolute inset-0 flex items-center justify-center bg-black/50 pointer-events-none"
                        >
                          <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                            className="text-white drop-shadow-lg"
                          >
                            <BsPlayCircle className="text-5xl" />
                          </motion.span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                  <p className="text-gray-300">{video.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
