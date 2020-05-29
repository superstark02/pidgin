import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  export default function MyHeader() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="static" color='#043540' style={{backgroundColor:'#043540',padding:'10px',color:'white'}}>
          <Toolbar>
            <Typography variant="h6" className={classes.title} align='center'>
              Pidgin
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }