import App from './App';

import DisplayController from './controllers/DisplayController';
import Data from './DataClass';

import * as socketIo from 'socket.io';

const port = normalizePort(process.env.PORT || 80);

const server = App.listen(port, () => {
    console.log('\x1b[40m' + `Express listening on port ${port}`);
    Data.importConfig();
    
});

function normalizePort(val: number|string): number|string|boolean    {
    const portValue: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(portValue)) {
        return val;
    } else if (portValue >= 0) {
        return portValue;
    } else {
        return false;
    }
}

function sendAppStates(socket: any) {
    
    for (const room of Data.data) {
        room.timer.update();
        for (const display of room.displays) {
            if (display.active) {
                socket.to(display.socketId).emit('uiState', display);
                // console.log('\x1b[40m update display: ' + display.displayId);
                // console.log(display);
            }
        }
    }
}

const io = socketIo(server);
io.on('connection', (socket) => {

    const parts = socket.handshake.headers.referer.split('/');
    const lastSegment = parts.pop() || parts.pop();  // handle potential trailing slash

    DisplayController.addDisplay(lastSegment, socket.id);
    console.log('display connected: ' + lastSegment);
    // sendAppStates(io);
    socket.on('updateRemaining', (timeremaining) => {
        const dataIndex = Data.findSocketIdInConfig(socket.id);
        console.log('time remaining: ' + timeremaining);
        Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].media.remaining = timeremaining;
        console.log(Data.data[dataIndex.roomIndex].displays[dataIndex.displayIndex].media.remaining);
    });

    socket.on('disconnect', () => {
        DisplayController.removeDisplay(lastSegment);
        console.log('display disconnected: ' + lastSegment);
      });
  });
  
setInterval(sendAppStates, 1000, io);
