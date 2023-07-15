import logger as Logger


class FormCriteriaChecker:
    def __init__(self):
        self.isFormProcessing = False
        self.labelsInForm = []
        self.inputsInForm = []
        self.elementsStack = []

    def handle_starttag(self, tagElement, cssAttributesAssigned):
        self.elementsStack.append(tagElement)
        if tagElement.tag == "form":
            self.isFormProcessing = True
            Logger.LogInformation("3.3.6 Error Prevention (All)", tagElement.lineNumber, tagElement.fileName,
                                  "form must have confirmation before sending or be editable after being sent")

        if self.isFormProcessing:
            typeChecker(tagElement)
            self.wcag_3_2_2_checker_starttag(tagElement, cssAttributesAssigned)

    def handle_endtag(self, tag):
        if tag == "form":
            self.endtagChecker()
            self.isFormProcessing = False
            self.labelsInForm = []
            self.inputsInForm = []

    def handle_data(self, data):
        if "?" in data:
            self.wcag_3_3_5_checker(data)

    def wcag_3_2_2_checker_starttag(self, tagElement, cssAttributes):
        if tagElement.tag == "label":
            htmlForValue = tagElement.GetAttributeValue("for")
            if htmlForValue is not None:
                self.labelsInForm.append([htmlForValue, tagElement, cssAttributes])

        if tagElement.tag == "input":
            typeValue = tagElement.GetAttributeValue("type")
            if typeValue is not None:
                if typeValue != "submit":
                    idValue = tagElement.GetAttributeValue("id")
                    if idValue is not None:
                        self.inputsInForm.append([idValue, tagElement, cssAttributes])
                    else:
                        Logger.LogError("3.3.2 Labels or Instructions", tagElement.lineNumber, tagElement.fileName,
                                        "input has no label assigned, because it has no id")

    def wcag_3_3_5_checker(self, data):
        if len(list(filter(lambda x: x.tag == "form", self.elementsStack))) > 0 and len(list(filter(lambda x: x.tag == "a", self.elementsStack))) == 0:
            Logger.LogWarning("3.3.5 Help", self.elementsStack[-1].lineNumber, self.elementsStack[-1].fileName,
                              "possible question found without hyperlink assigned, if question is difficult explanation nedds to be provided")

    def endtagChecker(self):
        for inputValue in self.inputsInForm:
            labelsAssignedToInput = list(filter(lambda x: inputValue[0] == x[0], self.labelsInForm))
            if len(labelsAssignedToInput) == 0:
                Logger.LogError("3.3.2 Labels or Instructions", inputValue[1].lineNumber, inputValue[1].fileName,
                                "input has no label assigned with for attribute")

            for labelValue in labelsAssignedToInput:
                wcag_1_3_1_checker(labelValue, inputValue)

        for idValue in self.labelsInForm:
            if len(list(filter(lambda x: idValue == x[0], self.labelsInForm))) > 1:
                Logger.LogError("3.3.2 Labels or Instructions", idValue[1].lineNumber, idValue[1].fileName,
                                "label has duplicated name in form")


def wcag_1_3_1_checker(labelInForm, inputInForm):
    requiredAttribute = inputInForm[1].GetAttribute("required")
    if len(requiredAttribute) > 0 and (requiredAttribute[0][1] == "true" or requiredAttribute[0][1] is None):
        wasAsteriskFound = False
        for labelStyle in labelInForm[2]:
            if labelStyle[0] == "content" and ("*" in labelStyle[1]):
                wasAsteriskFound = True

        for inputStyle in inputInForm[2]:
            if inputStyle[0] == "content" and ("*" in inputStyle[1]):
                wasAsteriskFound = True

        if not wasAsteriskFound:
            Logger.LogWarning("1.3.1 Info and Relationships", inputInForm[1].lineNumber, inputInForm[1].fileName,
                              "style marking required field not found")


def typeChecker(tagElement):
    if tagElement.tag == "input":
        if tagElement.GetAttributeValue("type") is None:
            Logger.LogError("3.3.1 Error Identification, 3.3.3 Error Suggestion ", tagElement.lineNumber,
                            tagElement.fileName, "no type attribute which define input data format")
