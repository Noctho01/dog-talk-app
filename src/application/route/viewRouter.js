import { Router } from  "express";

export const viewRouter = new Router();

viewRouter.get("/", (req, res, next) => {
    try {
        return res
        .status(200)
        .set('Content-Type', 'html/txt')
        .render('index');

    } catch (err) {
        next(err.message);
    }
});