"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hasAlias = (aliases) => (imported) => aliases.some((alias) => imported.moduleName.includes(alias));
exports.default = (styleApi, file, options) => {
    const { alias, and, dotSegmentCount, hasNoMember, isNodeModule, isRelativeModule, isScopedModule, moduleName, naturally, not, or, unicode } = styleApi;
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
