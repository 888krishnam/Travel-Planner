import { Trip } from '../../../types/Interface';
import HotelCard from './HotelCard';

function Hotels(trip: Trip) {
    return (
        <>
            <h2 className='font-bold text-xl mt-10'>Hotels</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
                {trip?.tripData?.hotels?.map((hotel, index) => (
                    <HotelCard key={index} hotel={hotel} />
                ))}
            </div>
        </>
    );
}

export default Hotels