const cp = require('child_process');

const path = 'C:\\Users\\marco\\AppData\\Local\\Temp\\OBS-Studio-20.1.1-Full-Installer.exe'

const installer = cp.execFile(path, (error) => {
  console.error(error);
});
installer.unref();
