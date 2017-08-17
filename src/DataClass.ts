import 'es6-shim';
import 'reflect-metadata';

import {plainToClass} from 'class-transformer';

import Room from './RoomClass';

export default class Data {

    public static data = new Array<Room>();

    public static importConfig() {
        //
        const fs = require('fs');
        fs.readFile('config.json', 'utf8', (err: any, rawData: string) => {
            if (err) {
                return console.log(err);
            }
            const tempdata = JSON.parse(rawData);
            // console.log(tempdata);
            this.initializeData(tempdata);

            console.log(Data.data);
        });
    }
    
    public static findDisplayInConfig(DisplayId: string) {
        for (let room = 0; room < Data.data.length; room++) {
            for (let display = 0; display < Data.data[room].displays.length; display++) {
                if (Data.data[room].displays[display].displayId === DisplayId) {
                    console.log('Found Display in ' + room + ', ' + display);
                    return {
                        displayIndex: display,
                        roomIndex: room,
                    };
                }
            }
        }
        return {
            displayIndex: -1,
            roomIndex: -1,
        };
    }

    public static findRoomInConfig(RoomId: string) {
        for (let room = 0; room < Data.data.length; room++) {
                if (Data.data[room].roomId === RoomId) {
                    console.log('Found Room in ' + room);
                    return room;
                }
            }
        return -1;
    }

    private static initializeData(jsonData: any) {
        for (const room of jsonData) {
            Data.data.push(new Room(room.roomId, room.friendlyName, room.displays));
        }
        // console.log(Data.data);
    }

}
