const express = require('express');
const router = express.Router();
const eventQuery = require('../Event/event.query');
const { getEventById, getEventsAll, getUsersEvent, CreateEvent, updateEvent, deleteEvent} = require('../Event/event.query');
const auth = require ("../../middelware/auth");

// affiche les listes des events (page d'accueil des events)
router.get('/events', auth ,async (req, res) => {
    try {
        const events = await getEventsAll() // récupère tous les events de la db
        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
});

// affiche les détails d'un event précis
router.get('/events/:id', async (req, res) => {
    const eventId = req.params.id // Récupère l'ID de l'event de l'URL
    try {
        const event = await getEventById(eventId) // récupère l'event de la db
        if (!event) {
            return res.status(404).json({ message: 'Event not found' })
        }
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
});

// affiche les users de l'event précis
router.get('/events/:id/users', async (req, res) => {
    const eventId = req.params.id; // Récupère l'ID de l'event de l'URL
    try {
        const users = await getUsersEvent(eventId); // récupère les users de l'event de la db
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// créer un nouvel event
router.post('/events/new', async (req, res) => {
    try {
        const { firstname, lastname, date, description, type, nb_participant_limit, pictures } = req.body;

        const newEvent = {
            firstname : firstname,
            lastname: lastname,
            date: date,
            type: type,
            description: description,
            pictures: pictures,
            nb_participant_limit: nb_participant_limit,
            nb_participant_join: 0,
            status: 'joinable', 
            users: [] // Initialise avec une liste vide d'utilisateurs
        };
        const result = await CreateEvent(newEvent);

        res.status(201).json({ message: 'Event created', eventId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// mettre à jour un event existant
router.put('/events/:id', async (req, res) => {
    const eventId = req.params.id;
    const updateData = req.body;
    try {

    if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'Bad parameter'});
    }
    const updatedEvents = await updateEvent(eventId,updateData);
    res.status(200).json(updatedEvents);    

    } catch (error) {   
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/events/:id', async (req, res) => {
    const eventId = req.params.id;
    try {
        const result = await deleteEvent(eventId);
        res.status(200).json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;