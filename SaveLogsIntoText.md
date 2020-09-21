For logging errors

```javascript
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
