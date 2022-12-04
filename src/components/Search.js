import 'react-datalist-input/dist/styles.css';
import {useLiveQuery} from 'dexie-react-hooks'
import {db} from './Crud'
import { Navigate, useNavigate} from "react-router-dom";
import React, { useState } from "react";

class Welcome extends React.Component {


    render() {
      return <h1>Hello, {this.props.name}</h1>;
      
    }
  }

  



  export var pressed = false;




 function Search(data) {
  const [selectedRoom,setSelectedRoom] = useState("");

 let history = useNavigate();
    
  const handleSubmit = e => {
   e.preventDefault();
   e.stopPropagation();
  const id = e.target.value;

  
   <Navigate
            to={{
            pathname: "/Schedule",
          }}
        />
  };
 
  const handleChange= e => {
    e.preventDefault();
   e.stopPropagation();
   var id = e.target.value;
    console.log(id)
   setSelectedRoom(id);
   history({
    pathname: "/Schedule",
    state: { selectedRoom: "deijd" }
  })
  } 

// ######################################################################################################### rturn search barlist ###########################
  
  const allItems = useLiveQuery(() => db.room.toArray(), []);
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
        <div className="card white darken-1">
          <div className="card-content">
            <form onSubmit={handleSubmit}>
              { itemData }
              <button type="submit" >Search</button>
            </form>
          </div>
        </div>
      }
    </div>
  );
  }

  export default Search