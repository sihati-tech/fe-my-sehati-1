import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import { FaAngleDown, FaCheckCircle, FaCalendarPlus} from 'react-icons/fa';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import "./mesTraitements.scss";
import HeaderComponent from '../header/headerComponent'

const StatusMapping = {
  0: 'Done',
  1: 'InProgress',
  2: 'Later',
}
const mockData =  [
  {
    id: 12,
    note: `Note medecin: cette consultation mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV merci d'appeler le numero 09 993 33 9434`,
    type: 'Generalist',
    doctor_name: 'LAMRANI kamal',
    status: 'InProgress',
    ordonnance: 'ordonnance 2334-23432-2342',
    traitement_name: 'trait-2234 234',
    acte_medical: 'ACT-345 445',
    date_RDV: '11/22/2222',
    date: '11/22/1111',
    consultation_date: '22/22/2222'
  },
  {
    id: 13,
    note: `Note medecin: cette consultation mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV merci d'appeler le numero 09 993 33 9434`,
    type: 'Generalist',
    doctor_name: 'LAMRANI kamal',
    status: 'InProgress',
    ordonnance: 'ordonnance 2334-23432-2342',
    traitement_name: 'trait-2234 234',
    acte_medical: 'ACT-345 445',
    date_RDV: '11/22/2222',
    date: '11/22/1111',
    consultation_date: '22/22/2222'
  },
  {
    id: 14,
    note: `Note medecin: cette consultation mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV merci d'appeler le numero 09 993 33 9434`,
    type: 'Generalist',
    doctor_name: 'LAMRANI kamal',
    status: 'InProgress',
    ordonnance: 'ordonnance 2334-23432-2342',
    traitement_name: 'trait-2234 234',
    acte_medical: 'ACT-345 445',
    date_RDV: '11/22/2222',
    date: '11/22/1111',
    consultation_date: '22/22/2222'
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

export default function MesTraitements() {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [filter, setFilter] = React.useState('Generalist');
  const [consultationList, setConsultationList] = React.useState([]);

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

  return (
    <div className="container-wrapper">
      <HeaderComponent></HeaderComponent>
      <div className="container-body">
        <div className="container-title">
          Mes Traitements
        </div>
        <div className="container-subtitle">
          liste des Traitements pour Mr XXXX XXXX planifiés
        </div>
      

        <div className="container-right-actions">
          <div className="btn-action"> <FaCalendarPlus>  </FaCalendarPlus>Prendre RDV</div>
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
          consultationList.map((consultation, index) => {
            return (
              <Accordion expanded={expanded === consultation.id} onChange={handleChange(consultation.id)}>
                <AccordionSummary
                  expandIcon={<FaAngleDown />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className='accordion__title'>{consultation.date}</Typography>
                  <Typography className='accordion__subtitle'>{consultation.type}: {consultation.doctor_name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <div>
        
                <Typography className="padding2">
                {consultation.note}
                  </Typography> 
                  <div  className="lines">
                    <div  className="lines__line"> <div className="lines__title">nom</div><div className="lines__desc">{consultation.traitement_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">ordonnance</div><div className="lines__desc-clickable">{consultation.ordonnance}</div></div>
                    <div  className="lines__line"> <div className="lines__title">acte medical</div><div className="lines__desc-clickable">{consultation.acte_medical}</div></div>
                    <div  className="lines__line"> <div className="lines__title">date de consultation</div><div className="lines__desc">{consultation.consultation_date}</div></div>
                    <div  className="lines__line"> <div className="lines__title">date prise de RDV</div><div className="lines__desc">{consultation.date_RDV}</div></div>
                    <div  className="lines__line"> <div className="lines__title">date prevue</div><div className="lines__desc">{consultation.date}</div></div>
                    <div  className="lines__line"> <div className="lines__title">comment</div><textarea className="lines__desc">{consultation.consultation_comment}</textarea></div>
                    
        
                    <div  className="lines__line"> 
                      <div className="lines__title">status</div>
                      <div className="lines__last-line-desc"> {consultation.status}</div>
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