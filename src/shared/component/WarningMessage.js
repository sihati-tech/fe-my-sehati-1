import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import "./WarningMessage.scss";
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height: '250px',
    width: '500px',
    maxWidth: '80%',
    maxHeight: '80%',
    padding: 0
  }
};

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(1, 0, 0),
  },
}));
export default function WarningMessage(props) {

  const classes = useStyles();
  function closeModal() {
    props.onCloseWarning(true);
  }
  function onConfirm() {
    props.onConfirm(true);
  }

  return (
    <Modal
        isOpen={props.isOpenWarning}
          onRequestClose={closeModal.bind(this)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="warning__header">
            Attention
          </div>

          <div className="warning__body">
            Vous etes sur de vouloir supprimer ce Bénificaire
          </div>

          <div className="warning__footer"> 
          <Button
              variant="contained"
              color="default"
              className={classes.submit}
              onClick={ closeModal }
            > Annuler </Button>
          <Button
            type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={ onConfirm }
            > Confirmer </Button>
          </div>
        </Modal>
  );
}