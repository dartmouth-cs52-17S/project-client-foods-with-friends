import { AppRegistry } from 'react-native';
import { TabNavigator } from 'react-navigation';

import Match from './containers/match';
import Profile from './containers/profile';

const MunchBuddyTabs = TabNavigator({
  Match: { screen: Match },
  Profile: { screen: Profile },
});

export default MunchBuddyTabs;
