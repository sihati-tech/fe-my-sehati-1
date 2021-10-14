import React, { useState, useEffect } from "react";

import { Chart } from 'react-charts'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from 'react-modal';
import "./mesAnalyses.scss";
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height: '470px',
    width: '500px',
    maxWidth: '80%',
    maxHeight: '80%',
    padding: 0
  }
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
let sourceCode
export default function MesGraph(props) {

  useEffect( () => {
  }, []);

  function closeModal() {
    props.onChangeGraph(true);
  }
  
  const data = React.useMemo(
    () => [
      {
        label: 'graph',
        data: props.graphData.map(element => {
          return [new Date(element.date), element.value]
        }),
      }
    ],
    []
  )
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom'},
      { type: 'linear', position: 'left' }
    ],
    []
  )
  
  return (
    <Modal
        isOpen={true}
          onRequestClose={closeModal.bind(this)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="graph__header">
            {props.benif.first_name +' '+ props.benif.last_name}
            
          </div>

          <div className="graph__body"> 
            <Chart data={data} axes={axes} 
             />
          </div>
          <div className="graph__footer"> 
           Evolution de {props.codeGraph.label}
          </div>
        </Modal>
  );
}