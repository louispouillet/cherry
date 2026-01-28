const db = require("../../config/db");
const { ObjectId } = require("mongodb");

async function getMessagePreview(id) {
  try {
    if (!id) throw new Error("id is required");
    const conn = await db();
    const response = await conn
      .collection("Events")
      .find({ participants: { $in: [new ObjectId(id)] } })
      .sort({ "lastMessage.sentAt": 1 })
      .project({
        title: "$title",
        photo: { $arrayElemAt: ["$photos", 0] },
        content: "$lastMessage.content",
        sentAt: "$lastMessage.sentAt",
        senderName: "$lastMessage.senderName",
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

async function getMessageByGroupId(groupId) {
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
      $sort: { sentAt: 1 }
    },
    {
      $project: {
        _id: 1,
        content: 1,
        sentAt: 1,
        userId: 1,
        test: "$authorDetails",
        userName: "$authorDetails.firstname",
        userPicture: "$authorDetails.picture"
      }
    }
  ]).toArray();
  return messages;
}

module.exports = { getMessageByGroupId, getMessagePreview, getGroupInfoById };
