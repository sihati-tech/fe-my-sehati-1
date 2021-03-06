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
import "./mesAnalyses.scss";
import HeaderComponent from '../header/headerComponent'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import WarningMessage from '../../../shared/component/WarningMessage'

import DisplayFile from '../commun/displayFile'
import axiosInstance from '../../../services/httpInterceptor' 
import AnalyseAdd from './AnalyseAdd'
import MesGraph from './MesGraph';

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
    attachement: 'my  analyse 4424-334',
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
    analyses: [
      {
        category: 'H??matologie',
        exams: [
          {
            exam_name: 'NUMERATION GLOBULAIRE',
            comment: 'Imp??dance, cytom??trie de flux et colorim??trie, XN, Sysmex, sang total EDTA (Lisses)',
            results: [
              {
                code: 'HMTC',
                label: 'H??maties',
                value: '5,28',
                unit: 'Tera/L',
                reference_min: '4.28',
                reference_max: '5.79',
                historique:'23Tera/L'
              },
              {
                code: 'VGM',
                label: 'V.G.M.',
                value: '85,2',
                unit: 'fl',
                reference_min: '78.0',
                reference_max: '97.0',
                historique:'23Tera/L'
              }
            ]
          },
          {
            exam_name: 'FORMULE LEUCOCYTAIRE',
            comment: 'Imp??dance, cytom??trie de flux et colorim??trie, XN, Sysmex, sang total EDTA (Lisses)',
            results: [
              {
                code: 'HMTC',
                label: 'Poly. neutrophiles',
                value: '2,06',
                unit: 'Giga/L',
                reference_min: '4.28',
                reference_max: '5.79',
                historique:'23Tera/L'
              },
              {
                code: 'VGM',
                label: 'Monocytes',
                value: '85,2',
                unit: 'fl',
                reference_min: '78.0',
                reference_max: '97.0',
                historique:'23Tera/L'
              }
            ]
          }
        ]
    },

    {
      category: 'H??mostase',
      exams: [
        {
          exam_name: 'TAUX DE PROTHROMBINE',
          comment: 'Imp??dance, cytom??trie de flux et colorim??trie, XN, Sysmex, sang total EDTA (Lisses)',
          results: [
            {
              code: 'TQP',
              label: 'Temps de Quick patient',
              value: '5,28',
              unit: 'Tera/L',
              reference_min: '4.28',
              reference_max: '5.79',
              historique:'23Tera/L'
            },
            {
              code: 'INR',
              label: 'INR',
              value: '85,2',
              unit: 'fl',
              reference_min: '78.0',
              reference_max: '97.0',
              historique:'23Tera/L'
            }
          ]}
      ]
  }
  ] 
  }]

