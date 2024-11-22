import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ManagerError } from './../common/errors/manager.error';
import { PaginationDto } from './../common/dtos/pagination/pagination.dto';
import { ResponseAllCustomers } from './interfaces/response-customers.interface';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ){}

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    try {
      const customer = await this.customerRepository.save(createCustomerDto);
      if( !customer ){
        throw new ManagerError({
          type: 'CONFLICT',
          message: 'Customer not created!',
        });
      }
      return customer;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<ResponseAllCustomers> {
    const { limit, page } = paginationDto;
    const skip = (page - 1) * limit;

    try {
      const [ total, data ] = await Promise.all([
        this.customerRepository.count( { where: { isActive: true } } ),
        this.customerRepository.createQueryBuilder('customer')
        .where({isActive: true})
        .leftJoinAndSelect('customer.purchase','purchase')
        .take(limit)
        .skip(skip)
        .getMany()
      ]);

      const lastPage = Math.ceil(total / limit);

      return {
        page,
        limit,
        lastPage,
        total,
        data,
      };
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<CustomerEntity> {
    try {
      const customer = await this.customerRepository.createQueryBuilder('customer')
      .where({id, isActive: true})
      .leftJoinAndSelect('customer.purchase','purchase')
      .getOne()

      if (!customer) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Customer not found!',
        })
      }

      return customer
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<UpdateResult> {
    try {
      const customer = await this.customerRepository.update( {id, isActive: true}, updateCustomerDto );
      if ( customer.affected === 0 ) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Customer not found!',
        })
      }

      return customer;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<UpdateResult> {
    try {
      const customer = await this.customerRepository.update({id, isActive:true},{isActive:false});
      if ( customer.affected === 0 ) {
        throw new ManagerError({
          type: 'NOT_FOUND',
          message: 'Customer not found',
        });
      }

      return customer;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }
  }
}