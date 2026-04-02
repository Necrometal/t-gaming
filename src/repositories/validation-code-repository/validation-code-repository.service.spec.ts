import { Test, TestingModule } from '@nestjs/testing';
import { ValidationCodeRepositoryService } from './validation-code-repository.service';

describe('ValidationCodeRepositoryService', () => {
  let service: ValidationCodeRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationCodeRepositoryService],
    }).compile();

    service = module.get<ValidationCodeRepositoryService>(ValidationCodeRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
