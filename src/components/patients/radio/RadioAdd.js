import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from 'react-modal';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FaTrash, FaArrowLeft, FaCalendarPlus} from 'react-icons/fa';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axiosInstance from '../../../services/httpInterceptor' 
import "./RadioAdd.scss";
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
export default function RadioAdd(props) {
  const [status, setStatus] = useState(props.radio.radio_status);
  const [price, setPrice] = useState(props.radio.price); 
  const [comment, setComment] = useState(props.radio.comment);
  const [radioName, setRadioName] = useState(props.radio.radio_name);
  const [datePrevu, setDatePrevu] = useState(props.radio.date_prevu);
  const [dateRealised, setDateRealised] = useState(props.radio.date_rdv);
  const [interpretationLabo, setInterpretationLabo] = useState(props.radio.interpretation_labo);
  const [interpretationDr, setInterpretationDr] = useState(props.radio.interpretation_medecin);
  const [fileList, setFileList] = useState(props.radio.attachements);
  const [ordonnanceList, setOrdonnanceList] = useState([]);
  const [ordonnance, setOrdonnance] = useState([]);
  const [laboratory, setLaboratory] = useState(props.radio.laboratory);
  const [resultInterpretation, setResultInterpretation] = useState(props.radio.resultInterpretation);
  const [resultConclusion, setResultConclusion] = useState(props.radio.resultConclusion);

  useEffect( () => {
    const url = `${API_URL}/ordonnances/benif/${props.benif}` ;
    axiosInstance.get(url).then(response => response.data)
    .then((lst) => { 
      setOrdonnanceList(lst)
    });
  }, []);

  const classes = useStyles();
  function closeModal() {
    props.onChange(true);
  }

  function handleChangeStatus(event) {
    setStatus(event.target.value);
  };
  function handleSubmit(event) {
    if (props.radio._id) {
      const dataToSend = {
        radio_name: radioName,
        laboratory: laboratory,
        date_prevu: datePrevu,
        date_rdv: dateRealised,
        price: price,
        interpretation_medecin: interpretationDr,
        interpretation_labo: interpretationLabo,
        comment:comment,
        _id: props.radio._id,
        radio_status: status,
        result_conclusion: resultConclusion,
        result_interpretation: resultInterpretation,
      }
      console.log('props.benif ', dataToSend)
      const url = `${API_URL}/radios/benif/${props.benif}`
      axiosInstance.post(url, dataToSend).then(response => response.data)
      .then((result) => { 
        const radioId = result._id;
        sendFiles(radioId);
        closeModal() }
      );
    } else {
      const dataToSend = {
        ordonnance: ordonnance,
        radio_name: radioName,
        laboratory: laboratory,
        date_prevu: datePrevu,
        date_rdv: dateRealised,
        price: price,
        interpretation_medecin: interpretationDr,
        interpretation_labo: interpretationLabo,
        comment:comment,
        radio_status: status,
        result_conclusion: resultConclusion,
        result_interpretation: resultInterpretation,
      }
      const url = `${API_URL}/radios/benif/${props.benif}`
      axiosInstance.post(url, dataToSend).then(response => response.data)
      .then((result) => { 
        const radioId = result._id;
        sendFiles(radioId);
        closeModal() }
      );
    }
  }

  function sendFiles(radioId) {
    if (fileList)
      if (fileList && fileList.length > 0 && fileList[0]._id) {}
      else if(fileList.length == 0) {}
      else {
        const formData = new FormData(); 
        for (var x = 0; x < fileList.length; x++) {
          formData.append(fileList[x].name, fileList[x]);
        }
        const url = `${API_URL}/radios/${radioId}/benif/${props.benif}/upload/${fileList[0].name}`
        axiosInstance.post(url, formData).then(response => response.data)
        .then((result) => { }
        );
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
    console.log('file ', array)
  }
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
              !props.radio._id ? 'Nouveau radio' : `Mise à jour une radio`
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
          { props.radio._id ? 
            <div className={'select__container_fix'}> 
            { props.radio.ordonnance.ordonnance_name}</div>
            : 
          <Autocomplete
            className={'Autocomplete'}
              id="combo-box-demo"
              options={ordonnanceList}
              getOptionLabel={(option) => option.ordonnance_name}
              onChange={(event, newValue) => {
                if (newValue && newValue._id)
                  setOrdonnance(newValue._id);
                else 
                  setOrdonnance('');
              }}
              renderInput={(params) => <TextField {...params} label="Selectionner une ordonnance" variant="outlined" />}
            />
            }

            <TextField margin="normal" fullWidth label="Nom radio*" name="lastName" value={radioName} onChange={event => setRadioName(event.target.value)} />
            <TextField margin="normal" fullWidth label="Laboratoire*" name="lastName" value={laboratory} onChange={event => setLaboratory(event.target.value)} /> 
            
            <TextField id="date" label="Date prevu*" type="date" value={datePrevu}
              onChange={event => setDatePrevu(event.target.value)}
              InputLabelProps={{ shrink: true }} />

            { status === 'Done' ? <TextField id="date" label="Date realisé" type="date" value={dateRealised}
              onChange={event => setDateRealised(event.target.value)}
              InputLabelProps={{ shrink: true }} />
              : null }
            {/* <div className="text-area ">interpretation Labo
              <textarea margin="normal" fullWidth label="interpretation Labo*" name="firstName"  value={interpretationLabo} onChange={event => setInterpretationLabo(event.target.value)} />
            </div>
            <div className="text-area ">interpretation Dr
              <textarea margin="normal" fullWidth label="interpretation Dr*" name="firstName"  value={interpretationDr} onChange={event => setInterpretationDr(event.target.value)} />
            </div> */}
            <TextField margin="normal" fullWidth label="prix*" name="price"  value={price} onChange={event => setPrice(event.target.value)} />
            <TextField margin="normal" fullWidth label="Commentaire*" name="firstName"  value={comment} onChange={event => setComment(event.target.value)} />

            { props.radio.ordonnance ? 
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
            {
            status === 'Done' ?
              
            <div className="result_container">
            <div className="result_container--title"> Resultat</div>
            <div className="result_container--body">

            <div className="text-area ">interpretation Dr
              <textarea className="all-width" margin="normal" fullWidth label="interpretation Labo*" name="firstName"  value={resultInterpretation} onChange={event => setResultInterpretation(event.target.value)} />
            </div>
            <div className="text-area ">interpretation Labo
              <textarea className="all-width" margin="normal" fullWidth label="interpretation Labo*" name="firstName"  value={interpretationLabo} onChange={event => setInterpretationLabo(event.target.value)} />
            </div>
            <div className="all-width" className="text-area ">Conclusion
              <textarea margin="normal" fullWidth label="interpretation Dr*" name="firstName"  value={resultConclusion} onChange={event => setResultConclusion(event.target.value)} />
            </div>


            {
            (fileList && fileList.length > 0) ?
              (fileList).map((item, index) => {
                return (<div> {item.name} <FaTrash onClick={(e) => deleteFile(e, item, index)}></FaTrash></div>);
              })
              : null
            }

            </div>
               <div className={'drag-container'}> 
                <input
                  type="file" 
                  onChange={(e) => uploadFile(e.target.files)}/>
                  
                  <span>Parcourir mon ordinateur</span>
              </div>
          </div> : null
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
              disabled={!ordonnance || !radioName || !laboratory || !datePrevu}
            > {
              !props.radio._id ? 'Ajouter' : 'Mise à jour'
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