const express = require("express");
const router = express.Router();
const { AddUserToGroup , QuitTheGroup } =  require("./group.query");

router.post('/add_user', /* auth , */async (req, res) => {
  try {
    /*
    const { event_id } = req.body;
    const { user_id } = payload.id; */
    const user_id = "7040ad9ac992a68dad3df0a8";
    const event_id = "6968ad9ac992a68dad3df0a8";
    const result = await AddUserToGroup(user_id, event_id);
    res.status(200).json({ message : "Successfully added"});
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete("/quit_group", /* auth , */ async (req , res) => {
    try {
        const user_id = "7040ad9ac992a68dad3df0a8";
        const event_id = "6968ad9ac992a68dad3df0a8";
        const result = await QuitTheGroup(user_id, event_id);
        res.status(200).json({ message : "You successfuly quitted the group"});
    } catch (err) {
        res.status(500).json({ message : "error to quit the group"})
    }
    
})

router.get("/get_all_groups", /* auth , */ async (req, res) => {
    try {
        /* 
        const user_id = payload.id;
        */
        const result = await GetAllGroups(user_id);
        res.json(result);
    }catch (err) {
        res.status(500),json({ message : "Cannot get all the groups"});
    }
})

module.exports = router;