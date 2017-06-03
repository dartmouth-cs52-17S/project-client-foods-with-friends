# MunchBuddy
<img src="imgs/matchPage.png" alt="alt text" width="250">

MunchBuddy is a React-Native app designed and implemented as a final project for [Tim Tregubov's CS52 class](http://cs52.me/) that connects strangers to eat together if they don't have anyone to eat with for a meal! The MuchBuddy app allows users to signup and create a profile of interests. Upon creating an account, users can input a topic of conversation and a time range and wait to be matched with someone.

Once users are matched, they can view their match in the match history tab. Here, users are able to see all people that they have matched with in the past. MunchBuddy allows users to chat with the people they matched with to coordinate meals as well as view their profiles to get a sense of their interests.

Both users must be signed in for the match to show up on both accounts!

### Architecture
We used React Native and Redux to create the client side of MunchBuddy. We also made use of React-navigation, DatePickerIOS, NavigatorIOS, and alertIOS libraries. Finally we used xcode to simulate our project. The app is up on Testflight for user testing.

The app is created in index.ios.js. index.ios.js calls navigator.js in the navigation folder. From there, navigator renders specific pages depending on certain parameters. We organized our code by holding each page in the app as separate classes. We further separated the navigation bar tabs for these pages to be their own separate classes in the navigation folder. For complex pages such as the chat list in matchHistoryPage.js, we held dumb components to render a specific cell in the chat list. Finally, we used redux to store all our actions and states for easier access across the app.

However, this repo does not handle MunchBuddy's implementation. For that, check out our [backend repo!](https://github.com/dartmouth-cs52-17S/project-client-foods-with-friends-server)

### Setup
`npm install -g react-native-cli`

`git clone https://github.com/dartmouth-cs52-17S/project-client-foods-with-friends.git`

`cd project-client-foods-with-friends`

`npm install`

`react-native run-ios`

### Usage
Currently, MunchBuddy can only be accessed via invitation to Testflight. There, users can experience our prototype by downloading from testflight just like how other apps are downloaded. If the app is continued, a next step would be to take user input into account and reiterate the prototype so that the group can release a Beta version.

### Deployment
To deploy the MunchBuddy App, you need an XCode account and a Testflight account. Testflight supports up to 25 inital testers, then up to 2,000 testers once the app reaches Beta. Apps need to be uploaded to iTunes Connect to end up on Testflight.

#### To Deploy (taken from the Apple Developer Guides):
1. Create an iTunes Connect app record.
2. Update the version number and build string.
3. Create an archive of your app.
4. Validate the archive.
5. Upload your app to iTunes Connect.
6. Use iTunes connect to send email invitations to up to 25 testers.

More information on deploying the app can be found under Apple's App Distribution Guide, found [here](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/DistributingYourAppUsingTestFlight/DistributingYourAppUsingTestFlight.html) and [here](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/UploadingYourApptoiTunesConnect/UploadingYourApptoiTunesConnect.html#//apple_ref/doc/uid/TP40012582-CH36-SW2).

### Reflection and Next Steps
#### Things that went well for our project:
1. A dedicated team. Our group pulled all-nighters, slept in Sudikoff, designed mockups at Midnight.... we worked up to the final project demos, and some of us went back to the lab right after the demo to fix some of the bugs that users pointed out.
2. A great TA. Jason was frequently available to guide us through both our high level architecture questions and our tricky bugs. We checked in early and often.
3. Splitting the backend and the front end early. Having a group of the project solely dedicated to one repo meant that our members could specialize in each aspect of implementation.

#### Things to do better for next time:
1. Setting more milestones for ourselves. We had meetings every night to work on the project, but we had no solid goals for each meeting. This resulted in our group working for 5-6 hours per meeting, then missing work in other classes. A smarter approach would have been to set a particular feature as a goal, then work until that feature was implemented. That way, project members could have spent more or less time per day depending on member schedules.
2. The buddy matching algorithm. In a two-week timeline and without much prior knowledge in matching algorithms, it was hard for our group to implement the matching ideas we had in our initial brainstorm. Maybe next time, we could try designing the matching algorithm together right after handling the project scaffolding.
3. **Optimization.  This app works but will occasionally take a while to render the expected information (perhaps because the state is taking too long to set) and we need to improve this for usability.  This happens particularly with editing profile and match history tab loading new data.**

#### TODOs and Next Steps:
1. Make our app compatible with more devices. The styling works on most phones, but not on iPod Touch.
2. Implementing the app in Android. That was beyond the scope of our final project, but would represent a large user base in the real world.
3. Reiterating the matching algorithm to include conversation topic as matching criteria, provided that there are enough users in the queue to make location and meal time less of an issue.
4. Providing more indication to the user once he/she is in the atching queue. We have a spinning image of a pie right now, which is cute. A timer would be more relevant, though!
5. Sign in through Facebook. We originally decided not to include it because it wasn't necessary for our MVP, but it's possible that users would feel more comfortable using Facebook Login than our own authentication services.

### Authors
* Allison Chuang
* Jane Lee
* Gurkaran Singh
* Abby Starr
* Allen Wu

### Acknowledgments
* Tim Tregubov
* Jason Feng

#### Icon citations
##### Food
* http://www.flaticon.com/authors/nikita-golubev
* http://www.flaticon.com/authors/vectors-market
* http://www.freepik.com
* http://www.flaticon.com/authors/pixel-perfect
##### Avatars
* http://www.freepik.com
##### Tab Icons
* http://www.flaticon.com/authors/madebyoliver
* http://www.flaticon.com/authors/situ-herrera
* http://www.freepik.com
