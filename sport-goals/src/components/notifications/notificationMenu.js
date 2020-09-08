import React from "react"
import { Menu, MenuItem, Divider } from '@material-ui/core';

function NotificationMenu(props) {
    const notificationAnchor = props.notificationAnchor
    const setNotificationAnchor = props.setNotificationAnchor
    
    const notificationItems = props.notifications.map((notification, index) => {
        return (
            <div key={index}>
                <Divider />
                <MenuItem>{notification}</MenuItem>
            </div>
        )
    })
    return (
        <Menu
            id="notification-menu"
            anchorEl={notificationAnchor}
            keepMounted
            open={Boolean(notificationAnchor)}
            onClose={() => setNotificationAnchor(null)}
            style={{ position: "absolute", right: "50px", top: 60 }}
        >
            {notificationItems}

        </Menu>
    )
}

export default NotificationMenu;