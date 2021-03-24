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
import axiosInstance from '../../../services/httpInterceptor' 
import { useHistory } from "react-router-dom";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import OrdonnaceAdd from './OrdonnaceAdd'
import "./mesOrdonnaces.scss";
import HeaderComponent from '../header/headerComponent'
const API_URL = process.env.REACT_APP_URL;

const StatusMapping = {
  0: 'Done',
  1: 'InProgress',
  2: 'Later',
}
const mockData =  [
  {
    id: 11,
    type: 'Generalist',
    ordonnance: 'Cons 22339-49403-439430',
    price: '22$',
    status: 'InProgress',
    date: '11/02/2020',
    doctor_name: 'LAMRANI kamal',
    note: `Note medecin: cette ordonnance mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV merci d'appeler le numero 09 993 33 9434`,
    consultation_name: 'CONS 34424',
    consultation_comment: 'comment ...',
    consultation_date: '11/02/2020',
    consultation_RDV: '11/02/2020',
    attachement: ['ordonnance-dec-ELYAMANI.pdf', 'photo_.jpeg', 'ordonnance-Medicament.pdf'],
  },
  {
    id: 12,
    type: 'Generalist',
    ordonnance: 'Cons 22339-49403-439430',
    price: '45$',
    status: 'InProgress',
    date: '11/02/2020',
    doctor_name: 'LAMRANI kamal',
    note: `Note medecin: cette ordonnance mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV merci d'appeler le numero 09 993 33 9434`,
    consultation_name: 'CONS 34424',
    consultation_comment: 'comment ...',
    consultation_date: '11/02/2020',
    consultation_RDV: '11/02/2020',
    attachement: ['ordonnance-dec-ELYAMANI.pdf', 'photo_.jpeg', 'ordonnance-Medicament.pdf'],
  },
  {
    id: 13,
    type: 'Generalist',
    ordonnance: 'Cons 22339-49403-439430',
    price: '45$',
    status: 'Later',
    date: '11/02/2020',
    doctor_name: 'LAMRANI kamal',
    note: `Note medecin: cette ordonnance mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV merci d'appeler le numero 09 993 33 9434`,
    consultation_name: 'CONS 34424',
    consultation_comment: 'comment ...',
    consultation_date: '11/02/2020',
    consultation_RDV: '11/02/2020',
    attachement: ['ordonnance-dec-ELYAMANI.pdf', 'photo_.jpeg', 'ordonnance-Medicament.pdf'],
  },
  {
    id: 14,
    type: 'Generalist',
    ordonnance: 'Cons 22339-49403-439430',
    price: '45$',
    status: 'Done',
    date: '11/02/2020',
    doctor_name: 'LAMRANI kamal',
    note: `Note medecin: cette ordonnance mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV merci d'appeler le numero 09 993 33 9434`,
    consultation_name: 'CONS 34424',
    consultation_comment: 'comment ...',
    consultation_date: '11/02/2020',
    consultation_RDV: '11/02/2020',
    attachement: ['ordonnance-dec-ELYAMANI.pdf', 'photo_.jpeg', 'ordonnance-Medicament.pdf'],
  },
  {
    id: 15,
    type: 'Specialist',
    ordonnance: 'Cons 22339-49403-439430',
    price: '45$',
    status: 'InProgress',
    date: '11/02/2020',
    doctor_name: 'LAMRANI kamal',
    note: `Note medecin: cette ordonnance mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV merci d'appeler le numero 09 993 33 9434`,
    consultation_name: 'CONS 34424',
    consultation_comment: 'comment ...',
    consultation_date: '11/02/2020',
    consultation_RDV: '11/02/2020',
    attachement: ['ordonnance-dec-ELYAMANI.pdf', 'photo_.jpeg', 'ordonnance-Medicament.pdf'],
  },
  {
    id: 16,
    type: 'Specialist',
    ordonnance: 'Cons 22339-49403-439430',
    price: '45$',
    status: 'Later',
    date: '11/02/2020',
    doctor_name: 'LAMRANI kamal',
    note: `Note medecin: cette ordonnance mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV merci d'appeler le numero 09 993 33 9434`,
    consultation_name: 'CONS 34424',
    consultation_comment: 'comment ...',
    consultation_date: '11/02/2020',
    consultation_RDV: '11/02/2020',
    attachement: ['ordonnance-dec-ELYAMANI.pdf', 'photo_.jpeg', 'ordonnance-Medicament.pdf'],
  },
  {
    id: 17,
    type: 'Specialist',
    ordonnance: 'Cons 22339-49403-439430',
    price: '45$',
    status: 'Done',
    date: '11/02/2020',
    doctor_name: 'LAMRANI kamal',
    note: `Note medecin: cette ordonnance mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV merci d'appeler le numero 09 993 33 9434`,
    consultation_name: 'CONS 34424',
    consultation_comment: 'comment ...',
    consultation_date: '11/02/2020',
    consultation_RDV: '11/02/2020',
    attachement: ['ordonnance-dec-ELYAMANI.pdf', 'photo_.jpeg', 'ordonnance-Medicament.pdf'],
  }
]
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
  let { id } = useParams();
  const history = useHistory()
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [filter, setFilter] = React.useState('Generalist');
  const [ordonnanceList, setConsultationList] = React.useState([]);

  const [ordonnance, setOrdonnance] = useState({});
  const [isOpen, setIsOpen] = useState(false);
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
  }, []);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    const filteredData = mockData.filter(data => 
      data.status === StatusMapping[newValue] && data.type === filter)
    setConsultationList(filteredData)
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleChangeFilter = (panel) => (event, isExpanded) => {
    setFilter(panel);
    const filteredData = mockData.filter(data => 
      data.status === StatusMapping[value] && data.type === panel)
    setConsultationList(filteredData)
  };

  function goBack() {
    navigateTo('/patient/user/' + id)
  }
  function navigateTo (url) {
    history.push(url);
  }

  function refreshList () {
    const url = `${API_URL}/benificiares/${id}/ordonnances`;
    axiosInstance.get(url).then(response => response.data)
    .then((result) => {
      setConsultationList(result)
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
  return (
    <div className="container-wrapper">
      <HeaderComponent></HeaderComponent>

      {
        isOpen ? 
        <OrdonnaceAdd
          onChange={onChange}
          isOpen={isOpen}
          benif= {ordonnance}
          ></OrdonnaceAdd>
      : null
      }
      <div className="container-body">
      <div className="container-return-action"  onClick={(e) => goBack()}>
        <FaArrowLeft>  </FaArrowLeft> retourner à mon tableau de bord
      </div>
        <div className="container-title">
          Mes Ordonnances
        </div>
        <div className="container-subtitle">
          liste des ordonnance pour Mr {firstName} {lastName}  planifiés
        </div>
      

        <div className="container-right-actions">
          <div className="btn-action" onClick={(e) => addOrdonnance()}> <FaCalendarPlus>  </FaCalendarPlus>Add Ordonnance</div>
        </div>
        <div className="container-filters-top">
          <div className={filter === 'Generalist' ? "container-filter-top-actif" : "container-filter-top" }
          onClick={handleChangeFilter('Generalist')}>Généraliste</div>
          <div className={filter === 'Specialist' ? "container-filter-top-actif" : "container-filter-top" }
          onClick={handleChangeFilter('Specialist')}>Specialiste</div>
          <div className={filter === 'Radiologue' ? "container-filter-top-actif" : "container-filter-top" }
          onClick={handleChangeFilter('Radiologue')}>Radiologue</div>
          <div className={filter === 'Dentiste' ? "container-filter-top-actif" : "container-filter-top" }
          onClick={handleChangeFilter('Dentiste')}>Dentiste</div>
          <div className={filter === 'Opticien' ? "container-filter-top-actif" : "container-filter-top" }
          onClick={handleChangeFilter('Opticien')}>Opticien</div>
          <div className={filter === 'Pediatre' ? "container-filter-top-actif" : "container-filter-top" }
          onClick={handleChangeFilter('Pediatre')}>Opticien</div>
          <div className={filter === 'Geneco' ? "container-filter-top-actif" : "container-filter-top" }
          onClick={handleChangeFilter('Geneco')}>Opticien</div>
        </div>


        <Tabs
          value={value}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Terminé" />
          <Tab label="En cours" />
          <Tab label="A venir" />
        </Tabs>
      <div className={classes.root}>
        {
          ordonnanceList.map((ordonnance, index) => {
            return (
              <Accordion expanded={expanded === ordonnance.id} onChange={handleChange(ordonnance.id)}>
                <AccordionSummary
                  expandIcon={<FaAngleDown />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className='accordion__title'>{ordonnance.date}</Typography>
                  <Typography className='accordion__subtitle'>{ordonnance.type}: {ordonnance.doctor_name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <div>
        
                <Typography className="padding2">
                {ordonnance.note}
                  </Typography> 
                  <div  className="lines">
                    <div  className="lines__line"> <div className="lines__title">nom</div><div className="lines__desc">{ordonnance.consultation_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Docteur</div><div className="lines__desc-clickable">{ordonnance.doctor_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Consultation</div><div className="lines__desc-clickable">{ordonnance.ordonnance}</div></div>
                    <div  className="lines__line"> <div className="lines__title">date de ordonnance</div><div className="lines__desc">{ordonnance.consultation_date}</div></div>
                    <div  className="lines__line"> <div className="lines__title">date prise de RDV</div><div className="lines__desc">{ordonnance.consultation_RDV}</div></div>
                    <div  className="lines__line"> <div className="lines__title">date prevue</div><div className="lines__desc">{ordonnance.date}</div></div>
                    <div  className="lines__line"> <div className="lines__title">prix</div><div className="lines__desc">{ordonnance.price}</div></div>
                    <div  className="lines__line"> <div className="lines__title">document</div> 
                    <div>
                      {ordonnance.attachement.map(item => {
                        return (<div> {item} </div>);
                      })}
                    </div>
                    </div>
                    <div  className="lines__line"> <div className="lines__title">comment</div><textarea className="lines__desc">{ordonnance.consultation_comment}</textarea></div>
                    
                    <div  className="lines__footer"> 
                      <div className="lines__footer-action" onClick={(e) => onChange()}> <FaCalendarPlus>  </FaCalendarPlus>Supprimer</div>
                      <div className="lines__footer-action" onClick={(e) => onChange()}> <FaCalendarPlus>  </FaCalendarPlus>Editer</div>
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