import { UserInfoProps } from '../../typings';
import UserCard from '../layout/UserCard';
import { AlertStyles } from '../../styles/notifiers';
import { Alert } from '@material-ui/lab';
import { Grid, List } from '@material-ui/core';

interface Props {
	searchTerm: string;
	people: UserInfoProps[];
}

const People: React.FC<Props> = ({ searchTerm, people }) => {
	return !people?.length ? (
		<AlertStyles style={{ marginTop: '20px' }}>
			<Alert severity='info' icon={false}>
				No users matched "`{searchTerm}`"
			</Alert>
		</AlertStyles>
	) : (
		<Grid item xs={12}>
			<List dense={false}>
				{people?.map(user => (
					<UserCard user={user} key={user._id} />
				))}
			</List>
		</Grid>
	);
};

export default People;
