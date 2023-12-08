import winston from "winston";

const customLevelOption = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4,
        http: 5

    },
    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'orange',
        info: 'green',
        debug: 'blue',
        http: 'white'


    }
}

const logger = winston.createLogger({
    levels: customLevelOption.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOption.colors }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './error.log',
            level: 'warning',
            format: winston.format.simple()
        }),
    ]
});
export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url}- ${new Date().toLocaleTimeString()}`);
    next()
}


export default logger;