import { Router } from  "express";

export const viewRouter = new Router();

viewRouter.get("/", (req, res, next) => {
    try {
        res
        .status(200)
        .render('index');

    } catch (err) {
        next(err);
    }
});