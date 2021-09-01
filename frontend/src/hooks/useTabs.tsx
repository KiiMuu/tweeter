import { useState } from 'react';

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: any;
	value: any;
}

const useTabs = () => {
	const [value, setValue] = useState(0);

	const TabPanel = (props: TabPanelProps) => {
		const { children, value, index, ...other } = props;

		return (
			<div
				role='tabpanel'
				hidden={value !== index}
				id={`full-width-tabpanel-${index}`}
				aria-labelledby={`full-width-tab-${index}`}
				{...other}
			>
				{value === index && (
					<div
						style={{
							padding:
								index === 3
									? '10px var(--paddingLeftRight)'
									: '0',
						}}
					>
						{children}
					</div>
				)}
			</div>
		);
	};

	const a11yProps = (index: any) => {
		return {
			id: `full-width-tab-${index}`,
			'aria-controls': `full-width-tabpanel-${index}`,
		};
	};

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index: number) => {
		setValue(index);
	};

	return { TabPanel, a11yProps, value, handleChange, handleChangeIndex };
};

export default useTabs;
