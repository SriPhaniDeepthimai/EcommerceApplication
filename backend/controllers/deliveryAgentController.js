// import {DeliveryAgent} from '../models/DeliveryAgent.js'; 

// // Fetch all delivery agents
// export const getDeliveryAgents = async (req, res) => {
//   try {
//     const agents = await DeliveryAgent.find();
//     res.status(200).json({ success: true, data: agents });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Remove a delivery agent
// export const removeDeliveryAgent = async (req, res) => {
//   const { id } = req.body;
//   try {
//     const deletedAgent = await DeliveryAgent.findByIdAndDelete(id);
//     if (!deletedAgent) {
//       return res.status(404).json({ success: false, message: "Agent not found" });
//     }
//     res.status(200).json({ success: true, message: "Delivery agent removed successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// controllers/deliveryAgentController.js





// import {DeliveryAgent} from '../models/DeliveryAgent.js'; // Ensure the correct path and named import

// // Add a new delivery agent
// export const addDeliveryAgent = async (req, res) => {
//   const { name, email, phone } = req.body;
//   const photo = req.file ? req.file.path : null; // Get the uploaded file path

//   const newAgent = new DeliveryAgent({
//     name,
//     email,
//     phone,
//     photo,
//   });

//   try {
//     await newAgent.save(); // Save the new agent to the database
//     res.status(201).json({ success: true, message: 'Delivery agent added successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to add delivery agent' });
//   }
// };

// controllers/deliveryAgentController.js
// import DeliveryAgent from '../models/DeliveryAgent.js'; // Ensure this import is correct

// // Get all delivery agents
// export const getDeliveryAgents = async (req, res) => {zzzz
//   try {
//     const agents = await DeliveryAgent.find(); // Fetch all agents
//     res.status(200).json({ success: true, data: agents });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to fetch delivery agents' });
//   }
// };

// // Remove a delivery agent
// export const removeDeliveryAgent = async (req, res) => {
//   const { id } = req.body; // Assuming you're sending the ID in the body
//   try {
//     await DeliveryAgent.findByIdAndRemove(id); // Remove the agent by ID
//     res.status(200).json({ success: true, message: 'Delivery agent removed successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to remove delivery agent' });
//   }
// };

// // You can also add the function for adding delivery agents if not already defined
// export const addDeliveryAgent = async (req, res) => {
//   const { name, email, phone } = req.body;
//   const photo = req.file ? req.file.path : null; // Get the uploaded file path

//   const newAgent = new DeliveryAgent({
//     name,
//     email,
//     phone,
//     photo,
//   });

//   try {
//     await newAgent.save();
//     res.status(201).json({ success: true, message: 'Delivery agent added successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to add delivery agent' });
//   }
// };

import DeliveryAgentModel from '../models/DeliveryAgent.js'; // Import the DeliveryAgent model
import fs from 'fs'; // Import the file system module for handling file deletion (if needed)

// Add a delivery agent
const addDeliveryAgent = async (req, res) => {
  // Get the uploaded file name from the request
  let photo_filename = req.file ? req.file.filename : null;

  // Create a new delivery agent instance
  const agent = new DeliveryAgentModel({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    photo: photo_filename, // Save the photo file name (path) if uploaded
  });

  try {
    await agent.save(); // Save the agent to the database
    res.json({ success: true, message: 'Delivery agent added successfully' });
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.json({ success: false, message: 'Error adding delivery agent' });
  }
};

// List all delivery agents
const getDeliveryAgents = async (req, res) => {
  try {
    const agents = await DeliveryAgentModel.find({}); // Fetch all agents from the database
    res.json({ success: true, data: agents });
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.json({ success: false, message: 'Error fetching delivery agents' });
  }
};

// Remove a delivery agent
const removeDeliveryAgent = async (req, res) => {
  try {
    const agent = await DeliveryAgentModel.findById(req.body.id); // Find the agent by ID
    if (agent && agent.photo) {
      // If an agent is found and has a photo, delete the photo file
      fs.unlink(`uploads/${agent.photo}`, (err) => {
        if (err) {
          console.log('Error deleting file:', err);
        }
      });
    }

    await DeliveryAgentModel.findByIdAndDelete(req.body.id); // Remove the agent from the database
    res.json({ success: true, message: 'Delivery agent removed successfully' });
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.json({ success: false, message: 'Error removing delivery agent' });
  }
};

// Export the functions for use in routes
export { addDeliveryAgent, getDeliveryAgents, removeDeliveryAgent };

