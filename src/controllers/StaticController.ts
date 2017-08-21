import {Request, Response, Router} from 'express';

export class StaticController {
    public router: Router;

    constructor()   {
        this.router = Router();
        this.initRoutes();
    }

    private getFrontend(req: Request, res: Response) {
        console.log(__dirname + '/frontend.html');
        res.sendFile('index.html', {root: __dirname + '/../../frontend/'});
    }

    private initRoutes()    {
        this.router.get('/:displayId/', express.static(__dirname + '/../frontend'));
    }

}

export default new StaticController();
