import React, { useState, useEffect } from 'react';
import './styles/css/main.css';
import './styles/style.css';
import logo from './images/82.JPG';
import ellipse from './images/ellipse.png';
import { CSSTransition } from 'react-transition-group';

import Picture from './components/Picture';
import Contacts from './components/Contacts';
import WorkExperience from './components/WorkExperience';
import Education from './components/Education';
import Skills from './components/Skills';
import Loader from './components/Loader/Loader';

function App() {
  const [inProp, setInProp] = useState(false);
  const lang = {
    en: {
      class: 'en',
      cv: '',
      json: 'https://jahnavadd.github.io/json1.json',
      textButton: 'HE'
    },
    he: {
      class: 'he',
      cv: '',
      json: 'https://jahnavadd.github.io/json1.json', 
      textButton: 'EN'
    }
  }
  const [langState, setLang] = useState({state: lang.en});

  const [dataJson, setData] = useState({experience: null});
  useEffect(() => {
    
    let request = new XMLHttpRequest();
    request.open('GET', langState.state.json, true);
    request.onload = function () {

      let data = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
              
        let exp = [];	
        data[0].experience.items.forEach(exp_item => {
          exp.push(exp_item);
        });
            
        let edu = [];	
        data[0].education.items.forEach(edu_item => {
          edu.push(edu_item);
        });
        
        setData({
          fullName: data[0].fullName, 
          email: data[0].email, 
          phone: data[0].phone, 
          exptitle: data[0].experience.title,
          experience: exp, 
          edutitle: data[0].education.title,
          education: edu,
          skillsTitle: data[0].skills.title
        });
      
      } 
    }

    request.send();
    setInProp(true);
  }, [langState.state])

   if (dataJson.experience !== null) 
   return (
     
    <div className="app" id={langState.state.class}>
     <CSSTransition in={inProp} timeout={400} classNames="my-node"> 
      <div className="sidebar">

        <Picture src={logo} />
		    <h1>{dataJson.fullName}</h1>
        <Contacts phone={dataJson.phone} email={dataJson.email} />

	    </div>
     </CSSTransition>
     <CSSTransition in={inProp} timeout={1000} classNames="my-node"> 
      <main>
      <button className="langbutton" onClick={() => {
          if (langState.state.class === 'en') setLang({state: lang.he})
            else setLang({state: lang.en})
            setInProp(false);
        }} >{langState.state.textButton}</button>

        <img src={ellipse} alt="Logo" className="ellipse" />

        <h2>{dataJson.exptitle}</h2>
        <div>
        {dataJson.experience.map((item, index) => 
          <WorkExperience 
            company={item.company}  
            years={item.years}
            position={item.position}
            description={item.description}
            key={index}
          /> )}
          </div>
          
          <h2>{dataJson.edutitle}</h2>
          <div>
            {dataJson.education.map((item, index) => 
              <Education 
                company={item.company}  
                years={item.years}
                position={item.position}
                key={index}
              /> )}
          </div>

        <h2>{dataJson.skillsTitle}</h2>
        <Skills />
      </main>
      </CSSTransition>
    </div>
  );
  else return (
    <Loader />
  )
}

export default App;
