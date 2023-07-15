import logger as Logger


class TextCriteriaChecker:
    def __init__(self):
        self.sectionElements = []
        self.sectionStack = []
        self.isSectionTagStarted = False
        self.headerElements = ["h1", "h2", "h3", "h4", "h5", "h6"]
        self.paragraphElements = []

    def handle_starttag(self, tagElement):
        self.wcag_2_4_10_checker_starttag(tagElement)

    def handle_endtag(self, tag):
        self.wcag_2_4_10_checker_endtag(tag)

    def end_processing(self):
        self.wcag_2_4_10_checker_end_processing()

    def wcag_2_4_10_checker_starttag(self, tagElement):
        if tagElement.tag == "section":
            self.sectionElements.append(tagElement)
            self.isSectionTagStarted = True

        if self.isSectionTagStarted:
            self.sectionStack.append(tagElement)

        if tagElement.tag == "p":
            self.paragraphElements.append(tagElement)

    def wcag_2_4_10_checker_endtag(self, tag):
        if tag == "section":
            wasHeaderInThisSection = False
            while self.sectionStack[len(self.sectionStack) - 1].tag != "section":
                lastElementFromStack = self.sectionStack.pop()
                if lastElementFromStack.tag in self.headerElements:
                    wasHeaderInThisSection = True

            lastSectionElement = self.sectionStack.pop()
            if not wasHeaderInThisSection:
                Logger.LogError("2.4.10 Section Headings", lastSectionElement.lineNumber, lastSectionElement.fileName,
                                "section must have header")

    def wcag_2_4_10_checker_end_processing(self):
        if len(self.paragraphElements) > 3 and len(self.sectionElements) == 0:
            Logger.LogWarning("2.4.10 Section Headings", self.paragraphElements[0].lineNumber,
                              self.paragraphElements[0].fileName, "no section element with at least 4 paragraphs")

