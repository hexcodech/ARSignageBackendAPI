import Data from './DataClass';

export default class Display {
    // public static displays = new Array<Display>();

    // ---------------------------- END OF STATIC DEFINITIONS --------------------------------------

    public displayId: string;
    public friendlyName: string;
    public ip: string;
    public socketId: string;
    public active: boolean = false;
    
    public timer = {
        endTime: null as number,
        running: null as boolean,
        seconds: 0 as number,
        update: () => {
            console.log('timer update in Display not allowed');
            Data.data[Data.findDisplayInConfig(this.displayId).roomIndex].timer.update();
        },
    };

    public media = {
        headerVisible: true,
        remaining: null as number,
        text: null as string,
        type: null as string,
        url: null as string,
    };

    constructor(displayId: string, friendlyName: string) {
        this.displayId = displayId;
        this.friendlyName = friendlyName;
        console.log('New Display with id ' + displayId + ' created.');  
    }
    
    public clear() {
        this.media.headerVisible = null;
        this.media.text = null;
        this.media.type = null;
        this.media.url = null;
        
        console.log('Display ' + this.displayId + ' has been cleared.');
    }
    
}
