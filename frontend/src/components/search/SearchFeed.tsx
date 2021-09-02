import SwipeableViews from 'react-swipeable-views';
import { useLocation } from 'react-router-dom';
import useTabs from '../../hooks/useTabs';
import Tweets from './Tweets';
import People from './People';
import Photos from './Photos';
import { Spin } from '../../styles/spinners';
import { AlertStyles } from '../../styles/notifiers';
import { Tab, Tabs, makeStyles, Theme, useTheme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { TweetaProps } from '../../typings';

interface FeedProps {
	searchLoading: boolean;
	searchError: string | null;
	searchResult: any;
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
	},
}));

const SearchFeed: React.FC<FeedProps> = ({
	searchLoading,
	searchError,
	searchResult,
}) => {
	const classes = useStyles();
	const theme = useTheme();
	const { TabPanel, a11yProps, value, handleChange, handleChangeIndex } =
		useTabs();
	const { search } = useLocation();
	const searchTerm = search.split('=')[1];

	if (searchLoading)
		return (
			<span
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: '30px',
					overflow: 'hidden',
				}}
			>
				<Spin></Spin>
			</span>
		);
	if (searchError)
		return (
			<AlertStyles style={{ marginTop: '20px' }}>
				<Alert severity='error' icon={false}>
					{searchError}
				</Alert>
			</AlertStyles>
		);

	let photosArr: any = [];
	(() => {
		return searchResult?.tweets[0]?.tweets?.forEach(
			(tweeta: TweetaProps) => {
				if (tweeta.images.length) {
					photosArr.push({
						images: tweeta.images,
						content: tweeta.content,
						postedBy: {
							name: tweeta.postedBy.name,
							username: tweeta.postedBy.username,
							email: tweeta.postedBy.email,
						},
					});
				}
			}
		);
	})();

	return !searchTerm ? (
		<AlertStyles style={{ marginTop: '20px' }}>
			<Alert severity='info' icon={false}>
				The things you're looking for will be listed here!
			</Alert>
		</AlertStyles>
	) : (
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
				<Tab label='People' {...a11yProps(1)} />
				<Tab label='Photos' {...a11yProps(2)} />
			</Tabs>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<Tweets
						searchTerm={searchTerm}
						tweets={searchResult?.tweets[0]?.tweets}
					/>
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<People
						searchTerm={searchTerm}
						people={searchResult?.users}
					/>
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					<Photos searchTerm={searchTerm} photos={photosArr} />
				</TabPanel>
			</SwipeableViews>
		</div>
	);
};

export default SearchFeed;
