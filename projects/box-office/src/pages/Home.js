import React , { useState } from 'react'
import ActorGrid from '../components/actor/ActorGrid'
import MainPagelayout from '../components/MainPagelayout'
import ShowGrid from '../components/show/ShowGrid'
import { apiGet } from '../misc/config'
import { useLastQuery } from '../misc/custom-hooks'
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled'
import CustomRadio from '../components/CustomRadio'
const Home = () => {

    const [input, setInput] = useLastQuery()
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
            <SearchInput
            type="text" 
            placeholder="Search actors and series"
            onChange={onInputChange} value={input}
            onKeyDown={onKeyDown} />
            <RadioInputsWrapper>
                <div>
                    <CustomRadio 
                    label="Shows"
                    id="shows-search"
                    onChange={onRadioChange}
                    checked={isShowsSearch}
                     value="shows"
                    />
                </div>
                <div>
                    <CustomRadio 
                    label="Actors"
                    id="actors-search" 
                    onChange={onRadioChange}
                    checked={!isShowsSearch}
                     value="people"
                    />
                </div>
                
            </RadioInputsWrapper>
            <SearchButtonWrapper>
                <button type="button" onClick={onSearch} >Search</button>
             </SearchButtonWrapper>    
            {renderResults()}
        </MainPagelayout>
            
    )
}

export default Home
