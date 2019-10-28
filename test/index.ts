import 'mocha';
import * as parser from 'import-sort-parser-typescript';
import { applyChanges, sortImports } from 'import-sort';
import { assert } from 'chai';

import moduleAliasGroupingStyle from '../src';

describe('sortImports', () => {
  it('should sort all of the things!', async () => {
    const { code, expected } = await import('./fixtures/all-the-things');
    const result = sortImports(
      code,
      parser,
      moduleAliasGroupingStyle,
      undefined,
      {
        alias: ['ngrx']
      }
    );
    const actual = result.code;
    const changes = result.changes;

    assert.equal(actual, expected);
    assert.equal(applyChanges(code, changes), expected);
  });
});
