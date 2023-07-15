import {React, useEffect} from 'react';
import Navbar from '../components/Navbar'
import './Review.css';

function Review() {
  let isTimeoutDisabled = false;

  useEffect(() => {
    try {
      function goBackTimeout() {
        if (!isTimeoutDisabled)
          window.history.back();
      }
      setTimeout(function () { goBackTimeout(); }, 60000);
    } catch { }
  }, [isTimeoutDisabled]);

  function onGoBackClick() {
    window.history.back();
  }

  function disableTimeout() {
    isTimeoutDisabled = true;
    document.getElementById('reviewAlert').style.display = 'none';
  }

  return (
    <div>
      <Navbar />
      <div className='reviewContainer'>
        <span id="reviewAlert" className="reviewAlert" onClick={disableTimeout}>This site has one minute timeout after, which you will be redirected to the previous site. If you wish to disable timeout, please click this panel.</span>
        <label className='reviewLabel'><title>Watch review</title></label>
        <video controls className='mediaElement'>
          <source src={require('../media/video.mp4')} type="video/mp4" />
          <track default kind="subtitles" srcLang="en" src={require('../media/subtitles.srt')} />
          <track default kind="description" srcLang="en" src={require('../media/subtitles.srt')} />
        </video>
        <details className='mediaElement'>
          <summary>Video transcript</summary>
          <p>{`1
00:01:47,250 --> 00:01:50,500
This blade has a dark past.

2
00:01:51,800 --> 00:01:55,800
It has shed much innocent blood.

3
00:01:58,000 --> 00:02:01,450
You're a fool for traveling alone,
so completely unprepared.

4
00:02:01,750 --> 00:02:04,800
You're lucky your blood's still flowing.

5
00:02:05,250 --> 00:02:06,300
Thank you.

6
00:02:07,500 --> 00:02:09,000
So...`}
        </p>
      </details>
        <label className='reviewLabel'><b>Listen to expert opinion about it:</b></label>
        <audio controls className='mediaElement'>
          <source src={require('../media/audio.mp3')} type="audio/mpeg" />
        </audio>
        <details className='mediaElement'>
          <summary>Audio transcript</summary>
          <p>{`7
00:02:09,400 --> 00:02:13,800
What brings you to
the land of the gatekeepers?

8
00:02:15,000 --> 00:02:17,500
I'm searching for someone.

9
00:02:18,000 --> 00:02:22,200
Someone very dear?
A kindred spirit?

10
00:02:23,400 --> 00:02:25,000
A dragon.

11
00:02:28,850 --> 00:02:31,750
A dangerous quest for a lone hunter.

12
00:02:32,950 --> 00:02:35,870
I've been alone for
as long as I can remember.`}
          </p>
        </details>
        <button className='goBackButton' alt='Go back to auction' onClick={onGoBackClick}>Go back to auction</button>
      </div>
    </div>
  );
}

export default Review;