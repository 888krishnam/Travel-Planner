import { useEffect, useState } from 'react'
import { getPlaceDetails } from './GlobalApi'

interface Photo {
    name: string;
    widthPx: number;
    heightPx: number;
}

export function PlacePhoto(destination: string) {
    const photoRefUrl = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_PLACE_API_KEY;
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        const data = {
            textQuery: destination,
        }
        const fetchData = async () => {
            try {
                await getPlaceDetails(data)
                .then(res => {
                    const photos: Photo[] = res.data.places[0].photos;
                    const targetRatio = 16 / 9;
                    const bestPhoto = photos.reduce((best: Photo | null, current: Photo) => {
                        const currRatio = current.widthPx / current.heightPx;
                        if (!best) {
                            return current;
                        }
                        const bestRatio = best.widthPx / best.heightPx;
                        return Math.abs(currRatio - targetRatio) < Math.abs(bestRatio - targetRatio) ? current : best;
                    }, null);
                    if (bestPhoto) {
                        const photoUrl = photoRefUrl.replace('{NAME}', bestPhoto.name);
                        setImageUrl(photoUrl);
                    }
                })
                .catch(err => console.error(err));
            } catch (err) {
                console.error(err);
            }
        };
        if (destination) {
            fetchData();
        }
    }, [destination, photoRefUrl]);

    return imageUrl;
}