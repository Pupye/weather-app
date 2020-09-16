import NoRecordsError from '../NoRecordsError';

function generalErrorHandler(err, req, res, next) {
    res.status(500).send(err.message);
}

function NoRecordsFoundErrorHandler(err, req, res, next) {
    if (err instanceof NoRecordsError) {
        res.status(err.status).send(err.message);
    } else {
        next(err);
    }
}

export { generalErrorHandler, NoRecordsFoundErrorHandler };
