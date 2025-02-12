import { Link } from 'react-router-dom';
import { Trip } from '../../types/Interface'
import { PlacePhoto } from '../../services/PlacePhoto';
import DeleteTrip from './DeleteTrip';

interface TripCardProps {
  trip: Trip;
}

function TripCard({ trip }: TripCardProps) {

  const imageUrl = PlacePhoto(trip?.userSelection?.destination || '');

  return (
    <div className="relative">
      <Link to = {`/view/${trip.id}`} >
          <div className='hover:scale-105 transition-all'>
              <img src= { imageUrl || '/home.png' } alt={trip?.userSelection?.destination} className="object-cover rounded-xl"/>
              <h2 className='font-bold text-lg'>{trip?.userSelection?.destination}</h2>
              <h2 className='text-sm text-gray-500'>{trip?.userSelection?.days} Day trip with {trip?.userSelection?.people}</h2>
          </div>
      </Link>
      <DeleteTrip tripId={trip.id} />
    </div>
  )
}

export default TripCard