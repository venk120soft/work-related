We can look for the elements in the browser using below
```javascript
export class ManageSelector {
  public static columnOptionsButton = 'div#commandBarIconSettings';
  public static tableRowSelector = '[class*="data-table-new__tableRowContainer"]';
  public static navigation = 'nav[role="navigation"]';
  public static firstItemSelector = ManageSelector.tableRowSelector + ':first-child > div > button';
  public static firstItemStatus = ManageSelector.tableRowSelector + ':first-child [aria-label="Status"] span';
  public static appStatusAllowedButton = '[data-testid="AppAllowedOrBlockedId"]';
  public static manageAppLink = 'a[href="/policies/manage-apps';
  public static selectedTab = '[ class*="is-selected" ]';
  public static titleAppDetail = '[class*="profile-card"] h1';
  public static breadcrumbSelector = '.ms-Breadcrumb-list [href="/policies/manage-apps"]';
  public static flexPaneCancel = '[class*="flexpane"] [id="flexPaneCancel"]';
  public static customizableRecord = `[aria-rowindex="1"] [aria-label="Customizable"]`;
}
// Then we can access them like
document.getElement(ManageSelector.columnOptionsButton).click()
```
To wait for any element to be preset on the UI

```javascript
import { browser } from 'protractor';
 await browser.wait(async () => {
  return await htmlUtil.getElements('nav[role="navigation"]').isPresent();
});

// Wait for specific time
await browser.sleep(500);

// To specify a test to be wait until specific amount of time (if the statements run before that then it will come out of the test else it waits until the specified time)
it('should have the sub menu', async () => {
  expect(await htmlUtil.getElements(ManageSelector.manageAppLink).isDisplayed()).toBeTruthy();
}, 180000);
```
Scroll to some extent left and right
```javascript
await browser.executeScript('window.scrollBy(0,1000)');
await browser.executeScript('document.getElementsByClassName(\'tableContent\')[0].scrollBy(1000,10)');

// To navigate back
await browser.navigate().back();
```
To get Browser logs for error, warning etc..

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
```
To switch to new Window this helps when we work with popups
```javascript
  private static switchToNewWindow = async () => {
    await browser.getAllWindowHandles().then((handles) => {
      const count = handles.length;
      const newWindow = handles[count - 1];
      browser.switchTo().window(newWindow);
    });
    await htmlUtil.waitForLoading();
  }
```