export const NEWSAPI_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.EXPO_PUBLIC_NEWSAPI_SECRET_KEY}`;

export const lists = [
    {
        id: 1,
        image: "https://picsum.photos/200/300",
        title: 'Amalfi',
        location: 'Italy',
        description:
            'The ultimate Amalfi Coast travel guide, where to stay, where to eat, and what areas to visit in the Amalfi Coast of Italy. Positano, Ravello, Amalfi and more',
    },
    {
        id: 2,
        image: "https://picsum.photos/200/300",
        title: 'Granada',
        location: 'Spain',
        description:
            'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
    },
    {
        id: 3,
        image: "https://picsum.photos/200/300",
        title: 'Cherry blossoms',
        location: 'Japan',
        description:
            "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
    },
];
