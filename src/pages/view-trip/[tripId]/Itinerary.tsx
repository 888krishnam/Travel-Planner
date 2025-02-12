import { Trip, Place } from '../../../types/Interface';
import PlaceCard from './PlaceCard';

function Itinerary(trip: Trip) {  
  return (
    <div>
      <h2 className='font-bold text-xl mt-10'>Itinerary</h2>
        {Array.isArray(trip?.tripData?.itinerary) && trip.tripData.itinerary.map((day, index) => (
          <div className='mt-10' key={index}>
            <h2 className='font-medium'>Day {index + 1}</h2>
              <div className='grid md:grid-cols-2 gap-5 mt-5'>
                {day.places?.map((place: Place, placeIndex: number) => (
                  <div key={placeIndex}>
                  <h2 className='font-medium text-sm text-orange-800'>{place.bestTimeToVisit}</h2>
                  <PlaceCard {...place} trip = {trip} key={index}/>
                  </div>
                ))}
              </div>
          </div>
        ))}
    </div>
  )
}

export default Itinerary