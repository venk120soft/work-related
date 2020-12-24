When we need to work on the popups(Mostly IFrames) that will show up on clciking on any of the button on UI 

This is basically to do the e2e
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
