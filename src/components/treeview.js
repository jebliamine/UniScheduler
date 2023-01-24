import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { FirebaseApp } from '../firebase/Index';
import  { useState , useEffect} from "react";

export default function MultiSelectTreeView() {
  const [Roomes, setRoomes] = useState([])
  const [Erdgeschoss, setErdgeschoss] = useState([])
  const [Obergeschoss1, setObergeschoss1] = useState([])
  // getting rooms

  useEffect(() => {
    var  roomdata = FirebaseApp.firestore()
    const Rooms = [];
    const RoomsEr = [];
    var counter=2
    const RoomsOb = [];

    const unsubscribe  = roomdata.collection('Rooms').get().then(snapshot=>{
      snapshot.forEach(doc=>{
      //  Rooms.push({ key: doc.id, Roomes: doc.data() })
      counter=counter+1
    
      if(doc.data().Position==="Erdgeschoss"){
        RoomsEr.push({id: String(counter) , RoomName: doc.data().RoomName})
      }
      else{
        RoomsOb.push({id: String(counter) , RoomName: doc.data().RoomName})
      }

      })
      setRoomes(Rooms)
      setErdgeschoss(RoomsEr)
      setObergeschoss1(RoomsOb)
    })
  }, [])

 

console.log("here is the ober: ", Obergeschoss1)
  return (
    <TreeView
      aria-label="multi-select"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
      sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem nodeId="1" label="Erdgeschoss">
      { 
       Erdgeschoss.map(({ id ,RoomName})=>(
          <TreeItem nodeId={id} label={RoomName} />
         ))
      }
      </TreeItem>

      <TreeItem nodeId="2" label="Obergeschoss 1">
      { 
       Obergeschoss1.map(({ id ,RoomName})=>(
          <TreeItem nodeId={id} label={RoomName} />
         ))
      }
      </TreeItem>
    </TreeView>
  );
}
