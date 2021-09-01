import { UserInfoProps } from '../../typings';

interface Props {
	people: UserInfoProps[];
}

const People: React.FC<Props> = ({ people }) => {
	return <div>People - {people?.length}</div>;
};

export default People;
