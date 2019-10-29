"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hasAlias = (aliases) => (imported) => aliases.some((alias) => imported.moduleName.includes(alias));
exports.default = (styleApi, file, options) => {
    const { alias, and, dotSegmentCount, or, hasDefaultMember, hasNamedMembers, hasNamespaceMember, hasNoMember, isAbsoluteModule, isRelativeModule, isScopedModule, moduleName, not, unicode } = styleApi;
    const isAliasModule = hasAlias(options.alias || []);
    return [
        // import 'module';
        { match: and(hasNoMember, isAbsoluteModule, not(isAliasModule)) },
        // import * as foo from 'module';
        {
            match: and(isAbsoluteModule, hasNamespaceMember, not(isScopedModule), not(isAliasModule))
        },
        {
            separator: true
        },
        // import ... from '@scope/foo';
        {
            match: and(isScopedModule, not(isAliasModule)),
            sort: moduleName(unicode),
            sortNamedMembers: alias(unicode)
        },
        // import ... from 'foo';
        {
            match: and(isAbsoluteModule, not(isAliasModule), not(isScopedModule)),
            sort: moduleName(unicode),
            sortNamedMembers: alias(unicode)
        },
        {
            separator: true
        },
        // import ... from '@{alias}/foo';
        {
            match: and(isScopedModule, isAliasModule),
            sort: moduleName(unicode),
            sortNamedMembers: alias(unicode)
        },
        // import ... from '{alias}';
        {
            match: and(isAbsoluteModule, not(isScopedModule), isAliasModule),
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
