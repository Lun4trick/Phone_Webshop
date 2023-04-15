import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { type PhonePreview } from '../../utils/types/PhonePreviewType';

type Props = {
  pages: PhonePreview[][];
};

const NumberOfPages: React.FC<Props> = ({ pages }) => (
  <section className='flex mx-auto w-fit mb-[64px] laptop:mb-[80px] gap-4'>
    <button
      type='button'
      className='flex h-[32px] w-[32px] bg-Surface-2 justify-center items-center'
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
            className='h-[32px] w-[32px] bg-Surface-1 text-Phone-white text-[14px]'
          >
            {i + 1}
          </button>
        ))
      }
    </div>
    <button
      type='button'
      className='flex h-[32px] w-[32px] bg-Surface-2 justify-center items-center'
    >
      <img
        src={`${process.env.PUBLIC_URL}/imgs/arrow-right.svg`}
        alt='arrow-left'
      />
    </button>
  </section>
);

export default NumberOfPages;
