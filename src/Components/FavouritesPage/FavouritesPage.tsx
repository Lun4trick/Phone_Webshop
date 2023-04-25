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

  return (
    <section className='max-w-[1200px] mx-auto'>
      <PathHistory />
      {status === 'loading' && (
        <Loader />
      )}
      {filteredPhones.length > 0
        ? (
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
        )
        : (
          <h1 className='text-Phone-white text-3xl'>
            Favourites are Empty
          </h1>
        )}
    </section>
  );
};

export default FavouritesPage;
