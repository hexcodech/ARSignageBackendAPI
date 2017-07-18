import App from './App';

const port = normalizePort(process.env.PORT || 4100);
const server = App.listen(port, () => {
    console.log(`Express listening on port ${port}`);
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
