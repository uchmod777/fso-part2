const Notification = ({ message, status }) => {
    if (message === null) {
        return null;
    }

    const notificationClass = status ? 'success' : 'failure';

    return (
        <div className={notificationClass}>
            {message}
        </div>
    )
}

export default Notification;