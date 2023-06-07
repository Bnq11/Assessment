import React from 'react';

import { Link } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { green } from '@mui/material/colors';

const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    backgroundColor:'whait',
    width:"auto",
    height:"auto",
    position: 'absolute',
    
  },
  dialogTitle: {

      textDecorationColor :'green'
  }

}))

export default function Popup(props) {

  const { title, children, openPopup,} = props;
  const classes = useStyles();
if (title === "انتهى التقييم" ){
  return (
      <Dialog style={{textAlign:"center",margin:"auto" }} open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
          <DialogTitle className={classes.dialogTitle}>
              <div style={{ display: 'flex', backgroundColor:'white' }}>
                  <Typography variant="h4" component="div" style={{ flexGrow: 1, textDecorationColor:green }}>
                      {title}
                  </Typography>
              </div>
          </DialogTitle>
          <DialogContent style={{margin:"20px"}}>
              {children}    
          </DialogContent>
        <Link to = "/" style={{
    width: '30%',
    borderRadius: '20px', 
    textDecoration: 'none',
    color: 'rgb(241, 241, 246)',
    backgroundColor: '#657789',
    marginRight:'auto',
    marginLeft:'auto',       
    alignItems: 'center',
    display:'flex',
    justifyContent: 'center',
    marginBottom:'10px'
  }}>
         <center>   <h4> إغلاق </h4></center>
          </Link>
      </Dialog>
  )}
  else{ if (title === "خطأ" ){
    return (
      <Dialog style={{backgroundColor:'whait',textAlign:"center"}} open={openPopup} classes={{ paper: classes.dialogWrapper }}>
          <DialogTitle className={classes.dialogTitle}>
              <div style={{ display: 'flex', backgroundColor:'whait'}}>
                  <Typography variant="h2" component="div" style={{ flexGrow: 1, color:'rgb(123, 42, 42)',padding:'100px'}}>
                      {title}
                  </Typography>             
              </div>
          </DialogTitle>
      </Dialog>
      )}else{
        return (
            <Dialog style={{backgroundColor:'whait',textAlign:"center"}} open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
                <DialogTitle className={classes.dialogTitle}>
                    <div style={{ display: 'flex', backgroundColor:'whait'}}>
                        <Typography variant="h2" component="div" style={{ flexGrow: 1, color:'green',padding:'100px'}}>
                            {title}
                        </Typography>             
                    </div>
                </DialogTitle>
            </Dialog>
        )
      }
  }
}