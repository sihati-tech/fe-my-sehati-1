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
import WarningMessage from '../../../shared/component/WarningMessage'
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
    laboratory: 'Labo DESCARTES',
    ordonnance: 'ORDO-33423434',
    interpretation_labo: 'RAS',
    interpretation_doctor: 'labo RAS',
    note: `Note medecin: cette radio mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV merci d'appeler le numero 09 993 33 9434`,
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
  const [radioList, setRadioList] = React.useState([]);
  const [displayedRadioList, setdisplayedRadioList] = React.useState([]);

  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [radio, setRadio] = useState({});
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
    const filteredData = radioList.filter(data => 
      data.radio_status === StatusMapping[newValue])
      setdisplayedRadioList(filteredData)
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
    const url = `${API_URL}/radios/benif/${id}`;
    axiosInstance.get(url).then(response => response.data)
    .then((result) => {
      setRadioList(result);
      const filteredData = result.filter(data => 
        data.radio_status === StatusMapping[value])
        setdisplayedRadioList(filteredData)
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

  function supprimerRadio(analyse) {
    setRadio(analyse)
    setIsOpenWarning(true)
  }
  function editRadio(analyse) {
    setRadio(analyse)
    setIsOpenAdd(true)
  }

  function onCloseWarning(value) { 
    setIsOpenWarning(false)
  }
  function onConfirm(value) { 
    setIsOpenWarning(false);
    const url = `${API_URL}/radios/${radio._id}`;
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
        <RadioAdd
          isOpen={isOpenAdd}
          onChange={onChangeAdd}
          benif= {id}
          radio= {radio}
          ></RadioAdd>
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
          Mes Radios
        </div>
        <div className="container-subtitle">
          liste des Radios pour Mr {firstName} {lastName} planifiés
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
          displayedRadioList.map((radio, index) => {
            return (
              <Accordion expanded={expanded === radio._id} onChange={handleChange(radio._id)}>
                <AccordionSummary
                  expandIcon={<FaAngleDown />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className='accordion__title'>{radio.date_prevu}</Typography>
                  <Typography className='accordion__subtitle'>{radio.laboratory}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <div className='all_width'>
        
                <Typography className="padding2">
                {radio.note}
                  </Typography> 
                  <div  className="lines">
                    <div  className="lines__line"> <div className="lines__title">Laboratoire</div><div className="lines__desc">{radio.laboratory}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Docteur</div><div className="lines__desc">{radio.ordonnance.consultation.medecin.last_name} {radio.ordonnance.consultation.medecin.first_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Ordonnance</div><div className="lines__desc">{radio.ordonnance.ordonnance_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">date prevue</div><div className="lines__desc">{radio.date_prevu}</div></div>
                    <div  className="lines__line"> <div className="lines__title">date realisé</div><div className="lines__desc">{radio.date_rdv}</div></div>
                    <div  className="lines__line"> <div className="lines__title">interpretation Labo</div><div className="lines__desc">{radio.interpretation_labo}</div></div>
                    <div  className="lines__line"> <div className="lines__title">interpretation Doc</div><div className="lines__desc">{radio.interpretation_medecin}</div></div>
                    <div  className="lines__line"> <div className="lines__title">prix</div><div className="lines__desc">{radio.price}</div></div>
                    <div  className="lines__line"> <div className="lines__title">comment</div><textarea className="lines__desc" value={radio.comment}></textarea></div>
        
                    {
                    radio.radio_status === 'Done' ?
                    <div className="result__container" >
                    <div className="result__title"> Resultat </div>
                      <div>
                      <div className="result__exam-name"> attachement </div>
                        {
                          radio.attachements.map((exam, index) => {
                            return ( <div className="result__exam-name-comment"> {exam.name} </div> )
                          })
                        }
                        <div className="result__exam-name"> interpretation </div>
                        <div  className="lines__line"> <textarea className="lines__desc" value={radio.result_interpretation}></textarea></div>

                        <div className="result__exam-name"> conclusion </div>
                        <div  className="lines__line"> <textarea className="lines__desc" value={radio.result_conclusion}></textarea></div>
                      
                      
                      </div>

                    </div>
                     : null
                    }
                    
                    <div  className="lines__footer"> 
                      <div className="lines__footer-action" onClick={(e) => supprimerRadio(radio)}> <FaCalendarPlus>  </FaCalendarPlus>Supprimer</div>
                      <div className="lines__footer-action" onClick={(e) => editRadio(radio)}> <FaCalendarPlus>  </FaCalendarPlus>Modifier</div>
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