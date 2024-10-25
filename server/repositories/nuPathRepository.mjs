

function getAttributes(courses) {
    const attributes = [];
    courses.forEach(course => {
        
        console.log("check attributes");
        console.log(course)
        
        if (course.attributes !== null) {
            console.log('attribute che');
            console.log(course.attributes);
            const a = course.attributes.split(',')
            a.forEach(attribute => {
                const i = attributes.findIndex(a => a.requirement === attribute);
                if (i !== -1) {
                    attributes.push({name: attribute, courses:[course]})
                }else {
                    const c = attributes[i].courses;
                    console.log(' c check');
                    console.log(c);
                    
                    c.push(course);
                }
            })
        }
    })
    return attributes

}

export {getAttributes};