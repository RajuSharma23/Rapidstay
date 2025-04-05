const Room = require('../models/Room');

const seedRooms = async () => {
    try {
        // Clear existing rooms
        await Room.deleteMany();

        const rooms = [
            {
                type: 'Deluxe Suite',
                description: 'Spacious suite with ocean view',
                guests: 2,
                size: '400 sq ft',
                price: 299,
                image: '/images/deluxe-suite.jpg',
                location: 'Ocean Front',
                amenities: ['King Bed', 'Ocean View', 'WiFi'],
                rating: 4.8
            },
            {
                type: 'Standard Room',
                description: 'Comfortable room for budget travelers',
                guests: 2,
                size: '300 sq ft',
                price: 149,
                image: '/images/standard-room.jpg',
                location: 'City View',
                amenities: ['Queen Bed', 'WiFi', 'TV'],
                rating: 4.2
            }, {
                type: 'Standard Room',
                description: 'Comfortable room for budget travelers',
                guests: 2,
                size: '300 sq ft',
                price: 149,
                image: '/images/standard-room.jpg',
                location: 'City View',
                amenities: ['Queen Bed', 'WiFi', 'TV'],
                rating: 4.2
            }
        ];

        await Room.insertMany(rooms);
        console.log('Data seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

module.exports = seedRooms;