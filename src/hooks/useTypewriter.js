import { useState, useEffect } from 'react';

const useTypewriter = (text, speed = 150) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setDisplayText(text); // 保持文本内容，不清空
        setTimeout(() => {
          currentIndex = 0;
        }, 1000); // 等待1秒后重新开始
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { text: displayText };
};

export default useTypewriter;