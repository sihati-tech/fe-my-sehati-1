import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from 'react-modal';
import axiosInstance from '../../../services/httpInterceptor' 
import "./AnalyseAdd.scss";
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height: '470px',
    width: '500px',
    maxWidth: '80%',
    maxHeight: '80%',
    padding: 0
  }
};
const API_URL = process.env.REACT_APP_URL;

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function ConsultationAdd(props) {
  const [firstName, setFirstName] = useState(props.benif.first_name);
  const [lastName, setLastName] = useState(props.benif.last_name);
  const [birthDate, setBirthDate] = useState(props.benif.birth_date);
  const [familyLink, setFamilyLink] = useState(props.benif.family_link);
  const [sex, setSex] = useState(props.benif.sex);
  const [adresse, setAdresse] = useState(props.benif.adresse);
  const [commune, setCommune] = useState(props.benif.commune);
  const [departement, setDepartement] = useState(props.benif.departement);
  const [region, setRegion] = useState(props.benif.region);
  const [country, setCountry] = useState(props.benif.country);
  const [cellPhone, setCellPhone] = useState(props.benif.cell_phone);
  const [phoneNumber, setPhoneNumber] = useState(props.benif.phone_number);
  const [fax, setFax] = useState(props.benif.fax);
  const [email, setEmail] = useState(props.benif.email_address);
  const [SSN, setSSN] = useState(props.benif.ssn);
  const [CIN, setCIN] = useState(props.benif.CIN);
  const [comment, setComment] = useState(props.benif.comment);

  const classes = useStyles();
  function closeModal() {
    props.onChange(true);
  }

  function handleSubmit(event) {
    const dataToSend = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      birth_date: birthDate,
      family_link: familyLink,
      sex,
      adresse,
      commune,
      departement,
      region,
      country,
      fax,
      CIN,
      comment,
      cell_phone: cellPhone,
      email_address: email,
      ssn: SSN
    }
    console.log('props.benif ', props.benif)
    const url = props.benif._id ? `${API_URL}/benificiares/${props.benif._id}` : `${API_URL}/benificiares`;
    axiosInstance.post(url, dataToSend).then(response => response.data)
    .then((result) => { closeModal() }
    );
  }

  return (
    <Modal
        isOpen={props.isOpen}
          onRequestClose={closeModal.bind(this)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal__header">
            <div className="modal__header-title">
              {
              !props.benif._id ? 'Nouveau analyse' : `Mise à jour d'analyse`
              }
            </div>
            <div className="modal__header-close">
            </div>
          </div>

          <div className="modal__body">

           <div className="modal__body-description"> 
            Les champs obligatoires sont suivi par une *
          </div>


<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} >
          <div className={'content-modal'}>
            <TextField margin="normal" fullWidth label="Nom*" name="lastName" value={lastName} onChange={event => setLastName(event.target.value)} />
            <TextField margin="normal" fullWidth label="Prenom*" name="firstName"  value={firstName} onChange={event => setFirstName(event.target.value)} />
            <TextField margin="normal" fullWidth label="Date de naissance*" name="firstName"  value={birthDate} onChange={event => setBirthDate(event.target.value)} />
            <TextField margin="normal" fullWidth label="Lien de parenté*" name="firstName"  value={familyLink} onChange={event => setFamilyLink(event.target.value)} />
            <TextField margin="normal" fullWidth label="Sexe*" name="firstName"  value={sex} onChange={event => setSex(event.target.value)} />
            <TextField margin="normal" fullWidth label="adresse*" name="firstName"  value={adresse} onChange={event => setAdresse(event.target.value)} />
            <TextField margin="normal" fullWidth label="Commune*" name="firstName"  value={commune} onChange={event => setCommune(event.target.value)} />
            <TextField margin="normal" fullWidth label="Departement*" name="firstName"  value={departement} onChange={event => setDepartement(event.target.value)} />
            <TextField margin="normal" fullWidth label="Region*" name="firstName"  value={region} onChange={event => setRegion(event.target.value)} />
            <TextField margin="normal" fullWidth label="Pays*" name="firstName"  value={country} onChange={event => setCountry(event.target.value)} />
            <TextField margin="normal" fullWidth label="Tel portable*" name="firstName"  value={cellPhone} onChange={event => setCellPhone(event.target.value)} />
            <TextField margin="normal" fullWidth label="Tel fixe*" name="firstName"  value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} />
            <TextField margin="normal" fullWidth label="Fax*" name="firstName"  value={fax} onChange={event => setFax(event.target.value)} />
            <TextField margin="normal" fullWidth label="Email*" name="firstName"  value={email} onChange={event => setEmail(event.target.value)} />
            <TextField margin="normal" fullWidth label="Numéro de sécu Soc*" name="firstName"  value={SSN} onChange={event => setSSN(event.target.value)} />
            <TextField margin="normal" fullWidth label="Numéro CIN*" name="firstName"  value={CIN} onChange={event => setCIN(event.target.value)} />
            <TextField margin="normal" fullWidth label="Commentaire*" name="firstName"  value={comment} onChange={event => setComment(event.target.value)} />
          </div>
          <div className={'footer-modal'}>
          <Button
              variant="contained"
              color="default"
              className={classes.submit}
              onClick={ closeModal }
            > Annuler </Button>
          <Button
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={ handleSubmit }
            > {
              !props.benif._id ? 'Ajouter' : 'Mise à jour'
              } </Button>
          </div>
          
        </form>
      </div>
    </Container>

          </div>

          {/* <div className="modal__footer">
          <div className = {"modal__button"}
            onClick={onCreateChannel.bind(this)}
            disabled={name}
          >Create</div>
          </div> */}
        </Modal>
  );
}