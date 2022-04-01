export default (err, req, res, next) => {
    if (err) {
        res
        .status(400)
        .set('Content-Type', 'application/json')
        .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
        .json({ message: err.message });
    }

    next();
}