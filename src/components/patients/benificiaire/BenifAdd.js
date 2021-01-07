import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from 'react-modal';
import "./BenifAdd.scss";
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
export default function BenifAdd(props) {
  const [firstName, setFirstName] = useState(props.benif.firstName);
  const [lastName, setLastName] = useState(props.benif.lastName);
  const [birthDate, setBirthDate] = useState(props.benif.birthDate);
  const [familyLink, setFamilyLink] = useState(props.benif.familyLink);
  const [sex, setSex] = useState(props.benif.sex);
  const [adresse, setAdresse] = useState(props.benif.adresse);
  const [commune, setCommune] = useState(props.benif.commune);
  const [departement, setDepartement] = useState(props.benif.departement);
  const [region, setRegion] = useState(props.benif.region);
  const [country, setCountry] = useState(props.benif.country);
  const [cellPhone, setCellPhone] = useState(props.benif.cellPhone);
  const [phoneNumber, setPhoneNumber] = useState(props.benif.phoneNumber);
  const [fax, setFax] = useState(props.benif.fax);
  const [email, setEmail] = useState(props.benif.email);
  const [SSN, setSSN] = useState(props.benif.SSN);
  const [CIN, setCIN] = useState(props.benif.CIN);
  const [comment, setComment] = useState(props.benif.comment);

  useEffect( () => {
    console.log('add benif ', JSON.stringify(props))
  }, []);

  const classes = useStyles();
  function closeModal() {
    props.onChange(true);
  }

  function handleInputChange(event) {
    console.log('firstName ', firstName)
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log('[name]: value ', name, value, target)
    setLastName(value)
    // this.setState({
    //   [name]: value
    // });
  }
  function handleSubmit(event) {
    console.log('firstName ', firstName)
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('[name]: value l ', [name], value)

    // this.setState({
    //   [name]: value
    // });
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
              !props.benif.SSN ? 'Nouveau bénificiare' : 'Mise à jour du bénificiare'
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
        <form className={classes.form} onSubmit={
        handleSubmit
        }>
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
            type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            > Ajouter </Button>
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