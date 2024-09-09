

const base = 'http://localhost:3000/api/computerscience/';


async function fetchConcentration(concentration) {
    const url = base + concentration;
    console.log('trying url '+url);
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
    console.log('send over schedule');
    console.log(schedule);
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
            console.log('Data successfully sent and received:', responseData);
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