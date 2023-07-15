import { React, useEffect } from 'react';
import Navbar from './Navbar'
import './Review.css';

function Review() {
  useEffect(() => {
    setTimeout(function () { onGoBackClick(); }, 30000);
  }, []);

  function onGoBackClick() {
    window.history.back();
  }

  function handleAnimation() {
    document.getElementById('videoLabel').style = 'animation-iteration-count: infinite;';
  }

  return (
    <div>
      <Navbar />
      <div className='reviewContainer'>
        <label id='videoLabel' className='reviewLabelVideo' onClick={handleAnimation}><b>Watch review, click label to animate background:</b></label>
        <video controls className='mediaElement'>
          <source src={require('../media/video.mp4')} type="video/mp4" />
        </video>
        <label className='reviewLabelAudio' onClick={handleAnimation}><b>Listen to expert opinion about it:</b></label>
        <audio autoPlay="autoplay" className='mediaElement'>
          <source src={require('../media/audio.mp3')} type="audio/mpeg" />
        </audio>
        <button className='goBackButton' onClick={onGoBackClick}></button>
      </div>
    </div>
  );
}

export default Review;