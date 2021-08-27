import { useCallback } from 'react';
import { TweetaImg } from '../../../typings';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@material-ui/core';
import { Spin } from '../../../styles/spinners';

interface ChildProps {
	dialogOpen: boolean;
	setDialogOpen: Function;
	content: string;
	setContent: Function;
	createTweeta: Function;
	tweetaCreateLoading: boolean | undefined;
	images: TweetaImg[];
	tweetaId: string;
}

const ReplyDialog: React.FC<ChildProps> = ({
	dialogOpen,
	setDialogOpen,
	content,
	setContent,
	createTweeta,
	tweetaCreateLoading,
	images,
	tweetaId,
}) => {
	const handleTweetaCreate = useCallback(() => {
		createTweeta({ content, images, replyTo: tweetaId });
	}, [content, images, tweetaId, createTweeta]);

	return (
		<Dialog
			fullWidth={true}
			maxWidth='sm'
			open={dialogOpen}
			onClose={() => setDialogOpen(false)}
			aria-labelledby='form-dialog-title'
		>
			<DialogTitle id='form-dialog-title'>
				Tweet your quick reply
			</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin='dense'
					id='name'
					label='Type your reply'
					type='text'
					value={content}
					onChange={e => setContent(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setDialogOpen(false)} color='primary'>
					Cancel
				</Button>
				<Button onClick={() => handleTweetaCreate()} color='primary'>
					{tweetaCreateLoading ? <Spin></Spin> : 'Tweet'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ReplyDialog;
