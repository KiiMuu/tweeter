import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import UserContext from '../../../context/contexts/user';
import Tweets from './Tweets';
import Replies from './Replies';
import Likes from './Likes';
import Media from './Media';
import { UserInfoProps } from '../../../typings';
import { Tab, Tabs, makeStyles, Theme, useTheme } from '@material-ui/core';

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: any;
	value: any;
}

const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<div
					style={{
						padding:
							index === 3 ? '10px var(--paddingLeftRight)' : '0',
					}}
				>
					{children}
				</div>
			)}
		</div>
	);
};

const a11yProps = (index: any) => {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
};

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
	},
}));

const ProfileTabs = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = useState(0);

	const { username } = useParams<UserInfoProps['username']>();

	const {
		userProfileDataLoading,
		userProfileDataError,
		userProfileData,
		getUserProfileData,
	} = useContext(UserContext);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index: number) => {
		setValue(index);
	};

	useEffect(() => {
		getUserProfileData(username);
		// eslint-disable-next-line
	}, [username]);

	return (
		<div className={classes.root}>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor='primary'
				textColor='primary'
				variant='fullWidth'
				aria-label='user profile tabs content'
			>
				<Tab label='Tweets' {...a11yProps(0)} />
				<Tab label='Replies' {...a11yProps(1)} />
				<Tab label='Likes' {...a11yProps(2)} />
				<Tab label='Media' {...a11yProps(3)} />
			</Tabs>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<Tweets
						loading={userProfileDataLoading}
						error={userProfileDataError}
						tweets={userProfileData.tweets}
					/>
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<Replies
						loading={userProfileDataLoading}
						error={userProfileDataError}
						replies={userProfileData.replies}
					/>
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					<Likes
						loading={userProfileDataLoading}
						error={userProfileDataError}
						likes={userProfileData.likes}
					/>
				</TabPanel>
				<TabPanel value={value} index={3} dir={theme.direction}>
					<Media
						loading={userProfileDataLoading}
						error={userProfileDataError}
						media={userProfileData.media}
					/>
				</TabPanel>
			</SwipeableViews>
		</div>
	);
};

export default ProfileTabs;
