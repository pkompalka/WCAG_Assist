import logger as Logger
import cssParsed as CSSParsed


class ButtonCriteriaChecker:
    def __init__(self):
        self.currentButtonAltText = ""
        self.currentButtonElement = None
        self.doesNormalButtonHaveLabel = False

    def handle_starttag(self, tagElement, cssAttributesAssigned):
        if isButton(tagElement):
            self.wcagButtonChecker(tagElement)
            wcag_2_5_5_checker(tagElement, cssAttributesAssigned)

    def handle_endtag(self, tag):
        if tag == "button":
            if not self.doesNormalButtonHaveLabel:
                Logger.LogError("1.3.3 Sensory Characteristics, 1.4.1 Use of Color", self.currentButtonElement.lineNumber,
                                self.currentButtonElement.fileName, "button does not have label")

        if tag == "button" or tag == "input":
            self.currentButtonElement = None
            self.currentButtonAltText = ""
            self.doesNormalButtonHaveLabel = False

    def handle_data(self, data):
        if self.currentButtonElement is not None and self.currentButtonElement.tag == "button":
            self.doesNormalButtonHaveLabel = True
            self.wcag_2_5_3_checker(data)

    def wcagButtonChecker(self, tagElement):
        self.currentButtonElement = tagElement

        altAttribute = self.currentButtonElement.GetAttributeValue("alt")
        if altAttribute is not None:
            self.currentButtonAltText = altAttribute
        else:
            ariaLabelAttribute = self.currentButtonElement.GetAttributeValue("aria-label")
            if ariaLabelAttribute is not None:
                self.currentButtonAltText = ariaLabelAttribute
            else:
                Logger.LogError("1.3.6 Identify Purpose", self.currentButtonElement.lineNumber,
                                self.currentButtonElement.fileName, "button does not have alternative text")

        if self.currentButtonElement.tag == "input":
            inputButtonText = self.currentButtonElement.GetAttributeValue("value")
            if (inputButtonText is not None) and inputButtonText != "":
                self.wcag_2_5_3_checker(inputButtonText)
            else:
                Logger.LogError("1.3.3 Sensory Characteristics, 1.4.1 Use of Color", self.currentButtonElement.lineNumber,
                                self.currentButtonElement.fileName, "submit button does not have label")

    def wcag_2_5_3_checker(self, data):
        if not (data.lower() in self.currentButtonAltText.lower()):
            Logger.LogError("2.5.3 Label in Name", self.currentButtonElement.lineNumber, self.currentButtonElement.fileName,
                            "alternative text does not contain button label")


def wcag_2_5_5_checker(tagElement, cssAttributesAssigned):
    heightAttribute = CSSParsed.getStyle(cssAttributesAssigned, "height")
    widthAttribute = CSSParsed.getStyle(cssAttributesAssigned, "width")
    if isBelow44px(heightAttribute):
        Logger.LogError("2.5.5 Target Size", tagElement.lineNumber, tagElement.fileName, "button height below 44px")
    if isBelow44px(widthAttribute):
        Logger.LogError("2.5.5 Target Size", tagElement.lineNumber, tagElement.fileName, "button width below 44px")


def isSubmitButton(tagElement):
    if tagElement.tag == "input":
        if tagElement.GetAttributeValue("type") == "submit":
            return True

    return False


def isButton(tagElement):
    if tagElement.tag == "button" or isSubmitButton(tagElement):
        return True

    return False


def isBelow44px(pxText):
    try:
        pxValue = int(pxText.strip("px").strip())
        if pxValue < 44:
            return True
        else:
            return False
    except:
        return False
