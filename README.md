# MunchBuddy
This is a react-native app that connects strangers to eat together if they don't have anyone to eat with for a meal! The MuchBuddy app allows users to signup and create a profile of interests. Upon creating an account, users can input a topic of conversation and a time range and wait to be matched with someone.
![](imgs/matchPage.png =250x)

Once users are matched, they can view their match in the match history tab. Here users will be able to see all people that they have matched with in the past. MunchBuddy allows users to chat with the people they matched with to coordinate meals as well as view their profiles to get a sense of their interests.

******ADD MORE SCREENSHOTS HERE*******

### Architecture
We used react native and redux to create the client side of MunchBuddy. We also made use of React-navigation, DatePickerIOS, NavigatorIOS, and alertIOS libraries. Finally we used xcode to simulate our project.

The app is created in index.ios.js. index.ios.js calls navigator.js in the navigation folder. From there, navigator renders specific pages depending on certain parameters. We organized our code by holding each page in the app as separate classes. We further separated the navigation bar tabs for these pages to be their own separate classes in the navigation folder. For complex pages such as the chat list in matchHistoryPage.js, we held dumb components to render a specific cell in the chat list. Finally, we used redux to store all our actions and states for easier access across the app.

*******ADD MORE AS YOU SEE FIT*********

### Setup
`npm install -g react-native-cli`

`npm install`

`react-native run-ios`

### Usage
********Testflight????******* or app store? idk slightly confused

### Authors
* Allison Chuang
* Jane Lee
* Gurkaran Singh
* Abby Starr
* Allen Wu

### Acknowledgments
* Jason Feng – core mentor

#### Icon citations
* http://www.flaticon.com/authors/nikita-golubev
* http://www.flaticon.com/authors/vectors-market
* http://www.freepik.com
* http://www.flaticon.com/authors/pixel-perfect
