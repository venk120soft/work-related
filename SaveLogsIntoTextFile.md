For logging errors

```javascript
 public static logErrors = async (fileName: string) => {
    await browser.manage().logs().get('browser').then((browserLogs) => {
      let error = '';
      browserLogs.forEach((log) => {
        if (log.message.indexOf('Event: AADConsentError') !== -1) {
          error += '\n*****************************************************************************\n';
          error += log.message;
        }
      });

      if (error !== '') {
        writeFile(`./e2e/teams-apps/consent-logs/${fileName}.txt`, error, (er) => {
          if (er) e2eLogger('eroor in writing to the file: ' + er.message);
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
