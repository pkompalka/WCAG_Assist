import logger as Logger


class RestCriteriaChecker:
    def __init__(self):
        self.wasTitleFound = False
        self.firstElement = []
        self.headerElements = ["h1", "h2", "h3", "h4", "h5", "h6"]
        self.headerOrLabelElements = []
        self.currentlyProcessedHeaderOrLabelTag = ""
        self.headerOrLabelValues = []

    def handle_starttag(self, tagElement):
        self.wcag_2_4_2_checker_starttag(tagElement)
        self.wcag_2_4_6_checker_starttag(tagElement)
        wcag_2_5_1_checker(tagElement)
        wcag_4_1_1_checker(tagElement)

    def handle_endtag(self, tagElement):
        self.wcag_2_4_6_checker_endtag(tagElement)

    def handle_data(self, data):
        self.wcag_2_4_6_checker_handle_data(data)

    def end_processing(self):
        self.wcag_2_4_2_checker_end_processing()
        self.wcag_2_4_6_checker_end_processing()

    def wcag_2_4_2_checker_starttag(self, tagElement):
        if len(self.firstElement) == 0:
            self.firstElement.append(tagElement)

        if tagElement.tag == "title" or tagElement.fileName.split(".")[0].lower() == "app":
            self.wasTitleFound = True

    def wcag_2_4_2_checker_end_processing(self):
        if not self.wasTitleFound and len(self.firstElement) > 0:
            Logger.LogError("2.4.2 Page Titled", self.firstElement[0].lineNumber, self.firstElement[0].fileName,
                            "no title element found")

    def wcag_2_4_6_checker_starttag(self, tagElement):
        if (tagElement.tag in self.headerElements or tagElement.tag == "label") and self.currentlyProcessedHeaderOrLabelTag == "":
            self.headerOrLabelElements.append(tagElement)
            self.currentlyProcessedHeaderOrLabelTag = tagElement.tag

    def wcag_2_4_6_checker_handle_data(self, data):
        if self.currentlyProcessedHeaderOrLabelTag != "":
            self.headerOrLabelValues.append(data)
            self.currentlyProcessedHeaderOrLabelTag = ""

    def wcag_2_4_6_checker_endtag(self, tag):
        if tag == self.currentlyProcessedHeaderOrLabelTag:
            self.headerOrLabelElements.append("")
            self.currentlyProcessedHeaderOrLabelTag = ""

    def wcag_2_4_6_checker_end_processing(self):
        wasDuplicateFound = False
        iterator = 0
        for value in self.headerOrLabelValues:
            sameValueElements = list(filter(lambda x: x == value, self.headerOrLabelValues))
            if len(sameValueElements) > 1:
                Logger.LogWarning("2.4.6 Headings and Labels", self.headerOrLabelElements[iterator].lineNumber,
                                  self.headerOrLabelElements[iterator].fileName,
                                  "duplicated label or header value which might be confusing for user")
                wasDuplicateFound = True

            iterator += 1

        if not wasDuplicateFound and len(self.headerOrLabelElements) > 0:
            Logger.LogInformation("2.4.6 Headings and Labels", self.headerOrLabelElements[0].lineNumber,
                                  self.headerOrLabelElements[0].fileName,
                                  "label and headers value must not be confusing for user")


def wcag_2_5_1_checker(tagElement):
    if tagElement.tag == "input":
        typeAttribute = tagElement.GetAttributeValue("type")
        if typeAttribute == "range" or (tagElement.GetAttributeValue("drag") is not None):
            Logger.LogInformation("2.5.1 Pointer Gestures", tagElement.lineNumber, tagElement.fileName,
                                  "pointer gestures should have alternative way of handling")


def wcag_4_1_1_checker(tagElement):
    seenAttributes = []
    uniqueAttributes = []
    for attribute in tagElement.attributes:
        seenAttributes.append(attribute[0])
        if attribute[0] not in uniqueAttributes:
            uniqueAttributes.append(attribute[0])

    if len(seenAttributes) != len(uniqueAttributes):
        Logger.LogError("4.1.1 Parsing", tagElement.lineNumber, tagElement.fileName, "duplicate attribute found")
