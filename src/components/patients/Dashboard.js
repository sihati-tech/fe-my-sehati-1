import React, { useState, useEffect }  from "react";
import "./Dashboard.scss";
import HeaderComponent from './header/headerComponent'
import { useHistory } from "react-router-dom";
import { FaUserEdit, FaUserPlus, FaTrash} from 'react-icons/fa';
import BenifAdd from './benificiaire/BenifAdd'
import WarningMessage from '../../shared/component/WarningMessage'

const mockBenif = [
  { id: '232391', firstName: 'Ali', lastName: 'EL omari', email: 'test@gmail.com', cellPhone: '06 56 66 43 34', SSN: 'A09 9003 99390'},
  { id: '232392', firstName: 'Ahmed', lastName: 'Amari', email: 'test@gmail.com', cellPhone: '06 56 66 43 34', SSN: 'A09 9003 99390'},
  { id: '232393', firstName: 'Said', lastName: 'Twel', email: 'test@gmail.com', cellPhone: '06 56 66 43 34', SSN: 'A09 9003 99390'},
  { id: '232394', firstName: 'KAmal', lastName: 'EL ahmadi', email: 'test@gmail.com', cellPhone: '06 56 66 43 34', SSN: 'A09 9003 99390'},
  { id: '232395', firstName: 'Mohammed', lastName: 'EL kawtari', email: 'test@gmail.com', cellPhone: '06 56 66 43 34', SSN: 'A09 9003 99390'},
  { id: '232396', firstName: 'Safae', lastName: 'Amine', email: 'test@gmail.com', cellPhone: '06 56 66 43 34', SSN: 'A09 9003 99390'},
  { id: '232397', firstName: 'Ikram', lastName: 'Green', email: 'test@gmail.com', cellPhone: '06 56 66 43 34', SSN: 'A09 9003 99390'},
  { id: '232398', firstName: 'Nawal', lastName: 'Dewar', email: 'test@gmail.com', cellPhone: '06 56 66 43 34', SSN: 'A09 9003 99390'},
  { id: '232399', firstName: 'Jawad', lastName: 'mochad', email: 'test@gmail.com', cellPhone: '06 56 66 43 34', SSN: 'A09 9003 99390'},
  { id: '232390', firstName: 'Nawfal', lastName: 'Dior', email: 'test@gmail.com', cellPhone: '06 56 66 43 34', SSN: 'A09 9003 99390'},
]

export default function PatientDashboard() {

  const history = useHistory();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [benif, setBenif] = useState({});

  function navigateTo (url) {
    history.push(url);
  }
  function selectBenif(benif) {
    const benifId = benif.id;
    navigateTo('/patient/user/' + benifId)
  }
  function deleteBenif(e, benif) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIsOpenWarning(true)
  }
  function editBenif(e, benif) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setBenif(benif)
    console.log('benif ', benif)
    setIsOpen(true)
  }
  function addBenif() {
    setBenif({})
    setIsOpen(true)
  }
  function onChange(value) { 
    console.log('value')
    setIsOpen(false) 
  }
  function onConfirm(value) { 
    console.log('confirm delete')
    setIsOpenWarning(false)
  }
  function onCloseWarning(value) { 
    console.log('close warning')
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
          isOpenWarning={isOpenWarning}
          onCloseWarning={onCloseWarning}
          
          onConfirm={onConfirm}></WarningMessage>
      <div className="container-body">
        <div className="container-title"> Liste des bénificiares</div>
        <div className="container-subtitle">Bienvenue sur My Sihati, pour commencer veuillez seletionner un BENEFICIAIRE:</div>
        

        <div className="container-list-benif">
        <div className="container-item-benif container-button-add" onClick={(e) => addBenif()} > <FaUserPlus></FaUserPlus> Ajouter un bénificiare</div>
        {
          mockBenif.map((benif, index) => {
            return (
              <div className="container-item-benif" onClick={(e) => selectBenif(benif)}>
                <div className="container-benif-label">{benif.lastName} {benif.firstName}</div>
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