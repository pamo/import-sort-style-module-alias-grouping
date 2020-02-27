export const code = `
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommentsModule } from '@app/modules/comments/comments.module';
import { TodoModule } from '@app/modules/todo/todo.module';
import { DialogModule } from '@app/shared/components/dialog';
import { NoteModule } from '@app/modules/note/note.module';
import { SharedModule } from '@app/shared/shared.module';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { SummariesRoutingModule } from './summaries-routing.module';
import { SummariesComponent } from './components/summaries/summaries.component';
import { SummariesApiService } from './shared/summaries-api.service';
import { SummariesResolver } from './shared/summaries.resolver';
import { SummariesActions } from './store/summaries.actions';
import { SummariesEffects } from './store/summaries.effects';
import { SummariesSelectors } from './store/summaries.selectors';
import {
  summariesReducer,
  summariesStatePath,
} from './store/summaries.reducer';
`;

export const expected =
  `import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { CommentsModule } from '@app/modules/comments/comments.module';
import { NoteModule } from '@app/modules/note/note.module';
import { TodoModule } from '@app/modules/todo/todo.module';
import { DialogModule } from '@app/shared/components/dialog';
import { SharedModule } from '@app/shared/shared.module';

import { SummariesActions } from './store/summaries.actions';
import { SummariesApiService } from './shared/summaries-api.service';
import { SummariesComponent } from './components/summaries/summaries.component';
import { SummariesEffects } from './store/summaries.effects';
import {
  summariesReducer,
  summariesStatePath,
} from './store/summaries.reducer';
import { SummariesResolver } from './shared/summaries.resolver';
import { SummariesRoutingModule } from './summaries-routing.module';
import { SummariesSelectors } from './store/summaries.selectors';
`.trim() + "\n";
