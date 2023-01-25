import React from 'react';
import Search from './components/Search';

import './App.css';

import Schedule from './components/Schedule';
import { Routes, Route} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Home } from './components/home';
import MultiSelectTreeView from './components/treeview';




function App() {
  if (useLocation().pathname=="/Schedule"){
    
  }

  
  // const Naviclik = e => {
  //   let history = useNavigate();
  //   e.preventDefault();
  //   e.stopPropagation();
  //   var header = document.getElementById("myDIV");
  //   var btns = header.getElementsByClassName("bt");
  //   console.log("heeeeey")
  //   for (var i = 0; i < btns.length; i++) {

  //     btns[i].addEventListener("click", function() {
  //     var current = document.getElementsByClassName("active");
  //     current[0].className = current[0].className.replace(" active", "");
  //     this.className = "active";
  //     });
  //   }
   
    
  // };
  const navbar=( 
  <div className="topnav" id="myDIV" >
  <a className="bt" href="/home" >Homepage</a>
  <a className="bt" href="Search" >Suche</a>
  <a className="bt" href="Hera" >Raumhierarchie</a>

  
 
</div>);

  return (
    <div>
     
    
   {navbar}

   
    <div>
   
    <Routes>
    
      <Route path="/Search" element={<Search/>}/>
      <Route path="/Schedule" element={<Schedule />} />
      <Route path="/Hera" element={<MultiSelectTreeView />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/" element={<Home/>} />
      
    </Routes>
  
    
    </div>
   
   
    </div>
 
   
  
  );

 



}
export default App;
