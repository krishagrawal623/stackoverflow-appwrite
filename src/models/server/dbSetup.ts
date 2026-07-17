import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

let dbPromise: Promise<any> | null = null;

export default async function getOrCreateDB(){
  if (!dbPromise) {
    dbPromise = (async () => {
      try {
        await databases.get(db)
        console.log("Database connection success")
      } catch (error) {
        try {
          await databases.create(db, db)
          console.log("database created")
          //create collections
          await Promise.all([
            createQuestionCollection(),
            createAnswerCollection(),
            createCommentCollection(),
            createVoteCollection(),
          ])
          console.log("Collection created")
          console.log("Database connected")
        } catch (err) {
          console.log("Error creating databases or collection", err)
        }
      }
      return databases;
    })();
  }
  return dbPromise;
}