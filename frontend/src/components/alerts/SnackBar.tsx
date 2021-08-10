import { Fragment } from 'react';
import { IconButton, Snackbar } from '@material-ui/core';
import { VscClose } from 'react-icons/vsc';

interface ISnack {
	autoHideDuration: number;
	message: string;
	open: boolean;
	handleClose: any;
}

const SnackBar = ({ autoHideDuration, message, open, handleClose }: ISnack) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={handleClose}
			message={message}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			action={
				<Fragment>
					<IconButton
						size='small'
						aria-label='close'
						color='inherit'
						onClick={handleClose}
					>
						<VscClose />
					</IconButton>
				</Fragment>
			}
		/>
	);
};

export default SnackBar;
