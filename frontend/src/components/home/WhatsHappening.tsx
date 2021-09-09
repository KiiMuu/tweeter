import { WhatsHappeningSection } from '../../styles/lists';
import { Typography } from '@material-ui/core';

interface Props {}

const WhatsHappening = (props: Props) => {
	return (
		<WhatsHappeningSection>
			<div className='mainContent'>
				<Typography style={{ fontWeight: 'bold' }} variant='h6'>
					What’s happening
				</Typography>
			</div>
		</WhatsHappeningSection>
	);
};

export default WhatsHappening;
