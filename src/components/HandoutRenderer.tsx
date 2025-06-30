import React from 'react';
import { 
  eHandoutDefinitions, 
  NEWSPAPER, 
  NEWSPAPER_CLIPPING, 
  CHARACTER_CARD, 
  PLAIN_LETTER, 
  BOOK_COVER, 
  LABELLED_LIQUID,
  iHandoutDefinition 
} from '../config';
import { Newspaper } from '../renderer/Newspaper';
import { NewspaperClipping } from '../renderer/NewspaperClipping';
import { CharacterCard } from '../renderer/CharacterCard';
import { PlainLetter } from '../renderer/PlainLetter';
import { BookCover } from '../renderer/BookCover';
import { LabelledLiquid } from '../renderer/LabelledLiquid';

interface HandoutRendererProps {
  handoutType: eHandoutDefinitions;
  handoutData: iHandoutDefinition['data'];
}

export const HandoutRenderer: React.FC<HandoutRendererProps> = ({ 
  handoutType, 
  handoutData 
}) => {
  switch (handoutType) {
    case eHandoutDefinitions.NEWSPAPER:
      return (
        <Newspaper
          handout={handoutData as unknown as (typeof NEWSPAPER)['data']}
        />
      );
    
    case eHandoutDefinitions.NEWSPAPER_CLIPPING:
      return (
        <NewspaperClipping
          handout={handoutData as unknown as (typeof NEWSPAPER_CLIPPING)['data']}
        />
      );
    
    case eHandoutDefinitions.CHARACTER_CARD:
      return (
        <CharacterCard
          handout={handoutData as unknown as (typeof CHARACTER_CARD)['data']}
        />
      );
    
    case eHandoutDefinitions.PLAIN_LETTER:
      return (
        <PlainLetter
          handout={handoutData as unknown as (typeof PLAIN_LETTER)['data']}
        />
      );
    
    case eHandoutDefinitions.BOOK_COVER:
      return (
        <BookCover
          handout={handoutData as unknown as (typeof BOOK_COVER)['data']}
        />
      );
    
    case eHandoutDefinitions.LABELLED_LIQUID:
      return (
        <LabelledLiquid
          handout={handoutData as unknown as (typeof LABELLED_LIQUID)['data']}
        />
      );
    
    default:
      return null;
  }
};