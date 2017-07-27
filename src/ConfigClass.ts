export default class Config {

    public static config: any;

    public static importConfig() {
        //
        const fs = require('fs');
        fs.readFile('config.json', 'utf8', (err: any, data: string) => {
            if (err) {
                return console.log(err);
            }
            // console.log(data);
            Config.config = JSON.parse(data);
            console.log(Config.config);
            Config.findDisplayInConfig('ar2-room2');
        });
    }
    
    public static findDisplayInConfig(DisplayId: string) {
        for (const room in Config.config) {
            if (Config.config.hasOwnProperty(room)) {
                for (let i = 0; i < Config.config[room].screens.length; i++) {
                    if (Config.config[room].screens[i].displayId === DisplayId) {
                        console.log('Found Room in ' + room + ', ' + i);
                        return {
                            displayId: i,
                            roomId: room,
                        };
                        
                    }
                }
            }
        }
    }
}
