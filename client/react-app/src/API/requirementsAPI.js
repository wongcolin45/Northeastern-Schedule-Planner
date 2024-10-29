



const base = 'http://localhost:3000/api/';

/**
 * Fetches the cs requirements outline.
 * @returns {Promise<Object>} the cs outline
 */
async function fetchRequirements() {
    const url = base + 'requirements/computerscience';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json()
    }catch(error) {
        console.log(`Error fetching data ${error}`);
    }
}

/**
 * Fetches CS Concentration requirements from backend.
 * @param concentration the name of the concentration
 * @returns {Promise<Object>} data in json format
 */
async function fetchConcentration(concentration) {
    const url = base + `requirements/computerscience/${concentration.tag}`;
    console.log('Fetching concentration request to '+url);
    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json()
        return data;
    }catch (error) {
        console.log(error);
    }
}

/**
 * Fetches the ap courses and there transfer credit info.
 * @returns {Promise<Object[]>} List of courses with attributes and equivalent nu course
 */
async function fetchAPCourses() {
    const url = 'http://localhost:3000/api/aps';
    console.log('trying url '+url);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }catch (error) {
        console.log(error);
    }
}

/**
 * Fetches a generated schedule for the user
 * @param schedule the user's current schedule
 * @returns {Promise<Object>} the list of courses to take
 */
async function fetchSchedule(schedule) {
    const url = base + 'schedule/computerscience'
    try {
        const response = await fetch(url, {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json', // Content type being sent
            },
            body: JSON.stringify(schedule), // Convert the JavaScript object to a JSON string
        });

        // Check if the request was successful
        if (response.ok) {
             // Parse JSON response from the server
            // You can now use `responseData` in your frontend
            return await response.json();
        } else {
            console.error('Error sending data:', response.statusText);
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
}




export {fetchRequirements, fetchConcentration, fetchSchedule, fetchAPCourses};