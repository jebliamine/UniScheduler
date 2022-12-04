import Dexie from 'dexie';


 export var db = new Dexie('myDatabase');




db.version(1).stores({
  room: '++id, name, scheduleid', // Primary key and indexed props
  schedule: '++id, titel, startdate, enddate'
});

db.on("populate", function() {
  // Init your DB with some default statuses:
  db.room.add({id: 1, name: "00A12", scheduleid:1});
  db.room.add({id: 2, name: "01A23", scheduleid:1});
  db.room.add({id: 3, name: "00A34", scheduleid:1});
  db.room.add({id: 4, name: "00A35", scheduleid:1});
});

db.on("populate", function() {
  // Init your DB with some default statuses:
  db.schedule.add({id: 1, titel: "appointment1", startdate:'2022-11-15T09:30',enddate:'2022-11-15T10:30' });
  db.schedule.add({id: 2, titel: "appointment2", startdate:'2022-11-15T09:30',enddate:'2022-11-15T10:30' });
  db.schedule.add({id: 3, titel: "appointment3", startdate:'2022-11-15T09:30',enddate:'2022-11-15T10:30' });
  db.schedule.add({id: 4, titel: "appointment4", startdate:'2022-11-15T09:30',enddate:'2022-11-15T10:30' });
});

   

