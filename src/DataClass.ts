import Room from './RoomClass';

export default class Data {

    public static data: Room[];

    public static importConfig() {
        //
        const fs = require('fs');
        fs.readFile('config.json', 'utf8', (err: any, data: string) => {
            if (err) {
                return console.log(err);
            }

            Data.data = JSON.parse(data);

            // console.log(Data.config);
            // console.log(Data.config[0].displays[0].displayId);
            // Data.findDisplayInConfig('ar2-room2');
        });
    }
    
    public static findDisplayInConfig(DisplayId: string) {
        for (let room = 0; room < Data.data.length; room++) {
            for (let display = 0; display < Data.data[room].displays.length; display++) {
                if (Data.data[room].displays[display].displayId === DisplayId) {
                    console.log('Found Room in ' + room + ', ' + display);
                    return {
                        displayIndex: display,
                        roomIndex: room,
                    };
                    
                }
            }
        }
    }
}
