import { TabNavigator } from 'react-navigation';

import Match from '../containers/match';

import Profile from './profiletab';
import MatchHistory from '../containers/matchHistory';
import ChatHistory from '../containers/chatHistory';

const MunchBuddyTabs = TabNavigator({
  Match: { screen: Match },
  Profile: { screen: Profile },
  MatchHistory: { screen: MatchHistory },
  ChatHistory: { screen: ChatHistory },
});

export default MunchBuddyTabs;
