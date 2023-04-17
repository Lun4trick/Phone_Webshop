import React from 'react';
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { PhonePreview } from '../../utils/types/PhonePreviewType';
import PageChangeType from '../../utils/types/PageChangeType';

type Props = {
  pages: PhonePreview[][];
  onPageChange: (changeType: PageChangeType, exactPage?: number) => void;
  currentPage: number;
};

const NumberOfPages: React.FC<Props> = ({ pages, onPageChange, currentPage }) => {
  const { LEFT, RIGHT, EXACT } = PageChangeType;
  return (
    <section className='flex mx-auto w-fit mb-[64px] laptop:mb-[80px] gap-4'>
      <button
        type='button'
        className={cn(
          'flex h-[32px] w-[32px] transition-colors justify-center items-center',
          { 'bg-Surface-2 hover:bg-Icons': currentPage > 0 },
          { ' border-[1px] border-Elements': currentPage === 0 },
        )}
        onClick={() => {
          if (currentPage > 0) {
            onPageChange(LEFT);
          }
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/imgs/arrow-left.svg`}
          alt='arrow-left'
        />
      </button>
      <div className='flex gap-2'>
        {
          pages.map((page, i) => (
            <button
              key={uuidv4()}
              type='button'
              className={cn(
                'h-[32px] w-[32px] transition-colors text-Phone-white text-[14px]',
                { 'bg-Phone-Accent': currentPage === i },
                { 'bg-Surface-1 hover:bg-Elements': currentPage !== i },
              )}
              onClick={() => {
                onPageChange(EXACT, i);
              }}
            >
              {i + 1}
            </button>
          ))
        }
      </div>
      <button
        type='button'
        className={cn(
          'flex h-[32px] w-[32px] transition-colors justify-center items-center',
          { 'bg-Surface-2 hover:bg-Icons': currentPage < pages.length - 1 },
          { ' border-[1px] border-Elements': currentPage === pages.length - 1 },
        )}
        onClick={() => {
          if (currentPage < pages.length - 1) {
            onPageChange(RIGHT);
          }
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/imgs/arrow-right.svg`}
          alt='arrow-left'
        />
      </button>
    </section>
  );
};

export default NumberOfPages;
