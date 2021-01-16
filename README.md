# Cron & Cloud Fire Functions for Firebase



Foobar is a Python library for dealing with word pluralization.
### Prerequisites
1. The latest copy of the `firebase-tools`.
2. The latest version of `firebase-admin` and `firebase-functions`

### Setup
1. Clone this repo.
2. Set firebase-tools to use your project with `firebase use <YOUR_PROJECT>`
3. Move inside your `functions\` folder
4. Update your dependencies with `npm install`
5. Deploy your functions with `npm run deploy`

----
###🕒 Cron Schedules
Two formats are supported to define your time intervals:
* [Unix Cron String Format (Cloud Scheduler)](https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules): `* * * * * `where each * is a number corresponding to `min, hour, day of month, month, day of week.` Not easy reading. If you have a hard time understanding this format, you’re not alone. Crontab Guru is like regexr but for understanding Cron schedule expressions 💯
* [App Engine's English-like format](https://cloud.google.com/appengine/docs/standard/python/config/cronref#defining_the_cron_job_schedule): Keywords of every, minute, hours, days, weekday names (wed, fri etc) make for easy comprehension. Some examples: `every 12 hours.every 6 hours mon, wed`. Read the docs for more information and examples.
-----
###📝 Writing Scheduled Cloud Functions
```Typescript
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
```