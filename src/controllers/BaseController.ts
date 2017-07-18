import {Request, Response, Router} from 'express';

export class BaseController {
    public router: Router;

    constructor()   {
        this.router = Router();
        this.initRoutes();
    }

    private get(req: Request, res: Response)   {
        res.json({
            message: 'Hello World',
        });
    }

    private initRoutes()    {
        this.router.get('/', this.get);
    }
}

export default new BaseController();
