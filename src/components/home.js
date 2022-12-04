import 'react-datalist-input/dist/styles.css';
import {useLiveQuery} from 'dexie-react-hooks'
import {db} from './Crud'
import {useNavigate} from "react-router-dom";
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datalist-input/dist/styles.css';

  export var pressed = false;


 function Search(data) {
  const [selectedRoom,setSelectedRoom] = useState("");
  const allItems = useLiveQuery(() => db.room.toArray(), []);
 let history = useNavigate();
    
  const handleSubmit = e => {
    
    e.preventDefault();
    e.stopPropagation();
    if(selectedRoom != null){
      history("/Schedule", {
        state: { ida: selectedRoom },
      });
    }
 
    console.log("selected room ",selectedRoom)
  };
 
  const handleChange= e => {
    e.preventDefault();
   e.stopPropagation();
   var id = e.target.value;
    console.log("i still have no prb here",id)
   setSelectedRoom(id);
   

  } 

// ##################################################################### return search barlist ########################### 


  if (!allItems) return null
  
  const itemData = (
    <div className="App">
      <input type="text" list="data"  value={selectedRoom} onChange={handleChange}/>
      <datalist id="data">
        { 
        allItems.map(({ id, name})=>(
        <option className="id" key={id} value={name} />
        ))
      }
    </datalist>
  </div>
 )


    return (
      
      <div className="container">
      <h3 className="green-text center-align">Rooms Searching</h3>
     
      {allItems.length > 0 &&
        <div >
          
          <Form onSubmit={handleSubmit}>
              { itemData }
              <Button variant="primary" type="submit">Search</Button>
            </Form>
          
          
        </div>
      }
    </div>
  );
  }

  export default Search