import React from 'react';
import { useAppSelector } from '../../app/hooks';
import PhoneCard from '../PhoneCard/PhoneCard';

const BrandNewModels: React.FC = () => {
  const newModels = useAppSelector(state => state.allPhones.phones)
    .filter(phone => phone.year >= 2019);
  return (
    <div className='flex max-w-full overflow-hidden gap-4'>
      {newModels.length === 0 
        ? <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" />         
        : (
          newModels.map(phone => (
            <PhoneCard phonePreview={phone}/>
          ))
        )}
    </div>
  )
} 

export default BrandNewModels;