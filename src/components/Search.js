import 'react-datalist-input/dist/styles.css';
import {useNavigate} from "react-router-dom";
import React, { useState , useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datalist-input/dist/styles.css';
import { FirebaseApp } from '../firebase/Index';

  export var pressed = false;


 function Search(data) {

  // #####################################################################################
  const [selectedRoom,setSelectedRoom] = useState("");
  const [selectedRoomid,setSelectedRoomid] = useState("");
  const [Roomes, setRoomes] = useState([])

 let history = useNavigate();

 // getting rooms data from the data base :
  useEffect(() => {
  var  roomdata = FirebaseApp.firestore()
  const Rooms = [];
  const unsubscribe  = roomdata.collection('Rooms').get().then(snapshot=>{
    snapshot.forEach(doc=>{
     Rooms.push({ key: doc.id, Roomes: doc.data() })
    })
    setRoomes(Rooms)
  })

}, [])



  // handlig submit searching  
  const handleSubmit = e => {
    
    e.preventDefault();
    e.stopPropagation();
    if(selectedRoom != null){
      history("/Schedule", {
        state: { ida: selectedRoom,
                 ido:  selectedRoomid,
        }
      });
    }
  };
 
  const handleChange= (event, key) => {
    event.preventDefault();
    event.stopPropagation();
   
    var value = Roomes.filter(function(item) {
      return item.Roomes.RoomName ===event.target.value
    })


   var id = event.target.value;
   setSelectedRoom(id);
  if(value.length!= 0 ){
   setSelectedRoomid(value[0].key);
  }
   
   

  } 

// ##################################################################### return search barlist ########################### 


  // if (!allItems) return null
  
  const itemData = (
    <div className="App">
      <input type="text" list="data" value={selectedRoom} onChange={handleChange}/>
      <datalist id="data">
        { 
        Roomes.map(({ key ,Roomes})=>(
          <option className="id" key={key}  value={Roomes.RoomName}/>
         ))
      }
    </datalist>
  </div>
 )
    return (
      
      <div className="container">
      <h3 className="green-text center-align">Suche nach Räumen</h3>
     
      {/* {allItems.length > 0 && */
        <div >
          
          <Form onSubmit={handleSubmit}>
              { itemData }
              <Button variant="primary" type="submit">Suche</Button>
            </Form>
          
          
        </div>
      }
    </div>
  );
  }

  export default Search