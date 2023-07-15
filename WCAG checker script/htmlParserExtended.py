from html.parser import HTMLParser
import tagElement as TagElement
import cssParsed as CSSParsed
import animationCriteriaChecker as AnimationCriteriaChecker
import buttonCriteriaChecker as ButtonCriteriaChecker
import colorCriteriaChecker as ColorCriteriaChecker
import eventCriteriaChecker as EventCriteriaChecker
import formCriteriaChecker as FormCriteriaChecker
import imageCriteriaChecker as ImageCriteriaChecker
import keyboardCriteriaChecker as KeyboardCriteriaChecker
import mediaCriteriaChecker as MediaCriteriaChecker
import restCriteriaChecker as RestCriteriaChecker
import textCriteriaChecker as TextCriteriaChecker
import timeoutCriteriaChecker as TimeoutCriteriaChecker


class HTMLParserExtended(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.buttonCriteriaChecker = ButtonCriteriaChecker.ButtonCriteriaChecker()
        self.formCriteriaChecker = FormCriteriaChecker.FormCriteriaChecker()
        self.mediaCriteriaChecker = MediaCriteriaChecker.MediaCriteriaChecker()
        self.restCriteriaChecker = RestCriteriaChecker.RestCriteriaChecker()
        self.textCriteriaChecker = TextCriteriaChecker.TextCriteriaChecker()
        self.cssAttributes = []
        self.lineNumber = 0
        self.fileName = ""
        self.tagElement = None
        self.skipData = False

    def handle_starttag(self, tag, attrs):
        if tag == "script":
            self.skipData = True
        if self.skipData:
            return
        tagElement = TagElement.TagElement(tag, attrs, self.lineNumber, self.fileName)
        stylesForElement = CSSParsed.getStylesForElement(tagElement, self.cssAttributes)
        ColorCriteriaChecker.handle_starttag(tagElement, stylesForElement)
        EventCriteriaChecker.handle_starttag(tagElement)
        ImageCriteriaChecker.handle_starttag(tagElement)
        KeyboardCriteriaChecker.handle_starttag(tagElement)
        self.buttonCriteriaChecker.handle_starttag(tagElement, stylesForElement)
        self.formCriteriaChecker.handle_starttag(tagElement, stylesForElement)
        self.mediaCriteriaChecker.handle_starttag(tagElement)
        self.restCriteriaChecker.handle_starttag(tagElement)
        self.textCriteriaChecker.handle_starttag(tagElement)

    def handle_endtag(self, tag):
        if self.skipData:
            if tag == "script":
                self.skipData = False
            return
        self.buttonCriteriaChecker.handle_endtag(tag)
        self.formCriteriaChecker.handle_endtag(tag)
        self.mediaCriteriaChecker.handle_endtag(tag)
        self.restCriteriaChecker.handle_endtag(tag)

    def handle_data(self, data):
        if self.skipData:
            return
        self.buttonCriteriaChecker.handle_data(data)
        self.formCriteriaChecker.handle_data(data)
        self.mediaCriteriaChecker.handle_data(data)
        self.restCriteriaChecker.handle_data(data)

    def start_processing(self, data, lineNumber, fileName, cssAttributes):
        self.lineNumber = lineNumber
        self.fileName = fileName
        self.cssAttributes = cssAttributes
        AnimationCriteriaChecker.processLine(data)
        ColorCriteriaChecker.processLine(data)
        TimeoutCriteriaChecker.processLine(data, lineNumber, fileName)
        self.feed(data)

    def end_processing(self):
        self.mediaCriteriaChecker.end_processing()
        self.restCriteriaChecker.end_processing()
        self.textCriteriaChecker.end_processing()
