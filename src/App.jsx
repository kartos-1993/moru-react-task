import React from 'react';
import Dashboard from "../src/pages/Dashboard"
import Navbar from './component/Navbar';



function App() {
	return (
    <div className=" w-screen ">
      <Navbar/>
      <Dashboard />
    </div>
  );
}

export default App;
