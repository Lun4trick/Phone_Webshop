import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../app/hooks';
import PhoneCard from '../PhoneCard/PhoneCard';
import ScrollPosition from '../../utils/types/ScrollPosition';

const BrandNewModels: React.FC = () => {
  const { start, middle, end} = ScrollPosition;
  const newModels = useAppSelector(state => state.allPhones.phones)
    .filter(phone => phone.year >= 2019);
  const newModelsContainer = useRef<HTMLDivElement | null>(null);
  const [currentScrollPos, setCurrentScrollPos] = useState(start);

  const handleScroll = () => {
    if (newModelsContainer.current) {
      const scrollContainer = newModelsContainer.current;
      const isAtStart = scrollContainer.scrollLeft === 0;
      const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth === scrollContainer.scrollWidth;

      if(isAtStart && currentScrollPos !== start) {
        setCurrentScrollPos(start);

        return;
      };

      if(isAtEnd && currentScrollPos !== end) {
        setCurrentScrollPos(end);

        return;
      }
      setCurrentScrollPos(middle);
    }
  };

  const scrollLeft = () => {
    if (newModelsContainer.current) {
      newModelsContainer.current
        .scrollBy({
          left: -200,
          behavior: 'smooth'
        });
    }
  };
  
  const scrollRight = () => {
    if (newModelsContainer.current) {
      newModelsContainer.current
        .scrollBy({
          left: 200,
          behavior: 'smooth'
        });
    }
  };

  return (
    <>
      <div className='flex mb-[24px] justify-between gap-6'>
        <p 
          className='flex font-bold text-white text-[22px] leading-8'
        >
          Brand new models
        </p>
        <div className='flex gap-4'>
          <button 
            type='button' 
            className={cn(
              "bg-gray-600 h-[32px] aspect-square flex items-center justify-center",
              {"bg-transparent border-[1px] border-gray-600": currentScrollPos === start}
            )}
            onClick={scrollLeft}
          >
            <img 
              src={`${process.env.PUBLIC_URL}/imgs/arrow-left.svg`} 
              alt="" 
            />
          </button>
          <button 
            type='button'
            className={cn(
              "bg-gray-600 h-[32px] aspect-square flex items-center justify-center",
              {"bg-transparent border-[1px] border-gray-600": currentScrollPos === end}
            )}
            onClick={scrollRight}
          >
            <img 
              src={`${process.env.PUBLIC_URL}/imgs/arrow-right.svg`} 
              alt="" 
            />
          </button>
        </div>
      </div>
      <div 
        className='flex gap-4 overflow-x-hidden scroll-smooth snap-mandatory snap-x' 
        ref={newModelsContainer}
        onScroll={handleScroll}
      >
        {newModels.length === 0 
          ? <div className=' bg-gradient-to-b from-white to-slate-800 animate-spin rounded-full h-5 w-5'/>         
          : (
            newModels.map(phone => (
              <div className='snap-start' key={phone.id}>
                <PhoneCard phonePreview={phone}/>
              </div>
            ))
          )}
      </div>
    </>
  )
} 

export default BrandNewModels;