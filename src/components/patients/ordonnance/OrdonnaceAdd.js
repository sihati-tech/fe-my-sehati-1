import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from 'react-modal';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { CircularProgress } from '@material-ui/core';
import { FaTrash, FaArrowLeft, FaCalendarPlus} from 'react-icons/fa';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axiosInstance from '../../../services/httpInterceptor' 
import "./OrdonnaceAdd.scss";
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
const API_URL = process.env.REACT_APP_URL;

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
export default function ConsultationAdd(props) {
  const [status, setStatus] = useState(props.ordonnance.ordonnance_status || 'Later');
  const [loading, setLoading] = useState(false);
  const [consultation, setConsultation] = useState(props.ordonnance.consultation);
  const [dateRDV, setDateRDV] = useState(props.ordonnance.date_rdv || (new Date()).toISOString().substr(0,10));
  const [ordonnanceName, setOrdonnanceName] = useState(props.ordonnance.ordonnance_name);
  const [price, setPrice] = useState(props.ordonnance.price);
  const [commentPatient, setCommentPatient] = useState(props.ordonnance.comment);
  const [comment, setComment] = useState(props.ordonnance.comment_medecin);
  const [consultationList, setConsultationList] = useState([]);
  const [fileList, setFileList] = useState(props.ordonnance.attachements);
  
  useEffect( () => {
    const url = `${API_URL}/consultation/benif/${props.benif}` ;
    axiosInstance.get(url).then(response => response.data)
    .then((lst) => { 
      setConsultationList(lst)
    });
  }, []);
  const classes = useStyles();
  function closeModal() {
    props.onChange(true);
  }

  function handleSubmit(event) {
    setLoading(true);
    if (props.ordonnance._id) {
      const dataToSend = {
        ordonnance_name: ordonnanceName,
        date_rdv: dateRDV,
        price: price,
        ordonnance_status: status,
        consultation: consultation,
        comment_medecin: comment,
        comment: commentPatient,
        _id: props.ordonnance._id
      }
      const url = `${API_URL}/ordonnances/benif/${props.benif}`
      axiosInstance.post(url, dataToSend).then(response => response.data)
      .then((result) => { 
        const ordonnanceId = result._id;
        sendFiles(ordonnanceId);
      }
      );
    } else {
      const dataToSend = {
        ordonnance_name: ordonnanceName,
        date_rdv: dateRDV,
        price: price,
        ordonnance_status: status,
        consultation: consultation,
        comment_medecin: comment,
        comment: commentPatient,
      }
      const url = `${API_URL}/ordonnances/benif/${props.benif}`
      axiosInstance.post(url, dataToSend).then(response => response.data)
      .then((result) => { 
        const ordonnanceId = result._id;
        sendFiles(ordonnanceId);}
      );
    }
  }
  function sendFiles(ordonnanceId) {
    if (fileList) {
      if (fileList && fileList.length > 0 && fileList[0]._id) {closeModal();}
      else if(fileList.length == 0) {closeModal();}
      else {
        const formData = new FormData(); 
        for (var x = 0; x < fileList.length; x++) {
          formData.append("file", fileList[x], fileList[x].name);
        }
        const url = `${API_URL}/ordonnances/${ordonnanceId}/benif/${props.benif}/upload/${fileList[0].name}`
        axiosInstance.post(url, formData).then(response => response.data)
        .then((result) => {
          closeModal(); }
        );
      }
    } else {
      closeModal() 
    }
  }
  function deleteFile(e, file, index) {
    setFileList(fileList.filter(item => item.name !== file.name));
  }
  function uploadFile(event) {
    const array = []
    for (let i=0; i<event.length; i++) {
      array.push(event[i])
    }
    setFileList(array);
  }

  function handleChangeStatus(event) {
    setStatus(event.target.value);
  };
  return (
    <Modal
        isOpen={props.isOpen}
          onRequestClose={closeModal.bind(this)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal__header">
            <div className="modal__header-title">
              {
              !props.ordonnance._id ? 'Nouvelle Ordonnance' : `Mise à jour de l'ordonnance`
              }
            </div>
            <div className="modal__header-close">
            </div>
          </div>

          <div className="modal__body">

           <div className="modal__body-description"> 
            Les champs obligatoires sont suivi par une *
          </div>


<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} >
          <div className={'content-modal'}>
          { props.ordonnance._id ? 
            <div className={'select__container_fix'}> 
            { props.ordonnance.consultation.consultation_name}</div>
            : 
          <Autocomplete
            className={'Autocomplete'}
              id="combo-box-demo"
              options={consultationList}
              getOptionLabel={(option) => option.consultation_name + ' (Dr. ' + option.medecin.last_name + ')'}
              onChange={(event, newValue) => {
                if (newValue && newValue._id)
                  setConsultation(newValue._id);
                else 
                  setConsultation('');
              }}
              renderInput={(params) => <TextField {...params} label="Selectionner une consultation" variant="outlined" />}
            />
            }
            <TextField margin="normal" fullWidth label="Nom*" name="firstName"  value={ordonnanceName} onChange={event => setOrdonnanceName(event.target.value)} />
            <TextField id="date" label="Date de RDV*" type="date" value={dateRDV}
              onChange={event => setDateRDV(event.target.value)}
              InputLabelProps={{ shrink: true }} />
            <TextField margin="normal" fullWidth label="prix" name="firstName"  value={price} onChange={event => setPrice(event.target.value)} />
            <TextField margin="normal" fullWidth label="commentaire patient" name="firstName"  value={commentPatient} onChange={event => setCommentPatient(event.target.value)} />
            <TextField margin="normal" fullWidth label="commentaire medecin" name="firstName"  value={comment} onChange={event => setComment(event.target.value)} />
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                onChange={handleChangeStatus}
              >
                
                <MenuItem value={'Later'}>A venir</MenuItem>
                <MenuItem value={'InProgress'}>En cours</MenuItem>
                <MenuItem value={'Done'}>Terminé</MenuItem>
              </Select>
            {
            (fileList && fileList.length > 0) ?
              (fileList).map((item, index) => {
                return (<div> {item.name} <FaTrash onClick={(e) => deleteFile(e, item, index)}></FaTrash></div>);
              })
              : null
            }
            
            <div className={'drag-container'}> 
            <input
                 type="file" 
                 onChange={(e) => uploadFile(e.target.files)}/>
                
                 <span>Parcourir mon ordinateur (Max 5M)</span>
            </div>
          </div>
          <div className={'footer-modal'}>
          <Button
              variant="contained"
              color="default"
              className={classes.submit}
              onClick={ closeModal }
            > Annuler </Button>
          <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={ handleSubmit }
              disabled={!ordonnanceName || !dateRDV || !consultation || loading}
              > 
              {loading && <CircularProgress size={14} />} {
              !props.ordonnance._id ? 'Ajouter' : 'Mise à jour'
              } </Button>
          </div>
          
        </form>
      </div>
    </Container>

          </div>

          {/* <div className="modal__footer">
          <div className = {"modal__button"}
            onClick={onCreateChannel.bind(this)}
            disabled={name}
          >Create</div>
          </div> */}
        </Modal>
  );
}