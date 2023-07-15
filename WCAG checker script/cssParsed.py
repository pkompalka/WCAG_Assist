import re
import config as Config
import finalChecker as FinalChecker


class CSSParsed:
    def __init__(self, fullPath):
        self.fullPath = fullPath
        self.namesAndAttributes = []

        isVueStyleStarted = False
        css = ""
        with open(self.fullPath) as file:
            for line in file:
                if Config.TECHNOLOGY == Config.VUE:
                    if isVueStyleStarted:
                        css += line.rstrip()
                    isStyleStarted = re.match('<*style\s*.*>', line.rstrip())
                    if isStyleStarted is not None:
                        isVueStyleStarted = not isVueStyleStarted
                else:
                    css += line.rstrip()

        rules = getRulesFromString(css)
        self.namesAndAttributes = processRules(rules, self.fullPath)


def getRulesFromString(css):
    rules = []
    while css.find('}') != -1:
        styleEndIndex = css.find('}') + 1
        potentialStyle = css[:styleEndIndex]
        css = css[styleEndIndex:]
        numberOfOpenBrackets = potentialStyle.count('{')
        numberOfCloseBrackets = potentialStyle.count('}')
        while numberOfOpenBrackets != numberOfCloseBrackets:
            styleEndIndex = css.find('}') + 1
            potentialStyle += css[:styleEndIndex]
            css = css[styleEndIndex:]
            numberOfOpenBrackets = potentialStyle.count('{')
            numberOfCloseBrackets = potentialStyle.count('}')

        rules.append(potentialStyle)

    return rules


def processRules(rules, fullPath):
    namesAndAttributes = []
    for rule in rules:
        if "@keyframes" in rule:
            handleAnimationStyle(rule, fullPath)
            continue
        attributeList = []
        splitByName = rule.split('{')
        styleName = splitByName[0].strip()
        attributes = splitByName[1].split(';')
        animationName = ""
        for x in range(len(attributes) - 1):
            attribute = attributes[x].strip()
            splitByAttribute = attribute.split(':')
            attributeName = splitByAttribute[0].strip()
            attributeValue = splitByAttribute[1].strip()
            if attributeName == "animation-name":
                animationName = attributeValue
            attributeList.append([attributeName, attributeValue])

        if animationName != "":
            FinalChecker.wcagStyleNameAndAnimationNameList.append([styleName, animationName, fullPath.split('\\')[-1], attributeList])
        namesAndAttributes.append([styleName, attributeList])

    return namesAndAttributes


def handleAnimationStyle(animationStyle, fullPath):
    animationNameIndex = animationStyle.find('{')
    animationName = animationStyle[:animationNameIndex]
    css = animationStyle[animationNameIndex:]
    css.lstrip().rstrip()
    css = css[1:-1]
    rules = getRulesFromString(css)
    animationTransitionsAndAttributes = processRules(rules, fullPath)
    FinalChecker.wcagAnimationDefinitionList.append([animationName, animationTransitionsAndAttributes])


def getStylesForElement(tagElement, cssAttributes):
    assignedStyles = []
    for tagAttribute in tagElement.attributes:
        for cssAttribute in cssAttributes:
            if (tagAttribute[0].lower() == "class" or tagAttribute[0].lower() == "classname") and cssAttribute[0].startswith(".") and (tagAttribute[1] in cssAttribute[0]):
                if cssAttribute[0].endswith(":hover"):
                    for value in cssAttribute[1]:
                        value.append(":hover")
                assignedStyles.extend(cssAttribute[1])

            if tagAttribute[0].lower() == "id" and cssAttribute[0].startswith("#") and (tagAttribute[1] in cssAttribute[0]):
                if cssAttribute[0].endswith(":hover"):
                    for value in cssAttribute[1]:
                        value.append(":hover")
                assignedStyles.extend(cssAttribute[1])

            if tagElement.tag == cssAttribute[0]:
                if cssAttribute[0].endswith(":hover"):
                    for value in cssAttribute[1]:
                        value.append(":hover")
                assignedStyles.extend(cssAttribute[1])

    return assignedStyles


def getStyle(cssAttributes, styleName):
    stylesList = list(filter(lambda x: styleName == x[0].lower(), cssAttributes))
    if len(stylesList) > 0:
        return stylesList[0][1]
    else:
        return None
