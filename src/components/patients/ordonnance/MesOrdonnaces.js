import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import { FaAngleDown, FaCheckCircle, FaCalendarPlus} from 'react-icons/fa';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import "./mesOrdonnaces.scss";
import HeaderComponent from '../header/headerComponent'

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

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [filter, setFilter] = React.useState('Generalist');

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleChangeFilter = (panel) => (event, isExpanded) => {
    setFilter(panel);
  };

  return (
    <div className="container-wrapper">
      <HeaderComponent></HeaderComponent>
      <div className="container-body">
        <div className="container-title">
          Mes Ordonnances
        </div>
        <div className="container-subtitle">
          liste des Consultations pour Mr XXXX XXXX planifiés
        </div>
      

        <div className="container-filters-top">
          <div className={filter === 'Generalist' ? "container-filter-top-actif" : "container-filter-top" }
          onClick={handleChangeFilter('Generalist')}>Généraliste</div>
          <div className={filter === 'Specialist' ? "container-filter-top-actif" : "container-filter-top" }
          onClick={handleChangeFilter('Specialist')}>Specialiste</div>
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
      {
        value === 0 ? 
      <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<FaAngleDown />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>11/02/2020</Typography>
          <Typography className={classes.secondaryHeading}>Dr Naciri Ibrahim</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div>

        <Typography className="padding2">
           Note medecin: cette consultation mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV
           merci d'appeler le numero 09 993 33 9434
          </Typography> 
          <div  className="lines">
            <div  className="lines__line"> <div className="lines__title">nom</div><div className="lines__desc">CONS 34424</div></div>
            <div  className="lines__line"> <div className="lines__title">Docteur</div><div className="lines__desc">Dr Naciri Ibrahim</div></div>
            <div  className="lines__line"> <div className="lines__title">date</div><div className="lines__desc">11/02/2020</div></div>
            <div  className="lines__line"> <div className="lines__title">comment</div><textarea className="lines__desc">comment ...</textarea></div>
            

            <div  className="lines__line"> 
              <div className="lines__title">status</div>
              <div className="lines__last-line-desc"> Terminé</div>
            </div>
          </div>
        </div>
        </AccordionDetails>
      </Accordion>
    
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<FaAngleDown />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>11/02/2020</Typography>
          <Typography className={classes.secondaryHeading}>Dr Naciri Ibrahim</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div>

        <Typography className="padding2">
           Note medecin: cette consultation mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV
           merci d'appeler le numero 09 993 33 9434
          </Typography> 
          <div  className="lines">
            <div  className="lines__line"> <div className="lines__title">nom</div><div className="lines__desc">CONS 34424</div></div>
            <div  className="lines__line"> <div className="lines__title">Docteur</div><div className="lines__desc">Dr Naciri Ibrahim</div></div>
            <div  className="lines__line"> <div className="lines__title">date</div><div className="lines__desc">11/02/2020</div></div>
            <div  className="lines__line"> <div className="lines__title">comment</div><textarea className="lines__desc">comment ...</textarea></div>
            

            <div  className="lines__line"> 
              <div className="lines__title">status</div>
              <div className="lines__last-line-desc"> Terminé</div>
            </div>
          </div>
        </div>
        </AccordionDetails>
      </Accordion>
    
    </div> : null
      }


{
        value === 1 ? 
      <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<FaAngleDown />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>11/02/2019</Typography>
          <Typography className={classes.secondaryHeading}>Dr DUPONT Jean</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div>

        <Typography className="padding2">
           Note medecin: cette consultation mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV
           merci d'appeler le numero 09 993 33 9434
          </Typography> 
          <div  className="lines">
            <div  className="lines__line"> <div className="lines__title">nom</div><div className="lines__desc">CONS 34424</div></div>
            <div  className="lines__line"> <div className="lines__title">Docteur</div><div className="lines__desc">Dr Naciri Ibrahim</div></div>
            <div  className="lines__line"> <div className="lines__title">date</div><div className="lines__desc">11/02/2020</div></div>
            <div  className="lines__line"> <div className="lines__title">comment</div><textarea className="lines__desc">comment ...</textarea></div>
            

            <div  className="lines__line"> 
              <div className="lines__title">status</div>
              <div className="lines__last-line-desc"> En cours</div>
              <div className="lines__last-line-button"> <FaCheckCircle>  </FaCheckCircle>Valider</div>
            </div>
          </div>
        </div>
        </AccordionDetails>
      </Accordion>
    
    </div> : null
      }


{
        value === 2 ? 
      <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<FaAngleDown />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>11/02/2022</Typography>
          <Typography className={classes.secondaryHeading}>Dr Ait Nali Karim</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div>

        <Typography className="padding2">
           Note medecin: cette consultation mensuelle a pour objectif de suivre la tension et la temperature, pour annuler le RDV
           merci d'appeler le numero 09 993 33 9434
          </Typography> 
          <div  className="lines">
            <div  className="lines__line"> <div className="lines__title">nom</div><div className="lines__desc">CONS 34424</div></div>
            <div  className="lines__line"> <div className="lines__title">Docteur</div><div className="lines__desc">Dr Naciri Ibrahim</div></div>
            <div  className="lines__line"> <div className="lines__title">date</div><div className="lines__desc">11/02/2020</div></div>
            <div  className="lines__line"> <div className="lines__title">comment</div><textarea className="lines__desc">comment ...</textarea></div>
            

            <div  className="lines__line"> 
              <div className="lines__title">status</div>
              <div className="lines__last-line-desc"> a venir</div>
              <div className="lines__last-line-button"> <FaCheckCircle>  </FaCheckCircle>Annuler</div>
            </div>
          </div>
        </div>
        </AccordionDetails>
      </Accordion>
    
    </div> : null
      }
      </div>
    </div>
  );
}