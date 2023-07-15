import logger as Logger


def handle_starttag(tagElement):
    mouseDownAttributes = tagElement.GetAttributeValue("mousedown")
    keyDownAttributes = tagElement.GetAttributeValue("keydown")
    if (mouseDownAttributes is not None) or (keyDownAttributes is not None):
        Logger.LogError("2.5.2 Pointer Cancellation", tagElement.lineNumber, tagElement.fileName,
                        "down events are not allowed")

    mouseAttribute = tagElement.GetAttribute("mouse")
    keyAttributes = tagElement.GetAttribute("key")
    keyAttributes = [x for x in keyAttributes if not (x[0] == "key" or x[0] == ":key")]

    if len(mouseAttribute) != len(keyAttributes) and tagElement.tag != "button" and tagElement.tag != "input":
        Logger.LogError("2.5.6 Concurrent Input Mechanisms", tagElement.lineNumber, tagElement.fileName,
                        "no concurrent mouse and keyboard events")

    focusAttributes = tagElement.GetAttributeValue("focus")
    if focusAttributes is not None:
        Logger.LogWarning("3.2.1 On Focus", tagElement.lineNumber, tagElement.fileName,
                          "no autonomous unintentional action should happen after focus")

    inputAttributes = tagElement.GetAttributeValue("input")
    if inputAttributes is not None:
        Logger.LogWarning("3.2.2 On Input", tagElement.lineNumber, tagElement.fileName,
                          "no autonomous unintentional action should happen after input")
