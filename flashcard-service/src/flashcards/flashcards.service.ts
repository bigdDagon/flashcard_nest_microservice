import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Flashcard } from './entities/flashcard.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FlashcardsService {
  constructor(@InjectRepository(Flashcard) 
  private readonly flashcardModel: Repository<Flashcard>) {}
  
  view(id: string) {
    const viewFlashcard = this.flashcardModel.find({ where: { cardId: id } });
    return viewFlashcard;
  }

  create(createFlashcardDto: Flashcard) {
    const createdFlashcard = this.flashcardModel.create(createFlashcardDto);
    return this.flashcardModel.save(createdFlashcard);
  }

  edit(editFlashcardDto: Flashcard) {
    const editFlashcard = this.flashcardModel.update( {cardId: editFlashcardDto.cardId }, 
        editFlashcardDto);
    return editFlashcard;
  }

  delete(cardId: string) {
    const deletedFlashcard = this.flashcardModel.delete(cardId);
    return deletedFlashcard;
  }

  getSharedFlashcard(data: any) {
    const sharedFlashcard = this.flashcardModel.find({ where: {status: "shared"}})
    return sharedFlashcard;
  }
}

