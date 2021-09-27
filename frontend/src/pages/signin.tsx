import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FormAction, SignInForm, SignInScreen } from '../styles/auth';
import { NormaHeading, SubNormaHeading } from '../styles/headings';

import {
	Snackbar,
	Button,
	Container,
	FormControl,
	InputAdornment,
	TextField,
	Grid,
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { AiOutlineMail } from 'react-icons/ai';
import { HiOutlineKey } from 'react-icons/hi';
import UserContext from '../context/contexts/user';

const Signin: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const { loading, error, signIn, currentUser } = useContext(UserContext);

	const history = useHistory();

	const setInput =
		(setter: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setter(e.currentTarget.value);
		};

	const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		signIn({ email, password });
	};

	const Alert = (props: AlertProps) => {
		return <MuiAlert elevation={6} variant='filled' {...props} />;
	};

	useEffect(() => {
		if (currentUser?.token) {
			history.push('/');
		}
	}, [currentUser?.token, history]);

	return (
		<SignInScreen>
			<Grid container spacing={0} justify='center'>
				<Grid item sm={12} md={6}>
					<Container maxWidth='xl'>
						<Snackbar
							open={error ? true : false}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
						>
							<Alert severity='error'>{error}</Alert>
						</Snackbar>
						<SignInForm onSubmit={handleSignIn}>
							<div className='signinFormContent'>
								<div className='flag'></div>
								<NormaHeading>
									<h1>Sign In</h1>
								</NormaHeading>
								<SubNormaHeading>
									<p>Welcome back.</p>
								</SubNormaHeading>
								<FormControl
									style={{
										width: '100%',
										marginBottom: '20px',
									}}
								>
									<TextField
										type='email'
										label='Email'
										placeholder='Type your email'
										inputMode='email'
										variant='outlined'
										value={email}
										onChange={setInput(setEmail)}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<AiOutlineMail />
												</InputAdornment>
											),
										}}
									/>
								</FormControl>
								<FormControl style={{ width: '100%' }}>
									<TextField
										type='password'
										label='Password'
										placeholder='Type your password'
										inputMode='numeric'
										variant='outlined'
										value={password}
										onChange={setInput(setPassword)}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<HiOutlineKey />
												</InputAdornment>
											),
										}}
									/>
								</FormControl>
								<FormAction style={{ marginTop: '20px' }}>
									<Button
										style={{
											color: '#fff',
											borderRadius: '0',
										}}
										type='submit'
										variant='contained'
										color='primary'
										size='large'
										disableElevation
									>
										{loading ? 'Loading...' : 'Sign In'}
									</Button>
									<Button
										style={{ borderRadius: '0' }}
										color='primary'
										variant='outlined'
										size='large'
										disableElevation
									>
										<Link
											to='/signup'
											style={{
												textDecoration: 'none',
												color: '#1da1f2',
											}}
										>
											Sign Up?
										</Link>
									</Button>
								</FormAction>
							</div>
						</SignInForm>
					</Container>
				</Grid>
			</Grid>
		</SignInScreen>
	);
};

export default Signin;
