import { Link } from "react-router-dom"
import { Trip, Place } from "../../../types/Interface"
import { PlacePhoto } from "../../../services/PlacePhoto";

interface PlaceCardProps extends Place {
  trip: Trip;
}

function PlaceCard({ trip, placeName, placeDetails }: PlaceCardProps) {

  const imageUrl = PlacePhoto(placeName + ", " + trip?.userSelection?.destination);

  return (
    <Link to = {'https://www.google.com/maps/search/?api=1&query=' + placeName + ", " + trip?.userSelection?.destination} target='_blank'>
        <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
            <img 
                src= { imageUrl || '/home.png' }
                alt='Home' 
                className='w-[130px] h-[130px] rounded-xl' 
            />
            <div>
                <h2 className="font-bold text-lg">{placeName}</h2>
                <p className="text-gray-500 text-sm">{placeDetails}</p>
            </div>
        </div>
    </Link>
  )
}

export default PlaceCard