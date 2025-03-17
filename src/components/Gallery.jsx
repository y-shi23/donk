import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import spiritImg from './Spirit.png';

const photos = [
  { id: 1, url: 'https://picsum.photos/400/300', title: 'Major 2024 夺冠时刻' },
  { id: 2, url: 'https://picsum.photos/400/500', title: '训练日常' },
  { id: 3, url: 'https://picsum.photos/400/400', title: '赛前准备' },
  { id: 4, url: 'https://picsum.photos/400/600', title: '粉丝互动' },
  { id: 5, url: 'https://picsum.photos/400/350', title: '团队合影' },
  { id: 6, url: 'https://picsum.photos/400/450', title: '比赛精彩瞬间' },
  { id: 7, url: 'https://picsum.photos/400/550', title: '后台花絮' },
  { id: 8, url: 'https://picsum.photos/400/320', title: '颁奖典礼' },
  { id: 9, url: 'https://picsum.photos/400/480', title: '赛场外的DONK' },
];

function Gallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // 跟踪每张图片的加载状态
  const [loadedImages, setLoadedImages] = useState({});
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  
  // 初始化加载状态
  useEffect(() => {
    const initialLoadState = {};
    photos.forEach(photo => {
      initialLoadState[photo.id] = false;
    });
    setLoadedImages(initialLoadState);
  }, []);
  
  // 检查是否所有图片都已加载
  useEffect(() => {
    const allLoaded = Object.values(loadedImages).every(loaded => loaded);
    if (allLoaded && Object.keys(loadedImages).length === photos.length) {
      setAllImagesLoaded(true);
    }
  }, [loadedImages]);
  
  // 处理图片加载完成事件
  const handleImageLoaded = (id) => {
    setLoadedImages(prev => ({
      ...prev,
      [id]: true
    }));
  };
  
  // 预加载图片
  useEffect(() => {
    photos.forEach(photo => {
      const img = new Image();
      img.src = photo.url;
      img.onload = () => handleImageLoaded(photo.id);
      img.onerror = () => handleImageLoaded(photo.id); // 即使加载失败也标记为已完成
    });
  }, []);

  return (
    <div className="min-h-screen bg-primary text-white py-12">
      <div className="container mx-auto px-2 sm:px-4">
        <h1 className="text-4xl font-bold mb-12 text-center">donk</h1>
        {/* 加载指示器 */}
        {!allImagesLoaded && (
          <div className="flex justify-center items-center py-12">
            <div className="relative">
              <img src={spiritImg} alt="Spirit" className="w-16 h-16 animate-pulse" />
              <div className="absolute inset-0 w-full h-full rounded-full bg-accent opacity-50 animate-ripple-1"></div>
              <div className="absolute inset-0 w-full h-full rounded-full bg-accent opacity-30 animate-ripple-2"></div>
              <div className="absolute inset-0 w-full h-full rounded-full bg-accent opacity-10 animate-ripple-3"></div>
            </div>
          </div>
        )}
        
        <motion.div
          ref={ref}
          className={`columns-1 sm:columns-2 lg:columns-3 gap-2 sm:gap-4 space-y-2 sm:space-y-4 ${!allImagesLoaded ? 'hidden' : ''}`}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, staggerChildren: 0.3 }}
        >
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              className="break-inside-avoid mb-4"
              whileHover={{ scale: 1.02, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-secondary rounded-lg overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-auto object-cover"
                  onLoad={() => handleImageLoaded(photo.id)}
                  onError={() => handleImageLoaded(photo.id)}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{photo.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Gallery;