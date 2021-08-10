import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './Material_UI_Config';
import TweetaState from './context/action-creators/tweetaActions';
import UserState from './context/action-creators/userCreators';

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<GlobalStyles />
		<UserState>
			<TweetaState>
				<App />
			</TweetaState>
		</UserState>
	</ThemeProvider>,
	document.getElementById('root')
);
