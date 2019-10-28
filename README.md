# import-sort-style-module-alias-grouping

A style for [import-sort](https://github.com/renke/import-sort) that is focused
on modules and aliases.

```js
// scoped third party node module
import { NgModule } from '@angular/core';
// scoped third party module with alias defined in options
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

// scoped first party modules
import { CommentsModule } from '@app/modules/comments/comments.module';
import { NoteModule } from '@app/modules/note/note.module';
import { TodoModule } from '@app/modules/todo/todo.module';
import { DialogModule } from '@app/shared/components/dialog';
import { SharedModule } from '@app/shared/shared.module';

// relative imports sorted by paths
import { SummariesComponent } from './components/summaries/summaries.component';
import { SummariesApiService } from './shared/summaries-api.service';
import { SummariesResolver } from './shared/summaries.resolver';
import { SummariesActions } from './store/summaries.actions';
import { SummariesEffects } from './store/summaries.effects';
import {
  summariesReducer,
  summariesStatePath
} from './store/summaries.reducer';
import { SummariesSelectors } from './store/summaries.selectors';
import { SummariesRoutingModule } from './summaries-routing.module';
```

Example `package.json` config

```json
"importSort": {
    ".js, .ts": {
      "style": "module-alias-grouping",
      "parser": "typescript",
      "options": {
        "alias": [
          "ngrx"
        ]
      }
    }
  }
```
