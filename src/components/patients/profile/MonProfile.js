import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import { FaAngleDown, FaCheckCircle} from 'react-icons/fa';

import "./monProfile.scss";
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

export default function MonProfile() {

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
          Mon Profile
        </div>
        <div className="container-subtitle">
          Merci de mettre à jour toutes les informations : adresse postal num de téléphone ...
        </div>
      <div className={classes.root}>
      <div  className="lines">
            <div  className="lines__line"> <div className="lines__title">nom</div><div className="lines__desc">coco dodo</div></div>
            <div  className="lines__line"> <div className="lines__title">email</div><div className="lines__desc">coco@gmail.com</div></div>
            <div  className="lines__line"> <div className="lines__title">tel</div><div className="lines__desc">09 99 00 88 99</div></div>
            <div  className="lines__line"> <div className="lines__title">addresse</div><textarea className="lines__desc">addresse ...</textarea></div>
            


            <div  className="lines__line"> 
              <div className="lines__last-line-button"> <FaCheckCircle>  </FaCheckCircle>Sauvegarder</div>
          </div>


          </div>
        </div>
      </div>
    </div>
  );
}