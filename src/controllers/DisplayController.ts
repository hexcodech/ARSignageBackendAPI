import {Request, Response, Router} from 'express';
import Data from '../DataClass';
import Display from '../DisplayClass';
import Room from '../RoomClass';

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

        const dataIndex = Data.findDisplayInConfig(req.params.id);
        if (dataIndex.displayIndex !== -1) {
                // TODO fix
                // Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].timer.update();
                res.send(Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex]);
            } else {
                console.error('Display ' + req.params.id + ' does not exist. It can not be returned.');
                res.json({
                    works: 'nope',
                });
            }
        
    }
    
    private addDisplay(displayId: string, displayIp: string) {
        //
        const dataIndex = Data.findDisplayInConfig(displayId);
        Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].active = true;
        Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].displayId = displayId;
        Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].ip = displayIp;

    }

    private newDisplay(req: Request, res: Response) {
        
        this.addDisplay(req.body.displayId, req.ip);
        
        res.json({
            id: 'works',
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
            this.getDisplay(req, res);
        });
        this.router.post('/', (req: Request, res: Response) => {
            this.newDisplay(req, res);
        });
        this.router.put('/clear', (req: Request, res: Response) => {
            this.clearDisplay(req, res);
        });
    }
}

export default new DisplayController();
