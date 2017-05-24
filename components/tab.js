import { tabNavigator } from 'react-navigation';

import Match from '../containers/match';
import Profile from './profiletab';

const MunchBuddyTabs = tabNavigator({
  Match: { screen: Match },
  Profile: { screen: Profile },
});

export default MunchBuddyTabs;
