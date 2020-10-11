import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { Button, Icon } from 'react-native-elements';

const Drawer = (props) => (
	<AppContext.Consumer>
		{({ theme }) => (
			<SafeAreaView style={{ flex: 1 }}>
				<DrawerItems activeBackgroundColor={theme.headerBGColor} activeTintColor={'white'} {...props} />
				<Button
					buttonStyle={{ backgroundColor: 'transparent' }}
					containerStyle={{ position: 'absolute', bottom: 0, right: 0 }}
					title={'<'}
					titleStyle={{ fontSize: 40 }}
					onPress={() => props.navigation.closeDrawer()}
				/>
			</SafeAreaView>
		)}
	</AppContext.Consumer>
);

export default Drawer;
