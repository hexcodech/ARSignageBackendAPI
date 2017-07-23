export default class Screen {
    public static screens = new Array<Screen>();
    public static totalScreens = 0;
    
    public mediaUrl: string;
    public mimeType: string;
    public text: string;
    public id: string = 'default';
    public ip: string;
    public test: string = 'test';

    constructor(public screenId: any) {
        console.log('id ' + screenId);
        this.id = screenId;
        
    }
}
