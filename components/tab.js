import { AppRegistry } from 'react-native';
import { TabNavigator } from 'react-navigation';

import Match from '../containers/match';
import Profile from '../components/profiletab';
import MatchHistory from '../components/matchHistory';

const MunchBuddyTabs = TabNavigator({
  Match: { screen: Match },
  Profile: { screen: Profile },
  Hsitory: { screen: MatchHistory },
});

export default MunchBuddyTabs;
