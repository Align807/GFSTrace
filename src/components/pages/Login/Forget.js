import React from 'react'
import './Login.css'
import farmsimple from '../../../images/logo.jpg'
import { useNavigate } from 'react-router-dom'
function Forget() {
    var browserHistory = useNavigate();
    return (
            <div className="signin-container">
            <form className="input-section">
                
            
               
               <div class="logoNameSignin" style={{ color: "rgb(79, 79, 79)" }}>
               <img className="logo" src={farmsimple} width="50" height="50" />
                <b>GFS</b> Trace
               </div>
              
                <h3>Enter your email to request a password reset</h3>
                <input type="text" placeholder="Email" required/>
                <input type="text" placeholder="New Password" required/>
                <input type="text" placeholder="Confirm Password" required/>
            </form>
            <div className="v-card__actions">
            <div onClick={()=>browserHistory(-1)}className="btn-cancel">BACK</div>
            <div onClick={()=>browserHistory(-1)}className="btn-signup">RESET</div>
            </div>
        </div>
    )
}

export default Forget
