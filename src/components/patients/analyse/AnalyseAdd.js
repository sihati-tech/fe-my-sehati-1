import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from 'react-modal';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FaTrash, FaArrowLeft, FaCalendarPlus} from 'react-icons/fa';
import { analyseConfig} from './analyseConfig.js';

import { CircularProgress } from '@material-ui/core';

import { toast } from 'react-toastify';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axiosInstance from '../../../services/httpInterceptor' 
import "./AnalyseAdd.scss";
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
export default function AnalyseAdd(props) {
  
  const [loading, setLoading] = useState(false);
  const analyseResult = [];
  const [status, setStatus] = useState(props.analyse.analyse_status);
  const [analyseCategory, setAnalyseCategory] = useState(props.analyse.analyse_status);
  const [price, setPrice] = useState(props.analyse.price); 
  const [comment, setComment] = useState(props.analyse.comment);
  const [analyseName, setAnalyseName] = useState(props.analyse.analyse_name);
  const [datePrevu, setDatePrevu] = useState(props.analyse.date_prevu || (new Date()).toISOString().substr(0,10));
  const [dateRealised, setDateRealised] = useState(props.analyse.date_rdv || (new Date()).toISOString().substr(0,10));
  const [interpretationLabo, setInterpretationLabo] = useState(props.analyse.interpretation_labo);
  const [interpretationDr, setInterpretationDr] = useState(props.analyse.interpretation_medecin);
  const [fileList, setFileList] = useState(props.analyse.attachements);
  const [ordonnanceList, setOrdonnanceList] = useState([]);
  const [ordonnance, setOrdonnance] = useState([]);
  const [laboratory, setLaboratory] = useState(props.analyse.laboratory);
  const [results, setResults] = useState(props.analyse.results);

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
    if (props.analyse._id) {
      const dataToSend = {
        analyse_name: analyseName,
        laboratory: laboratory,
        date_prevu: datePrevu,
        date_rdv: dateRealised,
        price: price,
        interpretation_medecin: interpretationDr,
        interpretation_labo: interpretationLabo,
        comment:comment,
        analyse_status: status,
        _id: props.analyse._id,
        results,
      }
      const url = `${API_URL}/analyses/benif/${props.benif}`
      axiosInstance.post(url, dataToSend).then(response => response.data)
      .then((result) => { 
        const analyseId = result._id;
        sendFiles(analyseId);
      });
    } else {
      const dataToSend = {
        ordonnance: ordonnance,
        analyse_name: analyseName,
        laboratory: laboratory,
        date_prevu: datePrevu,
        date_rdv: dateRealised,
        price: price,
        interpretation_medecin: interpretationDr,
        interpretation_labo: interpretationLabo,
        analyse_status: status,
        comment:comment,
        results,
      }
      const url = `${API_URL}/analyses/benif/${props.benif}`
      axiosInstance.post(url, dataToSend).then(response => response.data)
      .then((result) => { 
        const analyseId = result._id;
        sendFiles(analyseId);
      }
      );
    }
  }

  function sendFiles(analyseId) {
    if (fileList) {
      if (fileList && fileList.length > 0 && fileList[0]._id) {closeModal();}
      else if(fileList.length == 0) {closeModal();}
      else {
        const formData = new FormData(); 
        for (var x = 0; x < fileList.length; x++) {
          formData.append("file", fileList[x], fileList[x].name);
        }
        const url = `${API_URL}/analyses/${analyseId}/benif/${props.benif}/upload/${fileList[0].name}`
        axiosInstance.post(url, formData).then(response => response.data)
        .then((result) => { 
          closeModal();
        });
      }
    } else {
      closeModal();
    }
    
  }
  function deleteFile(e, file, index) {
    setFileList(fileList.filter(item => item.name !== file.name));
  }
  function uploadFile(event) {
    const file = event[0];
    if (file.size > 5000000) {
      toast.error('fichier trés large');
      return 
    }
    const array = []
    for (let i=0; i<event.length; i++) {
      array.push(event[i])
    }
    setFileList(array);
  }

  function handleChangeStatus(event) {
    setStatus(event.target.value);
  };
  
  function addAnalyseResult() {
    console.log('analyseConfig[analyseCategory] ', analyseConfig[analyseCategory])
    const newElement = JSON.parse(JSON.stringify(analyseConfig[analyseCategory]))
    console.log('newElement ', newElement)
    setResults(oldArray => {
      if (oldArray && oldArray.length>0)
        return [...oldArray, newElement]

      return [newElement]
    });
  }
  function handleChangeAnalyseCategory(event) {
    setAnalyseCategory(event.target.value)
  };
  function handleValueExam(value, indexCateg, indexSubCateg, indexExam) {
    const res = results;
    res[indexCateg].subCategories[indexSubCateg].results[indexExam].value = value;
    setResults(res)
  }
  function removeSubCateg(index) {
    const resultTemp = results;
    resultTemp.splice(index, 1);
    setResults([])
    setTimeout(() => {
      setResults(resultTemp)
    }, 100);
  }
  function renderAnalyseResult(results) {
    return(
      <div>
        {
         ( results && results.length > 0)? 
          <div>
            {
            results.map((category, indexCateg) => (
              renderSubCategory(category, indexCateg)
            ))} 
          </div>  : null
        }
      </div>
    )
  }
  function renderSubCategory(category, indexCateg) {
    return (
          <div key={indexCateg}> 
                <div className="modal__category-title"> {category.category}
                <FaTrash  className="modal__category-icon" onClick={() => removeSubCateg(indexCateg)}></FaTrash>
                </div>
                {
                  category.subCategories.map((subgategory, indexSubCateg) => (
                    <div key= {indexSubCateg}> 
                      <div> {subgategory.subCategoryName}</div>
                      {
                        subgategory.results.map((exam, indexExam) => (
                          <div className="modal__subGategory-line" key={indexExam}> 
                            <div className="margin-text"> {exam.label}</div>
                            <TextField  label={exam.code} type="text" value={exam.value}
                              onChange={event => handleValueExam(event.target.value, indexCateg, indexSubCateg, indexExam)}
                              InputLabelProps={{ shrink: true }} />
                            <div className="margin-text"> ({exam.unit})</div>
                            
                          </div>
                        ))} 
                    </div>
                  ))} 
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
              !props.analyse._id ? 'Nouveau analyse' : `Mise à jour d'analyse`
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
          { props.analyse._id ? 
            <div className={'select__container_fix'}> 
            { props.analyse.ordonnance.ordonnance_name}</div>
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

            <TextField margin="normal" fullWidth label="Nom analyse*" name="lastName" value={analyseName} onChange={event => setAnalyseName(event.target.value)} />
            <TextField margin="normal" fullWidth label="Laboratoire*" name="lastName" value={laboratory} onChange={event => setLaboratory(event.target.value)} /> 
            {
            status !== 'Done' ?
            <TextField id="date" label="Date prevu*" type="date" value={datePrevu}
              onChange={event => setDatePrevu(event.target.value)}
              InputLabelProps={{ shrink: true }} /> 
              : null }
            
            <TextField margin="normal" fullWidth label="prix" name="price"  value={price} onChange={event => setPrice(event.target.value)} />
            <TextField margin="normal" fullWidth label="Commentaire" name="firstName"  value={comment} onChange={event => setComment(event.target.value)} />
            
            { props.analyse.ordonnance ? 
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
            <div className="margin-date">
              <TextField id="date" label="Date realisée*" type="date" value={dateRealised}
              onChange={event => setDateRealised(event.target.value)}
              InputLabelProps={{ shrink: true }} />
            </div>
            
              : null }
            {
            status === 'Done' ?
              
            <div className="result_container">
            <div className="result_container--title"> Resultat</div>
            <div className="result_container--body">
           
            <TextField margin="normal" fullWidth label="interpretation Labo" name="firstName"  value={interpretationLabo} onChange={event => setInterpretationLabo(event.target.value)} />
            <TextField margin="normal" fullWidth label="interpretation Doc" name="firstName"  value={interpretationDr} onChange={event => setInterpretationDr(event.target.value)} />
            {renderAnalyseResult(results)}
            Selection category: <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={analyseCategory}
              onChange={handleChangeAnalyseCategory}
            >
          {analyseConfig.map((name, index) => (
              <MenuItem key={name.category} value={index}>
                {name.category}
              </MenuItem>
            ))}
        </Select>  
            <div className="btn-action" onClick={(e) => addAnalyseResult()}> <FaCalendarPlus>  </FaCalendarPlus>Add analyse</div>

            {
            (fileList && fileList.length > 0) ?
              (fileList).map((item, index) => {
                return (<div key={index}> {item.name} <FaTrash onClick={(e) => deleteFile(e, item, index)}></FaTrash></div>);
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

          </div> : null
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
              disabled={!ordonnance || !analyseName || !laboratory || !datePrevu || loading}
              > 
              {loading && <CircularProgress size={14} />} {
              !props.analyse._id ? 'Ajouter' : 'Mise à jour'
              } </Button>

          </div> 
        </Modal>
  );
}