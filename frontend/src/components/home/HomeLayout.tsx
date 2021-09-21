import { Grid } from '@material-ui/core';
import Siderbar from './Sidebar';
import ExtraContent from './ExtraContent';

interface Props {
	children: React.ReactNode;
	isExtraContent?: boolean;
}

const HomeLayout: React.FC<Props> = ({ children, isExtraContent = true }) => {
	return (
		<div style={{ overflow: 'hidden' }}>
			<Grid container spacing={0}>
				<Grid item xs={12} sm={3}>
					<Siderbar />
				</Grid>
				<Grid item xs={12} sm={isExtraContent ? 5 : 9}>
					{children}
				</Grid>
				{isExtraContent ? (
					<Grid item xs={12} sm={4}>
						<ExtraContent />
					</Grid>
				) : null}
			</Grid>
		</div>
	);
};

export default HomeLayout;
