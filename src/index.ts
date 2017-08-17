import App from './App';

import DisplayController from './controllers/DisplayController';
import Data from './DataClass';

import * as socketIo from 'socket.io';

const port = normalizePort(process.env.PORT || 4100);

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
    // console.log('update');
    for (const room of Data.data) {
        room.timer.update();
        for (const display of room.displays) {
            if (display.active) {
                socket.to(display.socketId).emit('uiState', display);
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

    socket.on('disconnect', () => {
        DisplayController.removeDisplay(lastSegment);
        console.log('display disconnected: ' + lastSegment);
      });
  });
  
setInterval(sendAppStates, 1000, io);
