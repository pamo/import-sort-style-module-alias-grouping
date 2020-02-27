import 'mocha';

import { assert } from 'chai';
import { applyChanges, sortImports } from 'import-sort';
import * as parser from 'import-sort-parser-typescript';

import moduleAliasGroupingStyle from '../src';

describe('sortImports', () => {
  it('should sort all of the things with aliases!', async () => {
    const { code, expected } = await import('./fixtures/all-the-things');
    const result = sortImports(
      code,
      parser,
      moduleAliasGroupingStyle,
      undefined,
      {
        alias: ['app']
      }
    );
    const actual = result.code;
    const changes = result.changes;

    assert.equal(actual, expected);
    assert.equal(applyChanges(code, changes), expected);
  });

  it('should sort external libraries', async () => {
    const { code, expected } = await import('./fixtures/external-modules');
    const result = sortImports(
      code,
      parser,
      moduleAliasGroupingStyle,
      undefined
    );
    const actual = result.code;
    const changes = result.changes;

    assert.equal(actual, expected);
    assert.equal(applyChanges(code, changes), expected);
  });

  it('should sort scoped internal libraries', async () => {
    const { code, expected, code2, expected2 } = await import(
      './fixtures/internal-modules'
    );
    const result = sortImports(
      code,
      parser,
      moduleAliasGroupingStyle,
      undefined
    );
    let actual = result.code;
    let changes = result.changes;

    assert.equal(actual, expected);
    assert.equal(applyChanges(code, changes), expected);

    const result2 = sortImports(
      code2,
      parser,
      moduleAliasGroupingStyle,
      undefined
    );
    actual = result2.code;
    changes = result2.changes;

    assert.equal(actual, expected2);
    assert.equal(applyChanges(code2, changes), expected2);
  });

  it('should alphabetize named imports', async () => {
    const { code, expected } = await import('./fixtures/named-imports');
    const result = sortImports(
      code,
      parser,
      moduleAliasGroupingStyle,
      undefined
    );
    const actual = result.code;
    const changes = result.changes;

    assert.equal(actual, expected);
    assert.equal(applyChanges(code, changes), expected);
  });
});
