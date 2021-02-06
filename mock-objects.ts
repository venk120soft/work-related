import { EventSchema, telemetryService } from '.';
import { telemetryHelper } from './telemetry-helper';

jest.mock('common/config');
jest.mock('common/config/history');
jest.mock('./telemetry.service');

describe('Event tracker for telemetry helper', () => {
  it('should be able to handle events ', () => {
    const trackUserEventSpy = jest.spyOn(telemetryService, 'trackUserEvent');
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
