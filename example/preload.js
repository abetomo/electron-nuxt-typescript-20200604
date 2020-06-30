const path = require('path')
const { contextBridge, app, ipcRenderer, remote } = require('electron')

const userDataPath = (() => {
  try {
    return app.getPath('userData')
  } catch {}
  try {
    return remote.app.getPath('userData')
  } catch {}
  return ''
})()

contextBridge.exposeInMainWorld('electron', {
  logPath: path.join(userDataPath, 'log.txt'),
  ipcRenderer,
  remote
})
