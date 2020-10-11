import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import { Text } from 'react-native-elements';

import AppHeader from '../components/Header';

export default class HorseListScreen extends Component {
	keyExtractor = (item, index) => index.toString();
	renderItem = ({ item }) => (
		<AppContext.Consumer>
			{({ theme }) => (
				<View
					style={{
						backgroundColor: theme.listItemColor,
						padding: 20,
						marginHorizontal: 20,
						marginTop: 20,
						borderRadius: 5,
					}}
				>
					<Text style={{ color: theme.foreground }} h3>
						{item.name}
					</Text>
					<Text style={{ color: theme.foreground }} h5>
						{item.life_stage}
					</Text>
					<Text style={{ color: theme.foreground }} h5>
						{item.body_weight}
					</Text>
				</View>
			)}
		</AppContext.Consumer>
	);
	render() {
		return (
			<AppContext.Consumer>
				{({ theme, horses }) => (
					<View style={{ flex: 1, backgroundColor: theme.background }}>
						<AppHeader title={'View All Horses'} navigation={this.props.navigation} />
						{
							<FlatList
								ListEmptyComponent={
									<Text style={{ color: 'red', textAlign: 'center' }} h5>
										No horse has been added by you yet.
									</Text>
								}
								keyExtractor={this.keyExtractor}
								data={horses}
								renderItem={this.renderItem}
							/>
						}
					</View>
				)}
			</AppContext.Consumer>
		);
	}
}
