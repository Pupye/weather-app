import winston from 'winston'

const consoleFormattingWithColors = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf((info) => {
        const {
            timestamp, level, message, ...args
        } = info;

        const ts = timestamp.slice(0, 19).replace('T', ' ');
        return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ' '}`;
    }),
);

let options = {
    console: {
        name: 'console.info',
        level: 'debug',
        format: winston.format.combine(winston.format.colorize(), consoleFormattingWithColors),
        handleExceptions: true,
        silent: false,
        json: false,
        colorize: true,
    },
};

let logger = winston.createLogger({
    transports: [
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};


export default logger;
