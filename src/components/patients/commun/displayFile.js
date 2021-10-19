import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import axiosInstance from '../../../services/httpInterceptor' 
import "./ConsultationAdd.scss";

import { CircularProgress } from '@material-ui/core';
import { Document, Page, pdfjs   } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    getFile(fileJson)
  }, []);
  function closeModal() {
    props.onChangeFile(true);
  }
  function getFile(file) {
    setLoading(true);
    const url = `${API_URL}/files/download`;
    axiosInstance.post(url, file).then(response => response.data)
    .then((result) => {
      setFile64(result)
      setLoading(false);
    }
    );
  }

  function onDocumentLoadSuccess(document) {
    setNumPages(document.numPages);
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
          

          { loading && 
            <div className="file__body center-loader"> 
              <CircularProgress size={35} />
            </div>
          }

          { ! loading && 
          <div className="file__body"> 
            {
              fileJson.mimeType === "application/pdf" ?
              <div>
              <Document className="pdf-content"
                file={`data:${fileJson.mimeType};base64,${file64}`}
                onLoadSuccess={onDocumentLoadSuccess}
                  >
                    {Array.apply(null, Array(numPages))
                    .map((x, i)=>i+1)
                    .map(page => <Page pageNumber={page}/>)}
              </Document>
              </div>

              :
              <img src={`data:${fileJson.mimeType};base64,${file64}`} className="image-content"/>
            }
            </div>
          }
        </Modal>
  );
}