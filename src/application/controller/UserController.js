export class UserController {

    static renderLoginForm(req, res, next) {
        try {
            return res
            .status(200)
            .set('Content-Type', 'text/html')
            .render('login', { title:'Login Usuario' });

        } catch (err) {
            next(err);
        }         
    }

    static renderRegisterForm(req, res, next) {
        try {
            return res
            .status(200)
            .set('Content-Type', 'text/html')
            .render('register', { title:'Cadastro de Usuario' });

        } catch (err) {
            next(err);
        }
    }
}