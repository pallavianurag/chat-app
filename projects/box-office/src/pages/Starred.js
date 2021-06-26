import React, { useEffect,useState } from 'react'
import MainPagelayout from '../components/MainPagelayout'
import { useShows } from '../misc/custom-hooks'
import ShowGrid from '../components/show/ShowGrid'
import { apiGet } from '../misc/config'

export const Starred = () => {
    
        const [starred]= useShows();
        const [show,setShow] =useState(null);
        const[isLoading,setIsLoading]=useState(true)
         const[error, setError]=useState(null)

         useEffect(() =>{
             if(starred && starred.length>0){
                const promises=starred.map(showId => apiGet(`/shows/${showId}`))

                Promise.all(promises)
                .then(apiData => apiData.map(show=>({show})))
                .then(results=>{
                    setShow(results)
                    setIsLoading(false)
                })
                .catch(err=>{
                    setError(err.message)
                    setIsLoading(false)
                })
             }
             else{
                 setIsLoading(false)
             }
         },[starred])
         return (
        <MainPagelayout> 
            {isLoading && <div>shows are still loading</div>}
            {error && <div>Error occured: {error}</div>}
            {!isLoading && !show && <div>No shows were added</div>}
            {!isLoading && !error && show && <div><ShowGrid data={show} /></div>}
             </MainPagelayout>
           
        
    )
}

export default Starred