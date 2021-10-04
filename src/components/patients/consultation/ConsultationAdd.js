import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from 'react-modal';
import axiosInstance from '../../../services/httpInterceptor' 
import { FaTrash, FaArrowLeft, FaCalendarPlus} from 'react-icons/fa';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./ConsultationAdd.scss";
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
const filterList = [
  {code: 'Generalist', label: 'Généraliste'},
  {code: 'Specialist', label: 'Spécialiste'},
  {code: 'Dentiste', label: 'Dentiste'},]
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
  const [fileList, setFileList] = useState(props.consultation.attachements);

  const [consultationName, setConsultationName] = useState(props.consultation.consultation_name);
  const [consultationDesc, setConsultationDesc] = useState(props.consultation.consultationDesc);
  const [price, setPrice] = useState(props.consultation.price);
  const [dateRdv, setDateRdv] = useState(props.consultation.date_rdv);
  const [timeRdv, setTimeRdv] = useState(props.consultation.time_rdv);
  const [dateConsultation, setDateConsultation] = useState(props.consultation.date_consultation);
  const [commentDr, setCommentDr] = useState(props.consultation.commentaire_medecin);
  const [comment, setComment] = useState(props.consultation.commentaire);
  const [medecin, setMedecin] = useState(props.consultation.medecin);
  const [medecinList, setMedecinList] = useState([]);
  const [speciality, setSpeciality] = useState('Generalist');
  const [status, setStatus] = useState(props.consultation.consultation_status);

  useEffect( () => {
    const url = `${API_URL}/medecins?speciality=${speciality}` ;
    axiosInstance.get(url).then(response => response.data)
    .then((doctorList) => { 
      setMedecinList(doctorList)
    });
  }, []);
  const classes = useStyles();
  function closeModal() {
    props.onChange(true);
  }
  function selectFilter(filter) {
    setSpeciality(filter.code);
    listDoctors(filter.code);
  }
  function listDoctors(speciality) {
    const url = `${API_URL}/medecins?speciality=${speciality}` ;
    axiosInstance.get(url).then(response => response.data)
    .then((doctorList) => { 
      setMedecinList(doctorList)
    });
  }

  function sendFiles(analyseId) {
    if (fileList) {
      if (fileList && fileList.length > 0 && fileList[0]._id) {}
      else if(fileList.length == 0) {}
      else {
        const formData = new FormData(); 
        for (var x = 0; x < fileList.length; x++) {
          formData.append(fileList[x].name, fileList[x]);
        }
        const url = `${API_URL}/consultation/${analyseId}/benif/${props.benif}/upload/${fileList[0].name}`
        axiosInstance.post(url, formData).then(response => response.data)
        .then((result) => { }
        );
      }
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
  function handleSubmit(event) {
    if (props.consultation.medecin) {
      const dataToSend = {
        consultation_name: consultationName,
        consultation_desc: consultationDesc,
        date_rdv: dateRdv,
        time_rdv: timeRdv,
        date_consultation: dateConsultation,
        commentaire_medecin: commentDr,
        commentaire: comment,
        price: price,
        consultation_status: status,
        _id: props.consultation._id
      }
      const url = `${API_URL}/consultation/benif/${props.benif}`;
      axiosInstance.post(url, dataToSend).then(response => response.data)
      .then((result) => { 
        const analyseId = result._id;
        sendFiles(analyseId);
        closeModal() 
      }
      );
    }
    else if (medecin ) {
      const dataToSend = {
        consultation_name: consultationName,
        consultation_desc: consultationDesc,
        medecin: medecin,
        date_rdv: dateRdv,
        time_rdv: timeRdv,
        date_consultation: dateConsultation,
        commentaire_medecin: commentDr,
        commentaire: comment,
        price: price,
      }
      const url = `${API_URL}/consultation/benif/${props.benif}`;
      console.log('url ', url, dataToSend)
    
      axiosInstance.post(url, dataToSend).then(response => response.data)
      .then((result) => { 
        const analyseId = result._id;
        sendFiles(analyseId);
        closeModal() }
      );
    }
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
              !props.consultation._id ? 'Nouvelle consultation' : 'Mise à jour de la consultation'
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
          { props.consultation.medecin ? 
            <div className={'select__container_fix'}> 
            {
            props.consultation.medecin.speciality
             + ' ' + 
            props.consultation.medecin.last_name
             + ' ' + 
             props.consultation.medecin.first_name}</div>
            : 
          <div className={'select__container'}>
          
          <div className={'filter__container'}>
            {
              filterList.map((filter, index) => {
                return (
                  <div className={filter.code === speciality ? 'filter__container--item filter__container-actif' : 'filter__container--item'} onClick={(e) => selectFilter(filter)}>
                    {filter.label}
                  </div>
                )
              })
            }
          </div>


           <Autocomplete
            className={'Autocomplete'}
              id="combo-box-demo"
              options={medecinList}
              getOptionLabel={(option) => option.last_name + ' ' + option.first_name}
              onChange={(event, newValue) => {
                if (newValue && newValue._id)
                  setMedecin(newValue._id);
                else 
                  setMedecin('');
              }}
              renderInput={(params) => <TextField {...params} label="Selectionner un medecin" variant="outlined" />}
            />
            </div>
            }     
            {/* <TextField margin="normal" fullWidth label="Medcin*" name="consultationName"  value={medecin} onChange={event => setMedecin(event.target.value)} /> */}
            <TextField margin="normal" fullWidth label="Nom*" name="consultationName"  value={consultationName} onChange={event => setConsultationName(event.target.value)} />
            <TextField margin="normal" fullWidth label="Description*" name="consultationDesc" value={consultationDesc} onChange={event => setConsultationDesc(event.target.value)} />
            <TextField id="date" label="Date du RDV*" type="date" value={dateRdv}
              onChange={event => setDateRdv(event.target.value)}
              InputLabelProps={{ shrink: true }} />
            <TextField id="date" label="L'heure" type="time" value={timeRdv} className={'input-min-width'}
              onChange={event => setTimeRdv(event.target.value)}
              InputLabelProps={{ shrink: true }} />
            { status === 'Done' ? 
            <TextField id="date" label="Date de Consultation*" type="date" value={dateConsultation}
            onChange={event => setDateConsultation(event.target.value)}
            InputLabelProps={{ shrink: true }} />
            : null }
            <TextField margin="normal" fullWidth label="Prix" name="consultationName"  value={price} onChange={event => setPrice(event.target.value)} />
            <TextField margin="normal" fullWidth label="Commentaire*" name="consultationName"  value={comment} onChange={event => setComment(event.target.value)} />
            <TextField margin="normal" fullWidth label="Commentaire Médecin*" name="consultationName"  value={commentDr} onChange={event => setCommentDr(event.target.value)} />
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
                
                <span>Parcourir mon ordinateur</span>
            </div>
            { props.consultation.medecin ? 
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                onChange={handleChangeStatus}
              >
                <MenuItem value={'Later'}>A venir</MenuItem>
                <MenuItem value={'Done'}>Terminé</MenuItem>
              </Select>              
              : null
            }
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
              disabled={!medecin || !consultationName || !dateRdv}
            > {
              !props.consultation._id ? 'Ajouter' : 'Mise à jour'
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