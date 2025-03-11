
import React, { useEffect, useState } from 'react';
import './Deliagent.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const DeliAgent = ({ url }) => {
  const [agents, setAgents] = useState([]);

  // Function to fetch the list of delivery agents
  const fetchAgents = async () => {
    try {
      const response = await axios.get(`${url}/api/DeliveryAgent/list`); // Update endpoint based on your backend
      if (response.data.success) {
        setAgents(response.data.data); // Update the agents state with the fetched data
      } else {
        toast.error("Error fetching delivery agents!");
      }
    } catch (error) {
      console.error("Error fetching delivery agents:", error);
      toast.error("Error fetching delivery agents!");
    }
  };

  // Function to remove a delivery agent
  const removeAgent = async (agentId) => {
    try {
      const response = await axios.post(`${url}/api/DeliveryAgent/remove`, { id: agentId }); // Update endpoint based on your backend
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAgents(); // Refresh the list after removal
      } else {
        toast.error("Error removing delivery agent!");
      }
    } catch (error) {
      console.error("Error removing delivery agent:", error);
      toast.error("Error removing delivery agent!");
    }
  };

  // Fetch the list of delivery agents when the component mounts
  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className='deli-agent-list flex-col'>
      <p>All Delivery Agents</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Photo</b>
          <b>Name</b>
          <b>Email</b>
          <b>Phone</b>
          <b>Action</b>
        </div>
        {agents.map((agent, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/photos/${agent.photo}`} alt={agent.name} /> {/* Assuming the photo is stored */}
            <p>{agent.name}</p>
            <p>{agent.email}</p>
            <p>{agent.phone}</p>
            <p onClick={() => removeAgent(agent._id)} className='cursor'>X</p> {/* Action to remove agent */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliAgent;
