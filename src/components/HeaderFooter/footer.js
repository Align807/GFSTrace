
import {React,useState} from 'react';
import YoutubeIcon from 'mdi-react/YoutubeIcon';
import "./footer.css";
import { useTranslation } from 'react-i18next';

import FacebookIcon from 'mdi-react/FacebookIcon';
import TwitterIcon from 'mdi-react/TwitterIcon';
import { Dropdown } from 'semantic-ui-react';
//import EyeIcon from 'mdi-react/EyeIcon';

const languageOptions =[
  {key:'English',text:'English',value:'en'},
  {key:'Malayalam',text:'മലയാളം',value:'ml'},
  {key:'Tamil',text:'தமிழ்',value:'tm'}
]

export default function Footer() {
  const [language, setlanguage] = useState("en")
  const {i18n}=useTranslation();
  const handleDropdown=(event,lang)=>{
    setlanguage(lang.value)
    i18n.changeLanguage(lang.value)
   
  }
  return(
       
       
      <div className='footer-main'>
        <div><Dropdown
        upward
        selection
        onChange={handleDropdown}
        button
        className="icon"
        labeled
        icon="world"
        value={language}
        scrolling
        options={languageOptions}
        placeholder="Language"
        /></div>
    
      
     <a href="#" className="margin-one footer-button footer-button-icon footer-button-round button-color button-size-small"><span className="footer-icon"><FacebookIcon size={24} /></span></a>
      
      <a href="#" className="margin-one footer-button footer-button-icon footer-button-round button-color button-size-small"><span className="footer-icon"><TwitterIcon size={24} /></span></a>
      
      <a href="#" className="margin-one footer-button footer-button-icon footer-button-round button-color button-size-small"><span className="footer-icon"><YoutubeIcon size={24} /></span></a>
      
      <span style={{"margin-left": "10px", "align-items": "center", "color": "rgb(79, 79, 79)", "top": "0"}}> © 2021 
    
      </span>
    </div>
  
     
      );
}

