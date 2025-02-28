const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    fetchStories: () => ipcRenderer.invoke('fetch-stories')
});