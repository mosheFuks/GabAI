import React, { useContext } from 'react';
import { ToastContext } from '../../StoreInfo/ToastContext'; // Adjust the path as needed

import { Bounce, ToastContainer } from 'react-toastify';

export const  ToastNotification = () => {
    const { toastData }  = useContext(ToastContext);

    const typeBackgroundColor = toastData?.type === 'error' ? 'red' : toastData?.type === 'success' ? 'green' : 'yellow'

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