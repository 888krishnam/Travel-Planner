import { Trip } from '../../../types/Interface';
import { PlacePhoto } from '../../../services/PlacePhoto';

function Info(trip: Trip) {
    const imageUrl = PlacePhoto(trip?.userSelection?.destination || '');
    return (
        <div>
            <img src= { imageUrl || '/home.png' } alt='Home' className='rounded-xl  w-full h-90 object-cover' />
            <div className='flex justify-between items-center'>
                <div className='mt-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.destination}</h2>
                    <div className='flex gap-5 text-gray-500 text-xs md:text-md'>
                        <h2 className='p-1 px-3 bg-head rounded-full'>📅 {trip?.userSelection?.days} Day</h2>
                        <h2 className='p-1 px-3 bg-head rounded-full'>💸 {trip?.userSelection?.budget}</h2>
                        <h2 className='p-1 px-3 bg-head rounded-full'>🥂 {trip?.userSelection?.people}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info