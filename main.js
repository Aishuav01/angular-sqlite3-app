const { app, BrowserWindow, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
const productontrollers = require('./controllers/product.controller')
const stockControllers = require('./controllers/stock.controller')
const userControllers = require('./controllers/user.controller')
let mainWindow;


const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false,
      contextIsolation: false,
      enableRemoteModule: true
    },
  });


  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `angular_build/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // To Set the Menu Bar as invisible
  mainWindow.setMenuBarVisibility(false)

  mainWindow.on("closed", function () {
    mainWindow = null;
  });

};

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
