import Button from '@material-ui/core/Button';
import React from 'react';

const App: React.FC = () => {
    const handelClick = () => {
        console.log('click');
    }
    return (
        <Button variant='outlined' color='primary' onClick={handelClick}>
            Tweeter!
        </Button>
    )
}

export default App;