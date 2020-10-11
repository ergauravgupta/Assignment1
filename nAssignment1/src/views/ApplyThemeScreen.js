import React, { Component } from 'react';
import { View, NativeModules, Platform } from 'react-native';

import { Button, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';

import AppHeader from '../components/Header';

const NativeClientBridge = NativeModules.RNDarkMode;

export default class ApplyThemeScreen extends Component {
	render() {
		return (
			<AppContext.Consumer>
				{({ theme, updateTheme }) => (
					<View style={{ flex: 1, backgroundColor: theme.background }}>
						<AppHeader title={'Apply Theme'} navigation={this.props.navigation} />
						<Text
							style={{ padding: 20, textAlign: 'center', flex: 1, justifyContent: 'center', color: theme.foreground }}
							h5
						>
							Use the button below to apply dark or light theme is app based on Device's theme/mode selection
						</Text>
						<SafeAreaView>
							<Button
								buttonStyle={{ width: '90%', alignSelf: 'center' }}
								title="Apply Theme"
								onPress={() => {
									Platform.OS === 'android'
										? NativeClientBridge.getCurrentMode().then((mode) => {
												// alert(mode);
												updateTheme(mode);
												alert('Theme updated successfully');
										  })
										: alert('Theme updated successfully');
								}}
							/>
						</SafeAreaView>
					</View>
				)}
			</AppContext.Consumer>
		);
	}
}
