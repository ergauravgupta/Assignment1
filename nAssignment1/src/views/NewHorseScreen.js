import React, { Component } from 'react';
import { View, FlatList } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Input, Button, Text } from 'react-native-elements';

import Header from '../components/Header';

export default class NewHorseScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			life_stage: 0,
			body_weight: '',
			heart_girth: '',
			body_length: '',
		};
	}

	keyExtractor = (item, index) => index.toString();

	renderItem = ({ item, index }) => (
		<AppContext.Consumer>
			{({ theme }) => (
				<Button
					buttonStyle={{
						padding: 10,
						backgroundColor: this.state.life_stage === index ? 'white' : 'grey',
						marginRight: 10,
						marginTop: 10,
						borderRadius: 5,
					}}
					titleStyle={{ color: this.state.life_stage === index ? 'black' : 'white' }}
					title={item}
					onPress={() => this.setState({ life_stage: index })}
				/>
			)}
		</AppContext.Consumer>
	);

	renderLabel(title, color) {
		return (
			<Text style={{ color, padding: 10, fontSize: 14, fontWeight: 'bold' }} h5>
				{title}
			</Text>
		);
	}

	resetValues() {
		this.setState({ name: '', heart_girth: '', body_length: '', body_weight: '', life_stage: 0 });
	}

	renderLifeStage(buttons) {
		return (
			<View style={{ height: 180 }}>
				<FlatList
					style={{ flexGrow: 0 }}
					contentContainerStyle={{ marginHorizontal: 10 }}
					numColumns={2}
					keyExtractor={this.keyExtractor}
					data={buttons}
					renderItem={this.renderItem}
				/>
			</View>
		);
	}

	renderExtraInput(label, placeholder, value, onChangeText, color) {
		return (
			<Input
				label={label}
				value={value}
				inputStyle={{ color: color }}
				placeholder={placeholder}
				keyboardType={'numeric'}
				onChangeText={onChangeText}
			/>
		);
	}

	render() {
		const buttons = ['Adult maintenance', 'Stallion', 'Lactating', 'Working/Training', 'Growing', 'Pregnant'];
		return (
			<AppContext.Consumer>
				{({ theme, addHorses }) => (
					<View style={{ flex: 1, backgroundColor: theme.background }}>
						<Header
							title={'Add New Horse'}
							navigation={this.props.navigation}
							rightComponent={() => (
								<Button
									buttonStyle={{ backgroundColor: theme.headerBGColor }}
									title={'RESET'}
									onPress={() => this.resetValues()}
								/>
							)}
						/>
						<KeyboardAwareScrollView
							keyboardShouldPersistTaps={'always'}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{ width: '100%', padding: 20 }}
						>
							{this.renderLabel('Horse Name', theme.foreground)}
							<Input
								value={this.state.name}
								placeholder="Enter horse name"
								onChangeText={(name) => this.setState({ name })}
							/>
							{this.renderLabel('Life Stage', theme.foreground)}
							{this.renderLifeStage(buttons)}
							{this.renderLabel('Boy weight calculation', theme.foreground)}
							{this.renderExtraInput(
								'Body length',
								'Enter body length',
								this.state.body_length,
								(body_length) => this.setState({ body_length }),
								theme.foreground
							)}
							{this.renderExtraInput(
								'Mature body weight',
								'Enter body weight',
								this.state.body_weight,
								(body_weight) => {
									this.setState({ body_weight });
								},
								theme.foreground
							)}
							{this.renderExtraInput(
								'Heart Girth',
								'Enter heart girth',
								this.state.heart_girth,
								(heart_girth) => this.setState({ heart_girth }),
								theme.foreground
							)}
							<Button
								buttonStyle={{ width: '100%', marginTop: 30 }}
								title="ADD"
								onPress={() => {
									if (!!this.state.name) {
										const bodyWeight = !!this.state.body_weight
											? (parseInt(this.state.body_weight) * (9.7 + 90.3 * ((1.0 - 2.718) ^ -0.772))) / 100
											: 0;
										const horse = {
											name: this.state.name,
											body_length: this.state.body_length,
											body_weight: bodyWeight,
											heart_girth: this.state.heart_girth,
											life_stage: buttons.find((stage, index) => index === this.state.life_stage),
										};
										this.resetValues();
										addHorses(horse);
										alert('Horse added successfully');
									} else {
										alert('Enter horse name.');
									}
								}}
							/>
						</KeyboardAwareScrollView>
					</View>
				)}
			</AppContext.Consumer>
		);
	}
}
