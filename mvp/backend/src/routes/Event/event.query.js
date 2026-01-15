const db = require('../../config/db');
const { ObjectId } = require('mongodb');


async function getEventById(eventId) {
    try {
        const conn = await db;
        return await conn.collection('events').findOne({ _id: new ObjectId(eventId) });
    } catch (error) {
        console.error('Mongo query error getEventById:', error);
        throw error;
    }

}

async function getEventsAll() {
    try {
        const conn = await db;
        return await conn.collection('events').find({}).toArray(); 
    } catch (error) {
        console.error('Mongo query error getEventsAll:', error);
        throw error;
    }
    
}

async function getUsersEvent(eventId) {
    try {
        const conn = await db;
        const event = await conn.collection('events').findOne({ _id: new ObjectId(eventId) });
        if (!event) {
            throw new Error('Event not found');
        }
        return event.users || []; 
    } catch (error) {
        console.error('Mongo query error getUsersEvent:', error);
        throw error;
    }
}

module.exports = { getEventById, getEventsAll, getUsersEvent };