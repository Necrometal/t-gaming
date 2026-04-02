import { Test, TestingModule } from '@nestjs/testing';
import { ProfileRepositoryService } from './profile-repository.service';

describe('ProfileRepositoryService', () => {
  let service: ProfileRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileRepositoryService],
    }).compile();

    service = module.get<ProfileRepositoryService>(ProfileRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
