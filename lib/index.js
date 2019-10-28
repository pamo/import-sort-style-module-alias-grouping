"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hasAlias = (aliases) => (imported) => aliases.some((alias) => imported.moduleName.includes(alias));
exports.default = (styleApi, file, options) => {
    const { alias, and, dotSegmentCount, hasNoMember, isAbsoluteModule, isNodeModule, isRelativeModule, isScopedModule, moduleName, naturally, not, or, unicode } = styleApi;
    const isAliasModule = hasAlias(options.alias || []);
    return [
        // import … from "@third-party-alias/foo";
        {
            match: or(and(isNodeModule, isScopedModule), and(isAliasModule, isScopedModule)),
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
        // import … from "@first-party-alias/bar";
        {
            match: and(isScopedModule),
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode)
        },
        { separator: true },
        // import … from "foo";
        {
            match: isAbsoluteModule,
            sort: moduleName(naturally),
            sortNamedMembers: alias(unicode)
        },
        { separator: true },
        // import "./foo"
        {
            match: and(hasNoMember, isRelativeModule)
        },
        { separator: true },
        // import … from "../foo";
        // import … from "./foo";
        {
            match: isRelativeModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode)
        },
        { separator: true }
    ];
};
