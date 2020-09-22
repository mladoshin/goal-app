import React, { useState, useEffect, createContext } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { Paper, Typography, CssBaseline, Grid, Tooltip, Fab } from '@material-ui/core'
import { Container } from '@material-ui/core';
import { withRouter, useParams } from "react-router-dom"
import NavBar from "../components/navigation/navbar"
import firebase from '../firebase/firebase';
import AddIcon from '@material-ui/icons/Add';

import GoalsGrid from '../components/grids/goalsGrid'
import ModalWindow from '../components/newGoalModal/modalWindow'
import QuickModal from "../components/newGoalModal/quickModal";
import ModalContext from '../components/newGoalModal/context/quickModalContext'
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        width: "100%",
        [theme.breakpoints.up("xs")]: {
            padding: "0px 5px 0px 5px"
        },
        [theme.breakpoints.up("sm")]: {
            padding: "0px 15px 0px 15px"
        },
        [theme.breakpoints.up("md")]: {
            padding: "0px 8.3% 0px 8.3%"
        },
        [theme.breakpoints.up("lg")]: {
            padding: "0px 16.6% 0px 16.6%"
        }

    },
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
    subheader: {
        width: "100%",
        textAlign: "center"
    },
    subheaderActive: {
        padding: "20px 0px 10px 0px"
    },
    subheaderCompleted: {
        padding: "40px 0px 10px 0px"
    }
}));

function CategoryPage(props) {
    const classes = useStyles()
    let { category } = useParams()
    let { filter } = useParams()

    const [openAddModal, setOpenAddModal] = useState(false)
    const [openQuickModal, setOpenQuickModal] = useState(false)

    var goalItems = []
    var completedGoalItems = []
    props.goals.map((item, index) => {
        if (item.category === category && !item.isCompleted) {
            goalItems.push(item)
        } else if (item.category === category && item.isCompleted) {
            completedGoalItems.push(item)
        }
    })


    console.log()

    console.log(completedGoalItems)




    return (
        <React.Fragment>
            <NavBar />
            <Container component="main" maxWidth="xl" className={classes.mainContainer}>
                <CssBaseline />
                <Typography variant="h3">Category Page</Typography>
                <Typography variant="body1">Category: {category}</Typography>
                <Typography variant="body1">Filter: {filter}</Typography>

                <ModalContext.Provider value={{ setOpenQuickModal, openQuickModal }}>

                    <div className={clsx(classes.subheader, classes.subheaderActive)}>
                        <hr />
                        <Typography variant="h3">Active Goals</Typography>
                        <hr />
                    </div>
                    <GoalsGrid goals={goalItems} spacing={3} />
                    {completedGoalItems.length ?
                        <div className={clsx(classes.subheader, classes.subheaderCompleted)}>
                            <hr />
                            <Typography variant="h3">Completed Goals</Typography>
                            <hr />
                        </div>
                        :
                        null}
                    <GoalsGrid goals={completedGoalItems} spacing={3} />
                </ModalContext.Provider>

            </Container>

            <Tooltip title="Add" aria-label="add" onClick={() => {
                if (firebase.auth.currentUser.emailVerified) {
                    setOpenAddModal(true)
                } else {
                    alert("Verify your email first!")
                }

            }}>
                <Fab color="secondary" className={classes.absolute}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <ModalWindow setOpenAddModal={setOpenAddModal} openAddModal={openAddModal} category={category} />
            {openQuickModal ? <QuickModal setOpenQuickModal={setOpenQuickModal} openQuickModal={openQuickModal} /> : null}
        </React.Fragment>

    );
}

const mapStateToProps = state => {
    return {
        goals: state.goals
    }
}

export default connect(mapStateToProps, null)(withRouter(CategoryPage));
