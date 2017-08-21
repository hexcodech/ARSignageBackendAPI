import {Request, Response, Router} from 'express';
import Data from '../DataClass';
import Display from '../DisplayClass';
// import * as index from '../index';
import Room from '../RoomClass';

export class DisplayController {
    public router: Router;
    constructor()   {
        this.router = Router();
        this.initRoutes();
    }

    public addDisplay(displayId: string, socketId: string) {
        //
        const dataIndex = Data.findDisplayInConfig(displayId);
        if (dataIndex.displayIndex !== -1) {
            Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].active = true;
            Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].socketId = socketId;
        } else {
            console.error('Display ' + displayId + ' can not be added because it is not present in config');
        }
    }

    public removeDisplay(displayId: string) {
        //
        const dataIndex = Data.findDisplayInConfig(displayId);
        if (dataIndex.displayIndex !== -1) {
            Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].active = false;
            Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].socketId = null;
        } else {
            console.error('Display ' + displayId + ' can not be removed because it is not present in config');
        }
    }

    private getDisplay(req: Request, res: Response)    {
        // get whole state
        console.log('get one Display');
        const dataIndex = Data.findDisplayInConfig(req.params.id);
        if (dataIndex.displayIndex !== -1) {
                // TODO fix
                Data.data[dataIndex.roomIndex].timer.update();
                res.send(Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex]);
            } else {
                console.error('Display ' + req.params.id + ' does not exist. It can not be returned.');
                res.json({
                    works: 'nope',
                });
            }
        
    }

    private getDisplays(req: Request, res: Response) {
        console.log('get all displays');
        res.send(Data.data);
    }

    private newDisplay(req: Request, res: Response) {
        
        this.addDisplay(req.body.displayId, req.ip);
        
        res.json({
            id: 'works',
        });

    }

    private updateDisplay(req: Request, res: Response) {
        // 
        const dataIndex = Data.findDisplayInConfig(req.params.id);
        // dataIndex.roomIndex
        this.updateDisplayState(dataIndex, req.body.display);

        res.send(Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex]);
    }
    private updateDisplayState(dataIndex: any, displayObject: any) {
        console.log('try to update display: ' + displayObject.displayId);
        for (const key in displayObject) {
            if (displayObject.hasOwnProperty(key) && displayObject[key] !== null) {
                if (key === 'media') {
                    for (const subkey in displayObject[key]) {
                        if (displayObject[key].hasOwnProperty(subkey) && displayObject[key][subkey] !== null) {
                            Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex][key][subkey] = displayObject[key][subkey];
                        }
                    }
                } else if (key === 'displayId' || key === 'friendlyName' || key === 'timer' || key === 'target' 
                || key === 'lastUpdated' || key === 'isFetching' || key === 'didInvalidate') {
                    // 
                } else {
                    Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex][key] = displayObject[key];
                }
            }
        }
        Data.data[dataIndex.roomIndex].timer.update();
    }

    private clearDisplay(req: Request, res: Response) {
        // clear all listed displays
        const todo = req.body.displayIds;
        console.log(req.body);
        todo.forEach((element: any) => {
            const dataIndex = Data.findDisplayInConfig(element);
            if (dataIndex.displayIndex !== -1) {
                Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].clear();
            } else {
                console.error('Display ' + element + ' does not exist. It can not be cleared.');
            }
        });
        res.send(Data.data);
    }

    private initRoutes()    {
        this.router.get('/:id', (req: Request, res: Response) => {
            this.getDisplay(req, res);
        });
        this.router.get('/', (req: Request, res: Response) => {
            this.getDisplays(req, res);
        });
        this.router.post('/', (req: Request, res: Response) => {
            this.newDisplay(req, res);
        });
        this.router.put('/clear', (req: Request, res: Response) => {
            this.clearDisplay(req, res);
        });
        this.router.put('/:id', (req: Request, res: Response) => {
            this.updateDisplay(req, res);
        });
        this.router.put('/', (req: Request, res: Response) => {
            this.updateDisplay(req, res);
        });
    }
}

export default new DisplayController();
