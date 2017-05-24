import { TabNavigator } from 'react-navigation';

import Match from '../containers/match';

import Profile from './profiletab';
import MatchHistory from '../components/matchHistory';
import Chat from '../components/chat';

const MunchBuddyTabs = TabNavigator({
  Match: { screen: Match },
  Profile: { screen: Profile },
  History: { screen: MatchHistory },
  Chat: { screen: Chat },
});

export default MunchBuddyTabs;
