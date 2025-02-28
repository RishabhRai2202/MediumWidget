const { ipcRenderer } = require('electron');

document.getElementById('close-btn').addEventListener('click', () => {
    ipcRenderer.send('close-widget');
});