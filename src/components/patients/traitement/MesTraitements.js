import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import { FaAngleDown, FaArrowLeft, FaCalendarPlus, FaPoll} from 'react-icons/fa';
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "./mesTraitements.scss";
import HeaderComponent from '../header/headerComponent'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import WarningMessage from '../../../shared/component/WarningMessage'

import axiosInstance from '../../../services/httpInterceptor' 
import TraitementAdd from './TraitementAdd'
// import MesGraph from './MesGraph';

const API_URL = process.env.REACT_APP_URL;
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '2%',
    background: '#d8edff'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  table:{
    width: '90%',
    margin: 'auto',
    background: '#f0f8fe'
  }
}));

const TraitementStatusMapping = {
  0: 'Done',
  1: 'InProgress',
  2: 'Later',
}
export default function MesTraitements() {
  let { id } = useParams();
  const history = useHistory()
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [consultationList, setConsultationList] = React.useState([]);
  const [displayedConsultationList, setdisplayedConsultationList] = React.useState([]);

  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [traitement, setTraitement] = useState({});
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect( () => {
    const url = `${API_URL}/benificiares/${id}` ;
    axiosInstance.get(url).then(response => response.data)
    .then((result) => { 
      const benif = result[0];
      setFirstName(benif.first_name)
      setLastName(benif.last_name)
    }
    );
    refreshList();
  }, []);


  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    const filteredData = consultationList.filter(data => 
      data.traitement_status === TraitementStatusMapping[newValue])
      setdisplayedConsultationList(filteredData)
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  function goBack() {
    navigateTo('/patient/user/' + id)
  }
  function navigateTo (url) {
    history.push(url);
  }

  function openGraph(e, benif) {
    setIsOpen(true)
  }
  function onChange(value) { 
    console.log('value')
    setIsOpen(false) 
  }
  function refreshList () {
    const url = `${API_URL}/traitements/benif/${id}`;
    axiosInstance.get(url).then(response => response.data)
    .then((result) => {
      setConsultationList(result);
      const filteredData = result.filter(data => 
        data.traitement_status === TraitementStatusMapping[value])
        setdisplayedConsultationList(filteredData)
      }
    );
  }
  function addTraitement() {
    setTraitement({})
    setIsOpenAdd(true)
  }
  function onChangeAdd(value) { 
    setIsOpenAdd(false) 
    refreshList();
  }
  function supprimerTraitement(traitement) {
    setTraitement(traitement)
    setIsOpenWarning(true)
  }
  function editTraitement(traitement) {
    setTraitement(traitement)
    setIsOpenAdd(true)
  }
  function downloadFile(file) {
    console.log('file ', file)
    const url = `${API_URL}/file/download`;
    axiosInstance.post(url, file).then(response => response.data)
    .then((result) => {  }
    );
  }
  function onCloseWarning(value) { 
    setIsOpenWarning(false)
  }
  function onConfirm(value) { 
    setIsOpenWarning(false);
    const url = `${API_URL}/traitements/${traitement._id}`;
    axiosInstance.delete(url).then(response => response.data)
    .then((result) => {
      refreshList()
      }
    );
    refreshList()
  }
  return (
    <div className="container-wrapper">
      <HeaderComponent></HeaderComponent>
      {
        isOpenAdd ? 
        <TraitementAdd
          isOpen={isOpenAdd}
          onChange={onChangeAdd}
          traitement= {traitement}
          benif= {id}
          ></TraitementAdd>
      : null
      }
      {
      //   isOpen ? 
      //   <MesGraph
      //     isOpen={isOpen}
      //     onChange={onChange}
      //     ></MesGraph>
      // : null
      }
      <WarningMessage 
              onCloseWarning={onCloseWarning}
              isOpenWarning={isOpenWarning}
              onConfirm={onConfirm}>
          </WarningMessage>
      <div className="container-body">
      <div className="container-return-action"  onClick={(e) => goBack()}>
        <FaArrowLeft>  </FaArrowLeft> retourner à mon tableau de bord
      </div>
        <div className="container-title">
          Mes Traitements
        </div>
        <div className="container-subtitle">
          liste des Traitements pour Mr {firstName} {lastName}  planifiés
        </div>
      

        <div className="container-right-actions">
        <div className="btn-action" onClick={(e) => addTraitement()}> <FaCalendarPlus>  </FaCalendarPlus>Add traitement</div>
        </div>
        <Tabs
          value={value}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Terminé" />
          <Tab label="En Cours" />
          <Tab label="A venir" />
        </Tabs>
      <div className={classes.root}>
        {
          displayedConsultationList.map((traitement, index) => {
            return (
              <Accordion expanded={expanded === traitement._id} onChange={handleChange(traitement._id)}>
                <AccordionSummary
                  expandIcon={<FaAngleDown />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className='accordion__title'>{traitement.traitement_name}</Typography>
                  <Typography className='accordion__subtitle'>{traitement.start_date.split('T')[0]} {traitement.end_date.split('T')[0]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <div className='all_width'>
        
                <Typography className="padding2">
                {traitement.note}
                  </Typography> 
                  <div  className="lines">
                    <div  className="lines__line"> <div className="lines__title">nom du traitement</div><div className="lines__desc">{traitement.traitement_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">pathologie</div><div className="lines__desc">{traitement.pathologie}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Ordonnance</div><div className="lines__desc">{traitement.ordonnance.ordonnance_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Date Ordonnance</div><div className="lines__desc">{traitement.ordonnance.date_rdv}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Medecin Presc.</div><div className="lines__desc">{traitement.ordonnance.consultation ? traitement.ordonnance.consultation.medecin.last_name: ''} {traitement.ordonnance.consultation ? traitement.ordonnance.consultation.medecin.first_name: ''}</div></div>
                    <div  className="lines__line"> <div className="lines__title">date prise RDV</div><div className="lines__desc">{traitement.date_prise_rdv.split('T')[0]}</div></div>
  
                    <div  className="lines__line"> <div className="lines__title">Date debut</div><div className="lines__desc">{traitement.start_date}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Date fin</div><textarea className="lines__desc" value={traitement.end_date}></textarea></div>
                    <div  className="lines__line"> <div className="lines__title">Durée</div><textarea className="lines__desc" value={traitement.traitement_duration}></textarea></div>
                    <div  className="lines__line"> <div className="lines__title">Durée restante</div><textarea className="lines__desc" value={traitement.rest_duration}></textarea></div>
                    <div  className="lines__line"> <div className="lines__title">commentaire</div><textarea className="lines__desc" value={traitement.comment}></textarea></div>
                    {
                    traitement.attachements.length > 0 ?
                    <div className="result__container" >
                    <div className="result__title"> Documents </div>
                      <div>
                      <div className="result__exam-name"> attachement </div>
                        {
                          traitement.attachements.map((exam, index) => {
                            return ( <div className="result__exam-name-comment"  onClick={(e) => downloadFile(exam)}> {exam.name} </div> )
                          })
                        }
                      
                      </div>

                    </div>
                     : null
                    }
                    {
                    <div className="result__container" >

                    <div className="result__title"> Sous traitements </div>
               
                    <div  className="lines__line"> <div className="lines__title">comment personnel traitment</div><textarea className="lines__desc" value={traitement.comment_personnel_traitment}></textarea></div>
                    <div  className="lines__line"> <div className="lines__title">interpretation dr</div><textarea className="lines__desc" value={traitement.interpretation_dr}></textarea></div>
                    
                    { traitement.subTraitments ? traitement.subTraitments.map((subTraitment, index) => { 
                      return (
                         <div> 
                          <div  className="lines__line"> <div className="lines__title">Sous traitement {index + 1}</div><div className="lines__title">{subTraitment.sub_traitement_type} {subTraitment.sub_traitement_name}</div></div>
                          <div  className="lines__line"> <div className="lines__title">Posologie </div><div className="lines__desc">{subTraitment.sub_traitement_posologie}</div></div>
                          <div  className="lines__line"> <div className="lines__title">Date debut </div><div className="lines__desc">{subTraitment.sub_traitement_start_date}</div></div>
                          <div  className="lines__line"> <div className="lines__title">Date fin </div><div className="lines__desc">{subTraitment.sub_traitement_end_date}</div></div>
                          <div  className="lines__line"> <div className="lines__title">Nombre de fois par jours </div><div className="lines__desc">{subTraitment.sub_traitement_time_per_day}</div></div>
                          <div  className="lines__line"> <div className="lines__title">durée passée </div><div className="lines__desc">{subTraitment.sub_traitement_duration_passed}</div></div>
                          <div  className="lines__line"> <div className="lines__title">Durée reste</div><div className="lines__desc">{subTraitment.sub_traitement_duration_reste}</div></div>
                           
                             <div> 
                              <Table className={classes.table} aria-label="simple table"> 
                              <TableHead> 
                                <TableRow> 
                                  <TableCell>Date prise</TableCell> 
                                  <TableCell align="right">moment</TableCell> 
                                  <TableCell align="right">valeur</TableCell> 
                              </TableRow> 
                              </TableHead> 
                              { subTraitment.result.map((row, index) => { 
                             return ( 
                              <TableBody>
                                <TableRow key={row.name}> 
                                  <TableCell align="">{row.date_prise}</TableCell> 
                                  <TableCell align="right">{row.moment}</TableCell> 
                                  <TableCell align="right">{row.value}</TableCell> 
                                </TableRow>
                              </TableBody> 
                              )})}  
                                 </Table>
                              </div> 
                          </div> )}) : null}
                    </div>
                    }
                    <div  className="lines__footer"> 
                      <div className="lines__footer-action" onClick={(e) => supprimerTraitement(traitement)}> <FaCalendarPlus>  </FaCalendarPlus>Supprimer</div>
                      <div className="lines__footer-action" onClick={(e) => editTraitement(traitement)}> <FaCalendarPlus>  </FaCalendarPlus>Modifier</div>
                    </div>
                  </div>
                </div>
                </AccordionDetails>
              </Accordion>
            
            )
          })
        }
    </div>
      </div>
    </div>
  );
}