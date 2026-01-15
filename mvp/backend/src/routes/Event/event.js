const express = require('express');
const router = express.Router();
const eventQuery = require('../Event/event.query');
const { getEventById, getEventsAll, getUsersEvent } = require('../Event/event.query');


// affiche les listes des events (page d'accueil des events)
router.get('/events', async (req, res) => {
  try {
    const events = await getEventsAll() // récupère tous les events de la db
    res.status(200).json(events)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// affiche les détails d'un event précis
router.get ('/events/:id', async (req, res) => {
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
})

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


module.exports = router;