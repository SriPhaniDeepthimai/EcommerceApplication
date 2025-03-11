// import React from 'react'
// import Navbar from './components/Navbar/Navbar'
// import Sidebar from './components/Sidebar/Sidebar'
// import {Routes,Route} from 'react-router-dom'
// import Add from './pages/Add/Add'
// import List from './pages/List/List'
// import Orders from './pages/Orders/Orders'
// import AddDeli from './pages/DeliAdd/adddeli';  // Assuming the path
// import DeliAgent from './pages/DeliList/deliagent';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const App = () => {
//   const url="http://localhost:4000"
//   return (
//     <div>
//       <ToastContainer/>
//       <Navbar/>
//       <hr />
//       <div className="app-content">
//         <Sidebar/>
//         <Routes>
//           <Route path="/add" element={<Add url={url}/>}/>
//           <Route path="/list" element={<List url={url}/>}/>
//           <Route path="/orders" element={<Orders url={url}/>}/>
//           <Route path="/AddDeli" element={<AddDeli url={url}/>} />
//           <Route path="/DeliAgent" element={<DeliAgent url={url} />} />
//         </Routes>
//       </div>
//     </div>
//   )
// }

// export default App


import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import AddDeli from './pages/DeliAdd/adddeli';
import DeliAgent from './pages/DeliList/deliagent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const App = () => {
  const url = "http://localhost:4000";

  // State to store delivery agents list
  const [agents, setAgents] = useState([]);

  // Fetch delivery agents on component mount
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(`${url}/api/DeliveryAgent`);
        setAgents(response.data);
      } catch (error) {
        console.error("Error fetching delivery agents:", error);
      }
    };

    fetchAgents();
  }, [url]);

  // Function to add a new delivery agent and update the list
  const handleAddAgent = async (newAgentData) => {
    try {
      const response = await axios.post(`${url}/api/DeliveryAgent`, newAgentData);
      setAgents([...agents, response.data]); // Update agent list
      toast.success("Delivery agent added successfully!"); // Success notification
    } catch (error) {
      toast.error("Failed to add delivery agent.");
      console.error("Error adding delivery agent:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/order" element={<Orders url={url} />} />
          {/* Pass handleAddAgent function to AddDeli component */}
          <Route path="/AddDeli" element={<AddDeli url={url} onAddAgent={handleAddAgent} />} />
          {/* Pass agents list to DeliAgent component */}
          <Route path="/DeliAgent" element={<DeliAgent url={url} agents={agents} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
