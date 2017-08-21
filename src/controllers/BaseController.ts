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
        console.log('body');
        console.log(req.body);
        
        const timer = req.body.timer;
        
        const roomIndex = Data.findRoomInConfig(req.body.timer.roomId);
        
        if (typeof req.body.timer.running !== undefined) {
            
            Data.data[roomIndex].timer.running = req.body.timer.running;
            if (Data.data[roomIndex].timer.seconds) {
                Data.data[roomIndex].timer.endTime = Data.data[roomIndex].timer.seconds + Math.floor(Date.now() / 1000);
            }
        }
        if (req.body.timer.seconds) {
            Data.data[roomIndex].timer.seconds = req.body.timer.seconds;
        }

        Data.data[roomIndex].timer.update();
        const todo = req.body.rooms;
        const time = req.body.time;
        
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
