import React, { useEffect, useState } from 'react'
import ContactForm from './ContactForm'
import firebaseDB  from '../firebase'


function Contacts() {

    var [currentId, setCurrentId] = useState(''); //For delete & update purpose

    var [userData, setUserData] = useState({}); //state for data

    //$ Function to fetch (GET) data from database
    useEffect(() => {
          /*On any change in contacts collection useEffect runs, & it returns an object (snap)
         & we get the values by using snap.val(), then we set the state of fetchData by passing
         snap.val(), we're use ...snap.val() because we want the previous values of the object as well  
         In place of snap we can use any variable name. 
        */
        firebaseDB.child('contacts').on('value', snapshot => {
            if (snapshot.val() != null) {
                setUserData({
                    ...snapshot.val()
                });
            }
        })
    }, [])


    //> Function to add (POST) amd PUT/PATCH data to firebase database
    const addOrEdit = (obj) => {
        if (currentId == '')
        firebaseDB.child('contacts').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
        else
        firebaseDB.child(`contacts/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
      }
  
      //* Function to DELETE data to firebase database
      const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?')) {
            firebaseDB.child(`contacts/${id}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                })
        }
      }

      
    return (
        <>
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4 text-center"> Contact Register </h1>
            </div>
        </div>

        <div className="row">
        
            {/* Fot adding data*/}
            <div className="col-md-5">
                <ContactForm {...({ currentId, userData, addOrEdit })} ></ContactForm>
            </div>

            {/* Fot fetching data*/}
            <div className="col-md-7">
                <table className="table table-borderless table-striped">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            Object.keys(userData).map((key) => (
                                 <tr key={key}>
                                    <td>{ userData[key].name}</td>
                                    <td>{ userData[key].mobile}</td>
                                    <td>{ userData[key].email}</td>
                                    <td>{ userData[key].message}</td>
                                    <td>
                                        <a className="btn btn-primary"   onClick={() => { setCurrentId(key) }} >
                                            <i className="fas fa-pencil-alt"></i>
                                        </a>
                                    </td>
                                    <td>
                                        <a className="btn btn-danger" onClick={() => { onDelete(key) }}>
                                            <i className="fas fa-trash-alt"></i>
                                        </a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    </>
    )
}

export default Contacts
