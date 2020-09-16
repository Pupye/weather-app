
function generalError(err, req, res, next) {
    res.status(500).send('Something broke!')
}


export { generalError }
