```javascript
import { forkJoin } from 'rxjs/observable/forkJoin';
  const commands: Array<Observable<any>> = [
        msGraphUserDataService.getUsers(callParams),
        msGraphGroupDataService.getGroupsByEmail(selectedUsersArray)
      ];

      forkJoin(commands).subscribe(([users, groups]) => {
        users.map((user: MsGraphUser) => {
          const pswsUser = this.mapMsGraphUserToPswsModel(user);
          this.addUserToSelectedUsers(pswsUser);
        });

        groups.map((group: MsGraphGroup) => {
          const pswsUser = this.mapMsGraphGroupToPswsModel(group);
          this.addUserToSelectedUsers(pswsUser);
        });
      });
    }
    
    // Example 2
    forkJoin([
      authService.acquireToken(hapiEndpoint),
      authService.acquireToken(jarvisEndpoint),
      authService.acquireToken(paymentEndpoint),
    ]).subscribe((res) => {
      if (!res.some((token: string) => !token)) {
        this.setPBTokens({
          hapiToken: res[0],
          jarvisToken: res[1],
          paymentToken: res[2]
        });
        runInAction(() => {
          // setting the token expiry time to 15 min
          this.tokensExpiredTime = (900 * 1000) + new Date().getTime();
        });
        return;
      }
      this.logError(`Feature: Monet | Event: PurchaseBlendSPA_MissingTokens (apiActionType=loadData, offerId=${offerId}) TimeTaken: ${pbIframeViewStore.getInterval(startTime)}`);
    }, () => this.logError(`Feature: Monet | Event: PurchaseBlendSPA_UnableToGetTokens (apiActionType=loadData, offerId=${offerId}) TimeTaken: ${pbIframeViewStore.getInterval(startTime)}`)).add(this.createNewAccountsForFRE());
// this.createNewAccountsForFRE() is an other api call
```

Making the changes to observable objects (array, object) only through toJS method
```javascript
import { action, observable, runInAction, toJS } from 'mobx';
const updatedPolicy = toJS(policy);
updatedPolicy.appPresetList.push({ id: insight.appDetails.TeamsAppId } as AppPresetModel);
```
