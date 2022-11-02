import React, { Component, useState, useEffect } from 'react'

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { EditIcon, DeleteIcon } from "../../Icons/icons.component";
import swal from 'sweetalert';
import AppHeader from '../../components/AppHeader';
import axios from 'axios'; 
import { get , post, put, deleteMethod } from "../../services/CommanService";
import { pureFinalPropsSelectorFactory } from 'react-redux/es/connect/selectorFactory';

const ViewSetting = () => {
  
    const [settingList, setSettingList] = useState([]);
    const getSettingList = () => {
      
      get("artical/get-setting").then((response) => {
        setSettingList(response.data.settings)
          })
          .catch(() => {
            // handleLoginFailure({ status: UNAUTHORIZED });
          })
          
    }

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
const [editData, setEditData] = useState({})
const [editMode, setEditMode] = useState(false)
  const editOpen = (editData) => {
    handleShow()
    setEditMode(true)
    setEditData(editData);
  }

  const saveSetting = () => {
    console.log('editData', editData)
    put("artical/update-setting/"+editData.id, editData).then((response) => {
        swal("Success!", "Setting successfully updated", "success");
        handleShow()
    setEditMode(false)
    setEditData({});
    getSettingList();
    handleClose()
        // swal({
        //     icon: "success",
        //   });
          })
          .catch(() => {
            // handleLoginFailure({ status: UNAUTHORIZED });
          })
  }

  const deleteSetting = (id) => {
    deleteMethod("artical/delete-setting/"+id).then((response) => {
        swal("Success!", "Setting successfully deleted", "success");
        getSettingList()
          })
          .catch(() => {
            // handleLoginFailure({ status: UNAUTHORIZED });
          })
  }

    useEffect(() => {
        getSettingList();
      }, []);
    return (
        <>
    


    <div className="page-title">
            <h1 >
              View Setting
            </h1>
            </div>
      <div class="view-setting">
        
        <table className='table'>
      <thead>
        <tr>
          <th>#</th>
          
          <th>Client Name</th>
          <th>Grpah Type</th>
          <th>Entity Level</th>
          <th>Publication Level</th>
          <th>Journlist Level</th>
          <th>City Level</th>
          <th>Keyword Level</th>
          <th>Topic Level</th>
          <th>Spokesperson Level</th>
          <th>Profiling Level</th>
          <th>Visibility Level</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {settingList?.map((list, index) => (
        <tr>
          <td>{index+1}</td>
          <td>{list.client_name}</td>
          <td>{list.graph_type}</td>
          <td>{list.entity_level === true ? 'Yes' : 'No'}</td>
          <td>{list.publication_level === true ? 'Yes' : 'No'}</td>
          <td>{list.journalist_level === true ? 'Yes' : 'No'}</td>
          <td>{list.city_level === true ? 'Yes' : 'No'}</td>
          <td>{list.keyword_level === true ? 'Yes' : 'No'}</td>
          <td>{list.topic_level === true ? 'Yes' : 'No'}</td>
          <td>{list.spokesperson_level === true ? 'Yes' : 'No'}</td>
          <td>{list.profiling_level === true ? 'Yes' : 'No'}</td>
          <td>{list.visibility_level === true ? 'Yes' : 'No'}</td>
            <td ><a onClick={e=> editOpen(list)} href="javascript:void(0)"><EditIcon  /></a> <a href="javascript:void(0);" onClick={e => deleteSetting(list.id)} className='deleicon'><DeleteIcon /></a></td>
        </tr>
       ))}
      </tbody>
    </table>
      </div>


    <Modal show={show} onHide={handleClose}>
    {editMode && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{editData.graph_type}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
            <div class="container ">
  <div class="row">
            <div class="col-9">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1" checked={editData.entity_level} onChange={e=> setEditData({...editData, entity_level:  e.target.checked})} />
              <label class="form-check-label" for="flexCheckDefault1">
                Entity Level
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked2"  checked={editData.publication_level} onChange={e=> setEditData({...editData, publication_level : e.target.checked})} />
              <label class="form-check-label" for="flexCheckChecked2">
                Publication Level
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3"  checked={editData.journalist_level} onChange={e=> setEditData({...editData, journalist_level :e.target.checked})} />
              <label class="form-check-label" for="flexCheckDefault3">
                Journlist Level
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked4"  checked={editData.city_level} onChange={e=> setEditData({...editData, city_level : e.target.checked})} />
              <label class="form-check-label" for="flexCheckChecked4">
                City  Level
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked5"  checked={editData.keyword_level} onChange={e=> setEditData({...editData, keyword_level : e.target.checked})} />
              <label class="form-check-label" for="flexCheckChecked5">
                Keyword Level
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked9"  checked={editData.topic_level} onChange={e=> setEditData({...editData, topic_level : e.target.checked})}/>
              <label class="form-check-label" for="flexCheckChecked9">
              Topic Level
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked6"  checked={editData.spokesperson_level} onChange={e=> setEditData({...editData, spokesperson_level : e.target.checked})} />
              <label class="form-check-label" for="flexCheckChecked6">
              Spokesperson Level
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked7"  checked={editData.profiling_level} onChange={e=> setEditData({...editData, profiling_level : e.target.checked})}/>
              <label class="form-check-label" for="flexCheckChecked7">
              Profiling Level
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked8"  checked={editData.visibility_level} onChange={e=> setEditData({...editData, visibility_level : e.target.checked})}/>
              <label class="form-check-label" for="flexCheckChecked8">
              Visibility Level
              </label>
            </div>
              
            </div>
            
            </div>
            </div>
             
          </Modal.Body>
          </>
          )}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={saveSetting}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
  </>

    )
}

export default ViewSetting

