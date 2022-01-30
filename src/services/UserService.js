import Keycloak from "keycloak-js";

import axiosInstance from './httpInterceptor' 
const _kc = new Keycloak('./keycloak.json');

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  _kc.init({
    onLoad: 'login-required'
  })
    .then((authenticated) => {
      console.log('authenticated ', _kc)
      if (!authenticated) {
        console.log("user is not authenticated..!");
      }
      localStorage.setItem('token', _kc.token);
      localStorage.setItem('refreshToken', _kc.refreshToken);
      localStorage.setItem('authenticated', authenticated);
      addOrUpdateUser(_kc);
      onAuthenticatedCallback();
    })
    .catch(console.error);
};
function addOrUpdateUser(_kc) {

  axiosInstance.get(`${process.env.REACT_APP_URL}/patients/filter?email_address=${_kc.tokenParsed.email}`)
  .then(res => {
    if (res.data.length == 0) {
      const data = {
        email_address: _kc.tokenParsed.email,
        last_name: _kc.tokenParsed.family_name,
        first_name: _kc.tokenParsed.given_name,
      };
      
      axiosInstance.post(`${process.env.REACT_APP_URL}/patients`, data)
      .then(response => response.data)
      .then(patient => {
        console.log('patientd ', patient)
        localStorage.setItem('patient', patient._id);
        addOrUpdatePatient(patient)
      })
    } else {
      console.log('res res res ', res)
      localStorage.setItem('patient', res.data[0]._id);
    }
  })
}

function addOrUpdatePatient(patient) {
  const data = {
    username: patient.email_address,
    user_type: {
      kind: 'patients',
      item: patient._id
    },
  };
  axiosInstance.post(`${process.env.REACT_APP_URL}/users`, data)
  .then(res => {
    console.log('user ', res);
  })
}
const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => _kc.tokenParsed.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
  addOrUpdateUser,
};

export default UserService;