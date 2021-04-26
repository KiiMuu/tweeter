import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/contexts/authContext';

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authContext = useContext(AuthContext);
    const { loading, error, isAuth, signUp } = authContext;

    const history = useHistory();

    const setInput = (setter: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setter(e.currentTarget.value);
    }

    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signUp({ name, username, email, password });
    }
    
    useEffect(() => {
        if (isAuth) {
            history.push('/');
        }
    }, [isAuth, history]);

    console.log({isAuth})

    return (
        <div>
            Signup
            {error && <p>{error}</p>}
            <form onSubmit={handleSignUp}>
                <input 
                    type='text' 
                    placeholder='Name'
                    value={name} 
                    onChange={setInput(setName)} 
                />
                <input 
                    type='text' 
                    placeholder='Username'
                    value={username} 
                    onChange={setInput(setUsername)} 
                />
                <input 
                    type='email' 
                    placeholder='Email'
                    value={email} 
                    onChange={setInput(setEmail)} 
                />
                <input 
                    type='password' 
                    placeholder='Password'
                    value={password} 
                    onChange={setInput(setPassword)} 
                />
                <button>{loading ? 'Loading...' : 'Signup'}</button>
            </form>
        </div>
    )
}

export default Signup;