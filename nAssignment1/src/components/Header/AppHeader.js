import React from 'react';
import { Header, Button } from 'react-native-elements';

const AppHeader = ({ navigation, title, rightComponent = null }) => (
	<AppContext.Consumer>
		{({ theme }) => (
			<Header
				backgroundColor={theme.headerBGColor}
				leftComponent={
					<Button
						buttonStyle={{ backgroundColor: theme.headerBGColor }}
						icon={{
							name: 'menu',
							size: 30,
							color: 'white',
						}}
						onPress={() => navigation.openDrawer()}
					/>
				}
				centerComponent={{ text: title, style: { color: '#fff', fontWeight: 'bold', fontSize: 18 } }}
				rightComponent={rightComponent}
			/>
		)}
	</AppContext.Consumer>
);

export default AppHeader;
