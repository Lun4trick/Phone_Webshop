/* eslint-disable import/prefer-default-export */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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

  enum Direction  {
    LEFT = 'left',
    RIGHT = 'right',
  }

  const arrowButtonHandler = (direction: Direction) => {
    const {LEFT, RIGHT} = Direction;
    const dir = direction === LEFT
      ? LEFT
      : RIGHT
    clearTimeout(timedAdChange);

    if(dir === LEFT) {
      setCurrentElement(testArr[indexOfElement - 1] || testArr[testArr.length - 1]);
    } else {
      setCurrentElement(testArr[indexOfElement + 1] || testArr[0]);
    }
  }

  return (
    <section id='adScroll' className="flex flex-col w-full">
      <div className="flex gap-2 h-fit">
        <button 
          type='button' 
          className="hidden tablet:flex bg-[#323542] hover:bg-[#4A4D58] transition-colors w-[32px] items-center justify-center grow" 
          onClick={() => {
            arrowButtonHandler(Direction.LEFT)
          }}
        >
          <img src="./imgs/arrow-left.svg" alt="" />
        </button>

        <div className="flex w-full tablet:aspect-[5/2] tablet:max-h-[400px] aspect-square bg-black">
          <div className='hidden tablet:flex p-3 tablet:w-1/2 justify-end'>
            <div className="justify-center text-xl laptop:text-4xl p-8 laptop:p-12 bg-[#0d0e11] rounded-3xl">
              <p className="font-extrabold font-mont text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400">Now available in our store!
                <span className="text-orange-300 hidden laptop:inline">&#128076;</span>
              </p>

              <p className="text-gray-500 font-mont font-bold laptop:text-sm text-xs">
                Be the first!
              </p>

              <div className="h-1/2 flex items-end">
                <button type="button" className="border border-[#323542] hover:bg-[#323542] laptop:text-xl text-xs font-mont min-h-[50%] rounded-full text-slate-400 p-4 transition-colors">
                  Order Now
                </button>
              </div>
            </div>
          </div>
          <div className={`w-full h-full tablet:w-1/2 bg-no-repeat bg-contain bg-center transition-[background-image] duration-1000 ${currentElement.bgImg}`}/>
        </div>

        <button 
          type='button' 
          className="hidden tablet:flex bg-[#323542] hover:bg-[#4A4D58] transition-colors w-[32px] items-center justify-center" 
          onClick={() => {
            arrowButtonHandler(Direction.RIGHT)
          }}
        >
          <img src="./imgs/arrow-right.svg" alt="" />
        </button>
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
    </section>
  );
};