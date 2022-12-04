import {useLiveQuery} from 'dexie-react-hooks'
import {db} from './Crud'






function Getexact () {
    const Items = useLiveQuery(() => db.schedule.where({id : 1}).toArray(), []);
  if (!Items) return null
  Items.map(({ id, titel})=>(
    console.log(id,"  heey  ", titel)
    ))
 
  return(
    <div id="calender">
      hy
    </div>  
);

}
export default Getexact;