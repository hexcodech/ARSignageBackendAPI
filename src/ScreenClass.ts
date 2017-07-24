export default class Screen {
    public static screens = new Array<Screen>();
    public static totalScreens = 0;
    
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
        console.log('New Screen with id ' + id + ' created.');
        Screen.totalScreens = Screen.screens.length + 1;
        console.log('There are now ' + Screen.totalScreens + ' Screens registered');
        
    }
    
    public clear() {
        this.media.headerVisible = null;
        this.media.text = null;
        this.media.type = null;
        this.media.url = null;

        console.log('Screen ' + this.displayId + ' has been cleared.');
    }

}
