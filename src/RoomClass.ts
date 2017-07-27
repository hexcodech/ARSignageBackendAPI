import Display from './DisplayClass';

export default class Room {
    //
    public static rooms = new Array<Room>();

    // -----------------------------------------------------------------

    public roomId: string;
    public friendlyName: string;
    public displays = new Array<Display>();

    constructor(roomId: string) {
        this.roomId = roomId;
    }

}
