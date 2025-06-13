const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { fetchMediumFeeds } = require('./fetchStories');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({  
        width: 600,
        height: 600,
        alwaysOnTop: false,
        autoHideMenuBar: true,
        transparent: true,
        frame: false,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });


    mainWindow.loadFile('index.html');
    ipcMain.on('close-widget', () => {
        if (mainWindow) mainWindow.close();
    });

    ipcMain.handle('fetch-stories', async (_, topic = "technology") => {
        return await fetchMediumFeeds(topic);
    });
});