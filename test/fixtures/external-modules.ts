export const code =
  `
import * as Rollbar from 'rollbar';
import { Ccc } from 'yyy';
import { ddd, eee } from 'ffff';
import { Aaa } from '@xxx/bbb';
import { Bbb } from 'aaa/bbb';
import 'zone.js/dist/zone-testing';
`.trim() + '\n';

export const expected =
  `
import 'zone.js/dist/zone-testing';
import * as Rollbar from 'rollbar';

import { Aaa } from '@xxx/bbb';
import { Bbb } from 'aaa/bbb';
import { ddd, eee } from 'ffff';
import { Ccc } from 'yyy';
`.trim() + '\n';
