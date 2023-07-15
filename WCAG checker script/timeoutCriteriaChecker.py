import logger as Logger


def processLine(data, line_number, file_name):
    wcag_timeout_checker(data, line_number, file_name)


def wcag_timeout_checker(line, lineNumber, fileName):
    if ("setTimeout" in line) or ("setInterval" in line):
        Logger.LogInformation("2.2.1 Timing Adjustable", lineNumber, fileName,
                              "non real time functionality should not have time constraint")
        Logger.LogInformation("2.2.3 No Timing", lineNumber, fileName,
                              "time constraint should have possibility to be stopped or turned off")
        Logger.LogInformation("2.2.6 Timeouts", lineNumber, fileName, "user should be informed about time constraint")

