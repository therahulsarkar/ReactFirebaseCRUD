import React, { useEffect, useState } from 'react'
import styles from './ContactForm.module.css';

function ContactForm(props) {

    const initialFieldValues = {
        name: "", 
        mobile: "",
        email: "",
        message: ""
    }

    var [values, setValues] = useState(initialFieldValues)


    useEffect(() => {
        if (props.currentId == '')
            setValues({ ...initialFieldValues })
        else
            setValues({
                ...props.contactObjects[props.currentId]
            })
    }, [props.currentId, props.contactObjects])

    const handleInputChange = e => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        props.addOrEdit(values);
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
