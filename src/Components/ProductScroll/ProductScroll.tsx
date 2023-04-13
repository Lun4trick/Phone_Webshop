import React, { useRef, useState } from 'react';
import cn from 'classnames';
import PhoneCard from '../PhoneCard/PhoneCard';
import ScrollPosition from '../../utils/types/ScrollPosition';
import { PhonePreview } from '../../utils/types/PhonePreviewType';

type Props = {
  products: PhonePreview[],
  title: string,
}

const ProductScroll: React.FC<Props> = ({ products, title }) => {
  const { start, middle, end} = ScrollPosition;
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
    <section className='mb-[80px]'>
      <div className='flex mb-[24px] justify-between gap-6'>
        <p 
          className='flex font-bold text-white text-[22px] leading-8'
        >
          {title}
        </p>
        <div className='flex gap-4'>
          <button 
            type='button' 
            className={cn(
              "bg-gray-600 h-[32px] aspect-square flex items-center justify-center",
              {"bg-transparent border-[1px] border-gray-700": currentScrollPos === start}
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
              {"bg-transparent border-[1px] border-gray-700": currentScrollPos === end}
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
      {products.length === 0
        ? (
          <div className='mx-auto bg-gradient-to-b from-white to-slate-800 animate-spin rounded-full h-5 w-5'/>
        )
        : (
          <div 
            className='flex max-h-[440px] gap-4 scroll-smooth snap-mandatory snap-x overflow-hidden' 
            ref={newModelsContainer}
            onScroll={handleScroll}
          >
            {products.map(phone => (
              <div className='snap-start' key={phone.id}>
                <PhoneCard phonePreview={phone}/>
              </div>
            ))
            }
          </div>
        )}
    </section>
  )
} 

export default ProductScroll;