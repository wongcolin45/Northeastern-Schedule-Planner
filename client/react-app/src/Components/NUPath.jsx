
const requirements = ['Engaging with the Natural and Designed World',
                      'Exploring Creative Expression and Innovation',
                      'Interpreting Culture',
                      'Conducting Formal and Quantitative Reasoning',
                      'Understanding Societies and Institutions',
                      'Analyzing and Using Data',
                      'Engaging Differences and Diversity',
                      'Employing Ethical Reasoning',
                      'Writing Across Audiences and Genres',
                      'Integrating Knowledge and Skills Through Experience',
                      'Demonstrating Thought and Action in a Capstone'];


function NUPath() {
    
    return (
        <>
            <h1>NUpath Requirements</h1>
            <div className="nupath-section-container">
                <h2>11 Relevant Disciples</h2>
                {
                    requirements.map(name => {
                        return <span>{name}</span>
                    })
                }
            </div>
        </>
    )
}

export default NUPath;