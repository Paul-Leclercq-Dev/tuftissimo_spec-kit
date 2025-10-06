import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Contact } from '@prisma/client';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

const prisma = new PrismaClient();

@Injectable()
export class ContactService {
  async create(dto: CreateContactDto): Promise<Contact> {
    return prisma.contact.create({ data: dto });
  }

  async findAll(): Promise<Contact[]> {
    return prisma.contact.findMany();
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) throw new NotFoundException(`Contact #${id} not found`);
    return contact;
  }

  async update(id: number, dto: UpdateContactDto): Promise<Contact> {
    await this.findOne(id);
    return prisma.contact.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number): Promise<Contact> {
    await this.findOne(id);
    return prisma.contact.delete({ where: { id } });
  }
}