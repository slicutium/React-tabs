import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'

function App() {
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0);
  
  const fetchJobs = async ()=>{
    const response = await fetch(url);
    const jobs = await response.json();
    setLoading(false);
    setJobs(jobs);
  }

  useEffect(()=>{
    try {
      fetchJobs();
    } catch (error) {
      console.log(error);
    } 
  },[])


  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
      )
  }
  if (jobs.length === 0) {
    return <h1>no jobs to show...</h1>
  }
  const {company, dates, duties, title} = jobs[value];

  return (
    <section className='section'>
      <div className='title'>
        <h2>experience</h2>
        <div className='underline'></div>
      </div>
      <div  className='jobs-center'>
        {/* button container */}
        <div className="btn-container">
          {
            jobs.map((job,index)=>{
              return(
                <button 
                  key={job.id} 
                  onClick={()=> setValue(index)}
                  className={`job-btn ${index===value?'active-btn':''}`}
                  >
                  {job.company}
                </button>
              )
            })
          }
        </div>
        {/* job info */}
        <article className='job-info'>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='job-date'>{dates}</p>
          {
          duties.map((duty, index)=>{
            return (
              <div key={index} className='job-desc'>
                <FaAngleDoubleRight className='job-icon'/>
                <p>{duty}</p>
              </div>
            )
          })
          }
        </article>
      </div>
    </section>
  );

}

export default App
