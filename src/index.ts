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
    hasNoMember,
    isNodeModule,
    isRelativeModule,
    isScopedModule,
    moduleName,
    naturally,
    not,
    or,
    unicode
  } = styleApi;
  const isAliasModule = hasAlias(options.alias || []);

  return [
    // scoped modules
    {
      match: and(isScopedModule, not(isAliasModule)),
      sort: moduleName(unicode),
      sortNamedMembers: alias(unicode)
    },
    // Node Modules
    {
      match: isNodeModule,
      sort: moduleName(unicode),
      sortNamedMembers: alias(unicode)
    },
    {
      match: and(isNodeModule, not(hasNoMember)),
      sort: moduleName(unicode),
      sortNamedMembers: alias(unicode)
    },
    // alias modules
    {
      match: and(not(isScopedModule), isAliasModule),
      sort: moduleName(unicode),
      sortNamedMembers: alias(unicode)
    },
    {
      separator: true
    },
    // scoped alias modules
    {
      match: and(isScopedModule, isAliasModule),
      sort: moduleName(unicode),
      sortNamedMembers: alias(unicode)
    },

    {
      separator: true
    },
    // relative Modules
    {
      match: isRelativeModule,
      sort: [dotSegmentCount, moduleName(unicode)],
      sortNamedMembers: alias(unicode)
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
