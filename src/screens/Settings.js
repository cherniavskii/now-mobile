// @flow
import React from 'react';
import { SafeAreaView, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../components/Header';
import Input from '../components/elements/settings/Input';
import api from '../lib/api';
import { connect } from '../Provider';

type Props = {
	context: Context,
};

type State = {
	editing: boolean,
	inputValue: string,
};

const Container = styled(SafeAreaView)`
	width: 100%;
	flex: 1;
	flex-direction: column;
	background-color: white;
`;

const View = styled.View`
	flex-direction: column;
	width: 100%;
	flex: 1;
	justify-content: center;
	align-items: center;
	padding-bottom: 128px;
`;

const Title = styled.Text`
	font-size: 26px;
	font-weight: 800;
	padding-left: 6%;
	letter-spacing: 0.6px;
	height: 36px;
	width: 100%;
	align-self: flex-start;
`;

export const ProfilePic = styled.View`
	height: 128px;
	width: 128px;
	border-radius: 100px;
	background: #e0e0e0;
	overflow: hidden;
	margin-bottom: 30px;
`;

const ProfileInfo = styled.View`
	flex-direction: column;
	align-items: center;
	height: 56px;
	width: 100%;
`;

const ProfileMeta = styled.View`
	flex-direction: row;
	height: 28px;
	align-items: center;
`;

const ButtonGroup = styled.View`
	flex-direction: row;
	justify-content: space-between;
	width: 40%;
	margin-top: 15px;
`;

const ProfileName = styled.Text`
	font-size: 18px;
	font-weight: 700;
	letter-spacing: 0.2px;
`;

export const Button = styled.Text`
	font-size: 18px;
	font-weight: 300;
	color: #067df7;
`;

const Email = styled.Text`
	font-size: 16px;
	font-weight: 300;
	color: #b5b5b5;
	margin-top: 15px;
`;

@connect
export default class Settings extends React.Component<Props, State> {
	state = {
		editing: false,
		inputValue: this.props.context.user.username,
	};

	toggleEditing = () => {
		this.setState({ editing: !this.state.editing });
	};

	handleInput = (inputValue: string) => {
		this.setState({ inputValue });
	};

	changeUsername = async () => {
		const result = await api.user.changeUsername(this.state.inputValue);

		if (result.error) {
			// @TODO error handling
		} else {
			// @TODO Context update
			this.toggleEditing();
		}
	};

	render() {
		const { avatar, username, email } = this.props.context.user;

		return (
			<Container>
				<Animatable.View animation="fadeIn" duration={600} style={{ width: '100%' }}>
					<KeyboardAwareScrollView
						contentContainerStyle={{
							justifyContent: 'center',
							alignItems: 'center',
							height: '100%',
						}}
						style={{
							width: '100%',
						}}
						scrollEnabled={false}
					>
						<Header />
						<Title>Settings</Title>
						<View>
							<ProfilePic>
								<Image
									source={{
										uri: api.user.avatarPath(avatar),
										cache: 'force-cache',
									}}
									style={{ width: '100%', height: '100%' }}
								/>
							</ProfilePic>
							<ProfileInfo>
								{(() => {
									if (this.state.editing) {
										return (
											// $FlowFixMe
											<React.Fragment>
												<Input
													onChangeText={this.handleInput}
													value={this.state.inputValue}
												/>
												<ButtonGroup>
													<TouchableOpacity
														activeOpacity={0.65}
														onPress={this.changeUsername}
													>
														<Button>save</Button>
													</TouchableOpacity>
													<TouchableOpacity
														activeOpacity={0.65}
														onPress={this.toggleEditing}
													>
														<Button>cancel</Button>
													</TouchableOpacity>
												</ButtonGroup>
											</React.Fragment>
										);
									}
									// @TODO Team editing
									return (
										// $FlowFixMe
										<React.Fragment>
											<ProfileMeta>
												<ProfileName>{`${username} `}</ProfileName>
												{/* Commenting this out for now since Zeit's API is responding to username change but no change actually happens
												// @TODO Figure it out
												<Text>
													{'('}
													<TouchableOpacity activeOpacity={0.65} style={{ height: 20 }} onPress={this.toggleEditing}>
														<Button>change</Button>
													</TouchableOpacity>
													{')'}
												</Text>
												*/}
											</ProfileMeta>
											<Email>{email}</Email>
										</React.Fragment>
									);
								})()}
							</ProfileInfo>
						</View>
					</KeyboardAwareScrollView>
				</Animatable.View>
			</Container>
		);
	}
}
