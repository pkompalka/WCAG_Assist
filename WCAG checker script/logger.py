import config as Config

errorLogs = []
warningLogs = []
informationLogs = []


def LogError(criterion, lineNumber, fileName, description):
    errorLogs.append("ERROR - line " + str(lineNumber) + " in " + fileName + " file - " + criterion + " WCAG criterion broken - " + description)


def LogWarning(criterion, lineNumber, fileName, description):
    warningLogs.append("WARNING - line " + str(lineNumber ) + " in " + fileName + " file - " + criterion + " WCAG criterion potentially broken - " + description)


def LogInformation(criterion, lineNumber, fileName, description):
    informationLogs.append("INFORMATION - line " + str(lineNumber) + " in " + fileName + " file - " + criterion + " WCAG criterion reminder - " + description)


def DumpLogs():
    if len(errorLogs) > 0:
        print("Errors found: " + str(len(errorLogs)))
        for errorLog in errorLogs:
            writeLogEntry(errorLog)
            print(errorLog)

    if Config.LOG_LEVEL > 1:
        if len(warningLogs) > 0:
            print("Warnings found: " + str(len(warningLogs)))
            for warningLog in warningLogs:
                writeLogEntry(warningLog)
                print(warningLog)

    if Config.LOG_LEVEL > 2:
        if len(informationLogs) > 0:
            print("Information found: " + str(len(informationLogs)))
            for informationLog in informationLogs:
                writeLogEntry(informationLog)
                print(informationLog)


def writeLogEntry(logEntry):
    file = open("results.txt", "a")
    file.write(logEntry + "\n")
    file.close()
