import { TabNavigator } from 'react-navigation';

import Match from './match';
import Profile from './profile';
import MatchHistory from './matchHistory';
import ChatHistory from './chatHistory';

const MunchBuddyTabs = TabNavigator({
  Match: { screen: Match },
  Profile: { screen: Profile },
  MatchHistory: { screen: MatchHistory },
  ChatHistory: { screen: ChatHistory },
});

export default MunchBuddyTabs;
