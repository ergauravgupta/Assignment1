import React, { Component } from 'react';
import { NativeModules, NativeEventEmitter } from 'react-native';

const NativeClientBridge = NativeModules.RNDarkMode;
const NativeClientEmitter = new NativeEventEmitter(NativeClientBridge);

import AppContext from './AppContext';
import themes from './themes';

export default class AppProvider extends Component {
	constructor(props) {
		super(props);

		this.updateTheme = (mode = 'light') => {
			this.setState({
				theme: mode === 'light' ? themes.light : themes.dark,
			});
		};

		this.addHorses = (horse) => {
			const existHorse = this.state.horses;
			this.setState({
				horses: [...existHorse, horse],
			});
		};

		this.state = {
			theme: NativeClientBridge.initialMode === 'light' ? themes.light : themes.dark,
			horses: [],
			updateTheme: this.updateTheme,
			addHorses: this.addHorses,
		};
	}

	componentDidMount() {
		NativeClientEmitter.addListener('CurrentModeChanged', this.updateTheme);
	}

	render() {
		return <AppContext.Provider value={this.state}>{this.props.children}</AppContext.Provider>; //return
	} //render
}
