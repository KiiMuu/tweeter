import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './Material_UI_Config';
import AuthState from './context/action-creators/authCreators';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AuthState>
            <App />
        </AuthState>
    </ThemeProvider>,
    document.getElementById('root')
);
