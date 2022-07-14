import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeasService } from 'src/ideas/ideas.service';
import User from 'src/users/entities/user.entity';
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
    private fundraisingRepository: Repository<Fundraising>,
    
    @InjectRepository(Donations)
    private donationsRepository: Repository<Donations>,

    private ideasServices: IdeasService
  ){}

  async create(createFundraisingDto: CreateFundraisingDto, slug: string) {
    const idea = await this.ideasServices.getIdeaBySlug(slug)
    const fundraising = await this.fundraisingRepository.create({ 
      title: idea.title,
      ...createFundraisingDto,
      idea: idea
    })
    return await this.fundraisingRepository.save(fundraising);
  }

  async findOne(slug: string) {
    const idea = await this.ideasServices.getIdeaBySlug(slug)
    return await this.fundraisingRepository.findOne({ where: { idea: {id: idea.id} }, relations: ['idea'] });
  }

  async update(id: number, updateFundraisingDto: UpdateFundraisingDto) {
    let toUpdate = await this.fundraisingRepository.findOne({
      where: { id: id },
      relations: ['idea'],
    });
    let updated = Object.assign(toUpdate, updateFundraisingDto);
    const updatedFundraising = await this.fundraisingRepository.save(updated);
    if (updatedFundraising) {
      return updatedFundraising;
    }
    throw new HttpException('Fundraising not found', HttpStatus.NOT_FOUND);
  }

  async createDonation(createDonationDto: CreateDonationDto, slug: string, user: User){
    const fundraising = await this.findOne(slug)
    const donation = await this.donationsRepository.create({ 
      ...createDonationDto,
      fundraising: fundraising,
      user: user,
      check: false
    })
    await this.donationsRepository.save(donation)
    return donation;
  }

  async findAllDonations(slug: string) {
    const fund = await this.findOne(slug)
    if(fund){
      return await this.donationsRepository.find({ where: {fundraising: {id: fund.id}}, relations:['user']} );
    }
    throw new HttpException('Fundraising not found', HttpStatus.NOT_FOUND)
  }

  async updateDonation(id: number) {
    let toUpdate = await this.donationsRepository.findOne({
      where: { id: id },
      relations: ['fundraising'],
    });
    let updated = Object.assign(toUpdate, {check: true});
    const updatedDonation = await this.donationsRepository.save(updated);
    if (updatedDonation) {
      return updatedDonation;
    }
    throw new HttpException('Fundraising not found', HttpStatus.NOT_FOUND);
  }

  async sumDonations(slug: string){
    const donations = await this.findAllDonations(slug)
    let sum = 0
    for (var d of donations){
      if (d.check){
        sum += d.money
      }
    }
    return sum
  }
}
