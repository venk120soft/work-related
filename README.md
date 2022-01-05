# Work-related
Performance optimization: https://3perf.com/talks/web-perf-101/

MobX best practices: https://mobx.js.org/defining-data-stores.html

Cloud computing: https://azure.microsoft.com/en-us/overview/what-is-cloud-computing/#benefits

## Create HashMap for large Records to access quickly
If we have large number of records of type objects and everytime looking at the result set and filtering out is repetative process and it takes lot of time. So Instead we can covert the list into hashmap and access them with the distinct key is always saves lot of effort, as hashtable gives the result in O(1) time

```javascript
class PurchasedAsset{
  @serializable(primitive())
  @observable
  public saasBigCatalogId: string;

  @serializable(primitive())
  @observable
  public assetId: string;

  @serializable(primitive())
  @observable
  public saasProductId: string; // distinct id
}

  public get getPurchasedAssetsHashMap() {
    return this.createHashMap(this.purchasedAssetList);
  }
  
  // just create the hashMap of list of objects by taking the distinct id as key for each record
  private createHashMap(purchasedAssets: PurchasedAsset[]) {
    const appAssetObject: { [s: string]: PurchasedAsset } = {};
    (purchasedAssets || []).forEach((value) => {
      appAssetObject[value.saasProductId] = value;
    });
    return appAssetObject;
  }
  // Access in O(1) time complexity
  console.log(this.getPurchasedAssetsHashMap['distinctId'])
```

complex operations worked
Writing E2E cases can be found in e2eNotes.md

1. For logging browser logs: errors, warnings.. etc
2. For writing e2e cases(ex: await browser.wait(5000)), HtmlHelper to get the element by id, calss name, etc..
3. Working with popus, switching between the windows

# Color code meaning for test coverage report generated 
We can find the report in : file:///C:/infrastructure_web_adminportal-ui/jest/coverage/lcov-report/policies/manage-apps/app-license-pricing-info/app-offer-details.tsx.html

[more details on color schema](https://krishankantsinghal.medium.com/how-to-read-test-coverage-report-generated-using-jest-c2d1cb70da8b)
#### Red: Not covered
#### Pink: statements not covered.
#### Orange: functions not covered.
#### Yellow: branches not covered.

# Error Codes with their meaning

The first digit of the Status-Code defines the class of response. The last two digits do not have any categorization role. There are 5 values for the first digit:
[source1](https://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html#sec6.1) **********
[source2](https://restfulapi.net/http-status-codes/)

      - 1xx: Informational - Request received, continuing process
      - 2xx: Success - The action was successfully received,
        understood, and accepted
      - 3xx: Redirection - Further action must be taken in order to
        complete the request
      - 4xx: Client Error - The request contains bad syntax or cannot
        be fulfilled
      - 5xx: Server Error - The server failed to fulfill an apparently
        valid request
        
## 1×× Informational

- 100 Continue
- 101 Switching Protocols
- 102 Processing

## 2×× Success

- 200 OK
- 201 Created
- 202 Accepted
- 203 Non-authoritative Information
- 204 No Content
- 205 Reset Content
- 206 Partial Content
- 207 Multi-Status
- 208 Already Reported
- 226 IM Used

## 3×× Redirection

- 300 Multiple Choices
- 301 Moved Permanently
- 302 Found
- 303 See Other
- 304 Not Modified
- 305 Use Proxy
- 307 Temporary Redirect
- 308 Permanent Redirect

## 4×× Client Error

- 400 Bad Request
- 401 Unauthorized
- 402 Payment Required
- 403 Forbidden
- 404 Not Found
- 405 Method Not Allowed
- 406 Not Acceptable
- 407 Proxy Authentication Required
- 408 Request Timeout
- 409 Conflict
- 410 Gone
- 411 Length Required
- 412 Precondition Failed
- 413 Payload Too Large
- 414 Request-URI Too Long
- 415 Unsupported Media Type
- 416 Requested Range Not Satisfiable
- 417 Expectation Failed
- 418 I’m a teapot
- 421 Misdirected Request
- 422 Unprocessable Entity
- 423 Locked
- 424 Failed Dependency
- 426 Upgrade Required
- 428 Precondition Required
- 429 Too Many Requests
- 431 Request Header Fields Too Large
- 444 Connection Closed Without Response
- 451 Unavailable For Legal Reasons
- 499 Client Closed Request

## 5×× Server Error

- 500 Internal Server Error
- 501 Not Implemented
- 502 Bad Gateway
- 503 Service Unavailable
- 504 Gateway Timeout
- 505 HTTP Version Not Supported
- 506 Variant Also Negotiates
- 507 Insufficient Storage
- 508 Loop Detected
- 510 Not Extended
- 511 Network Authentication Required
- 599 Network Connect Timeout Error
