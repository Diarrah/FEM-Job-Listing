import React from 'react';

const JobBoard = ({ 
    job: {
        company,
        logo,
        isNew,
        featured,
        position,
        role,
        level,
        postedAt,
        contract,
        location,
        languages,
        tools,
    },
    handleTagClick,
}) => {
    const tags = [role, level];

    if (tools) { 
        tags.push(...tools); 
    }

    if (languages) { 
        tags.push(...languages) 
    }

    return (
        <div className={`listing ${featured && 'featured'}`}>
            <img src={logo} alt={`${company} company logo`} />
        
            <div className="job-description">
                <h3>
                    {company}
                    {isNew && (<span className="highlight highlight-new">New!</span>)}
                    {featured && (<span className="highlight highlight-feat">Featured</span>)}
                </h3>
                <h2>{position}</h2>
                <ul>
                    <li>{postedAt}</li>
                    <li className="dot">●</li>
                    <li>{contract}</li>
                    <li className="dot">●</li>
                    <li>{location}</li>
                </ul>
            </div>

            <div className="job-attributes">
                {
                    tags ? (
                        tags.map(tag => 
                            <span 
                                className="attribute"
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag}
                            </span>)
                    ) : ('') 
                }
            </div>
        </div>
    )
};

export default JobBoard;