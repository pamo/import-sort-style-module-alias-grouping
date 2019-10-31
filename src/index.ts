import { IStyleAPI, IStyleItem } from 'import-sort-style';

import { IImport } from 'import-sort-parser';

const hasAlias = (aliases: string[]) => (imported: IImport) =>
  aliases.some((alias: string): boolean => imported.moduleName.includes(alias));

export default (
  styleApi: IStyleAPI,
  file?: string,
  options?: any
): IStyleItem[] => {
  const {
    alias,
    and,
    dotSegmentCount,
    hasNamespaceMember,
    hasNoMember,
    isAbsoluteModule,
    isRelativeModule,
    isScopedModule,
    moduleName,
    naturally,
    not,
    unicode
  } = styleApi;

  const isAliasModule = hasAlias(options.alias || []);

  return [
    // import 'module';
    { match: and(hasNoMember, isAbsoluteModule, not(isAliasModule)) },
    // import * as foo from 'module';
    {
      match: and(
        isAbsoluteModule,
        hasNamespaceMember,
        not(isScopedModule),
        not(isAliasModule)
      )
    },
    {
      separator: true
    },
    // import ... from '@scope/foo';
    {
      match: and(isScopedModule, not(isAliasModule)),
      sort: moduleName(unicode),
      sortNamedMembers: alias(naturally)
    },
    // import ... from 'foo';
    {
      match: and(isAbsoluteModule, not(isAliasModule), not(isScopedModule)),
      sort: moduleName(unicode),
      sortNamedMembers: alias(naturally)
    },
    {
      separator: true
    },
    // import ... from '@{alias}/foo';
    {
      match: and(isScopedModule, isAliasModule),
      sort: moduleName(unicode),
      sortNamedMembers: alias(naturally)
    },
    // import ... from '{alias}';
    {
      match: and(isAbsoluteModule, not(isScopedModule), isAliasModule),
      sort: moduleName(unicode),
      sortNamedMembers: alias(naturally)
    },
    {
      separator: true
    },
    // relative Modules
    {
      match: isRelativeModule,
      sort: [dotSegmentCount, moduleName(unicode)],
      sortNamedMembers: alias(naturally)
    },
    {
      separator: true
    },
    // relative Modules
    {
      match: isRelativeModule,
      sort: [dotSegmentCount, moduleName(unicode)]
    }
  ];
};
