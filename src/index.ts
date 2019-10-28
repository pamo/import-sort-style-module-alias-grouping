import { IStyleAPI, IStyleItem } from 'import-sort-style';
import { IImport } from 'import-sort-parser';

const hasAlias = (aliases: string[]) => (imported: IImport) =>
  aliases.some(
    (alias: string): boolean => imported.moduleName.indexOf(alias) === 0
  );

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
    isAbsoluteModule,
    isNodeModule,
    isRelativeModule,
    member,
    moduleName,
    naturally,
    unicode
  } = styleApi;
  const isAliasModule = hasAlias(options.alias || []);

  return [
    // import … from "{third-party-alias}/foo";
    {
      match: and(isNodeModule, isAbsoluteModule, isAliasModule),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import … from "fs";
    {
      match: isNodeModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import "foo"
    { match: and(hasNoMember, isAbsoluteModule) },
    { separator: true },

    // import … from "{relative-alias}/bar";
    {
      match: and(isRelativeModule, isAbsoluteModule, isAliasModule),
      sort: member(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import "./foo"
    { match: and(hasNoMember, isRelativeModule) },
    { separator: true },

    // import … from "foo";
    {
      match: isAbsoluteModule,
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode)
    },
    { separator: true },

    // import … from "./foo";
    // import … from "../foo";
    {
      match: isRelativeModule,
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode)
    },
    { separator: true }
  ];
};
