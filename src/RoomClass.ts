import 'es6-shim';
import 'reflect-metadata';

import {plainToClass} from 'class-transformer';

import Display from './DisplayClass';

export default class Room {
    //
    public static rooms = new Array<Room>();

    // -----------------------------------------------------------------

    public roomId: string;
    public friendlyName: string;
    
    public displays = new Array<Display>();

    public timer = {
        endTime: null as number,
        running: false as boolean,
        seconds: 0 as number,
        update: () => {
            
            if (this.timer.running && 
   this.timer.endTime !== null && this.timer.endTime - Math.floor(Date.now() / 1000) >= 0) {
                this.timer.seconds = this.timer.endTime - Math.floor(Date.now() / 1000);
            } else  if (this.timer.seconds === 0) {

                // this.timer.running = false;
                // this.timer.endTime = null;
            }
            this.displays.forEach((display: Display) => {
                display.timer.endTime = this.timer.endTime;
                display.timer.running = this.timer.running;
                display.timer.seconds = this.timer.seconds;
            });
            // console.log('timer updated');
        },
    };

    constructor(roomId: string, firendlyName: string, displays: any) {
        this.roomId = roomId;
        this.friendlyName = firendlyName;
        for (const display of displays){
            this.displays.push(new Display(display.displayId, display.friendlyName));
            this.timer.update();
        }
    }

}
