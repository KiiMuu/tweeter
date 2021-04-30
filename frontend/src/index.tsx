import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './Material_UI_Config';
import AuthState from './context/action-creators/authCreators';
import TweetaState from './context/action-creators/tweetaActions';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AuthState>
            <TweetaState>
                <App />
            </TweetaState>
        </AuthState>
    </ThemeProvider>,
    document.getElementById('root')
);
