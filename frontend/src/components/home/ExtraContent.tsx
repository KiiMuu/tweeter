import { useState, useContext, useEffect, useCallback } from 'react';
import SearchContext from '../../context/contexts/search';
import UserContext from '../../context/contexts/user';
import useUserInfo from '../../hooks/useUserInfo';
import SearchInput from '../search/SearchInput';
import WhoToFollowList from './WhoToFollowList';
import WhatsHappening from './WhatsHappening';
import { ExtraContentStyled } from '../../styles/lists';

const ExtraContent: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [page, setPage] = useState<number>(3);
	const { searchApp } = useContext(SearchContext);
	const {
		handleWhoToFollow,
		whoToFollowUsers,
		whoToFollowLoading,
		whoToFollowError,
		total,
	} = useContext(UserContext);
	const { currentUser } = useUserInfo();

	useEffect(() => {
		handleWhoToFollow(currentUser?.user?.username, page);
		// eslint-disable-next-line
	}, [currentUser, page]);

	const onLoadMore = useCallback(() => {
		setPage(prev => prev + 3);
	}, []);

	return (
		<ExtraContentStyled>
			<SearchInput
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				searchApp={searchApp}
			/>
			<WhatsHappening />
			<WhoToFollowList
				whoToFollowUsers={whoToFollowUsers}
				whoToFollowLoading={whoToFollowLoading}
				whoToFollowError={whoToFollowError}
				onLoadMore={onLoadMore}
				page={page}
				total={total}
			/>
		</ExtraContentStyled>
	);
};

export default ExtraContent;
