import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";
import "./benifDashboard.scss";
import HeaderComponent from '../header/headerComponent'
import Badge from '@material-ui/core/Badge';

import { FaEnvelope} from 'react-icons/fa';
import { useHistory } from "react-router-dom";
import axiosInstance from '../../../services/httpInterceptor' 
import Logo1 from '../../../assets/images/logo1.png';
import Logo2 from '../../../assets/images/logo2.png';
import Logo3 from '../../../assets/images/logo3.png';
import Logo4 from '../../../assets/images/logo4.png';
import Logo5 from '../../../assets/images/logo5.png';
import Logo6 from '../../../assets/images/logo6.png';
import Logo7 from '../../../assets/images/logo7.png';
import Logo8 from '../../../assets/images/logo8.png';

const API_URL = process.env.REACT_APP_URL;

export default function BenifDashboard() {

      const history = useHistory()
      let { id } = useParams();

      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [notification, setNotification] = useState('');

      useEffect( () => {
        const url = `${API_URL}/benificiares/${id}` ;
        axiosInstance.get(url).then(response => response.data)
        .then((result) => { 
          const benif = result[0];
          setFirstName(benif.first_name)
          setLastName(benif.last_name)
        }
        );
        const urlNotif = `${API_URL}/benificiares/${id}/notifications` ;
        axiosInstance.get(urlNotif).then(response => response.data)
        .then((result) => { 
          setNotification(result)
        }
        );
      }, []);


      function navigateTo (url) {
            history.push(url);
      }
return (
<div className="container-wrapper">
  <HeaderComponent></HeaderComponent>
  <div className="container-body">
    <div className="container-title">Bienvenue dans votre tableau de bord</div>
  <div className="container-subtitle">Mr : {firstName} {lastName}</div>

        <div className="container-widget-line">
          <div className="container-widget" onClick={(e) => navigateTo(id + '/consultations')}>
                <div>
                  {
                    notification.countConsultation > 0 ?
                    <Badge badgeContent={notification.countConsultation} color="secondary"> 
                      <img src={Logo1}
                        alt="un triangle aux trois côtés égaux"
                        className="container-img" /> 
                    </Badge> : 
                    <img src={Logo1}
                    alt="un triangle aux trois côtés égaux"
                    className="container-img" /> 
                  }
                  
                  <div className="container-label">Consultation</div>
                </div>
          </div>
          <div className="container-widget" onClick={(e) => navigateTo(id + '/ordonnances')}>
                <div>
                   <img src={Logo2}
                  alt="un triangle aux trois côtés égaux"
                  className="container-img" />
                  <div className="container-label">Ordonnance</div>
                </div>
          </div>
          <div className="container-widget" onClick={(e) => navigateTo(id + '/traitements')}>
          <div>
            {
                notification.countTraitement > 0 ?
                <Badge badgeContent={notification.countTraitement} color="secondary"> 
                  <img src={Logo3}
                    alt="un triangle aux trois côtés égaux"
                    className="container-img" /> 
                </Badge> : 
                <img src={Logo3}
                alt="un triangle aux trois côtés égaux"
                className="container-img" /> 
              }
              <div className="container-label">Traitement</div>
            </div>
          </div>
        </div>


        <div className="container-widget-line">
          <div className="container-widget" onClick={(e) => navigateTo(id + '/analyses')}>
            <div>

              {
                    notification.countAnalyse > 0 ?
                    <Badge badgeContent={notification.countAnalyse} color="secondary"> 
                      <img src={Logo4}
                        alt="un triangle aux trois côtés égaux"
                        className="container-img" /> 
                    </Badge> : 
                    <img src={Logo4}
                    alt="un triangle aux trois côtés égaux"
                    className="container-img" /> 
                  }
                  <div className="container-label">Analyse</div>
                </div>
          </div>
          <div className="container-widget" onClick={(e) => navigateTo(id + '/radios')}>
          <div>

          {
            notification.countRadio > 0 ?
            <Badge badgeContent={notification.countRadio} color="secondary"> 
              <img src={Logo5}
                alt="un triangle aux trois côtés égaux"
                className="container-img" /> 
            </Badge> : 
            <img src={Logo5}
            alt="un triangle aux trois côtés égaux"
            className="container-img" /> 
          }
                  <div className="container-label">Radio/Scanner</div>
                </div>
                
          </div>
          <div className="container-widget" onClick={(e) => navigateTo(id + '/paramedicals')}>
                  <div>
                  <img src={Logo6}
                  alt="un triangle aux trois côtés égaux"
                  className="container-img" />
                  <div className="container-label">Paramedic</div>
                </div>
          </div>
        </div>


        <div className="container-widget-line">
          <div className="container-widget" onClick={(e) => navigateTo(id + '/hospitalisations')}>
                  <div>
          <img src={Logo7}
                alt="un triangle aux trois côtés égaux"
                className="container-img"
                 />
                 <div className="container-label">Hospitalisation</div>
                </div>
          </div>
          <div className="container-widget" onClick={(e) => navigateTo(id + '/informations')}>
                  <div>
          <img src={Logo8}
                alt="un triangle aux trois côtés égaux"
                className="container-img" />
                <div className="container-label">Info pratique</div>
               </div>
          </div>
        </div>
      </div>
    </div>
  );
}