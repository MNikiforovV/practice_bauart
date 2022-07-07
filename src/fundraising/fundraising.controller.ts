import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FundraisingService } from './fundraising.service';
import { CreateFundraisingDto } from './dto/create-fundraising.dto';
import { UpdateFundraisingDto } from './dto/update-fundraising.dto';
import JwtAuthGuard from 'src/auth/jwt/jwt-auth.guard';

@Controller('fundraising')
export class FundraisingController {
  constructor(private readonly fundraisingService: FundraisingService) {}

  // @UseGuards(JwtAuthGuard)
  // @Post()
//   create(@Body() createFundraisingDto: CreateFundraisingDto, @Param() params) {
//     return this.fundraisingService.create(createFundraisingDto, params.slugIdea);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.fundraisingService.findOne(+id);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateFundraisingDto: UpdateFundraisingDto) {
//     return this.fundraisingService.update(+id, updateFundraisingDto);
//   }
}