export default function MesAnalyses() {
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const [codeGraph, setCodeGraph] = useState(false);
  const [fileJson, setFileJson] = useState('');
  let { id } = useParams();
  const history = useHistory()
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [consultationList, setConsultationList] = React.useState([]);
  const [displayedConsultationList, setdisplayedConsultationList] = React.useState([]);

  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [analyse, setAnalyse] = useState({});
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [graphData, setGraphData] = useState([]);
  const [benif, setBenif] = useState({});

  useEffect( () => {
    const url = `${API_URL}/benificiares/${id}?patient=${localStorage.patient}` ;
    axiosInstance.get(url).then(response => response.data)
    .then((result) => { 
      const benif = result[0];
      setFirstName(benif.first_name)
      setLastName(benif.last_name)
      setBenif(benif);
    }
    );
    refreshList();
  }, []);


  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    const filteredData = consultationList.filter(data => 
      data.analyse_status === StatusMapping[newValue])
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

  function openGraph(e, row) {
    const graphData = [];
    setCodeGraph(row)
    consultationList.map(consultation => {
      if (consultation.results)
        consultation.results.map(categ => {
          categ.subCategories.map(subCateg => {
            subCateg.results.map(resSubCateg => {
              if (resSubCateg.code === row.code)
                graphData.push({date: consultation.date_rdv || consultation.date_prevu, value: resSubCateg.value})
            })
          })
        })
    })
    graphData.sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    });
    setGraphData(graphData)
    setIsGraphOpen(true)
  }
  function onChange(value) { 
    setIsOpen(false) 
  }
  function refreshList () {
    const url = `${API_URL}/analyses/benif/${id}?patient=${localStorage.patient}`;
    axiosInstance.get(url).then(response => response.data)
    .then((result) => {
      setConsultationList(result);
      const filteredData = result.filter(data => 
        data.analyse_status === StatusMapping[value])
        setdisplayedConsultationList(filteredData)
      }
    );
  }
  function addAnalyse() {
    setAnalyse({})
    setIsOpenAdd(true)
  }
  function onChangeAdd(value) { 
    setIsOpenAdd(false) 
    refreshList();
  }
  function supprimerAnalyse(analyse) {
    setAnalyse(analyse)
    setIsOpenWarning(true)
  }
  function editAnalyse(analyse) {
    setAnalyse(analyse)
    setIsOpenAdd(true)
  }
  function downloadFile(file) {
    setFileJson(file)
    setIsFileOpen(true)
  }
  function onChangeFile(value) { 
    setIsFileOpen(false) 
  }
  function onChangeGraph(value) { 
    setIsGraphOpen(false) 
  }
  function onCloseWarning(value) { 
    setIsOpenWarning(false)
  }
  function onConfirm(value) { 
    setIsOpenWarning(false);
    const url = `${API_URL}/analyses/${analyse._id}?patient=${localStorage.patient}`;
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
        <AnalyseAdd
          isOpen={isOpenAdd}
          onChange={onChangeAdd}
          analyse= {analyse}
          benif= {id}
          ></AnalyseAdd>
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
      {
        isGraphOpen ? 
        <MesGraph
          onChangeGraph={onChangeGraph}
          isOpen={isGraphOpen}
          graphData= {graphData}
          benif= {benif}
          codeGraph= {codeGraph}
          ></MesGraph>
      : null
      }
      <WarningMessage 
              onCloseWarning={onCloseWarning}
              isOpenWarning={isOpenWarning}
              onConfirm={onConfirm}>
          </WarningMessage>
      <div className="container-body">
      <div className="container-return-action"  onClick={(e) => goBack()}>
        <FaArrowLeft>  </FaArrowLeft> retourner ?? mon tableau de bord
      </div>
        <div className="container-title">
          Mes Analyses
        </div>
        <div className="container-subtitle">
          liste des Analyses pour  {firstName} {lastName}  planifi??s
        </div>
      

        <div className="container-right-actions">
        <div className="btn-action" onClick={(e) => addAnalyse()}> <FaCalendarPlus>  </FaCalendarPlus>Add analyse</div>
        </div>
        <Tabs
          value={value}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Termin??" />
          <Tab label="A venir" />
        </Tabs>
      <div className={classes.root}>
        {
          displayedConsultationList.map((analyse, index) => {
            return (
              <Accordion expanded={expanded === analyse._id} onChange={handleChange(analyse._id)}>
                <AccordionSummary
                  expandIcon={<FaAngleDown />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className='accordion__title'>{analyse.date_prevu}</Typography>
                  <Typography className='accordion__subtitle'>{analyse.laboratory}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <div className='all_width'>
        
                <Typography className="padding2">
                {analyse.note}
                  </Typography> 
                  <div  className="lines">
                    <div  className="lines__line"> <div className="lines__title">Doc Laboratoire</div><div className="lines__desc">{analyse.laboratory}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Medecin Presc.</div><div className="lines__desc">{analyse.ordonnance.consultation ? analyse.ordonnance.consultation.medecin.last_name : ''} {analyse.ordonnance.consultation ? analyse.ordonnance.consultation.medecin.first_name : ''}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Ordonnance</div><div className="lines__desc">{analyse.ordonnance.ordonnance_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Date Ordonnance</div><div className="lines__desc">{analyse.ordonnance.date_rdv}</div></div>
                      <div  className="lines__line"> <div className="lines__title">date prise RDV</div><div className="lines__desc">{analyse.date_prise_rdv.split('T')[0]}</div></div>
                    {
                      analyse.analyse_status !== 'Done' ?
                      <div  className="lines__line"> <div className="lines__title">date prevue</div><div className="lines__desc">{analyse.date_prevu}</div></div>
                      : null }
                    {
                      analyse.analyse_status === 'Done' ?
                      <div  className="lines__line"> <div className="lines__title">date realis??</div><div className="lines__desc">{analyse.date_rdv}</div></div> 
                    : null }
                    <div  className="lines__line"> <div className="lines__title">prix</div><div className="lines__desc">{analyse.price}</div></div>
                    <div  className="lines__line"> <div className="lines__title">comment</div><textarea className="lines__desc" value={analyse.comment}></textarea></div>
        

                    {
                    analyse.analyse_status === 'Done' ?
                    <div className="result__container" >
                    <div className="result__title"> Documents </div>
                      <div>
                      <div className="result__exam-name"> attachement </div>
                        {
                          analyse.attachements.map((exam, index) => {
                            return ( <div className="download-file result__exam-name-comment"  onClick={(e) => downloadFile(exam)}> T??l??charger l'analyse </div> )
                          })
                        }
                      
                      </div>

                    </div>
                     : null
                    }
                    {
                      analyse.analyse_status === 'Done' ?

                    <div className="result__container" >

                    <div className="result__title"> Resultat </div>
                    
                    <div  className="lines__line"> <div className="lines__title">interpretation Labo</div><div className="lines__desc">{analyse.interpretation_labo}</div></div>
                    <div  className="lines__line"> <div className="lines__title">interpretation Doc</div><div className="lines__desc">{analyse.interpretation_medecin}</div></div>
                    { analyse.results ? analyse.results.map((category, index) => { 
                      return (
                         <div> 
                           <div className="result__category" >{category.category}</div> 
                           { category.subCategories.map((subCategory, index) => { 
                             return ( 
                             <div> 
                               <div className="result__exam-name"> {subCategory.subCategoryName} </div> 
                               <div className="result__exam-name-comment"> {subCategory.comment} </div>
 
                              <Table className={classes.table} aria-label="simple table"> 
                              <TableHead> 
                                <TableRow> 
                                  <TableCell>nom</TableCell> 
                                  <TableCell align="right">valeur</TableCell> 
                                  <TableCell align="right">unit??</TableCell> 
                                  <TableCell align="right">reference</TableCell> 
                                  <TableCell align="right"></TableCell> 
                              </TableRow> 
                              </TableHead> 
                              <TableBody> {subCategory.results.map((row) => ( <TableRow key={row.name}> <TableCell align="">{row.label}</TableCell> 
                              <TableCell align="right">{row.value}</TableCell> 
                              <TableCell align="right">{row.unit}</TableCell> 
                              <TableCell align="right">{row.reference_max} - {row.reference_min} </TableCell> 
                              <TableCell> 
                                <FaPoll className="graph-button" onClick={(e) => openGraph(e, row)} >
                                  </FaPoll></TableCell> </TableRow> ))} </TableBody> </Table>
                    {/* { exam.results.map((result, index) => { return ( <div className="result__result-line"> <div>{result.label}</div> <div>{result.value} {result.unit}</div> <div>{result.reference_min}</div> <div>{result.reference_max}</div> </div> ) }) } */} 
                    </div> ) })} 
                    </div> )}) : null}
                    </div>
                    : null
                    }
                    <div  className="lines__footer"> 
                      <div className="lines__footer-action" onClick={(e) => supprimerAnalyse(analyse)}> <FaCalendarPlus>  </FaCalendarPlus>Supprimer</div>
                      <div className="lines__footer-action" onClick={(e) => editAnalyse(analyse)}> <FaCalendarPlus>  </FaCalendarPlus>Modifier</div>
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