import NewsFeed from '../components/home/NewsFeed';
import HomeLayout from '../components/home/HomeLayout';

const Home: React.FC = () => {
	return (
		<HomeLayout>
			<NewsFeed />
		</HomeLayout>
	);
};

export default Home;
