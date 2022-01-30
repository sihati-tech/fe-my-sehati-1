import React, { useState, useEffect }  from "react";
import "./Dashboard.scss";
import HeaderComponent from './header/headerComponent'
import { useHistory } from "react-router-dom";
import { FaUserEdit, FaUserPlus, FaTrash} from 'react-icons/fa';
import BenifAdd from './benificiaire/BenifAdd'
import WarningMessage from '../../shared/component/WarningMessage'
import axiosInstance from '../../services/httpInterceptor' 

const API_URL = process.env.REACT_APP_URL;

export default function PatientDashboard() {
  const history = useHistory();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [benif, setBenif] = useState({});
  const [deleteBenifState, setDeleteBenifState] = useState('');
  const [benifList, setBenifList] = useState([]);


  useEffect( () => {
    refreshList()
  }, []);

  function refreshList () {
    setTimeout(() => {
      const url = `${API_URL}/benificiares?patient=${localStorage.patient}`;
      axiosInstance.get(url).then(response => response.data)
      .then((result) => {
        setBenifList(result)
        }
      );
    }, 1000);
  }
  function navigateTo (url) {
    history.push(url);
  }
  function selectBenif(benif) {
    const benifId = benif._id;
    navigateTo('/patient/user/' + benifId)
  }
  function deleteBenif(e, benif) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIsOpenWarning(true)
    setDeleteBenifState(benif._id)
  }
  function editBenif(e, benif) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setBenif(benif)
    setIsOpen(true)
  }
  function addBenif() {
    setBenif({})
    setIsOpen(true)
  }
  function onChange(value) { 
    setIsOpen(false) 
    refreshList();
  }
  function onConfirm(value) { 
    const url = `${API_URL}/benificiares/${deleteBenifState}?patient=${localStorage.patient}`;
    axiosInstance.delete(url).then(response => response.data)
    .then((result) => {
      setIsOpenWarning(false)
      refreshList()
    });
  }
  function onCloseWarning(value) { 
    setIsOpenWarning(false)
  }
  return (
    <div className="container-wrapper">
      <HeaderComponent></HeaderComponent>
      {
        isOpen ? 
        <BenifAdd
          onChange={onChange}
          isOpen={isOpen}
          benif= {benif}
          ></BenifAdd>
      : null
      }
          <WarningMessage 
              onCloseWarning={onCloseWarning}
              isOpenWarning={isOpenWarning}
              deleteBenifState={deleteBenifState}
              onConfirm={onConfirm}>
          </WarningMessage>
      <div className="container-body">
        <div className="container-title"> Liste des bénificiares</div>
        <div className="container-subtitle">Bienvenue sur My Sihati, pour commencer veuillez seletionner un BENEFICIAIRE:</div>
        

        <div className="container-list-benif">
        <div className="container-item-benif container-button-add" onClick={(e) => addBenif()} > <FaUserPlus></FaUserPlus> Ajouter un bénificiare</div>
        {
          benifList.map((benif, index) => {
            return (
              <div className="container-item-benif" onClick={(e) => selectBenif(benif)}>
                <div className="container-benif-label">{benif.last_name} {benif.first_name}</div>
                <div className="container-benif-icon" onClick={(e) => deleteBenif(e, benif)} > <FaTrash></FaTrash> </div>
                <div className="container-benif-icon" onClick={(e) => editBenif(e, benif)} > <FaUserEdit></FaUserEdit> </div>
              </div>
            )
          })
        }
        </div>
      </div>
    </div>
  );
}