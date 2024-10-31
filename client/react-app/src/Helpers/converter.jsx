const conversions = {
    "Ethical Reasoning": "Employing Ethical Reasoning",
    "[]": [

        "Integrating Knowledge and Skills Through Experience"
    ],
    "Natural/Designed World" : "Engaging with the Natural and Designed World",
    "Formal/Quant Reasoning" : "Conducting Formal and Quantitative Reasoning",
    "Creative Express/Innov": "Exploring Creative Expression and Innovation",
    "Interpreting Culture": "Interpreting Culture",
    "Societies/Institutions": "Understanding Societies and Institutions",
    "Analyzing/Using Data": "Analyzing and Using Data",
    "Difference/Diversity": "Engaging Differences and Diversity",
    "Writing Intensive": "Writing Across Audiences and Genres",
    "Capstone Experience": "Demonstrating Thought and Action in a Capstone"
}


function convertAttributes(attributes) {
    if (attributes === undefined || attributes == null) {
        return [];
    }
    const requirements = [];
    const names = attributes.split(',');
    names.forEach(name => {
        if (name in conversions) {
            requirements.push(conversions[name]);
        }
    })
    return requirements;
}



function getCompetenciesCompleted(pathDict) {
    let total = 0;
    for (const key in pathDict) {
        if (pathDict[key].size >= 1) {
            total++;
        }
    }
    return total;
}

export {convertAttributes, getCompetenciesCompleted,};