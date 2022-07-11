import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FundraisingService } from './fundraising.service';
import { CreateFundraisingDto } from './dto/create-fundraising.dto';
import { UpdateFundraisingDto } from './dto/update-fundraising.dto';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';
import { CreateDonationDto } from './dto/create-donation.dto';
import RoleAdminGuard from 'src/users/roles/role-admin.guard';
import Role from 'src/users/roles/role.enum';
import RequestWithUser from 'src/auth/requestWithUser.interface';

@Controller('project/:slug/idea/:slugIdea/fundraising')
export class FundraisingController {
  constructor(private readonly fundraisingService: FundraisingService) {}

  @UseGuards(RoleAdminGuard(Role.Admin))
  @Post('create')
  create(@Body() createFundraisingDto: CreateFundraisingDto, @Param() params) {
    return this.fundraisingService.create(createFundraisingDto, params.slugIdea);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fundraisingService.findOne(+id);
  }

  @UseGuards(RoleAdminGuard(Role.Admin))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFundraisingDto: UpdateFundraisingDto) {
    return this.fundraisingService.update(+id, updateFundraisingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/donate')
  createDonation(@Param() params, @Body() createDonationDto: CreateDonationDto, @Req() req: RequestWithUser){
    return this.fundraisingService.createDonation(createDonationDto, params.id, req.user)
  }

  @UseGuards(RoleAdminGuard(Role.Admin))
  @Patch(':id/:idDonation')
  checkDonation(@Param() params) {
    return this.fundraisingService.updateDonation(params.idDonation);
  }

  @UseGuards(RoleAdminGuard(Role.Admin))
  @Get(':id/donations')
  viewAllDonations(@Param() params) {
    return this.fundraisingService.findAllDonations(params.id);
  }
}
