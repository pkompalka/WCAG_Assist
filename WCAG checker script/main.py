import config as Config
import logger as Logger
import htmlParserExtended as HTMLParserExtended
import indexFileChecker as IndexFileChecker
import cssParsed as CSSParsed
import finalChecker as FinalChecker
import re
import glob


def modifyPath(pathFromImport, currentPath):
    pathFromImportSplit = pathFromImport.split("/")
    fullPathFromImport = ""
    currentPathSplit = currentPath.split("\\")
    if pathFromImportSplit[0] == ".":
        currentPathSplit[-1] = pathFromImportSplit[1]
        fullPathFromImport = "\\".join(currentPathSplit)
    if pathFromImportSplit[0] == "..":
        currentPathSplit.pop()
        for splitElement in pathFromImportSplit:
            if splitElement == "..":
                currentPathSplit.pop()
            else:
                currentPathSplit.append(splitElement)
        fullPathFromImport = "\\".join(currentPathSplit)

    return fullPathFromImport


def getCSSAttributesFromImport(textInLine, currentFilePath, allCSSFiles):
    if textInLine.startswith("import"):
        fullCSSPath = getPathFromRelativePath(textInLine, currentFilePath, ".css")
        correspondingImportedCSS = list(filter(lambda x: x.fullPath == fullCSSPath, allCSSFiles))
        if len(correspondingImportedCSS) > 0:
            return correspondingImportedCSS[0].namesAndAttributes

    return None


def getPathFromRelativePath(textInLine, currentPath, fileExtension):
    relativePath = re.findall('\'([^"]*)\'', textInLine)
    if len(relativePath) == 0:
        relativePath = re.findall('"([^"]*)"', textInLine)

    if len(relativePath) > 0 and relativePath[0].endswith(fileExtension):
        return modifyPath(relativePath[0], currentPath)

    return ""


def handleAngularFile(componentText, httpParser, currentFilePath, allCSSFiles):
    htmlFilePath = ""
    cssFilesPath = []
    cssAttributesFromFiles = []
    for componentTextPart in componentText.split(','):
        if "templateUrl" in componentTextPart:
            htmlFilePath = getPathFromRelativePath(componentTextPart, currentFilePath, ".html")

        if "styleUrls" in componentTextPart:
            cssRelativePaths = re.findall('\[([^"]*)\]', componentTextPart)[0].split(",")
            for relativePath in cssRelativePaths:
                cssFilesPath.append(getPathFromRelativePath(relativePath, currentFilePath, ".css"))

    for angularCSSPath in cssFilesPath:
        angularImportedCSS = list(filter(lambda x: x.fullPath == angularCSSPath, allCSSFiles))
        if len(angularImportedCSS) > 0:
            cssAttributesFromFiles.extend(angularImportedCSS[0].namesAndAttributes)

    if htmlFilePath != "":
        with open(htmlFilePath) as angularFile:
            angularLineNumber = 1
            for angularLine in angularFile:
                httpParser.start_processing(angularLine.rstrip(), angularLineNumber, htmlFilePath.split('\\')[-1], cssAttributesFromFiles)
                angularLineNumber += 1


pathToComponents = ""
pathToCSS = ""
cssFiles = []
match Config.TECHNOLOGY:
    case Config.REACT:
        pathToComponents = Config.PATH_TO_SRC_FOLDER + r'\**\*.jsx'
        pathToCSS = Config.PATH_TO_SRC_FOLDER + r'\**\*.css'
    case Config.ANGULAR:
        pathToComponents = Config.PATH_TO_SRC_FOLDER + r'\**\*.ts'
        pathToCSS = Config.PATH_TO_SRC_FOLDER + r'\**\*.css'
    case Config.VUE:
        pathToComponents = Config.PATH_TO_SRC_FOLDER + r'\**\*.vue'
        pathToCSS = Config.PATH_TO_SRC_FOLDER + r'\**\*.vue'

for cssFilePath in glob.glob(pathToCSS, recursive=True):
    with open(cssFilePath) as cssFile:
        match Config.TECHNOLOGY:
            case Config.REACT | Config.ANGULAR:
                cssFiles.append(CSSParsed.CSSParsed(cssFilePath))
            case Config.VUE:
                cssFiles.append(CSSParsed.CSSParsed(cssFilePath))

IndexFileChecker.checkIndexFile()

for filePath in glob.glob(pathToComponents, recursive=True):
    parser = HTMLParserExtended.HTMLParserExtended()
    with open(filePath) as file:
        lineNumber = 1
        cssAttributesAssigned = []
        wasAngularComponentFound = False
        angularComponentLines = ""

        if Config.TECHNOLOGY == Config.VUE:
            correspondingCSS = list(filter(lambda x: x.fullPath == filePath, cssFiles))
            if len(correspondingCSS) > 0:
                cssAttributesAssigned.extend(correspondingCSS[0].namesAndAttributes)

        for line in file:
            lineText = line.rstrip()

            if filePath.endswith(".ts"):
                if "@Component" in lineText:
                    wasAngularComponentFound = True

                if wasAngularComponentFound:
                    angularComponentLines += lineText
                    if ")" in lineText:
                        handleAngularFile(angularComponentLines, parser, filePath, cssFiles)
                        break

                continue

            importedCSSAttributes = getCSSAttributesFromImport(lineText, filePath, cssFiles)
            if importedCSSAttributes is not None:
                cssAttributesAssigned.extend(importedCSSAttributes)

            parser.start_processing(lineText, lineNumber, filePath.split('\\')[-1], cssAttributesAssigned)
            lineNumber += 1

    parser.end_processing()

FinalChecker.finalCheck()
Logger.DumpLogs()
