import log4js from "log4js"



export const logger = log4js.getLogger();
logger.level = process.env.NODE_ENV === "production" ? "info" : "debug"