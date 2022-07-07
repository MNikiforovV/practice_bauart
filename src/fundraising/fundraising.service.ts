import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeasService } from 'src/ideas/ideas.service';
import { Repository } from 'typeorm';
import { CreateDonationDto } from './dto/create-donation.dto';
import { CreateFundraisingDto } from './dto/create-fundraising.dto';
import { UpdateFundraisingDto } from './dto/update-fundraising.dto';
import Donations from './entities/donations.entity';
import Fundraising from './entities/fundraising.entity';

@Injectable()
export class FundraisingService {
  constructor(
    @InjectRepository(Fundraising)
    // private fundraisingRepository: Repository<Fundraising>,
    
    @InjectRepository(Donations)
    // private donationsRepository: Repository<Donations>,

    private ideasServices: IdeasService
  ){}

  // async create(createFundraisingDto: CreateFundraisingDto, slug: string) {
  //   const idea = await this.ideasServices.getIdeaBySlug(slug)
  //   const fundraising = await this.fundraisingRepository.create({ 
  //     ...createFundraisingDto,
  //     idea: idea
  //   })
  //   await this.fundraisingRepository.save(fundraising)
  //   return fundraising;
  // }

  // async findOne(id: number) {
  //   return await this.fundraisingRepository.findOne({ where: { id: id } });
  // }

  // async update(id: number, updateFundraisingDto: UpdateFundraisingDto) {
  //   let toUpdate = await this.fundraisingRepository.findOne({
  //     where: { id: id },
  //     relations: ['idea'],
  //   });
  //   let updated = Object.assign(toUpdate, updateFundraisingDto);
  //   const updatedFundraising = await this.fundraisingRepository.save(updated);
  //   if (updatedFundraising) {
  //     return updatedFundraising;
  //   }
  //   throw new HttpException('Fundraising not found', HttpStatus.NOT_FOUND);
  // }

  // async createDonation(createDonationDto: CreateDonationDto, id: number){
  //   const fundraising = await this.findOne(id)
  //   const donation = await this.donationsRepository.create({ 
  //     ...createDonationDto,
  //     fundraising: fundraising
  //   })
  //   await this.fundraisingRepository.save(donation)
  //   return donation;
  // }
}
