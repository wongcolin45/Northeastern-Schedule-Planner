
import express from 'express';

import cors from 'cors';

import getCSCore from '../repositories/computerScienceRepository.mjs';

import getConcentration from '../repositories/concentrationRepository.mjs';

import { generateSchedule } from '../repositories/scheduleRepository.mjs';

import {getAPCourses} from "../repositories/apCreditsRepository.js";

const app = express();

app.use(express.json());

app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server running on port 3000');
});


/**
 * Returns a json outline of computer science requirements.
 */
app.get('/api/requirements', async (req, res) => {
    const outline = await getCSCore();
    if (outline) {
        return res.json(outline);
    } else {  
        return res.status(503).send('Outline not yet initialized. Please try again later.');
    }
});


app.get('/api/aps', async (req, res) => {
    const courses = await getAPCourses();
    if (courses) {
        return res.json(courses);
    }
    return res.status(500).send('failed to fetch courses');
});

/**
 * Returns a json outline of the requirements for the given cs concentration.
 */
app.get('/api/computerscience/:concentration', async (request, response) => {
    const {concentration} = request.params;
    
    const outline = await getConcentration(concentration);
    if (outline) {
        return response.status(200).json(outline);
    } else {
        return response.status(503).send('Outline not yet initialized. Please try again later.');
    }
});

/**
 * Return an up to 4 courses schedule based on
 * the users current schedule and the computer science requirements satisfied.
 */
app.post('/api/computerscienceSchedule', async (request, response) => {
    const schedule = request.body;
    const data = await generateSchedule(schedule, 4);
    return response.status(200).send(data);
});












