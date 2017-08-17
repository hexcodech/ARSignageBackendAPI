import {Request, Response, Router} from 'express';
import Data from '../DataClass';

export class BaseController {
    public router: Router;

    constructor()   {
        this.router = Router();
        this.initRoutes();
    }

    private default(req: Request, res: Response)   {
        res.json({
            message: 'Hello World',
        });
    }

    private setTimer(req: Request, res: Response) {
        // set the timer for multiple rooms
        const todo = req.body.rooms;
        const time = req.body.time;

        todo.forEach((element: any) => {
            
            const roomIndex = Data.findRoomInConfig(element.roomId);
            if (roomIndex !== -1 && Data.data[roomIndex].hasOwnProperty('timer')) {
                const endTime = Math.floor(Date.now() / 1000) + time;
                Data.data[roomIndex].timer.endTime = endTime;
                Data.data[roomIndex].timer.running = true;
                Data.data[roomIndex].timer.update();
            } else {
                console.error('Room ' + element.roomId + ' does not exit. Timer can not be set.');
            }

        });

        res.send(Data.data);
    }

    private initRoutes()    {
        this.router.get('/', this.default);
        this.router.put('/timer', (req: Request, res: Response) => {
            this.setTimer(req, res);
        });
    }

}

export default new BaseController();
