import { useState } from 'react';
import Picker, { SKIN_TONE_LIGHT } from 'emoji-picker-react';
import { StyledMessageInput } from '../../styles/messages';
import { Button } from '@material-ui/core';
import { FiSmile } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import { SiTelegram } from 'react-icons/si';

interface Props {}

const MessageInput = (props: Props) => {
	const [content, setContent] = useState<string>('');
	const [pickerVisible, setPickerVisible] = useState<boolean>(false);

	const onEmojiClick = (
		e: React.MouseEvent<Element, MouseEvent>,
		emojiObject: any
	) => {
		e.preventDefault();
		setPickerVisible(false);
		setContent(`${content}${emojiObject.emoji}`);
	};

	return (
		<StyledMessageInput>
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
				onChange={e => setContent(e.target.value)}
			/>
			<Button variant='text' size='large' disabled={!content.length}>
				<SiTelegram />
			</Button>
		</StyledMessageInput>
	);
};

export default MessageInput;
