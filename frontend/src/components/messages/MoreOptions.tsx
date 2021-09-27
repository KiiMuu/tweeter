import { useCallback, useState, useContext } from 'react';
import {
	Button,
	DialogActions,
	FormControl,
	IconButton,
	InputAdornment,
	Menu,
	MenuItem,
	TextField,
} from '@material-ui/core';
import { AiOutlineMore, AiOutlineEdit } from 'react-icons/ai';
import { IChat } from '../../typings';
import ScreenDialog from '../layout/ScreenDialog';
import { StyledEditForm } from '../../styles/messages';
import ChatContext from '../../context/contexts/chat';

interface Props {
	singleChat: IChat;
}

const MoreOptions: React.FC<Props> = ({ singleChat }) => {
	const [chatName, setChatName] = useState<string>(
		singleChat?.chatName || ''
	);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [open, setOpen] = useState<boolean>(false);

	const { updateChat, updateChatLoading } = useContext(ChatContext);

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			setAnchorEl(e.currentTarget);
		},
		[]
	);

	const handleMenuClose = useCallback(() => {
		setAnchorEl(null);
	}, []);

	const handleDialogOpen = () => {
		handleMenuClose();
		setOpen(prev => !prev);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChatName(e.target.value);
	};

	return (
		<div>
			<IconButton onClick={handleClick}>
				<AiOutlineMore />
			</IconButton>
			<div className='chatOptionsMenu'>
				<Menu
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
				>
					<MenuItem onClick={handleDialogOpen}>
						<AiOutlineEdit style={{ marginRight: '10px' }} />
						Edit Chat
					</MenuItem>
				</Menu>
			</div>
			<ScreenDialog
				fullWidth={true}
				isAppBar={true}
				open={open}
				onClose={() => setOpen(prev => !prev)}
				fullScreen={false}
				title='Edit chat'
			>
				<StyledEditForm>
					<FormControl
						style={{
							width: '100%',
							marginBottom: '20px',
						}}
					>
						<TextField
							type='text'
							label='New Name'
							placeholder='Type New Chat Name'
							inputMode='text'
							variant='outlined'
							value={chatName}
							onChange={handleChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<AiOutlineEdit />
									</InputAdornment>
								),
							}}
						/>
					</FormControl>
					<DialogActions>
						<Button
							autoFocus
							variant='outlined'
							onClick={() => setOpen(prev => !prev)}
						>
							Cancel
						</Button>
						<Button
							autoFocus
							color='primary'
							variant='contained'
							disableElevation
							style={{ color: '#fff' }}
							disabled={!chatName?.length}
							onClick={() =>
								updateChat(singleChat?._id, chatName)
							}
						>
							{updateChatLoading ? 'Updating...' : 'Update'}
						</Button>
					</DialogActions>
				</StyledEditForm>
			</ScreenDialog>
		</div>
	);
};

export default MoreOptions;
