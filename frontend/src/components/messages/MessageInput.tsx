import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatContext from '../../context/contexts/chat';
import Picker, { SKIN_TONE_LIGHT } from 'emoji-picker-react';
import { StyledMessageInput } from '../../styles/messages';
import { IChat } from '../../typings';
import { Button } from '@material-ui/core';
import { FiSmile } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { SiTelegram } from 'react-icons/si';
import SocketContext from '../../context/contexts/socket';

interface Props {
	singleChat: IChat;
	updateTyping: () => void;
}

const MessageInput: React.FC<Props> = ({ singleChat, updateTyping }) => {
	const [content, setContent] = useState<string>('');
	const [pickerVisible, setPickerVisible] = useState<boolean>(false);

	const { createMessage, createMessageSuccess, message } =
		useContext(ChatContext);
	const { socket } = useContext(SocketContext);
	const { pathname } = useLocation();

	const onEmojiClick = (
		e: React.MouseEvent<Element, MouseEvent>,
		emojiObject: any
	) => {
		e.preventDefault();
		setPickerVisible(false);
		setContent(`${content}${emojiObject.emoji}`);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setContent(e.target.value);
	};

	const handleEnterPress = (e: React.KeyboardEvent) => {
		if (e.code === 'Enter') {
			e.preventDefault();
			createMessage(content, singleChat?._id);
		}
	};

	const handleMessageCreation = () => {
		createMessage(content, singleChat?._id);
	};

	useEffect(() => {
		if (createMessageSuccess) {
			socket?.emit('stop typing', singleChat?._id);
			socket?.emit('new message', message);
			setContent('');
			if (pathname === `/messages/${singleChat?._id}/chat`) return;
			socket?.emit('notification received', singleChat?._id);
		}
	}, [socket, pathname, createMessageSuccess, singleChat?._id, message]);

	return (
		<StyledMessageInput onKeyPress={handleEnterPress}>
			<div className='addEmoji'>
				<Button
					variant='text'
					size='large'
					onClick={() => setPickerVisible(!pickerVisible)}
				>
					{pickerVisible ? <IoCloseOutline /> : <FiSmile />}
				</Button>
				{pickerVisible ? (
					<div className='EmojiPicker'>
						<Picker
							native={true}
							onEmojiClick={onEmojiClick}
							skinTone={SKIN_TONE_LIGHT}
							pickerStyle={{
								boxShadow: 'none',
								borderRadius: '2px',
								width: '100%',
								position: 'absolute',
								transform: 'translate(0%, -115%)',
							}}
						/>
					</div>
				) : null}
			</div>
			<input
				type='text'
				placeholder='Type a message'
				value={content}
				onChange={handleChange}
				onKeyDown={updateTyping}
			/>
			<Button
				variant='text'
				size='large'
				disabled={!content.length}
				onClick={handleMessageCreation}
			>
				<SiTelegram />
			</Button>
		</StyledMessageInput>
	);
};

export default MessageInput;
