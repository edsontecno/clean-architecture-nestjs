import { Test, TestingModule } from '@nestjs/testing';
import { ICategoryData } from '../../../application/category/interfaces/ICategoryData';
import { ICategoryUseCase } from '../../../application/category/interfaces/ICategoryUseCase';
import { CategoryDto } from '../dto/category.dto';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { GategoryPresenter } from '../presenter/CategoryPresenter';
import { CategoryAdapterController } from './CategoryAdapterController';

describe('CategoryAdapterController', () => {
  let controller: CategoryAdapterController;
  let useCaseMock: Partial<ICategoryUseCase>;
  let gatewayMock: Partial<ICategoryData>;
  let presenterMock: Partial<GategoryPresenter>;

  beforeEach(async () => {
    useCaseMock = {
      save: jest.fn(),
      get: jest.fn(),
      getSigle: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    };

    gatewayMock = {
      convertCreateDtoToEntity: jest.fn(),
    };

    presenterMock = {
      convertEntityToResponseDto: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryAdapterController],
      providers: [
        { provide: 'ICategoryUseCase', useValue: useCaseMock },
        { provide: 'ICategoryData', useValue: gatewayMock },
        { provide: 'GategoryPresenter', useValue: presenterMock },
      ],
    }).compile();

    controller = module.get<CategoryAdapterController>(
      CategoryAdapterController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should save a category and return a CategoryDto', async () => {
    const dto = new CreateCategoryDto();
    const categoryEntity = {};
    const savedEntity = {};
    const responseDto = new CategoryDto();

    (gatewayMock.convertCreateDtoToEntity as jest.Mock).mockReturnValue(
      categoryEntity,
    );
    (useCaseMock.save as jest.Mock).mockResolvedValue(savedEntity);
    (presenterMock.convertEntityToResponseDto as jest.Mock).mockReturnValue(
      responseDto,
    );

    const result = await controller.save(dto);

    expect(gatewayMock.convertCreateDtoToEntity).toHaveBeenCalledWith(dto);
    expect(useCaseMock.save).toHaveBeenCalledWith(categoryEntity);
    expect(presenterMock.convertEntityToResponseDto).toHaveBeenCalledWith(
      savedEntity,
    );
    expect(result).toEqual(responseDto);
  });

  it('should retrieve a category by id and return a CategoryDto', async () => {
    const id = 1;
    const entity = {};
    const responseDto = new CategoryDto();

    (useCaseMock.get as jest.Mock).mockResolvedValue(entity);
    (presenterMock.convertEntityToResponseDto as jest.Mock).mockReturnValue(
      responseDto,
    );

    const result = await controller.get(id);

    expect(useCaseMock.get).toHaveBeenCalledWith(id);
    expect(presenterMock.convertEntityToResponseDto).toHaveBeenCalledWith(
      entity,
    );
    expect(result).toEqual(responseDto);
  });

  it('should retrieve a single category by id and return a CategoryDto', async () => {
    const id = 1;
    const entity = {};
    const responseDto = new CategoryDto();

    (useCaseMock.getSigle as jest.Mock).mockResolvedValue(entity);
    (presenterMock.convertEntityToResponseDto as jest.Mock).mockReturnValue(
      responseDto,
    );

    const result = await controller.getSigle(id);

    expect(useCaseMock.getSigle).toHaveBeenCalledWith(id);
    expect(presenterMock.convertEntityToResponseDto).toHaveBeenCalledWith(
      entity,
    );
    expect(result).toEqual(responseDto);
  });

  it('should delete a category by id', async () => {
    const id = 1;

    await controller.delete(id);

    expect(useCaseMock.delete).toHaveBeenCalledWith(id);
  });

  it('should update a category and return a CategoryDto', async () => {
    const id = 1;
    const dto = new CreateCategoryDto();
    const categoryEntity = {};
    const updatedEntity = {};
    const responseDto = new CategoryDto();

    (gatewayMock.convertCreateDtoToEntity as jest.Mock).mockReturnValue(
      categoryEntity,
    );
    (useCaseMock.update as jest.Mock).mockResolvedValue(updatedEntity);
    (presenterMock.convertEntityToResponseDto as jest.Mock).mockReturnValue(
      responseDto,
    );

    const result = await controller.update(id, dto);

    expect(gatewayMock.convertCreateDtoToEntity).toHaveBeenCalledWith(dto);
    expect(useCaseMock.update).toHaveBeenCalledWith(id, categoryEntity);
    expect(presenterMock.convertEntityToResponseDto).toHaveBeenCalledWith(
      updatedEntity,
    );
    expect(result).toEqual(responseDto);
  });
});
