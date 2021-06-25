import React from 'react'
import { SeasonList, SeasonsWrapper } from './Seasons.styled'

const Seasons = ({episodes}) => {
    return (
        <SeasonsWrapper>
            <p>
        Episodes in total: <span>{episodes.length}</span>
      </p>
      <SeasonList>
        {episodes.map(episode => (
          <div key={episode.id}>
            <div>
              <p>Season: <span> {episode.season} </span>
                Episode: <span>{episode.number} </span>
                <span> {episode.name} </span>
              </p>
            </div>
          </div>
        ))}
      </SeasonList>
    </SeasonsWrapper>
    )
}

export default Seasons
