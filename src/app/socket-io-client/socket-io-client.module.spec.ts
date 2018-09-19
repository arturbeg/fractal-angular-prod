import { SocketIoClientModule } from './socket-io-client.module';

describe('SocketIoClientModule', () => {
  let socketIoClientModule: SocketIoClientModule;

  beforeEach(() => {
    socketIoClientModule = new SocketIoClientModule();
  });

  it('should create an instance', () => {
    expect(socketIoClientModule).toBeTruthy();
  });
});
