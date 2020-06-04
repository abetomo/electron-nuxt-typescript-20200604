const http = require('http')
const path = require('path')
const { Nuxt, Builder } = require('nuxt')
const electron = require('electron')

const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)

config.rootDir = __dirname // for electron-builder
let NUXT_URL = ''

if (config.dev) {
  builder.build().catch((err) => {
    console.error(err) // eslint-disable-line no-console
    process.exit(1)
  })
  const server = http.createServer(nuxt.render)
  server.listen()
  NUXT_URL = `http://localhost:${server.address().port}`
} else {
  NUXT_URL = 'file://' + __dirname + '/dist/index.html' // eslint-disable-line no-path-concat
}

// Electron
const app = electron.app
const BrowserWindow = electron.BrowserWindow
let win = null

const newWin = () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve(path.join(__dirname, 'preload.js'))
    }
  })
  win.on('closed', () => (win = null))
  if (!config.dev) {
    win.loadURL(NUXT_URL)
    return
  }

  // dev mode
  const pollServer = () => {
    http
      .get(NUXT_URL, (res) => {
        if (res.statusCode === 200) {
          win && win.loadURL(NUXT_URL)
        } else {
          setTimeout(pollServer, 300)
        }
      })
      .on('error', pollServer)
  }
  pollServer()
}

app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())
