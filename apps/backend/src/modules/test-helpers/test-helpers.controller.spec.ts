import { Test, TestingModule } from '@nestjs/testing';
import { TestHelpersController } from './test-helpers.controller';

describe('TestHelpersController', () => {
  let controller: TestHelpersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestHelpersController],
    }).compile();

    controller = module.get<TestHelpersController>(TestHelpersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
