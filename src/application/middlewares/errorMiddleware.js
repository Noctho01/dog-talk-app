import { Log as log } from "../../jobs/log.js";

export default (err, req, res, next) => {
    if (err) {
        if (err.message === "Token expirado") {
            res.clearCookie('Authorization-Token');
        }

        log.error(err, false);

        return res
        .status(400)
        .set('Access-Control-Allow-Credentials', 'true')
        .set('Content-Type', 'application/json; charset=utf-8')
        .set('X-Powered-By', 'PHP/5.5.9-1ubuntu4.11')
        .json({ error: err.message });
    }

    return next();
}