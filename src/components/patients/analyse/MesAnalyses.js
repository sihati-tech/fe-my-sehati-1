import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import { FaAngleDown, FaCheckCircle} from 'react-icons/fa';

import "./mesAnalyses.scss";
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

export default function MesAnalyses() {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="container-wrapper">
      <HeaderComponent></HeaderComponent>
      <div className="container-body">
        <div className="container-title">
          Mes Analyses
        </div>
        <div className="container-subtitle">
          liste des analyses pour Mr XXXX XXXX planifiés
        </div>
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
              <div className="lines__last-line-desc"> Pending</div>
              <div className="lines__last-line-button"> <FaCheckCircle>  </FaCheckCircle>Valider</div>
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
              <div className="lines__last-line-desc"> Pending</div>
              <div className="lines__last-line-button"> <FaCheckCircle>  </FaCheckCircle>Valider</div>
            </div>
          </div>
        </div>
        </AccordionDetails>
      </Accordion>
    


      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
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
              <div className="lines__last-line-desc"> Pending</div>
              <div className="lines__last-line-button"> <FaCheckCircle>  </FaCheckCircle>Valider</div>
            </div>
          </div>
        </div>
        </AccordionDetails>
      </Accordion>
    


      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
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
              <div className="lines__last-line-desc"> Pending</div>
              <div className="lines__last-line-button"> <FaCheckCircle>  </FaCheckCircle>Valider</div>
            </div>
          </div>
        </div>
        </AccordionDetails>
      </Accordion>
    
    
    </div>
      </div>
    </div>
  );
}