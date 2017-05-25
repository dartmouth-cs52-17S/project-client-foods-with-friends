import { TabNavigator } from 'react-navigation';

<<<<<<< HEAD:navigation/tab.js
import Match from './match';
import Profile from './profile';
import MatchHistory from './matchHistory';
import ChatHistory from './chatHistory';
=======
import Match from '../containers/match';
import Profile from './profiletab';
import MatchHistory from '../containers/matchHistory';
import ChatHistory from '../containers/chatHistory';
>>>>>>> 96f70fc41b2c1fb2277fcfc7dd46b341f2c706fd:components/tab.js

const MunchBuddyTabs = TabNavigator({
  Match: { screen: Match },
  Profile: { screen: Profile },
  MatchHistory: { screen: MatchHistory },
  ChatHistory: { screen: ChatHistory },
});

export default MunchBuddyTabs;
