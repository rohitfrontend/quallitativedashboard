import React, { Component, useState, useEffect } from 'react'
import Select from 'react-select'
import swal from 'sweetalert';
import AppHeader from '../../components/AppHeader'

import { ProgressBar } from "react-bootstrap"

import axios from 'axios';
import { get, post } from "../../services/CommanService";
import myData from '../../assets/geoJson/client.json';
import { store } from '../../store/store';

const graphType = [
  {
    label: 'Share of Voice',
    value: 1,
  },
  {
    label: 'Thematic Analysis',
    value: 2
  },
  {
    label: 'Geographical Spread',
    value: 3
  },
  {
    label: 'Journalist',
    value: 4
  },
  {
    label: 'Spokesperson',
    value: 5
  },
  {
    label: 'Sentiment',
    value: 6
  },
  {
    label: 'Keyword Analysis',
    value: 7
  },
  {
    label: 'Publication',
    value: 8
  },
  {
    label: 'Visibility',
    value: 9
  }

]
const Dashboard = () => {
  const state = store.getState();
  console.log('state', state)
  const [clientList, setClientList] = useState([]);
  const [setting, setSetting] = useState([])
  // const getClientList = () => {
  //   var config = {
  //     method: 'POST',
  //     url: 'https://betadevapi.conceptbiu.com/app/client/clientslist',
  //     headers: { 
  //       'Content-Type': 'application/json', 
  //       'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiMjI4MCRHb2RyZWpfY29yQGNvbmNlcHRiaXUuY29tIn0.GH2rYa8tLt0wnTnU1sDn6nY_MCbLtQxPD_tHfn2Z_LY',
  //       "Access-Control-Allow-Origin": 'http://localhost:3000'

  //     //   'Access-Control-Allow-Headers': 'Content-Type, 139.59.53.62ization'
  //     },
  //   };
  //   post("users/clientlist").then((response) => {
  //     console.log('response', response)
  //         setClientList(response.data.result)
  //       })
  //       .catch(() => {
  //         // handleLoginFailure({ status: UNAUTHORIZED });
  //       })
  //       // .finally(() => setIsLoading(false));
  //    setClientList(myData.result)
  //     //   .finally(() => setIsLoading(false));
  // }
  const [client_id, setClientId] = useState()
  const [client_name, setClientName] = useState()
  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [graphTypes, setGraphTypes] = useState(graphType)
  const [graphTypeName, setGraphTypeName] = useState()
  const [entityLevel, setEntityLevel] = useState(false)
  const [publicationLevel, setPublicationLevel] = useState(false)
  const [journalistLevel, setjournalistLevel] = useState(false)
  const [cityLevel, setCityLevel] = useState(false)
  const [keywordLevel, setKeywordLevel] = useState(false)
  const [spokespersonLevel, setSpokespersonLevel] = useState(false);
  const [profilingLevel, setProfilingLevel] = useState(false);
  const [visibilityLevel, setVisibilityLevel] = useState(false)
  const [topicLevel, setTopicLevel] = useState(false)
  const [ip, setIP] = useState('');
  const [graphTypeId, setGraphTypeId] = useState()
  const [is_vertical, setIsVertical] = useState(0)
  const [verticals, setVerticals] = useState([])
  const [vertical, setVertical] = useState()

  const [isIndex, setIndex] = useState(false);
  const [isReach, setReach] = useState(false);
  const [progress, setProgress] = useState()

  const uploadRef = React.useRef();
  const statusRef = React.useRef();
  const loadTotalRef = React.useRef();
  const progressRef = React.useRef();


  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data.IPv4)
  }
  const upload = async () => {
    setIsLoading(true);
    setClientName();
    setClientId()
    const formData = new FormData();

    formData.append('upload', file);
    formData.append('client_id', client_id);
    formData.append('client_name', client_name);
    formData.append('month', month)
    formData.append('year', year)
    formData.append('username', state.auth.auth.first_name + ' ' + state.auth.auth.last_name);
    formData.append('email', state.auth.auth.email)
    formData.append('ip_address', ip)
    formData.append('setting', JSON.stringify(setting))
    formData.append('verticals', JSON.stringify(verticals))
    formData.append('is_vertical', is_vertical)
    formData.append('isIndex', isIndex)
    formData.append('isReach', isReach)
    var config = {
      method: 'POST',
      url: 'http://qa.conceptbiu.com/unifiedapi/artical',
      data: formData,
      onUploadProgress: data => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total))
        if(Math.round((100 * data.loaded) / data.total) === 100){
          swal("Success!", "Upload document done", "success");
        }
      },
    };
    var xhr = new XMLHttpRequest();
    // xhr.upload.addEventListener("progress", ProgressHandler, false);
    xhr.addEventListener("load", SuccessHandler, false);
    xhr.addEventListener("error", ErrorHandler, false);
    xhr.addEventListener("abort", AbortHandler, false);
    xhr.open("POST", "http://qa.conceptbiu.com/unifiedapi/artical");
    xhr.send(formData);

    // return axios(config).then((response) => {
    //   setGraphTypeName('');
    //   setGraphTypeId('')
    //   emptyLevel()
    //   setSetting([])
    //   setVerticals([])
    //   setVertical('')
    //   // setIsLoading(false)
      
    // })
    //   .catch(() => {
    //     // setIsLoading(false)
    //     // handleLoginFailure({ status: UNAUTHORIZED });
    //   })
    //   .finally(() => setIsLoading(false));;
  }
  const [file, setFile] = useState('')
  const onFileChange = event => {
    // Update the state 
    setFile(event.target.files[0]);
  };

  const ProgressHandler = (e) => {
    setIsLoading(false);
    loadTotalRef.current.innerHTML = `uploaded ${e.loaded} bytes of ${e.total}`;
    var percent = (e.loaded / e.total) * 100;
    progressRef.current.value = Math.round(percent);
    statusRef.current.innerHTML = Math.round(percent) + "% uploaded...";
   
  };

  const SuccessHandler = (e) => {
    setIsLoading(false);

    statusRef.current.innerHTML = JSON.parse(e.target.responseText).message;
    progressRef.current.value = 0;
  };
  const ErrorHandler = () => {
    setIsLoading(false);
    statusRef.current.innerHTML = "upload failed!!";
  };
  const AbortHandler = () => {
    setIsLoading(false);

    statusRef.current.innerHTML = "upload aborted!!";
  };


  const clientChange = (e) => {
    setClientName(e.label);
    setClientId(e.value)
  }
  const emptyLevel = () => {
    setCityLevel(false);
    setEntityLevel(false)
    setPublicationLevel(false)
    setjournalistLevel(false)
    setKeywordLevel(false)
    setSpokespersonLevel(false)
    setProfilingLevel(false);
    setVisibilityLevel(false)
    setTopicLevel(false)
  }

  const setGraphTypeChange = (e) => {
    console.log('graphTypes[e.target.value]', graphTypes[e.target.value - 1])
    setGraphTypeId(e.target.value)
    setGraphTypeName(graphTypes[e.target.value - 1].label)
    emptyLevel()
  }

  const addSetting = (e) => {
    const currentSetting = {
      graph_type: graphTypeName,
      city_level: cityLevel,
      entity_level: entityLevel,
      publication_level: publicationLevel,
      journalist_level: journalistLevel,
      keyword_level: keywordLevel,
      spokesperson_level: spokespersonLevel,
      profiling_level: profilingLevel,
      visibility_level: visibilityLevel,
      topic_level: topicLevel,
      graph_id: graphTypeId
    }
    let newSetting = [...setting];
    newSetting.push(currentSetting)
    setSetting(newSetting);
    setGraphTypeName('');
    setGraphTypeId('')
    emptyLevel()
  }
  const deleteLevel = (index) => {
    let newSetting = [...setting];
    newSetting.splice(index, 1)
    setSetting(newSetting);
  }

  const addVertical = () => {
    let newvertical = [...verticals];
    newvertical.push(vertical)
    setVerticals(newvertical)
    setVertical('')
  }
  const deleteVertical = (index) => {
    let newvertical = [...verticals];
    newvertical.splice(index, 1)
    setVerticals(newvertical);
  }

  useEffect(() => {
    // getClientList();
    setClientList(myData.result)
    getData()
  }, [myData]);
  return (
    <>
    
<AppHeader/>
<div class="uqr-contents">
  
  <div class="container-fluid">
          <form class="needs-validation" novalidate>
            <div class="row g-3">

            <div class="col-12">
        <div className='client-section'>
          <label for="country" class="form-label">Client</label>
          {/* <select class="form-select" onChange={e => setClientId(e.target.value)} id="country" required>
            <option value="">Choose...</option>
            {clientList?.map((item, index) => (
                <option value={item.id}>{item.client_name}</option>
            ))}
            
          </select> */}
          <Select onChange={e => clientChange(e)} options={clientList?.map((e) => ( {
            value: e.id,
            label: e.client_name
}))} />
          {/* <div class="invalid-feedback">
            Please select a valid country.
          </div> */}
        </div>
        </div>
        <div class="col-6">
          <label for="state" class="form-label">Month</label>
          <select class="form-select" id="state"  onChange={e => setMonth(e.target.value)} required>
            <option value="">Choose...</option>
            <option value={"January"}>January</option>
            <option value={"February"}>February</option>
            <option value={"March"}>March</option>
            <option value={"April"}>April</option>
            <option value={"May"}>May</option>
            <option value={"June"}>June</option>
            <option value={"July"}>July</option>
            <option value={"August"}>August</option>
            <option value={"September"}>September</option>
            <option value={"October"}>October</option>
            <option value={"November"}>November</option>
            <option value={"December"}>December</option>
          </select>
          
        </div> 
        <div class="col-6">
          <label for="state" class="form-label">Year</label>
          <select class="form-select" id="state"  onChange={e => setYear(e.target.value)} required>
            <option value="">Choose...</option>
            <option value={2021}>2021</option>
            <option value={2022}>2022</option>
            <option value={2023}>2023</option>
          </select>
         
        </div>

        <div class="col-12">
          <label for="state" class="form-label">Graph Type</label>
          <select class="form-select" id="state" onChange={e => setGraphTypeChange(e)} required>
                  <option value="">Choose...</option>
                  {graphTypes?.map((e) => (
                    <option disabled={setting.filter(s => s.graph_type === e.label).length === 1} value={e.value}>{e.label}</option>
                  ))}
                </select>
         
        </div>
        {graphTypeName && (
        <div class="container graph-options">
        <div class="col-12">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1" checked={entityLevel} onChange={e=> setEntityLevel(e.target.checked)} />
          <label class="form-check-label" for="flexCheckDefault1">
            Entity Level
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked2" checked={publicationLevel} onChange={e=> setPublicationLevel(e.target.checked)} />
          <label class="form-check-label" for="flexCheckChecked2">
            Publication Level
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3" checked={journalistLevel} onChange={e=> setjournalistLevel(e.target.checked)} />
          <label class="form-check-label" for="flexCheckDefault3">
            Journlist Level
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked4" checked={cityLevel} onChange={e=> setCityLevel(e.target.checked)} />
          <label class="form-check-label" for="flexCheckChecked4">
            City  Level
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked5" checked={keywordLevel} onChange={e=> setKeywordLevel(e.target.checked)} />
          <label class="form-check-label" for="flexCheckChecked5">
            Keyword Level
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked9" checked={topicLevel} onChange={e=> setTopicLevel(e.target.checked)} />
          <label class="form-check-label" for="flexCheckChecked9">
            Topic Level
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked6" checked={spokespersonLevel} onChange={e=> setSpokespersonLevel(e.target.checked)} />
          <label class="form-check-label" for="flexCheckChecked6">
          Spokesperson Level
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked7" checked={profilingLevel} onChange={e=> setProfilingLevel(e.target.checked)} />
          <label class="form-check-label" for="flexCheckChecked7">
          Profiling Level
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked8" checked={visibilityLevel} onChange={e=> setVisibilityLevel(e.target.checked)} />
          <label class="form-check-label" for="flexCheckChecked8">
          Visibility Level
          </label>
        </div>
          
        </div>
        <div class="col-12 ">
        <button class="btn btn-primary" onClick={e => addSetting()}  type="button" >ADD GRAPH TYPE</button>
        </div>

        </div>
         )}
        <div class="col-12 ">
{setting?.map((e, index) => (
        <div class="card" key={index} style={{ width: "18rem"}}>
<div class="card-body">
<h5 class="card-title">{e.graph_type}</h5>
{/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
{e.entity_level === true && <p class="card-text">Entity Level :  Yes</p> }
{e.publication_level === true && <p class="card-text">Publication Level : Yes</p> }
{e.journlist_level === true && <p class="card-text">Journlist Level :  Yes</p>}
{e.city_level === true && <p class="card-text">City Level : Yes</p>}
{e.keyword_level === true && <p class="card-text">Keyword Level :  Yes</p>}
{e.spokesperson_level === true && <p class="card-text">Spokesperson Level :  Yes</p>}
{e.profiling_level === true && <p class="card-text">Profiling Level :  Yes</p>}
{e.visibility_level === true && <p class="card-text">Visibility Level :  Yes</p>}
<a href="javascript:void(0)" onClick={e => deleteLevel(index)} class="card-link">Remove</a>
</div>
</div>
))}
</div>

              <div class="col-12">
                <label for="vertical" class="form-label">Vertical</label>
                <select class="form-select" id="vertical" onChange={e => setIsVertical(e.target.value)} required>
                  <option value="">Choose...</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>

              </div>
              {is_vertical === "1" && (
                <div class="col-12 ">
                {/* <label for="vertical" class="form-label">Add </label> */}
                <input type="text" class="form-control" id="vertical" onChange={e => setVertical(e.target.value)}  placeholder=""  />
              
                      

                    <div class="col-12 mt-10">
                      <button class="btn btn-primary" onClick={e => addVertical ()} type="button" >Add Vertical</button>
                    </div>
                </div>
              )}
              <div class="col-12 ">
                  {verticals?.map((e, index) => (
                    <div class="card" key={index} style={{ width: "18rem" }}>
                      <div class="card-body">
                        <h5 class="card-title">{e}</h5>
                       
                        <a href="javascript:void(0)" onClick={e => deleteVertical(index)} class="card-link">Remove</a>
                      </div>
                    </div>
                  ))}

                </div>
                <div class="col-12">
                <label for="state" class="form-label">Filter</label>
                <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="index" checked={isIndex} onChange={e => setIndex(e.target.checked)} />
                        <label class="form-check-label" for="index">
                         Index
                        </label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="reach" checked={isReach} onChange={e => setReach(e.target.checked)} />
                        <label class="form-check-label" for="reach">
                        Reach '000
                        </label>
                      </div>

              </div>
              <div class="col-12 ">
                <label for="zip" class="form-label">Document</label>
                <input type="file" class="form-control" id="zip" onChange={onFileChange} placeholder="" required />
                <div class="mt-10 img-note">
               Check the sample file before upload <a href="" target="_blank">Sample file</a>
              </div>
              </div>
            </div>

            <br></br>
           {isLoading && <h5 class="loading">uploading</h5> }
      <p ref={statusRef}></p>

            <button class="btn btn-primary btn-medium" type="reset" onClick={e => upload()}>Upload</button> 
          </form>
        </div>
      </div>
    </>

  )
}

export default Dashboard

