import logger as Logger
import config as Config
import cssParsed as CSSParsed
import pytesseract
from PIL import Image
import os
import os.path
import glob

wcag148ColorChangesNumber = 0
wcagStyleNameAndAnimationNameList = []
wcagStyleWithImplementedStopList = []
wcagAnimationDefinitionList = []


def finalCheck():
    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    wcag_1_4_8_checker()
    animationStopChecker()
    animationFlashChecker()
    imageTextChecker()


def wcag_1_4_8_checker():
    if wcag148ColorChangesNumber < 2:
        Logger.LogError("1.4.8 Visual Presentation", 0, "whole solution", "at least 2 background colors changes not found")


def animationStopChecker():
    for styleAndAnimation in wcagStyleNameAndAnimationNameList:
        if len(list(filter(lambda x: x in styleAndAnimation[0], wcagStyleWithImplementedStopList))) == 0:
            Logger.LogError("2.2.2 Pause, Stop, Hide, 2.3.3 Animation from Interactions", 0, styleAndAnimation[2],
                            "animation has no stop mechanism implemented")


def animationFlashChecker():
    for animationDefinition in wcagAnimationDefinitionList:
        if animationDefinition[0][0] == "from":
            animationDefinition[0][0] = "0%"
        if animationDefinition[0][-1] == "to":
            animationDefinition[0][-1] = "100%"
        for styleWithAnimation in wcagStyleNameAndAnimationNameList:
            if styleWithAnimation[1] in animationDefinition[0]:
                animationDurationText = CSSParsed.getStyle(styleWithAnimation[3], "animation-duration")
                if animationDurationText.endswith('ms'):
                    animationDuration = float(animationDurationText[:-2]) / 1000
                else:
                    animationDuration = float(animationDurationText[:-1])
                flashMoments = []
                if animationDuration is None:
                    continue
                for animationPart in animationDefinition[1]:
                    if (CSSParsed.getStyle(animationPart[1], "background-color") is not None) or (CSSParsed.getStyle(animationPart[1], "color") is not None) or (CSSParsed.GetStyle(animationPart[1], "brightness") is not None):
                        flashMoments.append(float(animationPart[0][:-1]))

                loopedAnimationDuration = animationDuration
                loopedFlashedMoments = flashMoments
                while loopedAnimationDuration < 1:
                    loopedFlashedMoments = [x + 100 for x in loopedFlashedMoments]
                    flashMoments.extend(loopedFlashedMoments)
                    loopedAnimationDuration += animationDuration

                exactFlashMoments = [(x / 100) * animationDuration for x in flashMoments]
                if len(exactFlashMoments) > 3:
                    for i in range(len(exactFlashMoments) - 3):
                        if exactFlashMoments[i + 3] - exactFlashMoments[i] < 1000:
                            Logger.LogError("2.3.1 Three Flashes or Below Threshold, 2.3.2 Three Flashes", 0,
                                            styleWithAnimation[2], "more than three flashes in one second")
                            break


def imageTextChecker():
    for filePath in glob.glob(Config.PATH_TO_SRC_FOLDER + r'\**\*.jpg'):
        try:
            if pytesseract.image_to_string(Image.open(os.path.join(Config.PATH_TO_IMAGES_FOLDER, filePath)), lang="eng") != "":
                Logger.LogWarning("1.4.5 Images of Text, 1.4.9 Images of Text (No Exception)", 0,
                                  filePath.split('\\')[-1], "image with potential text found, use it only as decoration")
        except:
            pass
