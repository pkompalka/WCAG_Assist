<template>
<div>
  <div class='reviewContainer'>
    <span id="reviewAlert" class="reviewAlert" @click="disableTimeout">This site has one minute timeout after, which you will be redirected to the previous site. If you wish to disable timeout, please click this panel.</span>
    <label class='reviewLabel'><title>Watch review</title></label>
    <video controls class='mediaElement'>
      <source src="@/assets/video.mp4" type="video/mp4" />
      <track default kind="subtitles" srcLang="en" src='@/assets/subtitles.srt'/>
      <track default kind="description" srcLang="en" src='@/assets/subtitles.srt'/>
    </video>
    <details class='mediaElement'>
      <summary>Video transcript</summary>
      <p>1
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
        So...
      </p>
    </details>
    <label class='reviewLabel'><b>Listen to expert opinion about it:</b></label>
    <audio controls class='mediaElement'>
      <source src="@/assets/audio.mp3" type="audio/mpeg" />
    </audio>
    <details class='mediaElement'>
      <summary>Audio transcript</summary>
      <p>7
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
        as long as I can remember.
      </p>
    </details>
    <button class='goBackButton' @click="onGoBackClick" alt="Go back to auction">Go back to auction</button>
  </div>
</div>
</template>

<script>
export default {
  name: 'ReviewComponent',

  data() {
    return { 
      isTimeoutDisabled: false 
    }
  },

  created(){
    setTimeout(this.goBackTimeout, 60000);
  },

  methods: {
    onGoBackClick() {
      history.back();
    },

    disableTimeout() {
      this.isTimeoutDisabled = true;
      document.getElementById('reviewAlert').style.display = 'none';
    },

    goBackTimeout() {
      if (!this.isTimeoutDisabled)
        window.history.back();
    }
  }
}
</script>

<style scoped>
.reviewContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.reviewLabel {
    margin-top: 2%;
    font-size: x-large;
}

.mediaElement {
    width: 70%;
}

.test {
    white-space: break-spaces;
    width: 70%;
}

div {
    white-space: pre-wrap;
}

.goBackButton { 
    background-color: #4d0303;
    color: white;
    border-radius: 15px;
    font-size: 125%;
}

.reviewAlert {
    margin-top: 1%;
    background-color: yellow;
    color: black;
    width: 90%;
    cursor: pointer;
    height: auto;
    text-align: center;
    font-size: large;
}
</style>
