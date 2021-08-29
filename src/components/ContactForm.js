import React, { useEffect, useState } from 'react'
import styles from './ContactForm.module.css';

function ContactForm(props) {

    //Creating a object of initial values
    const initialFieldValues = {
        name: "", 
        mobile: "",
        email: "",
        message: ""
    }

    //State of the object values
    var [values, setValues] = useState(initialFieldValues)

    //Re renders when either currentID or userData changes
    useEffect(() => {
        if (props.currentId == '')
            setValues({ ...initialFieldValues }) //If there's no current ID then set initial state 
        else
            setValues({
                ...props.userData[props.currentId] //Else set the data that we receive as props
            })
    }, [props.currentId, props.userData])


    //Handle input changes
    const handleInputChange = e => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value //If we don't do this then we have to do this for name, email, number & other fields
        })
    }

    //Handle form submit
    const handleFormSubmit = e => {
        e.preventDefault()
        props.addOrEdit(values); //Passing the values object to addOrEdit function 
    }

    return (

    <div className="container">
    <form id={styles.contactus} onSubmit={handleFormSubmit}>
        {/*<h3>Contact US</h3>*/}
        <fieldset>
            <input placeholder="Name" onChange={handleInputChange} name="name" value={values.name} type="text"   autofocus autoComplete="off"/> 
        </fieldset>
        
        <fieldset> 
        
            <input placeholder="Email Address"  onChange={handleInputChange} name="email" value={values.email} type="email"   autofocus autoComplete="off"/> 
        </fieldset>
        
        <fieldset> 
            <input placeholder="Phone Number"  onChange={handleInputChange} name="mobile" type="tel" value={values.mobile}  autofocus /> 
        </fieldset>
        
        <fieldset> 
            <textarea placeholder="Type your message here..."  onChange={handleInputChange} name="message" value={values.message} ></textarea> </fieldset>
        <fieldset> <button name="submit" type="submit" id="contactus-submit" data-submit="...Sending"><i id="icon" class=""></i> Send Now</button> </fieldset>
    </form>
    </div>


    )
}

export default ContactForm
