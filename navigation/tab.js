import { TabNavigator } from 'react-navigation';

import Match from './match';
import Profile from './profile';
import MatchHistory from './matchHistory';

const MunchBuddyTabs = TabNavigator({
  Match: { screen: Match },
  Profile: { screen: Profile },
  MatchHistory: { screen: MatchHistory },
});

export default MunchBuddyTabs;
