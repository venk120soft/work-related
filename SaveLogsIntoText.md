For logging errors
https://www.thecrazyprogrammer.com/2019/12/javascript-read-and-write-to-text-file.html

```javascript
import { writeFile } from 'fs';
import { browser } from 'protractor';

 public static logErrors = async (fileName: string) => {
    await browser.manage().logs().get('browser').then((browserLogs) => {
      let error = '';
      browserLogs.forEach((log) => {
        // log levels are
        // WARN => 1000
        // DEBUG => 700
        // SEVERE => 900
        // INFO => 800
        if(log.level>900){
          if (log.message.indexOf('SomeError') !== -1) {
            error += '\n*****************************************************************************\n';
            error += log.message;
          }
        }
      });

      if (error !== '') {
        writeFile(`./logs/${fileName}.txt`, error, (er) => {
          if (er) console.log('eroor in writing to the file: ' + er.message);
        });
      }
    });
  }
```
For Clear logs: Once we read the logs it will get cleared
```javascript
  public static clearLogs = async () => {
    await browser.manage().logs().get('browser');
  }
```
Search for specific text in logs
```javascript
  private static getBrowserLogs = async (searchText: string) => {
    return await browser.manage().logs().get('browser').then((browserLogs) => {
      let logMessage = '';
      for (const log of browserLogs) {
        if (log.message.indexOf(searchText) !== -1) {
          logMessage = log.message;
          break;
        }
      }
      return logMessage;
    });
  }
  
  const error= await getBrowserLogs('Event: ConsentError');
```
