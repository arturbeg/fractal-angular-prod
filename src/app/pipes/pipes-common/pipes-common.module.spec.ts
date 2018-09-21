import { PipesCommonModule } from './pipes-common.module';

describe('PipesCommonModule', () => {
  let pipesCommonModule: PipesCommonModule;

  beforeEach(() => {
    pipesCommonModule = new PipesCommonModule();
  });

  it('should create an instance', () => {
    expect(pipesCommonModule).toBeTruthy();
  });
});
