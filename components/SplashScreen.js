import { useEffect, useState } from "react";
import Image from "next/image";

const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, 3000); 

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className="splashContainer">
      <div className="splashContent">
     <Image src="/favicon.ico" width={100} height={100}></Image>
    </div>
    </div>
  );
};

export default SplashScreen;
