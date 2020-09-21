```javascript
  private static switchToNewWindow = async () => {
    await browser.sleep(500);
    await browser.getAllWindowHandles().then((handles) => {
      const count = handles.length;
      const newWindow = handles[count - 1];
      browser.switchTo().window(newWindow);
    });
    await browser.sleep(500);
  }
```
