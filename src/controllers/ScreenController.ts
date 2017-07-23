import {Request, Response, Router} from 'express';
import Screen from '../ScreenClass';

export class ScreenController {
    public router: Router;

    constructor()   {
        this.router = Router();
        this.initRoutes();
    }

    private testMethod() {
        // Screen.screens.findIndex( (i: Screen) => i.id === name);
        console.log('test');
    }

    private get(req: Request, res: Response)    {
        // Return for example res.json(User.find(req.query.id));
        
        res.json({
            message: 'Screen',
        });
    }
    private newScreen(req: Request, res: Response)    {
        // create new Screen Object
        const newScreenName = req.body.id;
        console.log(newScreenName);

        Screen.screens[Screen.totalScreens] = new Screen(newScreenName);
        
        this.testMethod();

        // console.log(Screen.screens[Screen.totalScreens]);
        
        console.log(JSON.stringify(Screen.screens));

        res.json({
            arrayNumber: Screen.totalScreens,
            message: Screen.screens[Screen.totalScreens].id,
            test: Screen.screens[Screen.totalScreens].test,
        });
        Screen.totalScreens++;
    }

    private initRoutes()    {
        this.router.get('/', this.get);
        this.router.post('/', this.newScreen);
        // this.getIdFromName();
    }
}

export default new ScreenController();
