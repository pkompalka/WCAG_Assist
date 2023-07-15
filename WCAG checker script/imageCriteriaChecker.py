import logger as Logger


def handle_starttag(tagElement):
    wcag_1_1_1_checker(tagElement)


def wcag_1_1_1_checker(tagElement):
    isInputImage = False
    if tagElement.tag == "input":
        if tagElement.GetAttributeValue("type") == "image":
            isInputImage = True

    if tagElement.tag == "img" or isInputImage:
        if (tagElement.GetAttributeValue("alt") is None) and (tagElement.GetAttributeValue("aria-label") is None) and (tagElement.GetAttributeValue("arialabel") is None):
            Logger.LogError("1.1.1 Non-text Content", tagElement.lineNumber, tagElement.fileName, "image must have alternative text")

