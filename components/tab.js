import { AppRegistry } from 'react-native';
import { TabNavigator } from 'react-navigation';

import Match from '../containers/match';
import Profile from '../components/profiletab';
import MatchHistory from '../components/matchHistory';
import Chat from '../components/chat';

const MunchBuddyTabs = TabNavigator({
  Match: { screen: Match },
  Profile: { screen: Profile },
  History: { screen: MatchHistory },
  Chat: { screen: Chat },
});

export default MunchBuddyTabs;
