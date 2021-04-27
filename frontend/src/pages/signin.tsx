import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../context/contexts/authContext';

import { FormAction, SignInForm, SignInScreen } from '../styles/auth';
import { NormaHeading, SubNormaHeading } from '../styles/headings';

import { 
    Snackbar,
    Button, 
    Container, 
    FormControl, 
    InputAdornment, 
    TextField,
    Grid
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { AiOutlineMail } from 'react-icons/ai';
import { HiOutlineKey } from 'react-icons/hi';

const Signin: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const authContext = useContext(AuthContext);
    const { loading, error, isAuth, signIn } = authContext;

    const history = useHistory();

    const setInput = (setter: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.currentTarget.value);
    }

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signIn({ email, password });
    }

    const Alert = (props: AlertProps) => {
        return <MuiAlert elevation={6} variant='filled' {...props} />;
    }
    
    useEffect(() => {
        if (isAuth) {
            history.push('/');
        } 
    }, [isAuth, history]);

    return (
        <SignInScreen>
            <Grid container spacing={0} justify='center'>
                <Grid item sm={12} md={6}>
                    <Container maxWidth='xl'>
                        <Snackbar 
                            open={error ? true : false}
                            autoHideDuration={6000} 
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                            <Alert severity='error'>
                                {error}
                            </Alert>
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
                                <FormControl style={{ width: '100%', marginBottom: '20px' }}>
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
                                            )
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
                                            )
                                        }}
                                    />
                                </FormControl>
                                <FormAction style={{ marginTop: '20px' }}>
                                    <Button 
                                        style={{ color: '#fff', borderRadius: '0' }}
                                        type='submit' 
                                        variant='contained' 
                                        color='primary'
                                        size='large'
                                    >
                                        {loading ? 'Signing In...' : 'Sign In'}
                                    </Button>
                                    <Button 
                                        style={{ borderRadius: '0' }}
                                        color='primary'
                                        variant='outlined'
                                        size='large'>
                                        <Link 
                                            to='/reset/password'
                                            style={{ textDecoration: 'none', color: '#1da1f2' }}
                                        >Reset Password</Link>
                                    </Button>
                                </FormAction>
                            </div>
                        </SignInForm>
                    </Container>
                </Grid>
            </Grid>
        </SignInScreen>
    )
}

export default Signin;