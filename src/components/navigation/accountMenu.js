import React from "react";
import { withRouter } from "react-router-dom";
import { Menu, MenuItem, Switch } from '@material-ui/core';
import firebase from '../../firebase/firebase'

function AccountMenu(props) {
    const clearReduxState = props.clearReduxState
    const setAccountAnchor = props.setAccountAnchor
    const setOpenProfile = props.setOpenProfile
    const accountAnchor = props.accountAnchor
    const theme = props.theme
    const setTheme = props.setTheme

    return (
        <Menu
            id="simple-menu"
            anchorEl={accountAnchor}
            keepMounted
            open={Boolean(accountAnchor)}
            onClose={() => setAccountAnchor(null)}
            style={{ position: "absolute", right: 50, top: 60 }}
        >
            <MenuItem onClick={() => {
                setAccountAnchor(null)
                setOpenProfile(true)
            }}>Profile</MenuItem>
            <MenuItem onClick={() => {
                if (props.theme === "light") {
                    setTheme("dark")
                } else {
                    setTheme("light")
                }
            }}>
                Dark Theme
          <Switch
                    checked={theme === "dark"}

                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
            </MenuItem>
            <MenuItem onClick={() => {
                setAccountAnchor(null)
                setOpenProfile(true)
                clearReduxState()
                props.history.replace("/home")
                firebase.logout()
            }}>Log Out</MenuItem>
        </Menu>
    )
}

export default withRouter(AccountMenu);