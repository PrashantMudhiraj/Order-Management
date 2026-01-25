import winston from "winston";

const orderedFormat = winston.format.printf((info) => {
    return JSON.stringify({
        level: info.level,
        timestamp: info.timestamp,
        message: info.message,
        requestId: info.requestId,
        ...info,
    });

    // return `[ ${info.level} ] [ ${info.timestamp} ] [ RequestId : ${info.requestId} ]`;
});

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        orderedFormat,
    ),

    transports: [new winston.transports.Console()],
});
