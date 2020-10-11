import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import Drawer from './components/Drawer';
import HorseListScreen from './views/HorseListScreen';
import NewHorseScreen from './views/NewHorseScreen';
import ApplyThemeScreen from './views/ApplyThemeScreen';

const MainNavigator = createDrawerNavigator(
	{
		ViewAllHorses: {
			navigationOptions: {
				drawerLabel: 'View All Horses',
			},
			screen: HorseListScreen,
		},

		AddNewHorse: {
			navigationOptions: {
				drawerLabel: 'Add new horse',
			},
			screen: NewHorseScreen,
		},
		ApplyTheme: {
			navigationOptions: {
				drawerLabel: 'Apply Theme',
			},
			screen: ApplyThemeScreen,
		},
	},
	{
		contentComponent: Drawer,
		drawerBackgroundColor: 'rgb(6, 126, 144)',
	}
);

const MainApp = createAppContainer(MainNavigator);
export default MainApp;
