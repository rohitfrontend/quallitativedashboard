import React, { Component, useState, useEffect } from 'react'

import Table from 'react-bootstrap/Table';

import axios from 'axios';
import { get , post } from "../../services/CommanService";
import AppHeader from '../../components/AppHeader';

const ViewUpload = () => {
  
    const [uploadList, setUploadList] = useState([]);
    const getUploadList = () => {
      
      get("artical/viewlist").then((response) => {
        console.log('response', response)
        setUploadList(response.data.data)
          })
          .catch(() => {
            // handleLoginFailure({ status: UNAUTHORIZED });
          })
          
    }
    

    useEffect(() => {
        getUploadList();
      }, []);
    return (
        <>
        <div className="page-title">
            <h1 >
              View Upload
            </h1>
            </div>
    <div class="">
      <div class="view-setting">
        
        <table className='table'>
      <thead>
        <tr>
          <th>#</th>
          <th> User Name</th>
          <th>Email</th>
          <th>Client Name</th>
          <th>Month</th>
          <th>Year</th>
          <th>File</th>
          <th>IP</th>
          <th>Created Date</th>
        </tr>
      </thead>
      <tbody>
        {uploadList?.map((list, index) => (
        <tr>
          <td>{index+1}</td>
          <td>{list.username}</td>
          <td>{list.email}</td>
          <td>{list.client_name}</td>
          <td>{list.month}</td>
          <td>{list.year}</td>
          <td><a href={list.file} target="_blank">{list.filename}</a></td>
          <td>{list.ip_address}</td>
          <td>{list.createdAt}</td>
        </tr>
       ))}
      </tbody>
    </table>
      </div>
    </div>
  </>

    )
}

export default ViewUpload

