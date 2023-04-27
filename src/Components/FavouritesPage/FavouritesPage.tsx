import React from 'react';
import PathHistory from '../PathHistory/PathHistory';
import { useAppSelector } from '../../app/hooks';
import { v4 as uuidv4 } from 'uuid';
import PhoneCard from '../PhoneCard/PhoneCard';
import Loader from '../Loader/Loader';

const FavouritesPage: React.FC = () => {
  const { favouriteItems } = useAppSelector(state => state.favouriteItems);
  const { phones, status } = useAppSelector(state => state.allPhones);
  const filteredPhones = phones.filter(phone => favouriteItems.includes(phone.itemId));
  const isLoading = status === 'loading';

  return (
    <section className='max-w-[1200px] mx-auto'>
      <PathHistory />
      {isLoading && (
        <Loader />
      )}
      {filteredPhones.length > 0
        ? (
          <>
            <h1 className='text-[32px] tablet:text-[48px] font-bold text-Phone-white mb-2'>
              Favourites
            </h1>
            <p className='text-Secondary text-sm mb-10'>
              {`${favouriteItems.length} items`}
            </p>
            <div className='grid grid-cols-1 tablet:grid-cols-2 tabletBig:grid-cols-3 desktop:grid-cols-4 gap-x-4 gap-y-10 w-full mb-8'>
              {filteredPhones.map(product => (
                <div
                  key={uuidv4()}
                >
                  <PhoneCard
                    phonePreview={product}
                  />
                </div>
              ))}
            </div>
          </>
        )
        : (
          <p className='text-Phone-white text-3xl mb-10'>
            {!isLoading && (
              'Favourites are Empty'
            )}
          </p>
        )}
    </section>
  );
};

export default FavouritesPage;
