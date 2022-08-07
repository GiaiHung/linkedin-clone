import React from 'react'
import './Feed.css'
import { Avatar } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import EventIcon from '@mui/icons-material/Event';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import InputOption from './InputOption';
import Post from './Post';

function Feed() {
  return (
    <div className="feed">
      {/* Feed Input */}
      <div className="feed_input_container">
        {/* Input */}
        <div className="feed_input">
          <Avatar className="input_avatar" />
          <div className='input_text'>
              <CreateIcon />
              <form>
                <input type="text" spellCheck={false} placeholder="Start a post" />
              </form>
          </div>
        </div>

        {/* Options */}
        <div className="feed_input_options">
            <InputOption Icon={InsertPhotoIcon} title='Photo' color='#70b5f9' />
            <InputOption Icon={VideoLibraryIcon} title='Video' color='#e7a33e' />
            <InputOption Icon={EventIcon} title='Event' color='#c0cbcd' />
            <InputOption Icon={NewspaperIcon} title='Article' color='#7fc15e' />
        </div>
      </div>

      {/* Feed Content */}
      <Post name='Giai Hung' description='I am a student' message='Does it work???' />
    </div>
  )
}

export default Feed
