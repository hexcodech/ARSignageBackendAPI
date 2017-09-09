import {Request, Response, Router} from 'express';
import * as mime from 'mime-types';
import Config from '../Config';
import Data from '../DataClass';

export class MediaController {
    public router: Router;

    constructor()   {
        this.router = Router();
        this.initRoutes();
    }

    private listAllFiles(req: Request, res: Response)   {
        const dir = '/../../media';
        this.getFolders(dir, res);
    }
    
    private getFolders(dir: any, res: Response) {
        const folderlist = new Array<any>();
        const fs = require('fs');

        const folders = fs.readdirSync(__dirname + dir);
        folders.forEach((f: any) => {
            const stats = fs.statSync(__dirname + dir + '/' + f);
            if (stats.isDirectory) {
                folderlist.push(f);
            }
        });
        this.getFiles(dir, folderlist, res);
        
    }

    private getFiles(dir: any, folderlist: string[], res: Response) {
        const filelist = new Array<any>();
        const fs = require('fs');
        folderlist.forEach((folder) => {
            const files = fs.readdirSync(__dirname + dir + '/' + folder);
            files.forEach((file: any) => {
                const stats = fs.statSync(__dirname + dir + '/' + folder + '/' + file);
                if (stats.isFile) {
                    filelist.push({name : file, roomId: folder, 
                        type: mime.lookup(__dirname + dir + '/' + folder + '/' + file),
                         url: encodeURI('http://' + Data.myIp + ':' + Config.PORT + '/static/' + folder + '/' + file)});
                }

            });
        });
        res.send(filelist);
    }

    private initRoutes()    {
        this.router.get('/', (req: Request, res: Response) => {
            this.listAllFiles(req, res);
        });
    }

}

export default new MediaController();
