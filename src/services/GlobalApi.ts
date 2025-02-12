import axios from 'axios';

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const config = {
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': import.meta.env.VITE_PLACE_API_KEY,
        'X-Goog-FieldMask': [
            'places.displayName',
            'places.photos',
            'places.id',
        ]
    },
};

interface A {
    textQuery: string;
}

export const getPlaceDetails = (data: A) => axios.post(BASE_URL, data, config) 