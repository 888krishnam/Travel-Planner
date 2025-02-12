import { Link } from "react-router-dom";
import { PlacePhoto } from '../../../services/PlacePhoto';
import { hotel } from '../../../types/Interface';

interface HotelCardProps {
  hotel: hotel;
}

function HotelCard({ hotel }: HotelCardProps) {
  const imageUrl = PlacePhoto(hotel.hotelName || '');

  return (
    <Link
      to={
        'https://www.google.com/maps/search/?api=1&query=' +
        hotel.hotelName +
        ", " +
        hotel.hotelAddress
      }
      target='_blank'
    >
      <div className='hover:scale-110 transition-all cursor-pointer mt-5'>
        <img src={imageUrl || '/home.png'} alt='hotel' className='rounded-xl' />
        <div className='my-2'>
          <h2 className='font-medium'>{hotel.hotelName}</h2>
          <h2 className='text-xs text-gray-500'>📌 {hotel.hotelAddress}</h2>
          <h2 className='text-sm'>💰 {hotel.price}</h2>
          <h2 className='text-sm'>⭐ {hotel.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCard;