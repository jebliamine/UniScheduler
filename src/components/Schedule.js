import {ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
import { Scheduler, WeekView, DayView, Appointments, AppointmentForm, DateNavigator,Toolbar,Resources,ViewSwitcher } from '@devexpress/dx-react-scheduler-material-ui';
import { useLocation } from "react-router-dom";
import{useEffect} from "react"
import {useLiveQuery} from 'dexie-react-hooks'
import {db} from './Crud'

// updating the data base


db.version(7).stores( {
    room: '++id, name', 
    schedule: '++id, titel, startdate, enddate, roomName, type'
  }).upgrade(tx => {
    // An upgrade function for version 3 will upgrade data based on version 2. 
    // Note: Even if you wanna just to delete changing the version is too important
    return tx.table("schedule").toCollection().modify(schedule => {
        // Modify each friend:
        
        
    });
});
//  adding the name in schedj

    // Init your DB with some default statuses:
    db.schedule.update(1,{id: 1, titel: "appointment1", startdate:'2022-11-21T10:30',enddate:'2022-11-21T11:30', type:"one time" });
    db.schedule.update(2,{id: 2, titel: "appointment2", startdate:'2022-11-21T09:30',enddate:'2022-11-21T10:30',type:"dayly"});
    db.schedule.update(3,{id: 3, titel: "appointment3", startdate:'2022-11-21T09:30',enddate:'2022-11-21T10:30',type:"dayly"});
    db.schedule.update(4,{id: 4, titel: "appointment4", startdate:'2022-11-21T09:30',enddate:'2022-11-21T10:30',type:"weekly"});


function Schedule(props){

   
 
    // extracting id from the previous component using use location
    const location = useLocation();
    var ida=location.state.ida;
    var roomId;
    console.log("here234",location.state.ida)

    // db.room.get({name : String(ida)}).then((room) => {
    //     // here we prepare our room id to search about the schedule corresponding to the room
    //     roomId=room.id
    //     console.log("here is the get")
    // });


    
    // useEffect(() => {
    //     ida=location.state.ida
    //     console.log("here",ida);
    //     // the problem is here exactly databse 
    //     db.room.get({name : String(ida)}).then((room) => {
    //         // here we prepare our room id to search about the schedule corresponding to the room
    //         roomId=room.id
            
    //     });
    //  }, [location]);



    console.log("befor use of id: " )
    //  defining schdule data for the display usnig the id
   
    const dbsdata = useLiveQuery( () =>  db.schedule.where({roomName : String(ida)}).toArray(), []);
    if (!dbsdata) return null; // Still loading
    const Datarray = [];
    dbsdata.map(({ startdate, enddate, titel,type})=>(
        Datarray.push({startDate :startdate, endDate :enddate , title : String(titel), type: type})
        ))

        // split appointments to types using typ script
        // typ script is used to make a type of data your own type
        const resources = [{
            fieldName: 'type',
            title: 'Type',
            instances: [
              { id: 'weekly', text: 'Private', color: '#EC407A' },
              { id: 'one time', text: 'Work', color: '#DFFF00' },
              { id: 'dayly', text: 'Work', color: '#9FE2BF' },
            ],
          }];    
    
    console.log("resultes: ",Datarray)
    //  the resulting vew after extracting the data 
    return(
        <div id="calender">
            <Scheduler   data={Datarray} >
                <ViewState/>
                <EditingState/>
                <IntegratedEditing/>
                <WeekView startDayHour={9}/>
                <DayView startDayHour={9}/>
                <Toolbar />
                <ViewSwitcher />
                <DateNavigator />
                
                <Appointments/>
                <AppointmentForm/>
                <Resources
          data={resources}
        />
        </Scheduler>
        </div>  
    );
    }

export default Schedule;