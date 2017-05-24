import { TabNavigator } from 'react-navigation';

import Match from '../containers/match';

import Profile from './profiletab';
import MatchHistory from '../containers/matchHistory';
import Chat from './chat';

const MunchBuddyTabs = TabNavigator({
  Match: { screen: Match },
  Profile: { screen: Profile },
  History: { screen: MatchHistory },
  Chat: { screen: Chat },
});

export default MunchBuddyTabs;
