import {Request, Response, Router} from 'express';
import Display from '../DisplayClass';

export class DisplayController {
    public router: Router;

    constructor()   {
        this.router = Router();
        this.initRoutes();
    }

    private getIndexFromId(searchId: string): number {
        return Display.displays.findIndex( (i: Display) => i.displayId === searchId);
    }

    private getDisplay(req: Request, res: Response)    {
        // get whole state

        const displayIndex = this.getIndexFromId(req.params.id);
        if (displayIndex !== -1) {
                Display.displays[displayIndex].timer.update();
                res.send(Display.displays[displayIndex]);
            } else {
                console.error('Display ' + req.params.id + ' does not exist. It can not be returned.');
            }
        
    }

    private newDisplay(req: Request, res: Response)    {
        // create new Display Object
        const displayId = req.body.displayId;
        const displayIp = req.ip;
        const displayIndex = this.getIndexFromId(displayId);

        // Check whether a display with the same Id is not already registered
        if (displayIndex === - 1) {
            // then register it
            Display.displays[Display.totalDisplays] = new Display(displayId, displayIp);
        } else {
            console.log('Display ' + displayId + ' does already exist.');
            // just update it
            // TODO update properties
        }

        // console.log(Display.displays);
        // console.log(Display.displays[Display.totalDisplays - 1].id);
                
        // Response
        res.json({
            arrayNumber: Display.totalDisplays,
            id: Display.displays[Display.totalDisplays - 1 ].displayId,
        });
    }

    private clearDisplay(req: Request, res: Response) {
        // clear all listed displays
        const todo = req.body;
        todo.forEach((element: any) => {
            const displayIndex = this.getIndexFromId(element.displayId);
            if (displayIndex !== -1) {
                Display.displays[displayIndex].clear();
            } else {
                console.error('Display ' + element.displayId + ' does not exist. It can not be cleared.');
            }
        });

        res.json({
            test: 'test',
        });
    }

    private initRoutes()    {
        this.router.get('/:id', (req: Request, res: Response) => {
            console.log('\x1b[40m');
            this.getDisplay(req, res);
        });
        this.router.post('/', (req: Request, res: Response) => {
            console.log('\x1b[40m');
            this.newDisplay(req, res);
        });
        this.router.put('/clear', (req: Request, res: Response) => {
            console.log('\x1b[40m');
            this.clearDisplay(req, res);
        });
    }
}

export default new DisplayController();
