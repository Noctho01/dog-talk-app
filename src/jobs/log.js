import chalk from "chalk";
const log = console.log;

export class Log {

    /**
     * @param {Error} objectError 
     */
    static error(objectError, isStack = true, isCode = true, isMessage = true) {
        log(`
        ${chalk.bold.red('ERROR!!')}
        ${chalk.bold.red('CODE:')} ${chalk.bold.white(isCode?objectError.code:null)} ${chalk.bold.red('MESSAGE:')} ${chalk.bold.white(isMessage?objectError.message:null)}
        ${chalk.bold.red('STACK:')} ${chalk.bold.white(isStack?objectError.stack:null)}
        `);
    }


    /**
     * @param {String} eventName 
     * @param {String} eventMsg 
     */
    static event(eventName, eventMsg) {
        log(`${chalk.blue.bold('EVENT', eventName.toUpperCase())} ${chalk.yellow.italic(eventMsg)}`);
    }


    /**
     * @param {String} path 
     * @param {Number} line 
     * @param {String} msg 
     */
    static debug(path, line, msg) {
        log(`${chalk.blue.bold('DEBUG')} ${chalk.green.bold(msg)} ${chalk.green.italic(path + ':' + line)}`);
    }


    /**
     * @param {String} method 
     * @param {String} endpoint 
     * @param {Number} statusCode 
     */
    static web(method, endpoint, statusCode) {
        method = !method ? undefined : method.toUpperCase();
        switch(method) {
            case 'GET':
                switch(statusCode.toString()[0]) {
                    case '2':
                        log(`${chalk.blue.bold('WEB')} ${chalk.green.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.greenBright.bold.italic(statusCode)} ✅`);
                        break;
                    case '3':
                        log(`${chalk.blue.bold('WEB')} ${chalk.green.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.blueBright.bold.italic(statusCode)} 🌀`);
                        break;
                    case '4':
                        log(`${chalk.blue.bold('WEB')} ${chalk.green.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.redBright.bold.italic(statusCode)} ❌`);
                        break;
                    case '5':
                        log(`${chalk.blue.bold('WEB')} ${chalk.green.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.redBright.bold.italic(statusCode)} ❌`);
                        break;
                    default:
                        log(`${chalk.blue.bold('WEB')} ${chalk.green.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.white.bold.italic(statusCode)} 🌐`);
                        break;
                }
                break;

            case 'POST':
                switch(statusCode.toString()[0]) {
                    case '2':
                        log(`${chalk.blue.bold('WEB')} ${chalk.magenta.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.greenBright.bold.italic(statusCode)} ✅`);
                        break;
                    case '3':
                        log(`${chalk.blue.bold('WEB')} ${chalk.magenta.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.blueBright.bold.italic(statusCode)} 🌀`);
                        break;
                    case '4':
                        log(`${chalk.blue.bold('WEB')} ${chalk.magenta.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.redBright.bold.italic(statusCode)} ❌`);
                        break;
                    case '5':
                        log(`${chalk.blue.bold('WEB')} ${chalk.magenta.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.redBright.bold.italic(statusCode)} ❌`);
                        break;
                    default:
                        log(`${chalk.blue.bold('WEB')} ${chalk.magenta.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.white.bold.italic(statusCode)} 🌐`);
                        break;
                }
                break;

            case 'PUT':
                switch(statusCode.toString()[0]) {
                    case '2':
                        log(`${chalk.blue.bold('WEB')} ${chalk.yellow.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.greenBright.bold.italic(statusCode)} ✅`);
                        break;
                    case '3':
                        log(`${chalk.blue.bold('WEB')} ${chalk.yellow.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.blueBright.bold.italic(statusCode)} 🌀`);
                        break;
                    case '4':
                        log(`${chalk.blue.bold('WEB')} ${chalk.yellow.bgWhite.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.redBright.bold.italic(statusCode)} ❌`);
                        break;
                    case '5':
                        log(`${chalk.blue.bold('WEB')} ${chalk.yellow.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.redBright.bold.italic(statusCode)} ❌`);
                        break;
                    default:
                        log(`${chalk.blue.bold('WEB')} ${chalk.yellow.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.white.bold.italic(statusCode)} 🌐`);
                        break;
                }
                break;

            case 'DELETE':
                switch(statusCode.toString()[0]) {
                    case '2':
                        log(`${chalk.blue.bold('WEB')} ${chalk.red.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.greenBright.bold.italic(statusCode)} ✅`);
                        break;
                    case '3':
                        log(`${chalk.blue.bold('WEB')} ${chalk.red.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.blueBright.bold.italic(statusCode)} 🌀`);
                        break;
                    case '4':
                        log(`${chalk.blue.bold('WEB')} ${chalk.red.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.redBright.bold.italic(statusCode)} ❌`);
                        break;
                    case '5':
                        log(`${chalk.blue.bold('WEB')} ${chalk.red.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.redBright.bold.italic(statusCode)} ❌`);
                        break;
                    default:
                        log(`${chalk.blue.bold('WEB')} ${chalk.red.bgBlack.bold(method)} ${chalk.white.italic(endpoint)} ${chalk.white.bold.italic(statusCode)} 🌐`);
                        break;
                }
                break;

            default:
                log(`${chalk.blue.bold('WEB')} ${chalk.redBright.bold.italic('voce não especificou os parametros para o log.web...')}`);
                break;
        }
    }
}