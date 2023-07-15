import logger as Logger
import matplotlib
import finalChecker as FinalChecker


def handle_starttag(tagElement, cssAttributesAssigned):
    wcag_1_4_6_checker(tagElement, cssAttributesAssigned)
    wcag_1_4_11_checker(tagElement, cssAttributesAssigned)


def processLine(line):
    if ("document.body.style" in line) and ("background" in line):
        wcag_1_4_8_checker()


def wcag_1_4_6_checker(tagElement, cssAttributesAssigned):
    color = list(filter(lambda x: x[0] == "color" and len(x) == 2, cssAttributesAssigned))
    backgroundColor = list(filter(lambda x: x[0] == "background-color" and len(x) == 2, cssAttributesAssigned))
    if len(color) > 0 and len(backgroundColor) > 0:
        contrastRatio = contrastRatioCalculator(color[0][1], backgroundColor[0][1])

        if contrastRatio < 4.5:
            Logger.LogError("1.4.3 Contrast (Minimum), 1.4.6 Contrast (Enhanced)", tagElement.lineNumber,
                            tagElement.fileName, "color contrast below 4.5:1")

        if 4.5 <= contrastRatio < 7:
            Logger.LogError("1.4.6 Contrast (Enhanced)", tagElement.lineNumber, tagElement.fileName,
                            "color contrast below 7:1")

    if len(color) > 0 != len(backgroundColor) > 0:
        Logger.LogInformation("1.4.3 Contrast (Minimum), 1.4.6 Contrast (Enhanced)", tagElement.lineNumber,
                              tagElement.fileName, "only one color set, verify if contrast ratio is at least 7:1")


def wcag_1_4_8_checker():
    FinalChecker.wcag148ColorChangesNumber += 1


def wcag_1_4_11_checker(tagElement, cssAttributesAssigned):
    colorNormal = list(filter(lambda x: x[0] == "color" and len(x) == 2, cssAttributesAssigned))
    backgroundColorNormal = list(filter(lambda x: x[0] == "background-color" and len(x) == 2, cssAttributesAssigned))
    colorHover = list(filter(lambda x: x[0] == "color" and len(x) == 3 and x[2] == ":hover", cssAttributesAssigned))
    backgroundColorHover = list(filter(lambda x: x[0] == "background-color" and len(x) == 3 and x[2] == ":hover", cssAttributesAssigned))
    contrastRatio = None
    if len(colorHover) > 0:
        contrastRatio = contrastRatioCalculator(colorHover[0][1], backgroundColorNormal[0][1])

    if len(backgroundColorHover) > 0:
        contrastRatio = contrastRatioCalculator(colorNormal[0][1], backgroundColorHover[0][1])

    if contrastRatio is not None and contrastRatio < 3:
        Logger.LogError("1.4.11 Non-text Contrast", tagElement.lineNumber, tagElement.fileName,
                        "color contrast on hover below 3:1")


def contrastRatioCalculator(firstColor, secondColor):
    if not firstColor.startswith('#'):
        firstColor = matplotlib.colors.cnames[firstColor]
    if not secondColor.startswith('#'):
        secondColor = matplotlib.colors.cnames[secondColor]

    firstColorLuminance = luminanceCalculator(tuple(int(firstColor.lstrip('#')[i:i + 2], 16) for i in (0, 2, 4)))
    secondColorLuminance = luminanceCalculator(tuple(int(secondColor.lstrip('#')[i:i + 2], 16) for i in (0, 2, 4)))

    if secondColorLuminance > firstColorLuminance:
        return secondColorLuminance / firstColorLuminance
    else:
        return firstColorLuminance / secondColorLuminance


def luminanceCalculator(rgb):
    r = luminanceHelpMethod(rgb[0] / 255)
    g = luminanceHelpMethod(rgb[1] / 255)
    b = luminanceHelpMethod(rgb[2] / 255)

    return (0.2126 * r + 0.7152 * g + 0.0722 * b) + 0.05


def luminanceHelpMethod(value):
    if value <= 0.03928:
        return value / 12.92
    else:
        return pow(((value + 0.055) / 1.055), 2.4)
