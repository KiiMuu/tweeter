import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/contexts/authContext';

const Signin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
    
    useEffect(() => {
        if (isAuth) {
            history.push('/');
        } 
    }, [isAuth, history]);

    console.log({isAuth})

    return (
        <div>
            Signin
            {error && <p>{error}</p>}
            <form onSubmit={handleSignIn}>
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
                <button>{loading ? 'Loading...' : 'Signin'}</button>
            </form>
        </div>
    )
}

export default Signin;