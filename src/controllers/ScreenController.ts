import {Request, Response, Router} from 'express';
import Screen from '../ScreenClass';

export class ScreenController {
    public router: Router;

    constructor()   {
        this.router = Router();
        this.initRoutes();
    }

    private getIndexFromId(searchId: string): number {
        return Screen.screens.findIndex( (i: Screen) => i.displayId === searchId);
    }

    private getScreen(req: Request, res: Response)    {
        // get whole state

        const displayIndex = this.getIndexFromId(req.params.id);
        if (displayIndex !== -1) {
                Screen.screens[displayIndex].timer.update();
                res.send(Screen.screens[displayIndex]);
            } else {
                console.error('Screen ' + req.params.id + ' does not exist. It can not be returned.');
            }
        
    }

    private newScreen(req: Request, res: Response)    {
        // create new Screen Object
        const displayId = req.body.displayId;
        const displayIp = req.ip;
        const displayIndex = this.getIndexFromId(displayId);

        // Check whether a screen with the same Id is not already registered
        if (displayIndex === - 1) {
            // then register it
            Screen.screens[Screen.totalScreens] = new Screen(displayId, displayIp);
        } else {
            console.log('Screen ' + displayId + ' does already exist.');
            // just update it
            // TODO update properties
        }

        // console.log(Screen.screens);
        // console.log(Screen.screens[Screen.totalScreens - 1].id);
                
        // Response
        res.json({
            arrayNumber: Screen.totalScreens,
            id: Screen.screens[Screen.totalScreens - 1 ].displayId,
        });
    }

    private clearScreen(req: Request, res: Response) {
        // clear all listed displays
        const todo = req.body;
        todo.forEach((element: any) => {
            const displayIndex = this.getIndexFromId(element.displayId);
            if (displayIndex !== -1) {
                Screen.screens[displayIndex].clear();
            } else {
                console.error('Screen ' + element.displayId + ' does not exist. It can not be cleared.');
            }
        });

        res.json({
            test: 'test',
        });
    }

    private initRoutes()    {
        this.router.get('/:id', (req: Request, res: Response) => {
            console.log('\x1b[40m');
            this.getScreen(req, res);
        });
        this.router.post('/', (req: Request, res: Response) => {
            console.log('\x1b[40m');
            this.newScreen(req, res);
        });
        this.router.put('/clear', (req: Request, res: Response) => {
            console.log('\x1b[40m');
            this.clearScreen(req, res);
        });
    }
}

export default new ScreenController();
