import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import { FaAngleDown, FaCheckCircle} from 'react-icons/fa';

import "./infoPratique.scss";
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

export default function InfoPratique() {

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
          Informations pratiques
        </div>
        <div className="container-subtitle">
           XXXX YYYY
        </div>
      <div className={classes.root}>
        
    </div>
      </div>
    </div>
  );
}