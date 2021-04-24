import ReactDOM from 'react-dom';
import './globals.scss';
import App from './App';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './Material_UI_Config';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
