import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from 'react-modal';
import axiosInstance from '../../../services/httpInterceptor' 
import { FaTrash } from 'react-icons/fa';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./ConsultationAdd.scss";
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
const filterList = [
  {code: 'Generalist', label: 'Généraliste'},
  {code: 'Specialist', label: 'Spécialiste'},
  {code: 'Dentiste', label: 'Dentiste'},]
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
export default function DisplayFile(props) {
  const [fileJson, setFileJson] = useState(props.fileJson);
  const [file64, setFile64] = useState(null);

  useEffect( () => {
    getFile(fileJson)
  }, []);
  function closeModal() {
    props.onChangeFile(true);
  }
  function getFile(file) {
    const url = `${API_URL}/files/download`;
    axiosInstance.post(url, file).then(response => response.data)
    .then((result) => {setFile64(result)}
    );
  }

  return (
    <Modal
        isOpen={props.isOpen}
          onRequestClose={closeModal.bind(this)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="file__header">
            <div className="file__header-title">
            {fileJson.name}
            </div>
            <div className="file__header-close">
            </div>
          </div>

          <div className="file__body"> 
          { 
            fileJson.mimeType === "application/pdf" ?
            <iframe src={`data:${fileJson.mimeType};base64,${file64}`} className="pdf-content"/>
            :
            <img src={`data:${fileJson.mimeType};base64,${file64}`} className="image-content"/>
          }
          </div>
        </Modal>
  );
}