import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { 
    AuthForm,
    AuthPreview,
    Form,
    FormAction,
    Logo,
} from '../styles/auth';
import { BigHeading, SubBigHeading } from '../styles/headings';

import { 
    TextField,
    InputAdornment,
    FormControl,
    Button,
    Grid, 
    Snackbar,
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { AiOutlineUserAdd, AiOutlineUserSwitch } from 'react-icons/ai';
import { HiOutlineKey } from 'react-icons/hi';
import { AiOutlineMail } from 'react-icons/ai';
import { Spin } from '../styles/spinners';
import UserContext from '../context/contexts/userContext';

const Signup: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {
        loading, error, signUp, user,
    } = useContext(UserContext);

    const history = useHistory();

    const setInput = (setter: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.currentTarget.value);
    }

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signUp({ name, username, email, password });
    }

    const Alert = (props: AlertProps) => {
        return <MuiAlert elevation={6} variant='filled' {...props} />;
    }
    
    useEffect(() => {
        if (user?.user) {
            history.push('/');
        }
    }, [user?.user, history]);

    return (
        <div style={{ overflow: 'hidden' }}>
            <Snackbar 
                open={error ? true : false}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert severity='error'>
                    {error}
                </Alert>
            </Snackbar>
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <AuthPreview></AuthPreview>
                </Grid>
                <Grid item xs={12} md={6}>
                    <AuthForm>
                        <Logo>
                            <img 
                                src='/images/tweeter-logo.png' 
                                alt='Tweeter Logo'
                                draggable='false'
                            />
                        </Logo>
                        <BigHeading>
                            <h1>Happening now!</h1>
                        </BigHeading>
                        <SubBigHeading>
                            <p>Join Tweeter Today.</p>
                        </SubBigHeading>
                        <Form onSubmit={handleSignUp} noValidate autoComplete='off'>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <FormControl style={{ width: '100%' }}>
                                        <TextField
                                            type='text'
                                            label='Name'
                                            placeholder='Type your name'
                                            inputMode='text'
                                            variant='outlined'
                                            value={name}
                                            onChange={setInput(setName)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                        <AiOutlineUserAdd />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl style={{ width: '100%' }}>
                                        <TextField
                                            type='text'
                                            label='Username'
                                            placeholder='Type your username'
                                            inputMode='text'
                                            variant='outlined'
                                            fullWidth
                                            value={username}
                                            onChange={setInput(setUsername)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                        <AiOutlineUserSwitch />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl style={{ width: '100%' }}>
                                        <TextField
                                            type='email'
                                            label='Email'
                                            placeholder='Type your email'
                                            inputMode='email'
                                            variant='outlined'
                                            fullWidth
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
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl style={{ width: '100%' }}>
                                        <TextField
                                            type='password'
                                            label='Password'
                                            placeholder='Type your password'
                                            inputMode='numeric'
                                            variant='outlined'
                                            fullWidth
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
                                </Grid>
                            </Grid>
                            <FormAction style={{ marginTop: '20px' }}>
                                <Button 
                                    style={{ color: '#fff', borderRadius: '0' }}
                                    type='submit' 
                                    variant='contained' 
                                    color='primary'
                                    size='large'
                                >
                                    {loading ? <Spin></Spin> : 'Sign Up'}
                                </Button>
                                <Button 
                                    style={{ borderRadius: '0' }}
                                    color='primary'
                                    variant='outlined'
                                    size='large'>
                                    <Link 
                                        to='/signin'
                                        style={{ textDecoration: 'none', color: '#1da1f2' }}
                                    >Sign In</Link>
                                </Button>
                            </FormAction>
                        </Form>
                    </AuthForm>
                </Grid>
            </Grid>
        </div>
    )
}

export default Signup;