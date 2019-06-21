const { exec } = require('child_process');
// exec('PowerShell.exe -Command {Get-EventLog -LogName Security -Source "Microsoft-Windows-Security-Auditing" -After 18/12/05 | where {$_.eventID -eq 4634}}'
exec('PowerShell.exe -Command {Get-EventLog -LogName System -Source "Microsoft-Windows-Kernel-Boot" -After 18/12/05}',
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
