import React, { useState, useEffect } from "react";

// import { Chart } from 'react-charts'
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, ReferenceArea,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
  Label, LabelList } from 'recharts';
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
export default function MesGraph(props) {

  useEffect( () => {
  }, []);

  function closeModal() {
    props.onChangeGraph(true);
  }
  const data = props.graphData.sort(function(a,b){ 
    if(a.date>b.date){return 1;} 
      if(a.date<b.date){return -1;}
      return 0;
   });
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
          {/* <Chart data={data} axes={axes} /> */}
         
          <ResponsiveContainer width="100%" height="100%">
        <LineChart
          height={300}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" style={{
              fontSize: '12px',
              transform: `rotate('45deg')`,
              fontFamily: 'Times New Roman',
          }}/>
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
          </div>
          <div className="graph__footer"> 
           Evolution de {props.codeGraph.label}
          </div>
        </Modal>
  );
}