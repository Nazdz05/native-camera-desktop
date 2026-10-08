const { app, BrowserWindow, session, shell } = require('electron');
const path = require('node:path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 960,
    minWidth: 900,
    minHeight: 680,
    backgroundColor: '#0c0e11',
    title: 'Native Camera Desktop',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  win.loadFile(path.join(__dirname, 'native-camera-desktop.html'));
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://')) shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  // Camera and microphone are requested by the page only when the user connects them.
  const mediaPermissions = new Set(['media', 'audioCapture', 'videoCapture']);
  session.defaultSession.setPermissionCheckHandler((_contents, permission) => {
    return mediaPermissions.has(permission);
  });
  session.defaultSession.setPermissionRequestHandler((_contents, permission, callback) => {
    callback(mediaPermissions.has(permission));
  });

  app.on('web-contents-created', (_event, contents) => {
    contents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith('https://')) shell.openExternal(url);
      return { action: 'deny' };
    });
  });

  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
