import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './Material_UI_Config';
import TweetaState from './context/action-creators/tweeta';
import UserState from './context/action-creators/user';
import SearchState from './context/action-creators/search';
import NotificationState from './context/action-creators/notification';
import ChatState from './context/action-creators/chat';
import SocketState from './context/action-creators/socket';

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<GlobalStyles />
		<SocketState>
			<NotificationState>
				<UserState>
					<TweetaState>
						<SearchState>
							<ChatState>
								<App />
							</ChatState>
						</SearchState>
					</TweetaState>
				</UserState>
			</NotificationState>
		</SocketState>
	</ThemeProvider>,
	document.getElementById('root')
);
