export const code =
  `
import { environment } from '@environments/environment';
import { logoutPath } from '@app/core/auth/shared/auth-constants';
import { invoke } from '@app/utils';
import { FeatureFlagSelectors, ProfileSelectors } from '@app/core';
import { SharedComponent } from '../../shared/components/component';
import { SiblingComponent } from './sibling-component';
import { ParentComponent } from '../../parent/parent-component';
import { SharedService } from '../../../shared/services/shared-service';
import { AAAAFromOtherFolderButStillRelative } from './shared';
`.trim() + "\n";

export const expected =
  `
import { FeatureFlagSelectors, ProfileSelectors } from '@app/core';
import { logoutPath } from '@app/core/auth/shared/auth-constants';
import { invoke } from '@app/utils';
import { environment } from '@environments/environment';

import { AAAAFromOtherFolderButStillRelative } from './shared';
import { ParentComponent } from '../../parent/parent-component';
import { SharedComponent } from '../../shared/components/component';
import { SharedService } from '../../../shared/services/shared-service';
import { SiblingComponent } from './sibling-component';
`.trim() + "\n";
