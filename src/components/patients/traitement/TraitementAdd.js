import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from 'react-modal';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FaTrash, FaCalendarPlus} from 'react-icons/fa';
import { traitementConfig } from './traitementConfig.js';

import { CircularProgress } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axiosInstance from '../../../services/httpInterceptor' 
import "./TraitementAdd.scss";
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
export default function TraitementAdd(props) {
  
  const [loading, setLoading] = useState(false);
  const traitementResult = [];
  const [status, setStatus] = useState(props.traitement.traitement_status);
  const [traitementCategory, setTraitementCategory] = useState(props.traitement.traitement_status);
  const [comment, setComment] = useState(props.traitement.comment);
  const [commentPersonnelTraitment, setCommentPersonnelTraitment] = useState(props.traitement.comment_personnel_traitment);
  const [traitementName, setTraitementName] = useState(props.traitement.traitement_name);
  const [interpretationLabo, setInterpretationLabo] = useState(props.traitement.interpretation_labo);
  const [interpretationDr, setInterpretationDr] = useState(props.traitement.interpretation_medecin);
  const [fileList, setFileList] = useState(props.traitement.attachements);
  const [ordonnanceList, setOrdonnanceList] = useState([]);
  const [ordonnance, setOrdonnance] = useState([]);
  const [pathologie, setPathologie] = useState(props.traitement.pathologie);
  const [startDate, setStartDate] = useState(props.traitement.start_date || (new Date()).toISOString().substr(0,10));
  const [endDate, setEndDate] = useState(props.traitement.end_date || (new Date()).toISOString().substr(0,10));
  const [duration, setDuration] = useState(props.traitement.traitement_duration);
  const [restDuration, setRestDuration] = useState(props.traitement.rest_duration);
  const [subTraitements, setSubTraitements] = useState(props.traitement.subTraitments);

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

  function handleSubmit(event) {
    setLoading(true);
    if (props.traitement._id) {
      const dataToSend = {
        traitement_name: traitementName,
        pathologie: pathologie,
        traitement_duration: duration,
        rest_duration: restDuration,
        subTraitments: subTraitements,
        comment:comment,
        comment_personnel_traitment :commentPersonnelTraitment,
        traitement_status: status,
        interpretation_dr: interpretationDr,
        _id: props.traitement._id,
      }
      const url = `${API_URL}/traitements/benif/${props.benif}`
      axiosInstance.post(url, dataToSend).then(response => response.data)
      .then((result) => { 
        const traitementId = result._id;
        sendFiles(traitementId);
      }
      );
    } else {
      const dataToSend = {
        ordonnance: ordonnance,
        traitement_name: traitementName,
        pathologie: pathologie,
        start_date: startDate,
        end_date: endDate,
        traitement_duration: duration,
        subTraitments: subTraitements,
        comment:comment,
        comment_personnel_traitment :commentPersonnelTraitment,
        traitement_status: status,
        interpretation_dr: interpretationDr,
        _id: props.traitement._id,
      }
      const url = `${API_URL}/traitements/benif/${props.benif}`
      axiosInstance.post(url, dataToSend).then(response => response.data)
      .then((result) => { 
        const traitementId = result._id;
        sendFiles(traitementId);
      });
    }
  }

  function sendFiles(traitementId) {
    if (fileList) {
      if (fileList && fileList.length > 0 && fileList[0]._id) {closeModal();}
      else if(fileList.length == 0) {closeModal();}
      else {
        const formData = new FormData(); 
        for (var x = 0; x < fileList.length; x++) {
          formData.append("file", fileList[x], fileList[x].name);
        }
        const url = `${API_URL}/traitements/${traitementId}/benif/${props.benif}/upload/${fileList[0].name}`
        axiosInstance.post(url, formData).then(response => response.data)
        .then((result) => { 
          closeModal();}
        );
      }
    } else {
      closeModal();
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
  
  function addSubTraitement() {
    const newElement = Object.assign({}, traitementConfig);
    setSubTraitements(oldArray => {
      if (oldArray && oldArray.length>0)
        return [...oldArray, newElement]

      return [newElement]
    });
  }
  function addResultLine(subTraitement, indexSubTraitement) {
    let res = [...subTraitements]; 
    res[indexSubTraitement].result.push({
      "date_prise": "",
      "moment": "",
      "value": "",
    }); 
    setSubTraitements(res)
  }
  function handleChangeTraitementCategory(event) {
    setTraitementCategory(event.target.value)
  };
  function setResultRow(value, indexRow, indexSubTraitement, field) {
    let res = [...subTraitements]; 
    let results = [...res[indexSubTraitement].result]; 
    results[indexRow][field] = value; 
    res[indexSubTraitement].result = results
    setSubTraitements(res)
  }
  function handleSubTraitement(subTraitement, value, indexSubTraitement, key) {
    let res = [...subTraitements]; 
    res[indexSubTraitement][key] = value; 
    setSubTraitements(res)
  }
  function renderSubTraitements() {
    return(
      <div>
        {
         ( subTraitements && subTraitements.length > 0)? 
          <div>
            {
            subTraitements.map((subTraitement, indexSubTraitement) => (
              <div className="result_container" key={indexSubTraitement}>
                  <TextField margin="normal" fullWidth label="nom sub traitement*" name="lastName" 
                  value={subTraitement.sub_traitement_name} 
                  onChange={event => handleSubTraitement(subTraitement, event.target.value, indexSubTraitement, 'sub_traitement_name')} /> 
                  <TextField id="date" label="Date début*" type="date" value={subTraitement.sub_traitement_start_date}
                    onChange={event => handleSubTraitement(subTraitement, event.target.value, indexSubTraitement, 'sub_traitement_start_date')} 
                    InputLabelProps={{ shrink: true }} />
                  <TextField id="date" label="Date fin*" type="date" value={subTraitement.sub_traitement_end_date}
                  onChange={event => handleSubTraitement(subTraitement, event.target.value, indexSubTraitement, 'sub_traitement_end_date')} 
                  InputLabelProps={{ shrink: true }} />
                  <TextField margin="normal" fullWidth label="durée passé" name="lastName" value={subTraitement.sub_traitement_duration_passed} onChange={event => handleSubTraitement(subTraitement, event.target.value, indexSubTraitement, 'sub_traitement_duration_passed')} /> 
                  <TextField margin="normal" fullWidth label="durée reste" name="lastName" value={subTraitement.sub_traitement_duration_reste} onChange={event => handleSubTraitement(subTraitement, event.target.value, indexSubTraitement, 'sub_traitement_duration_reste')} /> 
                  <TextField margin="normal" fullWidth label="posologie" name="lastName" value={subTraitement.sub_traitement_posologie} onChange={event => handleSubTraitement(subTraitement, event.target.value, indexSubTraitement, 'sub_traitement_posologie')} /> 
                  <TextField margin="normal" fullWidth label="fois par jour" name="lastName" value={subTraitement.sub_traitement_time_per_day} onChange={event => handleSubTraitement(subTraitement, event.target.value, indexSubTraitement, 'sub_traitement_time_per_day')} /> 

                  type : <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={subTraitement.sub_traitement_type}
                    onChange={event => handleSubTraitement(subTraitement, event.target.value, indexSubTraitement, 'sub_traitement_type')}
                  >
                
                <MenuItem value={'Température'}>Température</MenuItem>
                <MenuItem value={'Tension'}>Tension</MenuItem>
                <MenuItem value={'Oxymetrie'}>Oxymétrie</MenuItem>
                <MenuItem value={'Glycemie'}>Glycémie</MenuItem>
                <MenuItem value={'Medicament'}>Medicament</MenuItem>
                <MenuItem value={'Autre'}>Autre</MenuItem>
              </Select> 
              <div className="btn-action" onClick={(e) => addResultLine(subTraitement, indexSubTraitement)}> <FaCalendarPlus>  </FaCalendarPlus>Ajouter une ligne</div>

              {
                <Table className={classes.table} aria-label="simple table"> 
                <TableHead> 
                  <TableRow> 
                    <TableCell>Date prise</TableCell> 
                    <TableCell align="right">moment</TableCell> 
                    <TableCell align="right">valeur</TableCell> 
                </TableRow> 
                </TableHead> 
                { subTraitements[indexSubTraitement].result.map((row, indexRow) => { 
               return ( 
                <TableBody>
                  <TableRow key={row.name}> 
                    <TableCell align=""> 
                      <TextField id="date" label="Date prise*" type="date" value={row.date_prise}
                        onChange={event => setResultRow(event.target.value, indexRow, indexSubTraitement, 'date_prise')}
                        InputLabelProps={{ shrink: true }} />
                  </TableCell> 
                    <TableCell align="center">
                    <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={row.moment}
                          onChange={event => setResultRow(event.target.value, indexRow, indexSubTraitement, 'moment')}
                         >
                      
                      <MenuItem value={'Morning'}>Matin</MenuItem>
                      <MenuItem value={'Afternoon'}>A-midi </MenuItem>
                      <MenuItem value={'Night'}>soire</MenuItem>
                    </Select> 
                      </TableCell> 
                    <TableCell align="right" width="40px"><TextField margin="normal" fullWidth label="valeur*" name="firstName"  value={row.value} onChange={event => setResultRow(event.target.value, indexRow, indexSubTraitement, 'value')} /> </TableCell> 
                  </TableRow> 
                </TableBody> 
                )})}  
                   </Table>
              }
              </div>
            ))} 
          </div>  : null
        }
      </div>
    )
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
              !props.traitement._id ? 'Nouveau traitement' : `Mise à jour d'traitement`
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
          { props.traitement._id ? 
            <div className={'select__container_fix'}> 
            { props.traitement.ordonnance.ordonnance_name}</div>
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

            <TextField margin="normal" fullWidth label="Nom traitement*" name="lastName" value={traitementName} onChange={event => setTraitementName(event.target.value)} />
            <TextField margin="normal" fullWidth label="pathologie" name="lastName" value={pathologie} onChange={event => setPathologie(event.target.value)} /> 
            <TextField id="date" label="Date début*" type="date" value={startDate}
              onChange={event => setStartDate(event.target.value)}
              InputLabelProps={{ shrink: true }} />
            <TextField id="date" label="Date fin*" type="date" value={endDate}
            onChange={event => setEndDate(event.target.value)}
            InputLabelProps={{ shrink: true }} />
            <TextField margin="normal" fullWidth label="durée" name="lastName" value={duration} onChange={event => setDuration(event.target.value)} /> 
            <TextField margin="normal" fullWidth label="durée restante" name="lastName" value={restDuration} onChange={event => setRestDuration(event.target.value)} /> 

            <TextField margin="normal" fullWidth label="Commentaire" name="firstName"  value={comment} onChange={event => setComment(event.target.value)} />
            <TextField margin="normal" fullWidth label=" Comment Personnel Traitment" name="firstName"  value={commentPersonnelTraitment} onChange={event => setCommentPersonnelTraitment(event.target.value)} />
            <TextField margin="normal" fullWidth label="interpretation Dr" name="firstName"  value={interpretationDr} onChange={event => setInterpretationDr(event.target.value)} />
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
            <div className="btn-action" onClick={(e) => addSubTraitement()}> <FaCalendarPlus>  </FaCalendarPlus>Ajouter sous traitement</div>
            {renderSubTraitements()}
            { props.traitement.ordonnance ? 
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
              : null
            }
          </div>
        </form>
      </div>
    </Container>
          </div>
           <div className="modal__footer">
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
              disabled={!traitementName || !ordonnance || !startDate || !endDate || loading}
              > 
              {loading && <CircularProgress size={14} />} {
              !props.traitement._id ? 'Ajouter' : 'Mise à jour'
              } </Button>

          </div> 
        </Modal>
  );
}