

const base = 'http://localhost:3000/api/computerscience/';

/**
 * Fetches CS Concentration requirements from backend.
 * @param concentration the name of the concentration
 * @returns {Promise<any>} data in json format
 */
async function fetchConcentration(concentration) {
    const url = base + concentration;
    try {
        const response = await fetch(url);
         
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json()
        return data;
    }catch (error) {
        console.log(error);
    }
}


async function fetchSchedule(schedule) {
    try {
        
        const response = await fetch('http://localhost:3000/api/computerscienceSchedule', {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json', // Content type being sent
            },
            body: JSON.stringify(schedule), // Convert the JavaScript object to a JSON string
        });

        // Check if the request was successful
        if (response.ok) {
            const responseData = await response.json(); // Parse JSON response from the server
            // You can now use `responseData` in your frontend
            return responseData;
        } else {
            console.error('Error sending data:', response.statusText);
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

async function fetchNUPath(courses) {
    
    try {
        const response =  await fetch('http://localhost:3000/api/nupath', {
            method: 'POST', // HTTP method
            headers: {
                'Content-Type': 'application/json', // Content type being sent
            },
            body: JSON.stringify(courses), // Convert the JavaScript object to a JSON string
        });
        if (response.ok) {
            const responseData = await response.json(); // Parse JSON response from the server
            return responseData;
        } else {
            console.error('Error sending data:', response.statusText);
        }
    }catch (error){
        console.log(error)
    }
}




export {fetchConcentration, fetchSchedule, fetchNUPath};