import { useState } from 'react'

const useSnackBar = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpen(false);
    }

    return {
        open,
        setOpen,
        handleClose,
    }
}

export default useSnackBar;