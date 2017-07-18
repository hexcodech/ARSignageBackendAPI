import {Request, Response, Router} from 'express';
import Screen from '../ScreenClass';

export class ScreenController {
    public router: Router;

    constructor()   {
        this.router = Router();
        this.initRoutes();
    }

    private get(req: Request, res: Response)    {
        // Return for example res.json(User.find(req.query.id));
        res.json({
            message: 'Screen',
        });
    }
    private newScreen(req: Request, res: Response)    {
        // create new Screen Object
        let ScreenId: string = req.params.id;
        Screen.screens[Screen.totalScreens] = new Screen('ScreenId');
        console.log(Screen.screens[Screen.totalScreens]);
        
        res.json({
            arrayNumber: Screen.totalScreens,
            test: Screen.screens[Screen.totalScreens].test,
            message: Screen.screens[Screen.totalScreens].id,
        });
        Screen.totalScreens++;
    }

    private initRoutes()    {
        this.router.get('/', this.get);
        this.router.put('/', this.newScreen);
    }
}

export default new ScreenController();
