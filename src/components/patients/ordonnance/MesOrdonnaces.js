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
import { FaCheckCircle, FaRegHourglass} from 'react-icons/fa';
import axiosInstance from '../../../services/httpInterceptor' 
import { useHistory } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import OrdonnaceAdd from './OrdonnaceAdd'
import "./mesOrdonnaces.scss";
import HeaderComponent from '../header/headerComponent'
import WarningMessage from '../../../shared/component/WarningMessage'
import DisplayFile from '../commun/displayFile'
const API_URL = process.env.REACT_APP_URL;

const StatusMapping = {
  Later: 'A venir',
  InProgress: 'En cours',
  Done: 'Terminé',
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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

export default function MesOrdonnaces() {
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [fileJson, setFileJson] = useState('');
  let { id } = useParams();
  const history = useHistory()
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [filter, setFilter] = React.useState('Generalist');
  const [ordonnanceList, setOrdonnanceList] = React.useState([]);

  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [displayedOrdonannceList, setdisplayedOrdonannceList] = React.useState([]);
  const [ordonnance, setOrdonnance] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  useEffect( () => {
    const url = `${API_URL}/benificiares/${id}?patient=${localStorage.patient}` ;
    axiosInstance.get(url).then(response => response.data)
    .then((result) => { 
      const benif = result[0];
      setFirstName(benif.first_name)
      setLastName(benif.last_name)
    }
    );
    refreshList();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleChangeFilter = (panel) => (event, isExpanded) => {
    setFilter(panel);
    const filteredData = ordonnanceList.filter(data => 
      data.consultation.medecin.speciality === panel)
      setdisplayedOrdonannceList(filteredData)
  };

  function goBack() {
    navigateTo('/patient/user/' + id)
  }
  function navigateTo (url) {
    history.push(url);
  }

  function refreshList () {
    const url = `${API_URL}/ordonnances/benif/${id}?patient=${localStorage.patient}`;
    axiosInstance.get(url).then(response => response.data)
    .then((result) => {
        setOrdonnanceList(result);
        const filteredData = result.filter(data => data.consultation.medecin.speciality === filter)
          setdisplayedOrdonannceList(filteredData)

      }
    );
  }
  function addOrdonnance() {
    setOrdonnance({})
    setIsOpen(true)
  }
  function onChange(value) { 
    setIsOpen(false) 
    refreshList();
  }

  function onConfirm(value) { 
    console.log('ordonnance ', ordonnance)
    setIsOpenWarning(false);
    const url = `${API_URL}/ordonnances/${ordonnance._id}?patient=${localStorage.patient}`;
    axiosInstance.delete(url).then(response => response.data)
    .then((result) => {
      refreshList()
      }
    );
    refreshList()
  }
  function supprimerOrdonnance(ordonnance) {
    setOrdonnance(ordonnance)
    setIsOpenWarning(true)
  }
  function onCloseWarning(value) { 
    setIsOpenWarning(false)
  }

  function editOrdonnance(ordonnance) {
    setOrdonnance(ordonnance)
    setIsOpen(true)
  }
  function downloadFile(file) {
    setFileJson(file)
    setIsFileOpen(true)
  }
  function onChangeFile(value) { 
    setIsFileOpen(false) 
  }
  return (
    <div className="container-wrapper">
      <HeaderComponent></HeaderComponent>

      {
        isOpen ? 
        <OrdonnaceAdd
          onChange={onChange}
          isOpen={isOpen}
          ordonnance= {ordonnance}
          benif= {id}
          ></OrdonnaceAdd>
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
          Mes Ordonnances
        </div>
        <div className="container-subtitle">
          liste des ordonnance pour  {firstName} {lastName}  planifiés
        </div>
      

        <div className="container-right-actions">
          <div className="btn-action" onClick={(e) => addOrdonnance()}> <FaCalendarPlus>  </FaCalendarPlus>Add Ordonnance</div>
        </div>
        <div className="container-filters-top">
          <div className={filter === 'Generalist' ? "container-filter-top-actif" : "container-filter-top" }
          onClick={handleChangeFilter('Generalist')}>Généraliste</div>
          <div className={filter === 'Specialist' ? "container-filter-top-actif" : "container-filter-top" }
          onClick={handleChangeFilter('Specialist')}>Specialiste</div>
          <div className={filter === 'Dentiste' ? "container-filter-top-actif" : "container-filter-top" }
          onClick={handleChangeFilter('Dentiste')}>Dentiste</div>
        </div>


      <div className={classes.root}>
        {
          displayedOrdonannceList.map((ordonnance, index) => {
            return (
              <Accordion expanded={expanded === ordonnance._id} onChange={handleChange(ordonnance._id)}>
                <AccordionSummary
                  expandIcon={<FaAngleDown />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className='accordion__title'>{ordonnance.date_rdv}</Typography>
                  <Typography className='accordion__subtitle'>{ordonnance.consultation.medecin.speciality}: {ordonnance.consultation.medecin.last_name + ' ' + ordonnance.consultation.medecin.first_name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <div className='all_width'>
                { ordonnance.ordonnance_status === 'Done' &&
                <Typography className="padding2 right-status status-done">
                  {StatusMapping[ordonnance.ordonnance_status]}<FaCheckCircle></FaCheckCircle>
                </Typography> }
                {ordonnance.ordonnance_status === 'InProgress' && <Typography className="padding2 right-status status-progress">
                  {StatusMapping[ordonnance.ordonnance_status]}<FaRegHourglass></FaRegHourglass>
                </Typography> }
                  <div  className="lines">
                    <div  className="lines__line"> <div className="lines__title">nom</div><div className="lines__desc">{ordonnance.ordonnance_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Docteur</div><div className="lines__desc-clickable">{ordonnance.consultation.medecin.last_name + ' ' + ordonnance.consultation.medecin.first_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Consultation</div><div className="lines__desc-clickable">{ordonnance.consultation.consultation_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">date de RDV</div><div className="lines__desc">{ordonnance.date_rdv}</div></div>
                    <div  className="lines__line"> <div className="lines__title">prix</div><div className="lines__desc">{ordonnance.price}</div></div>
                    <div  className="lines__line"> <div className="lines__title">commentaire medecin</div><textarea className="lines__desc" value={ordonnance.comment_medecin}></textarea></div>
                    <div  className="lines__line"> <div className="lines__title">commentaire patient</div><textarea className="lines__desc" value={ordonnance.comment}></textarea></div>
                    <div  className="lines__line"> <div className="lines__title">document</div> 
                    <div>
                      {ordonnance.attachements.map(item => {
                        return (<div className="download-file" onClick={(e) => downloadFile(item)}> Télécharger l'ordonnance </div>);
                      })}
                    </div>
                    </div>
                    <div  className="lines__footer"> 
                      <div className="lines__footer-action" onClick={(e) => supprimerOrdonnance(ordonnance)}> <FaCalendarPlus>  </FaCalendarPlus>Supprimer</div>
                      <div className="lines__footer-action" onClick={(e) => editOrdonnance(ordonnance)}> <FaCalendarPlus>  </FaCalendarPlus>Modifier</div>
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