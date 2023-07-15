import logger as Logger
import string


def handle_starttag(tagElement):
    wcag_1_3_2_checker(tagElement)
    wcag_2_1_4_checker(tagElement)


def wcag_1_3_2_checker(tagElement):
    tabIndexAttribute = tagElement.GetAttributeValue("tabindex")
    if tabIndexAttribute is not None:
        try:
            if int(tabIndexAttribute) > 0:
                Logger.LogWarning("1.3.2 Meaningful Sequence, 2.4.3 Focus Order", tagElement.lineNumber, tagElement.fileName,
                                  "potential change of focus order, which might result in unclear sequence")
        except:
            pass


def wcag_2_1_4_checker(tagElement):
    accessKeyAttribute = tagElement.GetAttributeValue("accesskey")
    if accessKeyAttribute is not None:
        if (accessKeyAttribute in list(string.ascii_lowercase)) or (accessKeyAttribute in list(string.digits)) or (accessKeyAttribute in list(string.punctuation)):
            Logger.LogInformation("2.1.4 Character Key Shortcuts", tagElement.lineNumber, tagElement.fileName,
                                  "character key shortcuts must be possible to turn off")
