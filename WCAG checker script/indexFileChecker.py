import config as Config
import logger as Logger
from html.parser import HTMLParser


class IndexHTMLParser(HTMLParser):
    def __init__(self):
        HTMLParser.__init__(self)
        self.lineNumber = 0
        self.wasLanguageSet = False

    def handle_starttag(self, tag, attrs):
        if tag == "html" and len(list(filter(lambda x: x[0] == "lang", attrs))) > 0:
            self.wasLanguageSet = True


def checkIndexFile():
    parser = IndexHTMLParser()
    with open(Config.PATH_TO_INDEX_FILE) as file:
        for line in file:
            parser.feed(line.rstrip())

    if not parser.wasLanguageSet:
        Logger.LogError("3.1.1 Language of Page", 1, "index.html", "no language set for whole application")
