import logger as Logger


class MediaCriteriaChecker:
    def __init__(self):
        self.videoElements = []
        self.audioElements = []
        self.videoStack = []
        self.isVideoTagStarted = False
        self.isTranscriptInfoFound = False

    def handle_starttag(self, tagElement):
        if tagElement.tag == "video":
            self.videoElements.append(tagElement)
            self.isVideoTagStarted = True
            wcag_1_4_2_checker(tagElement)

        if tagElement.tag == "audio":
            self.audioElements.append(tagElement)
            wcag_1_4_2_checker(tagElement)

        if self.isVideoTagStarted:
            self.videoStack.append(tagElement)

    def handle_endtag(self, tag):
        if tag == "video":
            self.isVideoTagStarted = False
            areSubtitlesSet = False
            areSubtitlesSetCorrectly = False
            isDescriptionSet = False
            isDescriptionSetCorrectly = False
            trackElements = list(filter(lambda x: x.tag == "track", self.videoStack))
            for trackElement in trackElements:
                kindAttribute = trackElement.GetAttributeValue("kind")
                srcLangAttribute = trackElement.GetAttributeValue("srclang")

                if kindAttribute == "subtitles":
                    if srcLangAttribute is not None:
                        areSubtitlesSetCorrectly = True
                    else:
                        areSubtitlesSet = True

                if kindAttribute == "description":
                    if srcLangAttribute is not None:
                        isDescriptionSetCorrectly = True
                    else:
                        isDescriptionSet = True

            if not areSubtitlesSetCorrectly:
                if not areSubtitlesSet:
                    Logger.LogError("1.2.2 Captions (Prerecorded)", self.videoStack[0].lineNumber,
                                    self.videoStack[0].fileName, "video must have subtitles")
                else:
                    Logger.LogError("1.2.2 Captions (Prerecorded)", self.videoStack[0].lineNumber,
                                    self.videoStack[0].fileName, "subtitles must have language set")

            if not isDescriptionSetCorrectly:
                if not isDescriptionSet:
                    Logger.LogError("1.2.5 Audio Description (Prerecorded)", self.videoStack[0].lineNumber,
                                    self.videoStack[0].fileName, "video must have audiodescription")
                else:
                    Logger.LogError("1.2.5 Audio Description (Prerecorded)", self.videoStack[0].lineNumber,
                                    self.videoStack[0].fileName, "audiodescription must have language set")
            else:
                Logger.LogInformation("1.2.7 Extended Audio Description (Prerecorded) ", self.videoStack[0].lineNumber,
                                      self.videoStack[0].fileName, "audiodescription must be extended")

            self.videoStack.clear()

    def handle_data(self, data):
        if "transcript" in data:
            self.isTranscriptInfoFound = True

    def end_processing(self):
        self.wcag_video_information()
        self.wcag_audio_information()

    def wcag_video_information(self):
        for videoElement in self.videoElements:
            Logger.LogInformation("1.2.6 Sign Language (Prerecorded)", videoElement.lineNumber,
                                  videoElement.fileName,
                                  "video must have sign language")

            if not (len(self.videoElements) + len(self.audioElements) == 1 and self.isTranscriptInfoFound):
                Logger.LogInformation(
                    "1.2.1 Prerecorded Audio-only and Video-only; 1.2.8 Media Alternative (Prerecorded)",
                    videoElement.lineNumber, videoElement.fileName, "video must have transcript")

    def wcag_audio_information(self):
        for audioElement in self.audioElements:
            Logger.LogInformation("1.4.7 Low or No Background Audio", audioElement.lineNumber,
                                  audioElement.fileName,
                                  "audio must have no loud background noise")

            if not (len(self.videoElements) + len(self.audioElements) == 1 and self.isTranscriptInfoFound):
                Logger.LogInformation("1.2.1 Prerecorded Audio-only and Video-only", audioElement.lineNumber,
                                      audioElement.fileName, "audio must have transcript")


def wcag_1_4_2_checker(tagElement):
    autoplayAttribute = tagElement.GetAttributeValue("autoplay")
    if autoplayAttribute is not None:
        if tagElement.GetAttributeValue("autoplay").lower() == "autoplay":
            Logger.LogError("1.4.2 Audio Control", tagElement.lineNumber, tagElement.fileName,
                            "audio cannot play automatically")
