import React from 'react';
import Search from './components/home';
import './App.css';
import Schedule from './components/Schedule';
import { Routes, Route} from 'react-router-dom';






function App() {
  return (
    <div>
    
    <Routes>
    
      <Route path="/UniScheduler" element={<Search/>}/>
      <Route path="/Schedule" element={<Schedule />} />
      
    </Routes>
    
    
    </div>
  
  );
}
export default App;
