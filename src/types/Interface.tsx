interface UserSelection {
    destination?: string;
    days?: string;
    people?: string;
    budget?: string;
}

export interface hotel {
    hotelName?: string;
    hotelAddress?: string;
    rating?: string;
    price?: string;
}

export interface Place {
    placeName?: string;
    placeDetails?: string;
    bestTimeToVisit?: string;
}

interface itinerary {
    day: number;
    places: Place[];
}

interface tripData {
    hotels?: hotel[];
    itinerary?: itinerary;
}

export interface Trip {
    userSelection?: UserSelection;
    email?: string;
    id?: string;
    tripData?: tripData;
}

export interface User {
    email: string;
    picture: string;
}

export type Option = {
    label: string;
    value: string;
    description?: string;
};

export type FormData = {
    destination?: Option;
    days?: string;
    budget?: string;
    people?: string;
};

export interface LoginInterface {
    open: boolean;
    onClose: () => void;
    onLoginSuccess: () => void;
}

export interface ApiOptions {
    language?: string;
    region?: string;
}