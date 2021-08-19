import { forwardRef } from 'react';
import {
	Dialog,
	Slide,
	AppBar,
	Toolbar,
	IconButton,
	Button,
	Typography,
	createStyles,
	makeStyles,
	Theme,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { CgClose } from 'react-icons/cg';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			position: 'relative',
			color: '#fff',
		},
		title: {
			marginLeft: theme.spacing(2),
			flex: 1,
		},
	})
);

const Transition = forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement },
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

interface Props {
	children: React.ReactNode;
	fullScreen?: boolean;
	title?: string;
	okButton?: string;
	open: boolean;
	onClose: Function;
}

const ScreenDialog: React.FC<Props> = ({
	children,
	fullScreen,
	title,
	okButton,
	open,
	onClose,
}) => {
	const classes = useStyles();

	return (
		<Dialog
			fullScreen={fullScreen}
			open={open}
			onClose={() => onClose(false)}
			TransitionComponent={Transition}
			scroll='body'
		>
			<AppBar className={classes.appBar}>
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						onClick={() => onClose(false)}
						aria-label='close'
					>
						<CgClose />
					</IconButton>
					<Typography variant='subtitle1' className={classes.title}>
						{title}
					</Typography>
					<Button
						autoFocus
						color='inherit'
						onClick={() => onClose(false)}
					>
						{okButton}
					</Button>
				</Toolbar>
			</AppBar>
			{children}
		</Dialog>
	);
};

export default ScreenDialog;
