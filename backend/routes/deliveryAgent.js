// routes/deliveryAgent.js
import express from 'express';
import { addDeliveryAgent,getDeliveryAgents, removeDeliveryAgent } from '../controllers/deliveryAgentController.js';
import multer from 'multer';

const router = express.Router();

const storeD=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload=multer({storage:storeD})

router.post("/add",upload.single("photo"),addDeliveryAgent)
router.get('/list', getDeliveryAgents); // Fetch all delivery agents
router.post('/remove', removeDeliveryAgent); // Remove a delivery agent


export default router; 