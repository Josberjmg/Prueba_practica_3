import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethodEntity } from './entities/payment-method.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ManagerError } from './../common/errors/manager.error';
import { PaginationDto } from './../common/dtos/pagination/pagination.dto';
import { ResponseAllPaymentMethods } from './interfaces/response-paymentMethods.interface';

@Injectable()
export class PaymentMethodsService {

  constructor(
    @InjectRepository(PaymentMethodEntity)
    private readonly paymentMethodsRepository: Repository<PaymentMethodEntity>,
  ) { }

  async create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethodEntity> {

    try {
      const paymentMethods = await this.paymentMethodsRepository.save(createPaymentMethodDto);
      if (!paymentMethods) {
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Payment Method not created!',
        });
      }

      return paymentMethods;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllPaymentMethods> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {

      const [total, data] = await Promise.all([
        this.paymentMethodsRepository.count({ where: { isActive: true } }),
        this.paymentMethodsRepository.find({ where: { isActive: true }, take: limit, skip: skip })
      ]);

      const lastPage = Math.ceil(total / limit);

      return {
        page,
        limit,
        lastPage,
        total,
        data
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<PaymentMethodEntity> {
    try {
      const paymentMethods = await this.paymentMethodsRepository.createQueryBuilder('paymentMethods')
      .where({id, isActive:true})
      .getOne()
      if (!paymentMethods) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: "Payment Methods not found",
        })
      }

      return paymentMethods
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto):Promise<UpdateResult> {
    try {
      const paymentMethods = await this.paymentMethodsRepository.update({id, isActive: true}, updatePaymentMethodDto)
      if (paymentMethods.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Payment Methods not found',
        });
      }

      return paymentMethods;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string):Promise<UpdateResult> {
    try {
      const paymentMethods = await this.paymentMethodsRepository.update({id, isActive: true}, { isActive: false });
      if (paymentMethods.affected === 0) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Payment Methods not found',
        });
      }

      return paymentMethods;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}
