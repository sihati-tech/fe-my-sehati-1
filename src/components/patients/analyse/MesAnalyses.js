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
        category: 'Hématologie',
        exams: [
          {
            exam_name: 'NUMERATION GLOBULAIRE',
            comment: 'Impédance, cytométrie de flux et colorimétrie, XN, Sysmex, sang total EDTA (Lisses)',
            results: [
              {
                code: 'HMTC',
                label: 'Hématies',
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
            comment: 'Impédance, cytométrie de flux et colorimétrie, XN, Sysmex, sang total EDTA (Lisses)',
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
      category: 'Hémostase',
      exams: [
        {
          exam_name: 'TAUX DE PROTHROMBINE',
          comment: 'Impédance, cytométrie de flux et colorimétrie, XN, Sysmex, sang total EDTA (Lisses)',
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

  let { id } = useParams();
  const history = useHistory()
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [consultationList, setConsultationList] = React.useState([]);

  const [analyse, setAnalyse] = useState({});
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
    console.log('value')
    setIsOpen(false) 
  }
  function refreshList () {
    const url = `${API_URL}/benificiares/${id}/analyses`;
    axiosInstance.get(url).then(response => response.data)
    .then((result) => {
      setConsultationList(result)
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
  return (
    <div className="container-wrapper">
      <HeaderComponent></HeaderComponent>
      {
        isOpenAdd ? 
        <AnalyseAdd
          isOpen={isOpenAdd}
          onChange={onChangeAdd}
          benif= {analyse}
          ></AnalyseAdd>
      : null
      }
      {
        isOpen ? 
        <MesGraph
          isOpen={isOpen}
          onChange={onChange}
          ></MesGraph>
      : null
      }
      <div className="container-body">
      <div className="container-return-action"  onClick={(e) => goBack()}>
        <FaArrowLeft>  </FaArrowLeft> retourner à mon tableau de bord
      </div>
        <div className="container-title">
          Mes Analyses
        </div>
        <div className="container-subtitle">
          liste des Analyses pour Mr XXXX XXXX planifiés
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
                    <div  className="lines__line"> <div className="lines__title">Doc Laboratoire</div><div className="lines__desc">{consultation.labo_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Medecin Presc.</div><div className="lines__desc">{consultation.doctor_name}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Ordonnance</div><div className="lines__desc">{consultation.ordonnance}</div></div>
                    <div  className="lines__line"> <div className="lines__title">Date Ordonnance</div><div className="lines__desc">{consultation.ordonnance}</div></div>
                    <div  className="lines__line"> <div className="lines__title">date prevue</div><div className="lines__desc">{consultation.date_planned}</div></div>
                    <div  className="lines__line"> <div className="lines__title">date realisé</div><div className="lines__desc">{consultation.date_realised}</div></div>
                    <div  className="lines__line"> <div className="lines__title">interpretation Labo</div><div className="lines__desc">{consultation.interpretation_labo}</div></div>
                    <div  className="lines__line"> <div className="lines__title">interpretation Doc</div><div className="lines__desc">{consultation.interpretation_doctor}</div></div>
                    <div  className="lines__line"> <div className="lines__title">prix</div><div className="lines__desc">{consultation.price}</div></div>
                    <div  className="lines__line"> <div className="lines__title">comment</div><textarea className="lines__desc" value={consultation.comment}></textarea></div>
        
                    <div  className="lines__line"> 
                      <div className="lines__title">attachement</div>
                      <div className="lines__last-line-desc"> {consultation.attachement}</div>
                    </div>

                    <div className="result__container" >

                    <div className="result__title"> Resultat </div>
                    {
                      consultation.analyses.map((analyse, index) => {
                        return (
                          <div>
                            <div className="result__category" >{analyse.category}</div>
                            {
                              analyse.exams.map((exam, index) => {
                                return (
                                  <div>
                                  <div className="result__exam-name"> {exam.exam_name} </div>
                                    <div className="result__exam-name-comment"> {exam.comment} </div>

                                    <Table className={classes.table} aria-label="simple table">
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>nom</TableCell>
                                          <TableCell align="right">valeur</TableCell>
                                          <TableCell align="right">unité</TableCell>
                                          <TableCell align="right">reference</TableCell>
                                          <TableCell align="right">antériorité</TableCell>
                                          <TableCell align="right"></TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {exam.results.map((row) => (
                                          <TableRow key={row.name}>
                                            <TableCell align="">{row.label}</TableCell>
                                            <TableCell align="right">{row.value}</TableCell>
                                            <TableCell align="right">{row.unit}</TableCell>
                                            <TableCell align="right">{row.reference_max} - {row.reference_min} </TableCell>
                                            <TableCell align="right">{row.historique}</TableCell>
                                            <TableCell> <FaPoll className="graph-button" onClick={(e) => openGraph(e, row.code)} ></FaPoll></TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>

                                    {/* {
                                      exam.results.map((result, index) => {
                                        return (
                                          <div  className="result__result-line">
                                           <div>{result.label}</div>
                                           <div>{result.value} {result.unit}</div>
                                           <div>{result.reference_min}</div>
                                           <div>{result.reference_max}</div>
                                          </div>
                                        )
                                      })
                                    } */}
                                  </div>
                                )
                              })
                            }

                          </div>
                        )
                      })
                    }
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