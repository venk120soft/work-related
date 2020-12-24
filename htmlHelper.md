```javascript
// It helps to work with the Protractor e2e test creation:
import { browser, by, element, ElementFinder, Key } from 'protractor';

// A simple logger in terminal
export function e2eLogger(message: string) {
// tslint:disable-next-line: no-console
  console.log('#### ' + message + ' ####');
}

export interface IFieldData {
  id: string;
  value: string | boolean;
  type?: 'input' | 'nonEmptyInput' | 'dropdown' | 'toggle';
}
export class HtmlUtil {
  private foundTeam = false;
  public getUrl() {
    return browser.getCurrentUrl();
  }

  public getTitle() {
    return browser.getTitle();
  }

  public getElement(cssSelector: string) {
    return element(by.css(cssSelector));
  }

  public getElementById(id: string) {
    return element(by.id(id));
  }

  public getElementByDataTestId(testid: string) {
    return this.getElement('[data-testid="' + testid + '"]');
  }

  public getElements(cssSelector: string) {
    return element.all(by.css(cssSelector));
  }

  public getFirstElement(cssSelector: string) {
    return element.all(by.css(cssSelector)).first();
  }

  public getLastElement(cssSelector: string) {
    return element.all(by.css(cssSelector)).last();
  }

  public getElementText(cssSelector: string) {
    return this.getElement(cssSelector).getText();
  }

  public getParentElement(cssSelector: string) {
    return this.getElement(cssSelector).element(by.xpath('..'));
  }

  public getElementByCSSContainingText(cssSelector: string, matchingString: string) {
    return element(by.cssContainingText(cssSelector, matchingString));
  }

  public getElementsByCSSContainingText(cssSelector: string, matchingString: string) {
    return element.all(by.cssContainingText(cssSelector, matchingString));
  }

  public getElementByTagName(tagName: string) {
    return element(by.tagName(tagName));
  }

  /**
   * Generic logic to fill out a form with passed data
   * formMapping Array of IFieldData contains infromation about field's selector, value and type
   */
  public async fillOutForm(formMapping: IFieldData[]) {
    // Await for all fields to be loaded
    await formMapping
      .map((field: IFieldData) => `[data-testid=${field.id}]`)
      .map(async (selector) => await this.getElement(selector).isPresent());

    // Fill out all the fields
    for (const field of formMapping) {
      const {value, id, type} = field;
      const selector = `[data-testid=${id}]`;

      switch (type) {
        case 'toggle':
          if (value === true)
            await this.turnToggleOn(selector);
          else
            await this.turnToggleOff(selector);
          break;
        case 'nonEmptyInput':
          await this.sendKeys(selector, value as string, true);
          break;
        case 'dropdown':
          await this.selectCertainDropdownOption(selector, `button[title="${value}"]`);
          break;
        case 'input':
        default:
          await this.getElement(selector).sendKeys(value as string);
          break;
      }
    }
  }
  
  public async cancelWithConfirm() {
    await this.cancelFlexPanel();
    await htmlUtil.click('[data-testid="confirmDialogButton"]');
    await htmlUtil.waitForLoading();
  }

  public expectSuccessBar = async () => {
    await browser.wait(async () => {
      return await this.getElements(HtmlUtil.messageBarSelector).isPresent();
    });
    await expect(htmlUtil.getElement(HtmlUtil.messageBarSelector).isDisplayed()).toBe(true);
    await this.closeMessagebar();
  }

  /**
   * Expect a message error bar with a optional message.
   * Will pass if error message bar is show, if message is passed will test that message is the same
   * as expected, will close the error message bar after test.
   */
  public expectErrorBar = async (message?: string) => {
    const messageBarErrorSelector = 'div.ms-MessageBar--error';

    expect(htmlUtil.getElement(messageBarErrorSelector).isDisplayed()).toBe(true);
    if (message) {
      const text = await htmlUtil.getElement(messageBarErrorSelector + ' ' + 'span').getText();
      expect(text).toBe(message);
    }
    await htmlUtil.click('[data-testid="cancelButtonMessageBar"]');
  }

  public expectWarningBar = async () => {
    await expect(htmlUtil.getElement(HtmlUtil.messageBarWarningSelector).isDisplayed()).toBe(true);
  }

  public expectInfoBar = async () => {
    await expect(htmlUtil.getElement('[class*="messagebar__informationBlockLeft"]').isDisplayed()).toBe(true);
  }

  public async goToPageThroughNavBar(sideNavbarSelectors: any[]) {
    await htmlUtil.waitForLoading();
    // There is a possibility tha the side-nav item is already visible.
    // If we blindly click on every element in `sideNavbarSelectors`, we could
    // accidentally close a parent nav item -- causing the item we're looking
    // for to be hidden.

    // Check to see if the last item we're looking for is already visible.
    const last = sideNavbarSelectors[sideNavbarSelectors.length - 1];
    const lastElement = this.getElement(last);
    const itemExists = await lastElement.isPresent();
    const hamburgerSideNavBarSelector = '[data-testid="sideNavButton"]';
    const hamburgerButtonIsPresent = await htmlUtil.getElement(hamburgerSideNavBarSelector).isPresent();
    const hamburgerButtonIsExpanded = await htmlUtil.getElement(hamburgerSideNavBarSelector).getAttribute('aria-expanded');

    if (hamburgerButtonIsPresent && hamburgerButtonIsExpanded === 'false') {
      await htmlUtil.click(hamburgerSideNavBarSelector);
    }

    if (itemExists) {
      e2eLogger(
        `${last} side-nav item is already visible. Skipping the previous selectors.`
      );
      await this.click(last);
    } else {
      for (const selector of sideNavbarSelectors) {
        await this.click(selector);
      }
    }
  }

  public async goToPage(parentSideNavbarKey: string, sonParentSideNavbarKey?: string) {
    e2eLogger('goToPage()' +  await htmlUtil.getUrl());
    await browser.wait(async () => await htmlUtil.getElements('nav[role="navigation"]').isPresent());
    await browser.wait(async () => await htmlUtil.getElements('nav[role="navigation"]').isDisplayed());

    const expanded = await htmlUtil.getElement('[data-testid="sideNavButton"]').getAttribute('aria-expanded');
    if (expanded === 'false') {
      await htmlUtil.getElement('[data-testid="sideNavButton"]').click();
      await htmlUtil.waitForLoading();
    }

    if (sonParentSideNavbarKey) {
      const sonselector = '[data-testid="' + sonParentSideNavbarKey + '"]';
      const parentSelector = '[data-testid="' + parentSideNavbarKey + '"]';
      await htmlUtil.click(parentSelector);
      await htmlUtil.waitForLoading();
      await htmlUtil.click(sonselector);

      // await browser.executeScript('arguments[0].scrollIntoView(false)', await htmlUtil.getElement(sonselector).getWebElement());
      // await htmlUtil.waitForLoading();
      // await htmlUtil.click(sonselector);

    } else {
      e2eLogger('goToPage() 2' +  await htmlUtil.getUrl());

      await htmlUtil.click('[data-testid="' + parentSideNavbarKey + '"]');
    }

    await htmlUtil.waitForLoading();

    // Portal fails often when we click some side nav bar redirecting to the dashboard we would try
    // until this get fixed
    if ((await htmlUtil.getUrl()) === 'https://test.net/dashboard' ||
        (await htmlUtil.getUrl()) === 'https://test.net/dashboard'
    ) {
      e2eLogger('goToPage() 2' +  await htmlUtil.getUrl());

      await this.goToPage(parentSideNavbarKey, sonParentSideNavbarKey);
    }
    e2eLogger('goToPage() 2' +  await htmlUtil.getUrl());
  }

  public async searchUntilPresent(name: string) {
    if (this.foundTeam) {
      return;
    } else {
      await this.sendKeys('.ms-SearchBox input', name, true);
      await htmlUtil.waitForLoading();

      if (await htmlUtil.getElement(HtmlUtil.tableRowSelector).isPresent()) {
        this.foundTeam = true;
      } else {
        if (!this.foundTeam) {
          // needs this time to so variable foundTeam can be udated
          setTimeout(() => this.searchUntilPresent(name), 3000);
        }
      }
    }
  }

  public goToPath(path: string) {
    const { params, driver } = browser;
    return driver.get(`${params.url}${path}`);
  }

  public keepBrowserOpen() {
    browser.pause();
  }

  public maxScreenSize() {
    browser.driver
      .manage()
      .window()
      .maximize();
  }

  public setScreenSize(width: number, height: number) {
    browser.driver
      .manage()
      .window()
      .setSize(width, height);
  }

  public async click(cssSelector: string) {
    let _element: any;
    _element = this.getElement(cssSelector);
    e2eLogger(`Waiting for ${cssSelector} to be displayed`);
    try {
      await this.waitToBeDisplayed(_element);
    } catch (error) {
      e2eLogger(`${cssSelector} is not displayed with this error ${error}`);
    }
    await _element.click();
    await browser.driver.sleep(500);
    e2eLogger(`${cssSelector} is clicked`);
  }

  public async clickLast(cssSelector: string) {
    let _element: any;
    _element = this.getLastElement(cssSelector);
    e2eLogger(`Waiting for ${cssSelector} last element to be displayed`);
    try {
      await this.waitToBeDisplayed(_element);
    } catch (error) {
      e2eLogger(`${cssSelector} last element is not displayed with this error ${error}`);
    }
    await _element.click();
    await browser.driver.sleep(500);
    e2eLogger(`${cssSelector} last element is clicked`);
  }

  public async mouseHover(cssSelector: string) {
    let _element: any;
    _element = this.getElement(cssSelector);
    e2eLogger(`Waiting for ${cssSelector} to be displayed`);
    try {
      await this.waitToBeDisplayed(_element);
    } catch (error) {
      e2eLogger(`${cssSelector} is not displayed with this error ${error}`);
    }
    await browser.actions().mouseMove(_element).perform();
    await browser.driver.sleep(500);
    e2eLogger(`${cssSelector} is hovered`);
  }

  public async mouseHoverLast(cssSelector: string) {
    let _element: any;
    _element = this.getLastElement(cssSelector);
    e2eLogger(`Waiting for ${cssSelector} last element to be displayed`);
    try {
      await this.waitToBeDisplayed(_element);
    } catch (error) {
      e2eLogger(`${cssSelector} last element is not displayed with this error ${error}`);
    }
    await browser.actions().mouseMove(_element).perform();
    await browser.driver.sleep(500);
    e2eLogger(`${cssSelector} last element is hovered`);
  }

  public async waitForLoading() {
    // Wait until a loading overlay to show:
    await browser.sleep(500);

    // Wait until a loading overlay to disappear:
    await browser.wait(async () => {
      return (await this.getElements(HtmlUtil.loadingIndicatorSelector).count()) === 0;
    });
  }

  public async waitForFlexPaneOverlay() {
    await browser.wait(async () => {
      return await this.getElements('div.ms-Overlay').count() === 0;
    });
  }

  // This util is to select the first option in a dropdown that is not currently being selected
  public async quickDropdownSelect(cssSelector: string, index?: number) {
    e2eLogger('Selecting Dropdown option with selector: "' + cssSelector + '"');
    const dropdown = this.getElements(cssSelector).get(index || 0);
    await dropdown.click();
    const selectable = this.getElement(this.dropdownOptionSelector);
    await browser.wait(async () => {
      return await selectable.isDisplayed();
    });
    await selectable.click();
    const date = new Date();
    e2eLogger('Clicking at Time: ' + date.getMinutes() + ' : ' + date.getSeconds());
    await browser.sleep(1000);
  }

  public async selectCertainDropdownOption(dropdownSelector: string, optionSelector: string) {
    const dropdown = this.getElement(dropdownSelector);
    await dropdown.click();
    // Some time for animation to finish
    await browser.sleep(1000);
    const option = this.getElement(optionSelector);
    await browser.wait(async () => {
      return await option.isDisplayed();
    });
    await option.click();
    await browser.sleep(1000);
  }

  public async closeMessagebar() {
    const cancelButtonSelector = '[data-testid="cancelButtonMessageBar"]';
    if (await this.getElement(cancelButtonSelector).isPresent()) {
      e2eLogger('Closing Message bar.');
      await this.click(cancelButtonSelector);
    } else {
      e2eLogger('There is no message bar to dismiss.');
    }
  }

  public async waitForFlexPaneToClose() {
    await browser.wait(async () => {
      return (await this.getElements('div.ms-Panel-main').count()) === 0;
    });
  }

  // An alternative to clear the input/textarea, please use this util method when clear() provided by webdriver doesn't work
  public async clearAllByKey(inputElement: ElementFinder) {
    const ctrlA = Key.chord(Key.CONTROL, 'a');
    await inputElement.click();
    await inputElement.sendKeys(ctrlA, Key.BACK_SPACE);
  }

  public async sendKeys(cssSelector: string, text: string, clearInput?: boolean) {
    const el = this.getElement(cssSelector);
    await browser.wait(async () => {
      return await el.isDisplayed();
    });

    if (clearInput) {
      await this.clearAllByKey(el);
    }
    if (process.env.DEBUG_MODE === 'true') {
      e2eLogger('Writting: ' + text + ' for ' + cssSelector);
    }

    await el.sendKeys(text);
    await browser.sleep(500);
  }

  public async turnToggleOff(cssSelector: string) {
    if (await this.getToggleValue(cssSelector)) {
      await this.click(cssSelector);
    }
  }

  public async turnToggleOn(cssSelector: string) {
    if ( !(await this.getToggleValue(cssSelector)) ) {
      await this.click(cssSelector);
    }
  }

  public async getToggleValue(cssSelector: string) {
    const el = this.getElement(cssSelector);
    await this.waitToBeDisplayed(el);
    return (await el.getAttribute('aria-pressed')) === 'true';
  }

  /**
   * Function to ensure data table has content
   */
  public async waitForTableToLoad() {
    // Entire data is loaded before test starts
    await browser.wait(async () => {
      return await htmlUtil.getElements(HtmlUtil.tableRowSelector).isPresent();
    });
    await htmlUtil.waitForLoading();
  }

  public async waitToBeDisplayed(el: ElementFinder, optTimeout?: number) {
    await browser.wait(async () => await el.isPresent(), optTimeout);
    await browser.wait(async () => await el.isDisplayed(), optTimeout);
  }

  public async serchAndSelectItemFromTable(itemName: string) {
    await this.searchElement(itemName);
    await htmlUtil.waitForLoading();
    await this.selectElement();
  }

  public async searchElement(itemName: string, searchFieldSelector?: string, removeSearchButtonSelector?: string) {
    const sFSelector = (searchFieldSelector) ? searchFieldSelector : '.ms-SearchBox input';
    const rSelector = (removeSearchButtonSelector) ? removeSearchButtonSelector : HtmlUtil.clearSearchButton;

    await htmlUtil.waitForLoading();

    const searchField = htmlUtil.getElement(sFSelector);
    const clearSearchButton = htmlUtil.getElement(rSelector);

    if (await clearSearchButton.isDisplayed()) {
      await clearSearchButton.click();
    }

    await searchField.sendKeys(itemName);
    await htmlUtil.waitForLoading();
  }

  public async selectElement() {
    await browser.wait(async () => {
      return await htmlUtil.getElement(HtmlUtil.tableRowSelector).isPresent();
    });
    await htmlUtil.click(HtmlUtil.tableRowCheckMarkSelector);
  }

  public async selectRowByContent(content: string) {
    await browser.wait(async () => {
      return await htmlUtil.getElementByCSSContainingText(HtmlUtil.tableRowSelector, content).isPresent();
    });
    await htmlUtil.getElementByCSSContainingText(HtmlUtil.tableRowSelector, content)
                  .element(by.css(HtmlUtil.tableRowCheckMarkSelector)).click();
  }

  public async tryToSelectTableElement(elementName: string, muteError?: boolean) {
    await htmlUtil.searchElement(elementName);
    await htmlUtil.waitForLoading();
    if (await htmlUtil.getElementByCSSContainingText(HtmlUtil.tableRowCheckMarkSelector, elementName).isPresent()) {
     await htmlUtil.selectElement();
     return true;
    } else if (!muteError) {
     fail(`Element "${elementName}" that supposed to be selected doesn't exist.`);
    }

    return false;
  }

  // This util is to toggle the column from the Table and validate Table Customization (TableMenuHeader > SettingsIcon)
  public async toggleColumnInTable(columnTogglerDataTestId: string) {
    let originalHeadersCount: number;
    let originalUserNameToggleState: boolean;
    const columnToToggle = `.ap-custom-table-form button[data-testid="${columnTogglerDataTestId}"]`;
    await htmlUtil.waitForTableToLoad();

    try {
      originalHeadersCount = await htmlUtil.getElements(HtmlUtil.tableHeaderSelector).count();
      e2eLogger(`Header count BEFORE test: ${originalHeadersCount}`);
      await htmlUtil.click(HtmlUtil.customizeColumnsButton);
      await browser.wait(async () => {
        return await htmlUtil.getElements(columnToToggle).isPresent();
      });
      originalUserNameToggleState = await htmlUtil.getElement(columnToToggle).getAttribute('aria-pressed') === 'true';
      await htmlUtil.click(columnToToggle);
      await browser.driver.sleep(500);
      await htmlUtil.click(HtmlUtil.flexPaneApplySelector);
      await htmlUtil.waitForLoading();
      const modifiedHeadersCount = await htmlUtil.getElements(HtmlUtil.tableHeaderSelector).count();
      if (originalUserNameToggleState) {
        expect(modifiedHeadersCount).toBe(originalHeadersCount - 1);
        e2eLogger(`${columnTogglerDataTestId.toUpperCase} Column Header removed from the Table`);
      } else {
        expect(modifiedHeadersCount).toBe(originalHeadersCount + 1);
        e2eLogger(`${columnTogglerDataTestId.toUpperCase} Column Header included to the Table`);
      }
      e2eLogger(`Header count AFTER test ${await (htmlUtil.getElements(HtmlUtil.tableHeaderSelector).count())}`);
      return true;
    } catch (error) {
      e2eLogger(`unable to toggle the ${columnTogglerDataTestId.toUpperCase()} column. Error: ${error}`);
      return false;
    }
  }
}

