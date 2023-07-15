import re
import finalChecker as FinalChecker


def processLine(data):
    animationStopChecker(data)


def animationStopChecker(line):
    if (("animationIterationCount" in line) or ("animation-iteration-count" in line)) and "0" in line:
        styleNameRegex = re.findall('\(.*?\)', line)
        if len(styleNameRegex) > 0:
            FinalChecker.wcagStyleWithImplementedStopList.append(styleNameRegex[0][2:-2])

