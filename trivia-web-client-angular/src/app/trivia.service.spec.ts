import { TestBed, inject } from '@angular/core/testing';

import { TriviaService } from './trivia.service';

describe('TriviaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TriviaService]
    });
  });

  it('should be created', inject([TriviaService], (service: TriviaService) => {
    expect(service).toBeTruthy();
  }));
});
