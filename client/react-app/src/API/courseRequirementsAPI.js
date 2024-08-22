

const base = 'http://localhost:3000/api/computerscience/';


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



export {fetchConcentration};