const db = require("../../config/db");
const { ObjectId } = require("mongodb");

async function getMessagePreview(id) {
  try {
    const conn = await db();
    const response = await conn
      .collection("Events")
      .find({ participants: { $in: [new ObjectId(id)] } })
      .sort({ "lastMessage.sentAt": -1 })
      .project({
        _id: 1,
        title: "$title",
        photo: { $arrayElemAt: ["$photos", 0] },
        content: "$lastMessage.content",
        sentAt: "$lastMessage.sentAt",
        senderName: "$lastMessage.senderName",
        senderId: "$lastMessage.userId",
      })
      .toArray();
    return response;
  } catch (err) {
    console.error("Mongo query error getTest : ", err);
    throw err;
  }
}

async function getGroupInfoById(groupId) {
  const conn = await db();
  const response = await conn.collection("Events").findOne(
      { _id: new ObjectId(groupId) },
      { projection: { title: 1, photo: { $arrayElemAt: ["$photos", 0] } } }
  );
  return response;
}

async function getMessageByGroupId(groupId, userId) {
  const conn = await db();
  const messages = await conn.collection("Messages").aggregate([
    {
      $match: { groupId: new ObjectId(groupId) }
    },
    {
      $lookup: {
        from: "Users",           // Nom de la collection des utilisateurs
        localField: "userId",    // Champ dans Messages
        foreignField: "_id",     // Champ dans Users
        as: "authorDetails"      // Nom du champ temporaire
      }
    },
    {
      $unwind: "$authorDetails"
    },
    {
      $sort: { sentAt: -1 }
    },
    {
      $project: {
        _id: 1,
        content: 1,
        sentAt: 1,
        userId: 1,
        userName: "$authorDetails.firstname",
        userPicture: "$authorDetails.picture",
        isMe: { $eq: ["$userId", new ObjectId(userId)] }
      }
    }
  ]).toArray();
  return messages;
}

async function sendMessageByGroupId(groupId, userId, content) {
  const conn = await db();
  
  try {
    // Récupérer le nom de l'utilisateur
    const user = await conn.collection("Users").findOne({ _id: new ObjectId(userId) });
    const senderName = user?.firstname || "Unknown";
    console.log("User found:", senderName, "userId:", userId);
    
    // Insérer le message
    const result = await conn.collection("Messages").insertOne({
      groupId: new ObjectId(groupId),
      userId: new ObjectId(userId),
      content: content,
      sentAt: new Date()
    });
    console.log("Message inserted:", result.insertedId);
    
    // Mettre à jour le lastMessage de l'Event
    const sentAt = new Date();
    const updateResult = await conn.collection("Events").updateOne(
      { _id: new ObjectId(groupId) },
      {
        $set: {
          lastMessage: {
            userId: new ObjectId(userId),
            senderName: senderName,
            content: content,
            sentAt: sentAt
          }
        }
      }
    );
    console.log("Event updated:", updateResult.modifiedCount, "matched:", updateResult.matchedCount);
    
    return result;
  } catch (error) {
    console.error("Error in sendMessageByGroupId:", error);
    throw error;
  }
}

module.exports = { getMessageByGroupId, getMessagePreview, getGroupInfoById, sendMessageByGroupId };