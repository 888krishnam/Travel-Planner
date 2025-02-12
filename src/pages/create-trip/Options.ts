export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Budget friendly',
        icon:'💰',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Not too expensive',
        icon:'💵',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Money is no object',
        icon:'💸',
    }
]

export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A solo Explorer',
        icon:'🕺',
        people:'Myself'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Traveling with a partner',
        icon:'🥂',
        people:'Partner'
    },
    {
        id:3,
        title:'Family',
        desc:'A family trip',
        icon:'🏡',
        people:'family'
    },
    {
        id:4,
        title:'Friends',
        desc:'A trip with friends',
        icon:'🫂',
        people:'friends'
    }
]

export const AI_PROMPT='Generate a JSON travel plan for {destination}, for {days} Days with {people} with {budget} budget. Include a list of at least three hotels with their hotelName, hotelAddress, price, rating. The itinerary should be structured an array of objects which include a list of places to visit each day. For each place, provide the place name, details about the place, and the best time to visit. The itinerary should cover {days} days.'