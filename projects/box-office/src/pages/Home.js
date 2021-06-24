import React , { useState } from 'react'
import ActorGrid from '../components/actor/ActorGrid'
import MainPagelayout from '../components/MainPagelayout'
import ShowGrid from '../components/show/ShowGrid'
import { apiGet } from '../misc/config'

const Home = () => {

    const [input, setInput] = useState('')
    const [results,setResults]= useState(null)
    const [searchOption, setSearchOption] = useState('shows')

    const onSearch = () => {
        apiGet(`/search/${searchOption}?q=${input}`).then(result => {
            setResults(result);
        })
    }
    
    const isShowsSearch = searchOption   === 'shows';

    const onInputChange =  ev => {
        setInput(ev.target.value)
    }

    const onRadioChange = ev =>{
        setSearchOption(ev.target.value)
    }

    const onKeyDown= ev =>{
        if(ev.keyCode === 13)
        onSearch();
    }

    const renderResults =()=>{
        if(results && results.length === 0)
        return  <div> No results </div>

        if(results && results.length > 0){
        return results[0].show ? 
                    <ShowGrid data={results} /> : <ActorGrid data={results} />
        }
        return null
    }
    return (
        <MainPagelayout>
            <input type="text" 
            placeholder="Search actors and movies"
            onChange={onInputChange} value={input}
            onKeyDown={onKeyDown} />
            <button type="button" onClick={onSearch} >Search</button>
            <div>
                <label htmlFor="shows-search">
                    Shows<input id="shows-search"
                    onChange={onRadioChange}
                    checked={isShowsSearch}
                     type="radio" value="shows" />
                </label>
                <label htmlFor="actors-search">
                    Actors<input id="actors-search" 
                    onChange={onRadioChange}
                    checked={!isShowsSearch}
                    type="radio" value="people" />
                </label>
            </div>
            {renderResults()}
        </MainPagelayout>
            
    )
}

export default Home
