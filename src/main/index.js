import { app, Tray } from 'electron'
import { menubar } from 'menubar'
import path from 'path'

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

const winURL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`

let iconPath = ''

if (process.env.NODE_ENV === 'development') {
  iconPath = path.join(__dirname, '..', '..', 'static', 'IconTemplate.png')
} else {
  iconPath = path.join(global.__static, 'IconTemplate.png')
}

app.on('ready', () => {
  const tray = new Tray(iconPath)

  const mb = menubar({
    browserWindow: { width: 400, height: 400, webPreferences: { devTools: false } },
    index: winURL,
    tray
  })

  mb.on('ready', () => {
    console.log('PassWall app is ready.')
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
