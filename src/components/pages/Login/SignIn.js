import React from "react";
import "./Login.css";
import farmsimple from "../../../images/logo.jpg";
import axios from 'axios';

function SignIn() {
  const [formData, updateFormData] = React.useState({});
  const handleChange = (prop) => (event) =>{
    updateFormData({ ...formData, [prop]: event.target.value });
   }
console.log(formData)
  const submitfun= async ( ) => {
    var json = { 
      "paramObject" : {
            "queryId":"FARMER_LOGIN",
            "paramArray":[formData.user_email,formData.user_password],
            "strCallerFunction": "DEMO DATA"}
    };
  
    var response= await axios.post('http://localhost:3002/logingenericselect',json)

 //console.log(response)
 try{
  if (response.data[0].user_id) {
    localStorage.setItem("User", JSON.stringify(response));
    window.location.href = "/Farms";
    
  }}
   catch(err) {      
    alert("Invalid email or password");
    window.location.href = "/Login";
  }
  }

  const resetfun = () => {
    window.location.href = "/Forget";
  };
  const signupfun=()=>{
    window.location.href='/Signup'
  }


  return (
    <div >
      {/* <button onClick={handleClick} className="btn-grain">GRAIN CONSOLE</button> */}
      <div className="signin-container">
        <form className="input-section">
          <div>
            <div class="logoNameSignin" style={{ color: "rgb(79, 79, 79)" }}>
              <img className="logo" src={farmsimple} width="50" height="50" />
              <b>GFS</b> Trace
            </div>
          </div>
          <input
            type="text"
            onChange={handleChange('user_email')}
            placeholder="Email"
            required
          />
          <input
            type="password"
            onChange={handleChange('user_password')}
            placeholder="Password"
            required
          />
          <div className="button-right">
            <div className="forget-button" onClick={resetfun}>
              Forgot Password?
            </div>
          </div>
        </form>
        <button onClick={submitfun} className="btn-login">
          <strong>LOGIN</strong>
        </button>
        <div className="act-style">
          Don't have an account?<div onClick={signupfun} className="forget-button">SIGN UP</div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