export let htmlUtil = new HtmlUtil();

/**
 * If there is not a table in the moment that this function execute, then you need to pass
 * sideNavbarSelector, otherwise will assume there is a table present.
 */
export async function testLazyLoading(sideNavbarSelectors?: string[]) {
  await htmlUtil.waitForLoading();
  if (sideNavbarSelectors) {
    await browser.wait(async () => await htmlUtil.getElements('nav[role="navigation"]').isPresent());
    await htmlUtil.goToPageThroughNavBar(sideNavbarSelectors);
    await htmlUtil.waitForLoading();
  } else if (!(await htmlUtil.getElement(HtmlUtil.tableRowSelector).isPresent())) {
    // No table is present, are you executing this function after you table is loaded?'
    return false;
  }
  const div = htmlUtil.getElement('.tableContent');
  // all tables start doing lazy loading at scroll down and touching index 20 so this is fine for now
  const lastRow = htmlUtil.getElements('[role="row"]').last();
  const firstRow = htmlUtil.getElements('[role="row"]').first();

  const index = await lastRow.getAttribute('aria-rowindex');

  let wasLoading = false;

  const offset = await browser.executeScript('return arguments[0].offsetTop;', lastRow.getWebElement());
  await browser.executeScript('arguments[0].scrollTop = arguments[1];', div.getWebElement(), offset);
  if (htmlUtil.getElement(HtmlUtil.loadingIndicatorSelector).isPresent())
    wasLoading = true;

  await htmlUtil.waitForLoading();

  const lastRowAfterScroll = htmlUtil.getElements('[role="row"]').last();
  const indexAfterScroll = await lastRowAfterScroll.getAttribute('aria-rowindex');
  const result = wasLoading && parseInt(index, 10) <  parseInt(indexAfterScroll, 10);

  // we need to scroll up so everything is normal again
  const offsetUp = await browser.executeScript('return arguments[0].offsetTop;', firstRow.getWebElement());
  await browser.executeScript('arguments[0].scrollTop = arguments[1];', div.getWebElement(), offsetUp);
  await htmlUtil.waitForLoading();

  return result;
}

```
