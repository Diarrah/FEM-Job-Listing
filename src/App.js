import React, { useState, useEffect } from 'react';
import './App.scss';
import JobBoard from './components/JobBoard';
import data from './assets/data.json';

function App() {
  const [jobs, setJobs] = useState([]);
  const [parameters, setParameters] = useState([]);

  useEffect(() => setJobs(data), []);

  const filterFunc = ({role, level, languages, tools}) => {
    if (parameters.length === 0) { return true; }

    const tags = [role, level]; // The tags variable is set to just the role + level

    if (tools) { tags.push(...tools); }
    if (languages) { tags.push(...languages); } // If there are tools/languages, add to that tags variable
    
    return parameters.every(parameter => tags.includes(parameter));
  }

  const handleTagClick = (tag) => {
    if (parameters.includes(tag)) return; // Prevents tag from being added to filter twice
    setParameters([...parameters, tag]);   
  }

  const removeFromFilter = (itemToRemove) => {
    setParameters(parameters.filter((parameter) => parameter !== itemToRemove));  
  }

  const clearFilters = () => {
    setParameters([]); // When clear btn is pressed, set filters back to just an empty array
  }

const filteredJobs = jobs.filter(filterFunc);

  return (
    <div className="App">
      <div className="background"> 
        <img
          className="bg-desktop"
          src='/images/bg-header-desktop.svg'
          alt='bg-image'
        />
        <img 
          className="bg-mobile"
          src='/images/bg-header-mobile.svg'
          alt='bg-image'
        />
      </div>

    { parameters.length > 0 && (
      <>
      <div className="job-requirements">
           { parameters.map(parameter => (
            <span className="attribute">  
              {parameter}
              <span 
                className='close-out'
                onClick={()=> removeFromFilter(parameter)}>
                  ×
              </span>
            </span>
           )) } 
        <button 
          className='clear-all'
          onClick={clearFilters}>
            Clear
          </button>   
      </div>
      </>
    ) }
        { jobs.length === 0 ? (
          <p>Jobs are fetching...</p>
        ) : (
          filteredJobs.map(job => (
            <JobBoard 
              job={job} 
              key={job.id}  
              handleTagClick={handleTagClick}
            />
          ))
        )
      }
      
    </div>
  );
}

export default App;