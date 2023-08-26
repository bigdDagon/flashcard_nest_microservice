import { Body, Controller, Get, Inject, Param, Post, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FlashcardDTO } from './type/flashcard';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';

@Controller('flashcard')
export class AppController {
  constructor(@Inject('FLASHCARD_SERVICE') private client: ClientProxy) {}
  
// View all shared flashcard - feature4.
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get("/all")
  getSharedFlashcard() {
    return this.client.send( {cmd: 'get_sharedFlashcard'}, {} );
  }

// View Flashcard by CardId
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getFlashcardByID(@Param("id") id: string) {
    return this.client.send({cmd: 'get_flashcard'}, id);
  }

// Delete Flashcard by CardId
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  deleteFlashcard(@Param("id") id: string) {
    return this.client.send({cmd: 'delete_flashcard'}, id);
  }

// Edit Flashcard by CardId
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post("") 
  editFlashcard(@Body() flashcard: FlashcardDTO) {
    return this.client.send({cmd: 'edit_flashcard'}, flashcard);
  }  

// Create Flashcard by CardId
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post("/create") 
  createFlashcard(@Body() flashcard: FlashcardDTO) {
    return this.client.send({cmd: 'create_flashcard'}, flashcard);
  }
}
