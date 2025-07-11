import{ useContext } from 'react';
// Adjust the path as needed

import { Bounce, ToastContainer } from 'react-toastify';
import { ToastContext } from '../../../StoreInfo/ToastContext';

export const  ToastNotification = () => {
    const toastContext = useContext(ToastContext);
    const typeBackgroundColor = toastContext?.toastData?.type === 'error' ? 'red' : toastContext?.toastData?.type === 'success' ? 'green' : 'yellow'

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
                toastStyle={{ backgroundColor: typeBackgroundColor, color: "white" }}
            />
        </div>
    );
}