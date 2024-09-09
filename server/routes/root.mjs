
import getCSCore from '../repositories/computerScienceRepo.mjs';

import getConcentration from '../repositories/concentration.mjs';

import express from 'express';

import cors from 'cors';
import { generateSchedule } from '../repositories/scheduleRepo.mjs';

import { getAttributes } from '../repositories/nuPathRepo.mjs';



const app = express();

app.use(express.json());

app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server running on port 3000');
});

app.get('/api/requirements', async (req, res) => {
    const outline = await getCSCore();
    if (outline) {
        return res.json(outline);
    } else {  
        return res.status(503).send('Outline not yet initialized. Please try again later.');
    }
});


app.get('/api/computerscience/:concentration', async (request, response) => {
    const {concentration} = request.params;
    
    const outline = await getConcentration(concentration);
    if (outline) {
        return response.status(200).json(outline);
    } else {
        return response.status(503).send('Outline not yet initialized. Please try again later.');
    }
});


app.post('/api/computerscienceSchedule', async (request, response) => {
    const schedule = request.body;
    const data = await generateSchedule(schedule, 4);
    
    return response.status(200).send(data);
});


app.post('/api/nupath', (request, response) => {
    const courses = request.body;
    const data = getAttributes(request.body);
    return response.status(200).send(data)
});










