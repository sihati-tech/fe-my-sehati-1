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
import "./mesRadios.scss";
import axiosInstance from '../../../services/httpInterceptor' 
import HeaderComponent from '../header/headerComponent'
import RadioAdd from './RadioAdd'
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

const StatusMapping = {
  0: 'Done',
  1: 'Later',
}
const mockData =  [
  {
    id: 13,
    price: '45$',
    status: 'Later',
    date_planned: '11/02/2020',
    date_realised: '11/02/2020',
    doctor_name: 'Dr LAMRANI kamal',
    labo_name: 'Labo DESCARTES',
    ordonnance: 'ORDO-33423434',
    interpretation_labo: 'RAS',
    interpretation_doctor: 'labo RAS',
    note: `Note medecin: cette consultation mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV merci d'appeler le numero 09 993 33 9434`,
    comment: 'comment ...',
    result: 
      {
        attachement: [{
          name: 'radio-222312',
          lien: '',
        },{
          name: 'radio-234EAAZA',
          lien: '',
        }],
        interpretation: `lorem lkj sdjhsdf lsmdk dsfhsdkfh sdmfmksfkhdkshf sdh
         lksdflkhsd mkfhdls kh msdds sdf f dsf sd fsd f sd f sd df sdf ds fs
         dsfs df sdf ds fs d f ds ggh g hg h gfh d gh dhg h h fgh fdg h`,
        conclusion: `lorem lkj sdjhsdf lsmdk dsfhsdkfh sdmfmksfkhdkshf sdh
        lksdflkhsd mkfhdls kh msdds sdf f dsf sd fsd f sd f sd df sdf ds fs
        dsfs df sdf ds fs d f ds ggh g hg h gfh d gh dhg h h fgh fdg h`,
      }
  }]

export default function MesRadios() {

  let { id } = useParams();
  const history = useHistory()
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [consultationList, setConsultationList] = React.useState([]);

  const [radio, setRadio] = useState({});
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const handleChangeTab = (event, newValue) => {
    console.log('newValue ', newValue, StatusMapping[newValue] )
    setValue(newValue);
    const filteredData = mockData.filter(data => 
      data.status === StatusMapping[newValue])
      console.log('filteredData ', filteredData)
    setConsultationList(filteredData)
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
    setIsOpen(false) 
  }

  function refreshList () {
    const url = `${API_URL}/benificiares/${id}/radio`;
    axiosInstance.get(url).then(response => response.data)
    .then((result) => {
      setConsultationList(result)
      }
    );
  }
  function addRadio() {
    setRadio({})
    setIsOpenAdd(true)
  }
  function onChangeAdd(value) { 
    setIsOpenAdd(false) 
    refreshList();
  }
  return (
    <div className="container-wrapper">
      <HeaderComponent></HeaderComponent>
      {
        isOpenAdd ? 
        <RadioAdd
          isOpen={isOpenAdd}
          onChange={onChangeAdd}
          benif= {radio}
          ></RadioAdd>
      : null
      }
      <div className="container-body">
      <div className="container-return-action"  onClick={(e) => goBack()}>
        <FaArrowLeft>  </FaArrowLeft> retourner à mon tableau de bord
      </div>
        <div className="container-title">
          Mes Radios
        </div>
        <div className="container-subtitle">
          liste des Radio pour Mr XXXX XXXX planifiés
        </div>

        <div className="container-right-actions">
        <div className="btn-action" onClick={(e) => addRadio()}> <FaCalendarPlus>  </FaCalendarPlus>Add radio</div>
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
          consultationList.map((consultation, index) => {
            return (
              <Accordion expanded={expanded === consultation.id} onChange={handleChange(consultation.id)}>
                <AccordionSummary
                  expandIcon={<FaAngleDown />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className='accordion__title'>{consultation.date_planned}</Typography>
                  <Typography className='accordion__subtitle'>{consultation.labo_name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <div>
        
                <Typography className="padding2">
                {consultation.note}
                  </Typography> 
                  <div  className="lines">
                    <div  className="lines__line"> <div className="lines__title">Laboratoire</div><div className="lines__desc">{consultation.labo_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Docteur</div><div className="lines__desc">{consultation.doctor_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Ordonnance</div><div className="lines__desc">{consultation.ordonnance}</div></div>
                    <div  className="lines__line"> <div className="lines__title">date prevue</div><div className="lines__desc">{consultation.date_planned}</div></div>
                    <div  className="lines__line"> <div className="lines__title">date realisé</div><div className="lines__desc">{consultation.date_realised}</div></div>
                    <div  className="lines__line"> <div className="lines__title">interpretation Labo</div><div className="lines__desc">{consultation.interpretation_labo}</div></div>
                    <div  className="lines__line"> <div className="lines__title">interpretation Doc</div><div className="lines__desc">{consultation.interpretation_doctor}</div></div>
                    <div  className="lines__line"> <div className="lines__title">prix</div><div className="lines__desc">{consultation.price}</div></div>
                    <div  className="lines__line"> <div className="lines__title">comment</div><textarea className="lines__desc" value={consultation.comment}></textarea></div>
        
                    <div className="result__container" >
                    <div className="result__title"> Resultat </div>
                      <div>
                      <div className="result__exam-name"> attachement </div>
                        {
                          consultation.result.attachement.map((exam, index) => {
                            return ( <div className="result__exam-name-comment"> {exam.name} </div> )
                          })
                        }
                        <div className="result__exam-name"> interpretation </div>
                        <div  className="lines__line"> <textarea className="lines__desc" value={consultation.result.interpretation}></textarea></div>

                        <div className="result__exam-name"> conclusion </div>
                        <div  className="lines__line"> <textarea className="lines__desc" value={consultation.result.conclusion}></textarea></div>
                      
                      
                      </div>

                    </div>
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