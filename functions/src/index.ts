import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
admin.initializeApp()

export const sendDailyNotifications = functions.pubsub
  .schedule("every 12 hours") // every  12 hours run function
  .onRun(async (context) => {
    const message = {
      notification: {
        title: "$FooCorp up 1.43% on the day",
        body:
          "$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.",
      },
      topic: "all", // or also use token : "USER_TOKEN_ID"
    }
    const response = await admin.messaging().send(message)
    console.log(response)
  })
