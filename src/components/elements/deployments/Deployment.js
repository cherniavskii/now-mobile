// @flow
import React from 'react';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components';
import InstanceIcon from '../../../../assets/instance-icon.png';
import TimeAgo from '../TimeAgo';

type Props = {
	deployment: Zeit$Deployment,
	navigation: Navigation,
};

const View = styled.TouchableOpacity`
	flex-direction: column;
	padding-vertical: 10px;
`;

const Address = styled.Text`
	font-size: 16px
	font-weight: 300;
	color: ${props => props.theme.text};
`;

const Metadata = styled.View`
	flex-direction: row;
	align-items: center;
	margin-top: 10px;
`;

const Image = styled.Image`
	height: 14px;
	width: 18px;
	margin-right: 10px;
`;

const MetaGroup = styled.View`
	flex-direction: row;
	align-items: center;
	border-right-color: ${props => props.theme.border};
	border-left-color: ${props => props.theme.border};
`;

const MetaText = styled.Text`
	color: ${({ state, theme }) =>
		(state === 'BUILD_ERROR' || state === 'DEPLOYMENT_ERROR'
			? theme.deplomentErrorText
			: theme.dimmedText)};
	font-size: 16px;
	font-weight: 300;
`;

export default withNavigation(({ deployment, navigation }: Props) => (
	<View
		activeOpacity={0.65}
		onPress={() =>
			navigation.push('DeploymentDetails', { id: deployment.uid, type: deployment.type })
		}
	>
		<Address>{deployment.url}</Address>
		<Metadata>
			{(() => {
				if (deployment.scale) {
					return (
						<MetaGroup style={{ paddingRight: 10 }}>
							<Image source={InstanceIcon} />
							<MetaText>{deployment.scale.current}</MetaText>
						</MetaGroup>
					);
				}
				return null;
			})()}
			<MetaGroup
				style={{
					borderRightWidth: 1,
					borderLeftWidth: deployment.scale ? 1 : 0,
					paddingLeft: deployment.scale ? 10 : 0,
					paddingRight: 10,
				}}
			>
				<MetaText state={deployment.state}>{deployment.state}</MetaText>
			</MetaGroup>
			<MetaGroup style={{ borderLeftWidth: 0.5, paddingLeft: 10 }}>
				<MetaText>
					<TimeAgo date={deployment.created} />
				</MetaText>
			</MetaGroup>
		</Metadata>
	</View>
));
