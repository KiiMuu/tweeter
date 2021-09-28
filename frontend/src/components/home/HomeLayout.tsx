import { useLocation, useParams } from 'react-router-dom';
import Siderbar from './Sidebar';
import ExtraContent from './ExtraContent';
import MobNavigation from '../layout/MobNavigation';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';

interface Props {
	children: React.ReactNode;
	isExtraContent?: boolean;
}

interface IParam {
	id: string;
}

const HomeLayout: React.FC<Props> = ({ children, isExtraContent = true }) => {
	const location = useLocation();
	const { id } = useParams<IParam>();
	const theme = useTheme();
	const xs = useMediaQuery(theme.breakpoints.down('xs'));
	const sm = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<div style={{ overflow: 'hidden' }}>
			<Grid
				container
				spacing={0}
				style={{
					marginBottom: `${
						xs && location.pathname !== `/messages/${id}/chat`
							? '50px'
							: '0'
					}`,
				}}
			>
				<Grid
					item
					sm={3}
					style={{ display: `${xs ? 'none' : 'block'}` }}
				>
					<Siderbar />
				</Grid>
				<Grid item xs={12} sm={sm ? 9 : isExtraContent ? 5 : 9}>
					{children}
				</Grid>
				{isExtraContent ? (
					<Grid
						item
						sm={4}
						style={{ display: `${sm ? 'none' : 'block'}` }}
					>
						<ExtraContent />
					</Grid>
				) : null}
			</Grid>
			{xs && location.pathname !== `/messages/${id}/chat` && (
				<MobNavigation />
			)}
		</div>
	);
};

export default HomeLayout;
