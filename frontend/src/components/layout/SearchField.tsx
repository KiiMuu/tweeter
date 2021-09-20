import { TextField, FormControl, InputAdornment } from '@material-ui/core';
import { HiSearch } from 'react-icons/hi';

interface Props {
	searchTerm: string;
	setSearchTerm: Function;
}

const SearchField: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return (
		<FormControl
			style={{
				width: '100%',
				marginBottom: '20px',
			}}
		>
			<TextField
				type='search'
				label='Search'
				placeholder='Search in users'
				inputMode='text'
				variant='outlined'
				value={searchTerm}
				onChange={handleChange}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<HiSearch />
						</InputAdornment>
					),
				}}
			/>
		</FormControl>
	);
};

export default SearchField;
