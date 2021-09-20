import { useState, useContext, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/contexts/user';
import ChatContext from '../../context/contexts/chat';
import SearchField from '../layout/SearchField';
import User from './User';
import { UserInfoProps } from '../../typings';
import { AlertStyles } from '../../styles/notifiers';
import { Alert } from '@material-ui/lab';
import { Button, DialogActions, List } from '@material-ui/core';

interface Props {
	setOpen: Function;
}

const UsersList: React.FC<Props> = ({ setOpen }) => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [limit, setLimit] = useState<number>(10);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const {
		usersListLoading,
		usersListError,
		usersList,
		getUsers,
		totalUsers,
	} = useContext(UserContext);
	const { createChatLoading, createChatSuccess, createChat, singleChat } =
		useContext(ChatContext);
	const history = useHistory();

	const onLoadMore = useCallback(() => {
		setLimit(prev => prev + 10);
	}, []);

	const handleToggle = useCallback(
		(userId: string) => () => {
			const currentIndex = selectedUsers.indexOf(userId);
			const newChecked = [...selectedUsers];

			if (currentIndex === -1) {
				newChecked.push(userId);
			} else {
				newChecked.splice(currentIndex, 1);
			}

			setSelectedUsers(newChecked);
		},
		[selectedUsers]
	);

	useEffect(() => {
		getUsers(searchTerm, limit);
		// eslint-disable-next-line
	}, [searchTerm, limit]);

	useEffect(() => {
		if (createChatSuccess) {
			history.push(`/messages/${singleChat?._id}/chat`);
		}
	}, [createChatSuccess, singleChat?._id, history]);

	return (
		<div style={{ padding: '0 20px' }}>
			<div style={{ marginTop: '20px' }}>
				<SearchField
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			</div>
			{usersListError ? (
				<AlertStyles style={{ marginTop: '20px' }}>
					<Alert severity='error' icon={false}>
						{usersListError}
					</Alert>
				</AlertStyles>
			) : !usersList?.length ? (
				<AlertStyles style={{ marginTop: '20px' }}>
					<Alert severity='info' icon={false}>
						No users found
					</Alert>
				</AlertStyles>
			) : (
				<List dense>
					{usersList?.map((user: UserInfoProps, i: number) => (
						<User
							user={user}
							key={user._id}
							handleToggle={handleToggle}
							selectedUsers={selectedUsers}
						/>
					))}
					{limit < totalUsers ? (
						<Button
							variant='text'
							color='primary'
							onClick={() => onLoadMore()}
						>
							{usersListLoading ? 'Loading...' : 'Show more'}
						</Button>
					) : null}
				</List>
			)}
			<DialogActions>
				<Button
					autoFocus
					variant='outlined'
					onClick={() => setOpen(false)}
				>
					Cancel
				</Button>
				<Button
					autoFocus
					color='primary'
					variant='contained'
					disableElevation
					style={{ color: '#fff' }}
					disabled={!selectedUsers.length}
					onClick={() => createChat(selectedUsers)}
				>
					{createChatLoading ? 'Loading...' : 'Create Chat'}
				</Button>
			</DialogActions>
		</div>
	);
};

export default UsersList;
