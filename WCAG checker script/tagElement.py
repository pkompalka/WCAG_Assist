class TagElement:
    def __init__(self, tag, attributes, lineNumber, fileName):
        self.tag = tag
        self.attributes = attributes
        self.lineNumber = lineNumber
        self.fileName = fileName

    def GetAttribute(self, attributeName):
        return list(filter(lambda x: attributeName.lower() in x[0].lower(), self.attributes))

    def GetAttributeValue(self, attributeName):
        attributesList = list(filter(lambda x: attributeName.lower() in x[0].lower(), self.attributes))
        if len(attributesList) > 0:
            return attributesList[0][1]
        else:
            return None

