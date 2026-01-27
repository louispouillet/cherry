const { ObjectId } = require('mongodb');
const connectDB = require('../../config/db');

async function AddUserToGroup(user_id, event_id) {
  try {
    const db = await connectDB()
    const result = await db.collection('Groups').updateOne({"eventId" : new ObjectId(event_id)} , {$addToSet : {users : new ObjectId(user_id)}});
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function QuitTheGroup(user_id, event_id) {
    try {
        const db = await connectDB()
        const result = await db.collection('Groups').updateOne({"eventId" : new ObjectId(event_id)} , {$pull : {users : new ObjectId(user_id)}});
    }
        catch (err) {
            console.error(err)
            throw err
        }
}

async function GetUsersGroups(user_id) {
  try {
      const db = await connectDB()
      const groups = await db.collection('Groups').find().toArray();
      return groups;
  } catch (err) {
      console.error(err)
      throw err
  }
}


module.exports =  {AddUserToGroup , QuitTheGroup, GetUsersGroups};