
import { Controller } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { Flashcard } from './entities/flashcard.entity';
import { MessagePattern} from '@nestjs/microservices'; 

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @MessagePattern({ cmd: 'get_flashcard'})
  view( id: string) {
    return this.flashcardsService.view(id);
  }

  @MessagePattern({ cmd: 'create_flashcard'})
  create( flashcard: Flashcard) {
    return this.flashcardsService.create(flashcard);
  }

  @MessagePattern({ cmd: 'edit_flashcard'})
  edit( flashcard: Flashcard ) {
    return this.flashcardsService.edit(flashcard);
  }

  @MessagePattern({ cmd: 'delete_flashcard'})
  delete( id: string ) {
    return this.flashcardsService.delete(id);
  }

  @MessagePattern({ cmd: 'get_sharedFlashcard'})
  getSharedFlashcard(data: any) {
    return this.flashcardsService.getSharedFlashcard(data);
  }
}