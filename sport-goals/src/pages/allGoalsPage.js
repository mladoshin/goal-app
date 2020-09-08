import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { Paper, Typography, CssBaseline, Grid, Tooltip, Fab } from '@material-ui/core'
import { Container } from '@material-ui/core';
import { withRouter, useParams } from "react-router-dom"
import NavBar from "../components/navigation/navbar"
import firebase from '../firebase/firebase';
import GoalsGrid from '../components/grids/goalsGrid'
import ModalWindow from '../components/newGoalModal/modalWindow'

import DirectionsRunRoundedIcon from '@material-ui/icons/DirectionsRunRounded';
import FitnessCenterRoundedIcon from '@material-ui/icons/FitnessCenterRounded';
import PoolRoundedIcon from '@material-ui/icons/PoolRounded';
import SportsFootballRoundedIcon from '@material-ui/icons/SportsFootballRounded';
import AddIcon from '@material-ui/icons/Add';
import QuickModal from "../components/newGoalModal/quickModal";

const useStyles = makeStyles((theme) => ({

    cardPaper: {
        [theme.breakpoints.up("xs")]: {
            padding: 10
        },
        [theme.breakpoints.up("sm")]: {
            padding: 15
        },
        [theme.breakpoints.up("md")]: {
            padding: 20
        },
        [theme.breakpoints.up("lg")]: {
            padding: 20
        }
    },
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
    }
}));

function AllGoalsPage(props) {
    const classes = useStyles()
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openQuickModal, setOpenQuickModal] = useState(false)
    let { filter } = useParams() //filter = allgoals --> show all goals; filter = allcategories --> show all categories
    const categories = props.goalCategories

    const categoryIcon = (category) => {
        const width = 50
        const height = 50
        if (category === "running" || category === "athletics") {
            return <DirectionsRunRoundedIcon style={{ width: width, height: height }} />
        } else if (category === "weightlifting") {
            return <FitnessCenterRoundedIcon style={{ width: width, height: height }} />
        } else if (category === "swimming") {
            return <PoolRoundedIcon style={{ width: width, height: height }} />
        } else {
            return <SportsFootballRoundedIcon style={{ width: width, height: height }} />
        }
    }
    const categoriesKeys = Object.keys(categories)
    const content = Object.values(categories)

    const categoryItems = categoriesKeys.map((category, index) => {
        const icon = categoryIcon(category)
        return (

            <Grid item key={index} xs={12} md={6}>
                <Paper className={classes.cardPaper} style={{ display: "flex", flexDirection: "row", alignItems: "center" }} onClick={() => props.history.replace("/dashboard/userId=" + firebase.getCurrentUserId() + "/goals/" + category + "/filter=none")}>
                    {icon}
                    <Typography variant="h3" style={{ marginLeft: 15, flexGrow: 1 }}>{category}</Typography>
                    <Typography variant="h5" style={{ fontWeight: 600 }}>{content[index].completedCount + "/" + content[index].count}</Typography>
                </Paper>
            </Grid>

        )
    })



    const GridHeader = () => {
        return (
            <Typography variant="h2" style={{ textAlign: "center", marginTop: 5 }}>{filter === "allgoals" ? "All Goals" : "All Categories"}</Typography>
        )
    }

    const PageContent = (props) => {
        if (filter == "allgoals") {
            return (
                <GoalsGrid goals={props.goals} />
            )

        } else if (filter == "allcategories") {
            return (
                <Grid container direction="row" className={classes.gridContainer} spacing={2}>
                    {categoryItems}
                </Grid>
            )

        } else {
            return <h2>Filter {filter} does not exist!</h2>
        }
    }

    return (
        <React.Fragment>
            <NavBar />
            <Container component="main" maxWidth="xl" className={classes.mainContainer}>
                <CssBaseline />
                <GridHeader />
                <PageContent direction={["row", "column"]} goals={props.goals} />
            </Container>

            {/*Tooltip and Modal Window */}
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
            <ModalWindow setOpenAddModal={setOpenAddModal} openAddModal={openAddModal} />
            <QuickModal/>
        </React.Fragment>

    );
}

const mapStateToProps = state => {
    return {
        goals: state.goals,
        goalCategories: state.goalCategories
    }
}

export default connect(mapStateToProps, null)(withRouter(AllGoalsPage));