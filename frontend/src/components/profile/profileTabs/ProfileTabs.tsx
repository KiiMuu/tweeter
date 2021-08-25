import { useState } from 'react';
import { Tab, Tabs, makeStyles, Theme, useTheme } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import Tweets from './Tweets';
import Replies from './Replies';
import Likes from './Likes';

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
				<div style={{ padding: '10px var(--paddingLeftRight)' }}>
					<>{children}</>
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

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index: number) => {
		setValue(index);
	};

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
				<Tab label='Media' {...a11yProps(2)} />
				<Tab label='Likes' {...a11yProps(3)} />
			</Tabs>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<Tweets />
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<Replies />
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					Media
				</TabPanel>
				<TabPanel value={value} index={3} dir={theme.direction}>
					<Likes />
				</TabPanel>
			</SwipeableViews>
		</div>
	);
};

export default ProfileTabs;
