import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import { FaAngleDown, FaArrowLeft, FaCalendarPlus} from 'react-icons/fa';
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";
import WarningMessage from '../../../shared/component/WarningMessage'
import axiosInstance from '../../../services/httpInterceptor' 
import { useHistory } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "./mesConsultations.scss";
import HeaderComponent from '../header/headerComponent'
import ConsultationAdd from './ConsultationAdd'
import DisplayFile from '../commun/displayFile'
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
}));

const StatusMapping = {
  0: 'Done',
  1: 'Later',
}

export default function MesConsultations() {

  const [isFileOpen, setIsFileOpen] = useState(false);
  const [fileJson, setFileJson] = useState('');
  let { id } = useParams();
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const history = useHistory()
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [filter, setFilter] = React.useState('Generalist');
  const [consultationList, setConsultationList] = React.useState([]);
  const [displayedConsultationList, setdisplayedConsultationList] = React.useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [consultation, setConsultation] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect( () => {
    const url = `${API_URL}/benificiares/${id}` ;
    axiosInstance.get(url).then(response => response.data)
    .then((result) => { 
      const benif = result[0];
      setFirstName(benif.first_name)
      setLastName(benif.last_name)
    });
    refreshList();
  }, []);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    const filteredData = consultationList.filter(data => 
      data.consultation_status === StatusMapping[newValue] && data.medecin.speciality === filter)
      setdisplayedConsultationList(filteredData)
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleChangeFilter = (panel) => (event, isExpanded) => {
    setFilter(panel);
    const filteredData = consultationList.filter(data => 
      data.consultation_status === StatusMapping[value] && data.medecin.speciality === panel)
      setdisplayedConsultationList(filteredData)
  };

  function goBack() {
    navigateTo('/patient/user/' + id)
  }
  function navigateTo (url) {
    history.push(url);
  }

  function addConsultation() {
    setConsultation({})
    setIsOpen(true)
  }

  function editConsultation(consultation) {
    setConsultation(consultation)
    setIsOpen(true)
  }

  function deleteConsultation(consultation) {
    setConsultation(consultation)
    setIsOpenWarning(true)
  }
  
  function refreshList () {
    const url = `${API_URL}/consultation/benif/${id}`;
    axiosInstance.get(url).then(response => response.data)
    .then((result) => {
        setConsultationList(result);
        const filteredData = result.filter(data => 
        data.consultation_status === StatusMapping[value] && data.medecin.speciality === filter)
        setdisplayedConsultationList(filteredData)
      }
    );
  }
  function onChange(value) { 
    setIsOpen(false) 
    refreshList();
  }
  function onChangeFile(value) { 
    setIsFileOpen(false) 
  }
  function onConfirm(value) { 
    setIsOpenWarning(false);
    const url = `${API_URL}/consultation/${consultation._id}`;
    axiosInstance.delete(url).then(response => response.data)
    .then((result) => {
      refreshList()
      }
    );
    refreshList()
  }
  function onCloseWarning(value) { 
    setIsOpenWarning(false)
  }

  function downloadFile(file) {
    setFileJson(file)
    setIsFileOpen(true)
  }
  return (
    <div className="container-wrapper">
      <HeaderComponent></HeaderComponent>
      {
        isOpen ? 
        <ConsultationAdd
          onChange={onChange}
          isOpen={isOpen}
          consultation= {consultation}
          benif= {id}
          ></ConsultationAdd>
      : null
      }
      {
        isFileOpen ? 
        <DisplayFile
          onChangeFile={onChangeFile}
          isOpen={isFileOpen}
          fileJson= {fileJson}
          benif= {id}
          ></DisplayFile>
      : null
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
          Mes Consultations 
        </div>
        <div className="container-subtitle">
          liste des Consultations pour  <b>Mr {firstName} {lastName}  </b>planifiés
        </div>
      

        <div className="container-right-actions">
          <div className="btn-action"> <FaCalendarPlus>  </FaCalendarPlus>Prendre RDV</div>
          <div className="btn-action" onClick={(e) => addConsultation()}> <FaCalendarPlus>  </FaCalendarPlus>Add Consultation</div>
        </div>
        <div className="container-filters-top">
          <div className={filter === 'Generalist' ? "container-filter-top-actif" : "container-filter-top" }
          onClick={handleChangeFilter('Generalist')}>Généraliste</div>
          <div className={filter === 'Specialist' ? "container-filter-top-actif" : "container-filter-top" }
          onClick={handleChangeFilter('Specialist')}>Specialiste</div>
          <div className={filter === 'Dentiste' ? "container-filter-top-actif" : "container-filter-top" }
          onClick={handleChangeFilter('Dentiste')}>Dentiste</div>
        </div>


        <Tabs
          value={value}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Terminé" />
          <Tab label="A venir" />
        </Tabs>
      <div className={classes.root}>
        {
          displayedConsultationList.map((consultation, index) => {
            return (
              <Accordion expanded={expanded === consultation._id} onChange={handleChange(consultation._id)}>
                <AccordionSummary
                  expandIcon={<FaAngleDown />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className='accordion__title'>{consultation.date_rdv}</Typography>
                  <Typography className='accordion__subtitle'>{consultation.medecin.speciality}: {consultation.medecin.first_name} {consultation.medecin.last_name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <div className='all_width'>
        
                <Typography className="padding2">
                {consultation.consultation_desc}
                  </Typography> 
                  <div  className="lines">
                    <div  className="lines__line"> <div className="lines__title">nom</div><div className="lines__desc">{consultation.consultation_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Docteur</div><div className="lines__desc">{consultation.medecin.first_name} {consultation.medecin.last_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">date de prise de RDV</div><div className="lines__desc">{consultation.date_prise_rdv.split('T')[0]}</div></div>
                    {value === 1 ? <div  className="lines__line"> <div className="lines__title">date de RDV</div><div className="lines__desc">{consultation.date_rdv}  {consultation.time_rdv}</div></div> : null}
                    {value === 0 ? <div  className="lines__line"> <div className="lines__title">date de consultation</div><div className="lines__desc">{consultation.date_consultation}</div></div> : null}
                    <div  className="lines__line"> <div className="lines__title">prix</div><div className="lines__desc">{consultation.price}</div></div>
                    <div  className="lines__line"> <div className="lines__title">commentaire medecin</div><textarea className="lines__desc" value={consultation.commentaire_medecin}></textarea></div>
                    <div  className="lines__line"> <div className="lines__title">commentaire</div><textarea className="lines__desc"value={consultation.commentaire}></textarea></div>
                    
                    <div  className="lines__line"> 
                      <div className="lines__title">attachement</div>
                      {
                          consultation.attachements.map((exam, index) => {
                            return ( <div className="download-file lines__desc"  onClick={(e) => downloadFile(exam)}> Télécharger la  consultation </div> )
                          })
                        }
                    </div>

                    <div  className="lines__footer"> 
                      <div className="lines__footer-action" onClick={(e) => deleteConsultation(consultation)}> <FaCalendarPlus>  </FaCalendarPlus>Supprimer</div>
                      <div className="lines__footer-action" onClick={(e) => editConsultation(consultation)}> <FaCalendarPlus>  </FaCalendarPlus>Modifier</div>
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