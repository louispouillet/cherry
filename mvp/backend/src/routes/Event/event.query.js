const db = require('../../config/db');
const { ObjectId } = require('mongodb');


async function getEventById(eventId) {
    try {
        const conn = await db();
        return await conn.collection('events').findOne({ _id: new ObjectId(eventId) });
    } catch (error) {
        console.error('Mongo query error getEventById:', error);
        throw error;
    }

}

async function getEventsAll() {
    try {
        const conn = await db();
        const result =  await conn.collection('events').find({}).toArray();
        return result; 
    } catch (error) {
        console.error('Mongo query error getEventsAll:', error);
        throw error;
    }
    
}

async function getUsersEvent(eventId) {
    try {
        const conn = await db();
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

async function CreateEvent(newEvent) {
    try {
        const conn = await db();
        return await conn.collection('events').insertOne(newEvent);
    } catch (error) {
        console.error('Mongo query error CreateEvent:', error);
        throw error;
    }
}

async function updateEvent(eventId, updateData) {
    try {
        const conn = await db();
        return await conn.collection('events').updateOne(
            { _id: new ObjectId(eventId) }, // Filtre pour trouver l'event par son ID
            { $set: updateData } // Met à jour les champs spécifiés dans updateData
        );
    } catch (error) {
        console.error('Mongo query error updateEvent:', error);
        throw error;
    }
}

async function deleteEvent(eventId) {
    try {
        const conn = await db();
        return await conn.collection('events').deleteOne({ _id: new ObjectId(eventId) });
    } catch (error) {
        console.error('Mongo query error deleteEvent:', error);
        throw error;
    }
}

module.exports = { getEventById, getEventsAll, getUsersEvent, CreateEvent, updateEvent, deleteEvent };