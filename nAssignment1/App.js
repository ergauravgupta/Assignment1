import React, { Component } from 'react';
import MainApp from './src/MainApp';

import { AppProvider } from './src/Context';

class App extends Component {
	render() {
		return (
			<AppProvider>
				<MainApp />
			</AppProvider>
		);
	}
}
export default App;
