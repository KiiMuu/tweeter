import { useState } from 'react';
import HomeLayout from '../components/home/HomeLayout';
import Chats from '../components/messages/Chats';
import ScreenDialog from '../components/layout/ScreenDialog';
import UsersList from '../components/user/UsersList';
import { PageTitle } from '../styles/headings';
import { Button, Tooltip } from '@material-ui/core';
import { FiUserPlus } from 'react-icons/fi';

const Messages: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<HomeLayout>
			<PageTitle>
				<div className='content'>
					<span>Messages</span>
					<Tooltip title='New Message'>
						<Button
							color='primary'
							startIcon={<FiUserPlus />}
							style={{ padding: 0, margin: 0 }}
							onClick={() => setOpen(prev => !prev)}
						></Button>
					</Tooltip>
				</div>
			</PageTitle>
			<ScreenDialog
				fullWidth={true}
				isAppBar={false}
				open={open}
				onClose={() => setOpen(false)}
				fullScreen={false}
				title='Create a new chat'
			>
				<UsersList setOpen={setOpen} />
			</ScreenDialog>
			<Chats />
		</HomeLayout>
	);
};

export default Messages;
