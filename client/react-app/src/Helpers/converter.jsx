const conversions = {
    "": "Employing Ethical Reasoning",
    "[]": [
        
        "Integrating Knowledge and Skills Through Experience"
    ],
    "Natural/Desgined World" : "Engaging with the Natural and Designed World",
    "Formal/Quant Reasoning" : "Conducting Formal and Quantitative Reasoning",
    "Creative Express/Innov": "Exploring Creative Expression and Innovation",
    "Interpreting Culture": "Interpreting Culture",
    "Societies/Institutions": "Understanding Societies and Institutions",
    "Analyzing/Using Data": "Analyzing and Using Data",
    "nini": "Engaging Differences and Diversity",
    "Writing Intensive": "Writing Across Audiences and Genres",
    "Capstone Experience": "Demonstrating Thought and Action in a Capstone"
}


function convertAttributes(attributes) {
    const requirements = [];
    const names = attributes.split(',');
    names.forEach(name => {
        if (name in conversions) {
            requirements.push(conversions[name]);
        }
    })
    return requirements;
}

export default convertAttributes;