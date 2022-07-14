import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FundraisingService } from './fundraising.service';
import { CreateFundraisingDto } from './dto/create-fundraising.dto';
import { UpdateFundraisingDto } from './dto/update-fundraising.dto';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import { CreateDonationDto } from './dto/create-donation.dto';
import Role from 'src/users/roles/role.enum';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import RoleCreatorGuard from 'src/users/roles/role-creator-admin.guard';

@Controller('project/:slug/idea/:slugIdea/fundraising')
export class FundraisingController {
  constructor(private readonly fundraisingService: FundraisingService) {}

  @UseGuards(RoleCreatorGuard(Role.Admin))
  @Post('create')
  create(@Body() createFundraisingDto: CreateFundraisingDto, @Param() params) {
    return this.fundraisingService.create(createFundraisingDto, params.slugIdea);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Param() params) {
    return this.fundraisingService.findOne(params.slugIdea);
  }

  @UseGuards(RoleCreatorGuard(Role.Admin))
  @Patch()
  update(@Param() params, @Body() updateFundraisingDto: UpdateFundraisingDto) {
    return this.fundraisingService.update(params, updateFundraisingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('donate')
  createDonation(@Param() params, @Body() createDonationDto: CreateDonationDto, @Req() req: RequestWithUser){
    return this.fundraisingService.createDonation(createDonationDto, params.slugIdea, req.user)
  }

  @UseGuards(RoleCreatorGuard(Role.Admin))
  @Patch(':id/:idDonation')
  checkDonation(@Param() params) {
    return this.fundraisingService.updateDonation(params.idDonation);
  }

  @UseGuards(RoleCreatorGuard(Role.Admin))
  @Get(':id/donations')
  viewAllDonations(@Param() params) {
    return this.fundraisingService.findAllDonations(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('donationssum')
  getSumDonations(@Param() params){
    return this.fundraisingService.sumDonations(params.slugIdea)
  }
}
