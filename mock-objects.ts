import { EventSchema, telemetryService } from '.';
import { telemetryHelper } from './telemetry-helper';
import { shallow } from 'enzyme';

jest.mock('common/config');
jest.mock('common/config/history');
jest.mock('./telemetry.service');
jest.mock('react-dom', () => ({
  findDOMNode: jest.fn()
}));

describe('Event tracker for telemetry helper', () => {
   const testButton: any = <button>TestButton</button>;
  const mockContext: string = 'Mock Context';
  let component: any;
  let instance: any;
  const trackUserEventSpy = jest.spyOn(telemetryService, 'trackUserEvent');
  
  beforeEach(() => {
    component = shallow(
      <TelemetryTracker feature={'Test'} subFeature={'Test Sub'}
        action={`TestButtonClicked`} context={mockContext}>
        {testButton}
      </TelemetryTracker>
    );
    instance = component.instance();
  });

  it('should render Telemetry Tracker properly', () => {
    expect(component).toMatchSnapshot();
  });
  
  it('should set the state',() => {
    const setState = jest.spyOn(instance, 'setState');
    instance.isUserActive(true);
    expect(setState).toHaveBeenCalled();
    expect(instance.state.isActive).toBe(true);
  });

  it('should handle events of its children', () => {
    const buttonComponent = component;
    (component.instance() as any).handleEvent = jest.fn(); 
    component.find('button').simulate('click');
    // Need to set timeout here to sense the change apparently
    setTimeout(() => {
      expect((component.instance() as any).handleEvent).toHaveBeenCalled();
    }, 0);
  });

  it('should be able to handle events ', () => {
    const mockObj = {
      feature: 'Test',
      subFeature: 'Test sub',
      action: 'Test_ButtonClicked'
    };
    telemetryHelper.trackUserAction(mockObj);
    expect(trackUserEventSpy).toBeCalledWith(mockObj);
  });
});

// telemetry.service
import { uiConfig } from 'common/config';
import { history } from 'common/config/history';
import { telemetryService } from './telemetry.service';
class TelemetryHelper {
  this.state={
    isActive:false;
  }
  public trackUserAction = (props: any) => {
   // some logic by using all above declarations uiConfig,history, telemetryService
  };
  private isUserActive=(val:boolean)=>{
    this.setState({
      isActive: val
    })
  }
}

// *******************************************************************************************************************************
 const trackUserActionSpy = jest.spyOn(telemetryHelper, 'trackUserAction');
spySetFinalAppList.mockImplementationOnce(jest.fn());
(permissionService.isPathFlighted as jest.Mock<any>).mockReturnValue(true);
spyAppsCatalogDSLoadData.mockImplementationOnce(() => Observable.of({}) as any);
spyHasSubmitToApprovalFlightingKey.mockImplementationOnce(() => true);
    spyAppsCatalogDSLoadData.mockImplementationOnce(() => Observable.throw({
      status: 500
    }) as any);
spyAppsOfferListDSLoadData.mockImplementationOnce(() => Observable.throw({
  errorCode: MonetApiErrorCode.GenericAPIFailure,
  error: {
    correlationId: '1234'
  }
}) as any);
spyCachedOrgItemsGetData.mockReturnValue([{
  id: '1',
  displayName: 'test tenant',
  countryLetterCode: 'US',
  verifiedDomains: [{ name: 'test@domain.com' }]
}
]);
addAppToTeamMock.mockImplementationOnce(() => Observable.throw({errorCode: MsGraphErrorCode.AppForbiddenAction}));
spyGetSelectedApp.mockImplementation(() => app as ManageAppsCatalogViewModel);

// *******************************************************************************************************************************
// For get call:
    (httpService.get as jest.Mock<any>).mockImplementationOnce(() => Observable.of());
    drivenUpgradeDataService.getUpgradeStatus();
    const spy = jest.spyOn(drivenUpgradeDataService, 'getRequestHeaders' as any);
    expect(spy).toHaveBeenCalled();
    expect(httpService.get).toHaveBeenCalled();

// Throw Error:
    (httpService.get as jest.Mock<any>).mockImplementationOnce(() => Observable.throw('error'));
    expect(drivenUpgradeDataService.getUpgradeStatus().subscribe).toThrowError();

// For put call:
   (httpService.put as jest.Mock<any>).mockImplementationOnce(() => Observable.of());
    drivenUpgradeDataService.setUpgradeStatus(ActionState.Postponed, 'test');
    const spy = jest.spyOn(drivenUpgradeDataService, 'getRequestHeaders' as any); // some service insi
    expect(spy).toHaveBeenCalled();
    expect(httpService.put).toHaveBeenCalled();

// Throw error:
    (httpService.put as jest.Mock<any>).mockImplementationOnce(() => Observable.throw('error'));
    expect(drivenUpgradeDataService.setUpgradeStatus(ActionState.Postponed, 'test').subscribe).toThrowError();
    const spy = jest.spyOn(loggerService, 'error');
    expect(spy).toHaveBeenCalled();


// Private/public method Testing setState 
    const instance = (component.instance() as any);
    const setState = jest.spyOn(instance, 'setState');
    const dropdownItem: IDropdownOption = {
      text: 'hi',
      key: 'hey'
    };
    instance.onActivityTypeChanged(dropdownItem);
    expect(setState).toHaveBeenCalled();
    expect(instance.state.selectedActivity).toBe(dropdownItem.key);

// Calling componentWillmount
// any api calls should be checked
    navigationViewStore.selectedKey = null;
    const setSelectedKey = jest.spyOn(navigationViewStore, 'setSelectedKey');
    instance.componentWillMount();
    expect(setSelectedKey).toHaveBeenCalled();

  test('deos not reload page after submition', () => {
    const wrapper = shallow(<TodosForm />)
    // an object with some function
    const event = { preventDefault: () => {} }
    // mocks for this function
    jest.spyOn(event, 'preventDefault')
    wrapper.find('form').simulate('submit', event)
    // how would you know that function is called
    expect(event.preventDefault).toBeCalled()
  })
// Mock implementation
    it('should load app catalog by id', () => {
    mcasAppCatalogDataService.loadAppCatalogById = jest.fn().mockImplementationOnce(() => Observable.of({
      id: '12345'
    }));
    mcasAppCatalogDataStore.loadAppCatalogById('12345')
      .subscribe((res) => {
        expect(res.id).toBe('12345');
    });
  });
