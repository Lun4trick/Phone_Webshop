/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useMemo, useState } from 'react';

type TestColor = {text: string, bgImg: string}

const testArr: TestColor[] = [
  {text: 'iphone-14', bgImg: 'bg-iphone-14-back'},
  {text: 'ipad-pro', bgImg: 'bg-ipad-pro'},
  {text: 'airpods', bgImg: 'bg-airpods'},
  {text: 'iphone-14-pros', bgImg: 'bg-iphone-14-pros'}
];

export const AdScroll: React.FC = () => {
  const [currentElement, setCurrentElement] = useState<TestColor>(testArr[0]);
  const indexOfElement = useMemo(() => (
    testArr.findIndex(item => item.text === currentElement.text)
  )
  , [currentElement])
  let timedAdChange: NodeJS.Timeout | undefined;

  useEffect(() => {
    const swipeElement = document.getElementById('adScroll');
    timedAdChange = setTimeout(() => {
      setCurrentElement(testArr[indexOfElement + 1] || testArr[0])
    }, 5000);

    let startX: number;
    const handleTouchEnd = (event: TouchEvent) => {
      const endX = event.changedTouches[0].clientX;

      if (endX < startX) {
        setCurrentElement(testArr[indexOfElement + 1] || testArr[0]);
      } else if (endX > startX) {
        setCurrentElement(testArr[indexOfElement - 1] || testArr[testArr.length - 1]);
      }

      swipeElement?.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(timedAdChange)
    };

    const handleTouchStart = (event: TouchEvent) => {
      startX = event.touches[0].clientX;
      swipeElement?.addEventListener('touchend', handleTouchEnd, {passive: true});
    };


    if (swipeElement) {
      swipeElement.addEventListener('touchstart', handleTouchStart, {passive: true});
    }

    return () => {
      if (swipeElement) {
        swipeElement.removeEventListener('touchstart', handleTouchStart);
        swipeElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [indexOfElement]);

  return (
    <div id='adScroll' className="w-full">
      <div className="flex w-full tablet:aspect-[4/1] aspect-square bg-gradient-to-r from-black to-[#252627]">
        <div className={`w-full h-full tablet:w-1/2 transition-all bg-no-repeat bg-contain bg-center duration-1000 ${currentElement.bgImg}`}/>
        <div className='hidden tablet:flex tablet:w-1/2 text-white'>
          available now text
        </div>
      </div>
      <div className="flex h-5 w-full gap-4 justify-center">
        {testArr.map(item => (
          <div 
            key={item.text} 
            className={`
              h-2 w-4 cursor-pointer border-b-4 flex ${(item.text === currentElement.text) ? ' border-white' : ' border-gray-600'}`}
            onClick={() => {
              clearTimeout(timedAdChange)
              setCurrentElement(item);
            }}
          />
        ))}
      </div>
    </div>
  );
};