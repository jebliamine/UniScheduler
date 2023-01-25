import {ViewState} from '@devexpress/dx-react-scheduler';
import { Scheduler, WeekView, DayView, Appointments,AppointmentTooltip, DateNavigator,Toolbar,Resources,AllDayPanel,ViewSwitcher } from '@devexpress/dx-react-scheduler-material-ui';
import { useLocation } from "react-router-dom";
import { useEffect , useState} from 'react'
import { FirebaseApp } from '../firebase/Index';
import Fab from '@mui/material/Fab';
import '../App.css';
import '../style.css'
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import classNames from 'clsx';
import { mobile } from './Mobileconfig';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import { Notfound } from './Roomnotfound';
// updating the data base


const allDayLocalizationMessages = {
  'fr-FR': {
    allDay: 'Temps plein',
  },
  'de-GR': {
    allDay: 'Ganztägig',
  },
  'en-US': {
    allDay: 'All Day',
  },
};
const getAllDayMessages = locale => allDayLocalizationMessages[locale];
const alld={allDay: "Ganztägig"

}

console.log(getAllDayMessages("fr-FR"));
const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
  background: '#55e0ad'
};

const PREFIX = 'Demo';
const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  firstRoom: `${PREFIX}-firstRoom`,
  secondRoom: `${PREFIX}-secondRoom`,
  thirdRoom: `${PREFIX}-thirdRoom`,
  header: `${PREFIX}-header`,
  commandButton: `${PREFIX}-commandButton`,
};

const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.textCenter}`]: {
    textAlign: 'center',
  },
}));

function Schedule(props){


  

// getting view info for the export 
  const [currentDate, setcurrentDate] = useState();
  const currentDateChange = (currentDate) => { setcurrentDate( String(currentDate) ); };
  const [currentView, setcurrentView]=useState("week");
  const currentViewChange = (currentView) => { setcurrentView( String(currentView)); };

// on double click action:
  const doubleClickaction= (e) => {

    console.log("you double click it")}
  
 
// extracting id from the previous component using use location
  const location = useLocation();
  var Roomid= location.state.ido;
  var roomfound= Roomid===""
  const [Appointmentsdata, setAppointmentsdata] = useState([])
  
  
// extract data from database Appointments
 useEffect(() => {
  
  if (Roomid===""){
     roomfound= false
  }
  else{
  var  roomdata = FirebaseApp.firestore()
  const AppList = [];

// getting the Data Appointments
    
    var unsubscribe  = roomdata.collection('/Rooms/'+Roomid+'/'+'Appointments').get().then(snapshot=>{

      
      if (snapshot.empty) {
        return;
      }  

      snapshot.forEach(doc=>{
       AppList.push(doc.data())
      })
      setAppointmentsdata(AppList)
    })
  }
  

    }, [] )

    
   

    //  making the appointments list
      const Datarray = [];
      Appointmentsdata.map(({ startdate, enddate, titel,type,Professor})=>(
        Datarray.push({startDate :startdate, endDate :enddate , title : String(titel), type: type ,Professor: Professor })
        ))


      // exporting data to csv
        const expo= e=>{
          var today = new Date();
          const datestoexport = [];
        
          if (currentDate===undefined){
            console.log("its good empty day")  
          }
          else{
            var list = currentDate.split(" ")
            var todaystring= list[1]+list[2]+","+list[3]
             today= new Date(todaystring)
          }
      
          if(currentView === "week"){

            var start= new Date(today.getTime());
            var end= new Date(today.getTime());
            // creating week intervale 
            start.setDate(today.getDate() - start.getDay());
            end.setDate(start.getDate()+6);
            // creating the data to export as csv
            Appointmentsdata.map(({startdate, enddate,titel})=>{
               var st= new Date(startdate)
               var ed= new Date(enddate)
              

               if(st>start && ed<end){
                console.log("it works interval")
                console.log(st.toISOString()); 
                datestoexport.push({Titel: titel , startDate :st.toISOString(), endDate :ed.toISOString()})
               }

            })
          }
          else{
            
          }

          
          if(datestoexport.length !== 0 ){
            console.log("Exporting ...")
          const titleKeys = Object.keys(datestoexport[0])
          const refinedData = []
          refinedData.push(titleKeys)
          datestoexport.forEach(item => {
            refinedData.push(Object.values(item))  
          })
          console.log(refinedData)

          let csvContent = ''

          refinedData.forEach(row => {
            csvContent += row.join(',') + '\n'
              })

          const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' })
          const objUrl = URL.createObjectURL(blob)


          const link = document.createElement('a')
          link.setAttribute('href', objUrl)
          link.setAttribute('download', 'File.csv')
          link.textContent = 'Click to Download'

          link.click();
         
            }

         
         
        }

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
          
        // making Appointments info 
        const Content = (({
            children, appointmentData, ...restProps
          }) => (
            <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
              <Grid container alignItems="center">
                <StyledGrid item xs={2} className={classes.textCenter}>
                  
                </StyledGrid>
                <Grid item xs={10}>
                  <span>Professor: {appointmentData.Professor}</span>
                </Grid>
              </Grid>
            </AppointmentTooltip.Content>
          ));
          
          console.log("infos :",Datarray)
    
   
    //  the resulting vew after extracting the data 
    if(roomfound=== false){
      mobile()
      
    return(
  
      <div id='schdjule-view'>
          
          
          
            <Scheduler   data={Datarray}
             onClick={doubleClickaction}
             locale={'de-GR'}
            >
                <ViewState  
                currentDate={currentDate}
                onCurrentDateChange={currentDateChange}
                currentView={currentView}
                onCurrentViewNameChange={currentViewChange}
                  />
              
                <WeekView startDayHour={9} displayName="Wochenübersicht" />
                <DayView startDayHour={9} displayName="Tagesübersicht"/>
                <Toolbar />
              
                <ViewSwitcher />
                <DateNavigator  />  
               
                <Appointments/>
                

                <AppointmentTooltip
                showCloseButton
                showOpenButton
                contentComponent={Content}
                    />
                <Resources
          data={resources}
        />
       
        
        </Scheduler>

      <Fab color="primary" aria-label="add" style={style} onClick={expo}>
        <FileDownloadRoundedIcon />
      </Fab>
  
        </div>  
 



    );
    }
    else{
      return(
        <Notfound/>
      );
    }
    }

export default Schedule;