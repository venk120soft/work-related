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
  public trackUserAction = (props: any) => {
   // some logic by using all above declarations uiConfig,history, telemetryService
  };
}
