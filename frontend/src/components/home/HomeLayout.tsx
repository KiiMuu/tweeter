import { Grid } from '@material-ui/core';
import Siderbar from './Sidebar';
import ExtraContent from './ExtraContent';

const HomeLayout: React.FC = ({ children }) => {
	return (
		<div style={{ overflow: 'hidden' }}>
			<Grid container spacing={0}>
				<Grid item xs={12} sm={3}>
					<Siderbar />
				</Grid>
				<Grid item xs={12} sm={5}>
					{children}
				</Grid>
				<Grid item xs={12} sm={4}>
					<ExtraContent />
				</Grid>
			</Grid>
		</div>
	);
};

export default HomeLayout;
