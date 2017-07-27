import App from './App';
import Display from './DisplayClass';

const port = normalizePort(process.env.PORT || 4100);
const server = App.listen(port, () => {
    console.log('\x1b[40m' + `Express listening on port ${port}`);
    Display.importConfig();
    // Display.findDisplayInConfig('ar1-foyer');
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
