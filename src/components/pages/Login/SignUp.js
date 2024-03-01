import React from 'react'
import './Login.css'
import axios from 'axios';
import { useRef,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
function SignUp() {
  var browserHistory = useNavigate();
    const [formData, updateFormData] = React.useState({});
    const [formErrors, setFormErrors] = useState({});
    const initialValues = { user_first_name: "", user_last_name: "", user_email:"", user_password: "",password:"", user_company_name:""};
    const [isSubmit, setIsSubmit] = useState(false);
    const handleChange = (prop) => (event) =>{
      updateFormData({ ...formData, [prop]: event.target.value });
     
     }
    
//console.log(formData)
     const register= async ( ) => {
      console.log(formData);
      try{
        var json = {objJsonData:[

          {
            user_typeid:1,
            user_email: formData.user_email, 
          user_firstname: formData.user_first_name, 
          user_lastname: formData.user_last_name,
          user_passwd: formData.user_password,
          user_organization :formData.user_company_name,
           } 
       
        ]};
        if(formData.user_password===formData.password){
          var response= await axios.post("http://localhost:3002/registerinsert",json);
          console.log(response.data)
          if(response.data[0].user_id != ''){
            window.location.href = "/Login";
          }
        }
        else{
          setFormErrors({password:"Passwords don't match"});
  
        }
         
        // var json= {"objJsonData":[{"user_id":1212,"user_firstname":formData.user_first_name}]};

        
      
        //console.log(response.data);
        // if(data.data.status){
            // if(response.data[0].user_type === 'client')
            // window.location.href="http://localhost:8002/saroma/login";
            // else
            // window.location.href="http://localhost:8002/saroma/cons_qualification";
        // }
        // else
        // // window.location.href="https://stackoverflow.com/"
        // alert(data.data[0].error)
      }
      catch(e){
        setFormErrors(e.response.data)
      console.log(e)
      }
     }

///////////////////////SUBMIT OLD//////////////////////////

// const submitForm= async ( ) => {
//   const response= await axios.post('http://localhost:3002/registerinsert',
// {objJsonData:[
//   {user_email: formData.user_email, 
//   user_first_name: formData.user_first_name, 
//   user_last_name: formData.user_last_name,
//   user_password: formData.user_password,
//   user_company_name :formData.user_company_name,} 
  
// ]},{});
// console.log(response.data)
// // var retdata=data.data
// // if(retdata.status){ window.location.href = "/Login";}
// // else {window.location.href = "https://www.google.com";}
// }
useEffect(() => {
  console.log(formErrors);
  if (Object.keys(formErrors).length === 0 && isSubmit) {
   
    console.log(formData);
  }
}, [formErrors]);
  
    return (
        <div className="signin-container">
            <form className="input-section">
                {/* <img src={farmsimple} alt="FarmSimple"></img> */}
                
                <h2>Signup</h2>
                <input type="text" placeholder="First Name" onChange={handleChange('user_first_name')}  required/>
                <p style={{color:'blue',paddingTop:'5px',width:'fit-content',paddingLeft:'2px'}}>{formErrors.user_firstname}</p>
                <input type="text" placeholder="Last Name" onChange={handleChange('user_last_name')} required/>
                <p style={{color:'blue',paddingTop:'5px',width:'fit-content',paddingLeft:'2px'}}>{formErrors.user_lastname}</p>
                <input type="text" placeholder="Company Name" onChange={handleChange('user_company_name')} required/>
                <input type="email" placeholder="Email" onChange={handleChange('user_email')} required/>
                <p style={{color:'blue',paddingTop:'5px',width:'fit-content',paddingLeft:'2px'}}>{formErrors.user_email}</p>
                <input type="password" placeholder="Password" onChange={handleChange('user_password')} required/>
                <p style={{color:'blue',paddingTop:'5px',width:'fit-content',paddingLeft:'2px'}}>{formErrors.user_passwd}</p>
                <input type="password" placeholder="Re-enter password" onChange={handleChange('password')} required/>
                <p style={{color:'blue',paddingTop:'5px',width:'fit-content',paddingLeft:'2px'}}>{formErrors.password}</p>
            <div className="v-card__actions">
                <div onClick={()=>browserHistory(-1)}className="btn-cancel">CANCEL</div>
                <div onClick={register} className="btn-signup">SIGN UP</div>
            
            </div>
            </form>
        </div>
    )
}

export default SignUp
