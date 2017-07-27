export default class Display {
    public static displays = new Array<Display>();
    public static totalDisplays = 0;

    public static config: any;

    public static importConfig() {
        //
        const fs = require('fs');
        fs.readFile('config.json', 'utf8', (err: any, data: string) => {
            if (err) {
                return console.log(err);
            }
            // console.log(data);
            Display.config = JSON.parse(data);
            // console.log(Display.config[1]);
            Display.findDisplayInConfig('ar1-foyer');
        });
    }
    
    public static findDisplayInConfig(DisplayId: string) {
        for (const room in Display.config) {
            if (Display.config.hasOwnProperty(room)) {
                for (let i = 0; i <= Display.config[room].screens.length; i++) {
                    // Display.config[room].screens[i].displayId === DisplayId
                    console.log(room + ', ' + i);
                    if (Display.config[room].screens[i].displayId === DisplayId) {
                        return {
                            displayId: i,
                            roomId: room,
                        };
                    }
                }
            }
        }
    }

    public displayId: string = 'default';
    public ip: string;
    
    public test: string = 'test';
    
    public timer = {
        endTime: null as number,
        running: null as boolean,
        seconds: null as number,
        update: () => {
            if (this.timer.endTime !== null) {
                this.timer.seconds = this.timer.endTime - Math.floor(Date.now() / 1000);
            } else {
                this.timer.seconds = 0;
            }
        },
    };

    public media = {
        headerVisible: true,
        text: null as string,
        type: null as string,
        url: null as string,
    };

    constructor(id: string, ip: string) {
        this.displayId = id;
        this.ip = ip;
        console.log('New Display with id ' + id + ' created.');
        Display.totalDisplays = Display.displays.length + 1;
        console.log('There are now ' + Display.totalDisplays + ' Displays registered');
        
    }
    
    public clear() {
        this.media.headerVisible = null;
        this.media.text = null;
        this.media.type = null;
        this.media.url = null;

        console.log('Display ' + this.displayId + ' has been cleared.');
    }

}
