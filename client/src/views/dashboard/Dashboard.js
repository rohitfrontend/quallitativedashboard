import React, { Component, useState, useEffect } from 'react'


import axios from 'axios';
// import { get } from "../../../services/CommanService";
import myData from '../../assets/geoJson/client.json';

const Dashboard = () => {
  
    const [clientList, setClientList] = useState([]);
    const getClientList = () => {
      var config = {
        method: 'POST',
        url: 'https://betadevapi.conceptbiu.com/app/client/clientslist',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMjI4MCRHb2RyZWpfY29yQGNvbmNlcHRiaXUuY29tIn0.GH2rYa8tLt0wnTnU1sDn6nY_MCbLtQxPD_tHfn2Z_LY',
          "Access-Control-Allow-Origin": 'http://localhost:3000'

        //   'Access-Control-Allow-Headers': 'Content-Type, 139.59.53.62ization'
        },
      };
      axios(config).then((response) => {
        console.log('response', response)
            setClientList(response.data.result)
          })
          .catch(() => {
            // handleLoginFailure({ status: UNAUTHORIZED });
          })
          // .finally(() => setIsLoading(false));
       setClientList(myData.result)
        //   .finally(() => setIsLoading(false));
    }
    const [client_id, setClientId] = useState()
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const upload = async () => {

        const formData = new FormData(); 
     
      formData.append('file', file);
      formData.append('client_id', client_id);
      formData.append('month', month)
      formData.append('year', year) 
        var config = {
            method: 'POST',
            url: 'http://localhost:4000/artical',
            data: formData
          };
        
        return axios(config).then((response) => {
                
               console.log(response)
              })
              .catch(() => {
                // handleLoginFailure({ status: UNAUTHORIZED });
              })
            //   .finally(() => setIsLoading(false));;
    } 
    const [file, setFile] = useState('')
    const onFileChange = event => { 
        // Update the state 
        setFile(event.target.files[0]); 
      }; 

    useEffect(() => {
        getClientList();
      }, []);
    return (
        <>
    

    <div class="row g-5">
      
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Upload Qualitative Report</h4>
        <form class="needs-validation"  novalidate>
          <div class="row g-3">
            

          <div class="col-12">
              <label for="country" class="form-label">Client</label>
              <select class="form-select" onChange={e => setClientId(e.target.value)} id="country" required>
                <option value="">Choose...</option>
                {clientList?.map((item, index) => (
                    <option value={item.id}>{item.client_name}</option>
                ))}
                
              </select>
              {/* <div class="invalid-feedback">
                Please select a valid country.
              </div> */}
            </div>

            <div class="col-12">
              <label for="state" class="form-label">Month</label>
              <select class="form-select" id="state"  onChange={e => setMonth(e.target.value)} required>
                <option value="">Choose...</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
              </select>
              
            </div> 
            <div class="col-12">
              <label for="state" class="form-label">Year</label>
              <select class="form-select" id="state"  onChange={e => setYear(e.target.value)} required>
                <option value="">Choose...</option>
                <option value={2021}>2021</option>
                <option value={2022}>2022</option>
              </select>
             
            </div>

            <div class="col-md-3">
              <label for="zip" class="form-label">Document</label>
              <input type="file" class="form-control" id="zip" onChange={onFileChange} placeholder="" required />
              {/* <div class="invalid-feedback">
                Zip code required.
              </div> */}
            </div>
          </div>

<br></br>
<br></br>

          <button class="w-100 btn btn-primary btn-lg"  type="button" onClick={e => upload()}>Upload</button>
        </form>
      </div>
    </div>
  </>

    )
}

export default Dashboard

