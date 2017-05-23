import { AppRegistry } from 'react-native';
import { TabNavigator } from 'react-navigation';

import Match from './components/match';
import Profile from './components/profile';

const MunchBuddyTabs = TabNavigator({
  Match: { screen: Match },
  Profile: { screen: Profile },
});

export default MunchBuddyTabs;
