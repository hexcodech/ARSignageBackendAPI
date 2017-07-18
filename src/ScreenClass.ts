export default class Screen {
    public static screens = new Array<Screen>();
    public static totalScreens = 0;
    
    public mediaUrl: string;
    public mimeType: string;
    public text: string;
    public friendlyname: string;
    public id: string = 'default';
    public room: string;
    public test: string = 'test';

    constructor(public theName: string) {
        // this.id = theName;
        this.test = 'after constructor';
        
    }
}
