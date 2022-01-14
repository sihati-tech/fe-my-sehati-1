import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.scss';
import Login from './components/login/Login';
import PatientDashboard from './components/patients/Dashboard';
import BenifDashboard from './components/patients/benificiaire/BenifDashboard';
import MesConsultations from './components/patients/consultation/MesConsultations';

import InfoPratique from './components/patients/infoPratique/InfoPratique';
import PatientProfile from './components/patients/profile/MonProfile';
import MesAnalyses from './components/patients/analyse/MesAnalyses';
import MesHospitalisations from './components/patients/hospitalisation/MesHospitalisations';
import MesInformations from './components/patients/information/MesInformations';
import MesOrdonnaces from './components/patients/ordonnance/MesOrdonnaces';
import MesParamedicals from './components/patients/paramedical/MesParamedicals';
import MesRadios from './components/patients/radio/MesRadios';
import MesTraitements from './components/patients/traitement/MesTraitements';

import PharmacistDashboard from './components/pharmacists/Dashboard';
import DoctorDashboard from './components/doctors/Dashboard';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { bindActionCreators } from 'redux';
import { windowNav } from "./actions/appName";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    windowNav
  }, dispatch);
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExact: false,
      modalIsOpen: false,
      googleURL: '',
      subGrouptTypeSelected: '',
      path: '',
    };
  }
  componentDidMount(){
    // const socket = io.connect(process.env.REACT_APP_WS, {
    //   transports: ['websocket']
    // })
    // socket.on('connect', () => {
    //   socket.on(localStorage.id, (data) => {

    //     toast.info('you have new invitation to channel :' + data.channelName);
    //   })
    // })
  }
  render() {
    const createRedirect = to => () => <Redirect to={to} />
    return (
      <Router>
        <ToastContainer />
        <div className={"appContainer"}>
          <Switch> 
            
                <Route exact path="/Login">
                  <Login />
                </Route>

                <Route exact path="/patient/dashboard"> <PatientDashboard /> </Route>
                <Route exact path="/patient/profile"> <PatientProfile /> </Route>
                <Route exact path="/patient/pratique"> <InfoPratique /> </Route>
                <Route exact path="/patient/user/:id"> <BenifDashboard /> </Route>
                <Route exact path="/patient/user/:id/consultations"> <MesConsultations/> </Route>
                <Route exact path="/patient/user/:id/analyses"> <MesAnalyses/> </Route>
                <Route exact path="/patient/user/:id/hospitalisations"> <MesHospitalisations/> </Route>
                <Route exact path="/patient/user/:id/informations"> <MesInformations/> </Route>
                <Route exact path="/patient/user/:id/ordonnances"> <MesOrdonnaces/> </Route>
                <Route exact path="/patient/user/:id/paramedicals"> <MesParamedicals/> </Route>
                <Route exact path="/patient/user/:id/radios"> <MesRadios/> </Route>
                <Route exact path="/patient/user/:id/traitements"> <MesTraitements/> </Route>

                <Route exact path="/doctor/dashboard"> <DoctorDashboard /> </Route>
                <Route exact path="/pharmacist/dashboard"> <PharmacistDashboard /> </Route>
                {
                  localStorage.authenticated ? 
                  <Route path="/*" component={createRedirect("/patient/dashboard")} /> : null
                }
              </Switch>
          {/* <Route path="/patient/dashboard" component={PatientDashboard} />  */}
        </div>
      </Router>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
