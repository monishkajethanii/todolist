"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Home from './Home';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1000); 

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen border-2 border-black">
      <Image src="/favicon.ico" className="inline" width={100} height={100} alt="Splash Icon" />
    </div>
  );
};

const Page = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setSplashVisible(false);
  };

  return (
    <>
      {isSplashVisible ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <Home />        
      )}
    </>
  );
};

export default Page;