"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(styleApi) {
    const { alias, and, dotSegmentCount, hasNoMember, hasOnlyNamespaceMember, isAbsoluteModule, isNodeModule, isRelativeModule, member, moduleName, naturally, not, unicode } = styleApi;
    const startsWithAt = (string) => string.startsWith('@');
    return [
        // import … from "@angular/core";
        {
            match: and(isNodeModule, moduleName(startsWithAt)),
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
        // import "./foo"
        { match: and(hasNoMember, isRelativeModule) },
        { separator: true },
        // import … from "@foo/bar";
        {
            match: and(moduleName(startsWithAt), not(hasOnlyNamespaceMember)),
            sort: member(naturally),
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
        // import … from "./foo";
        // import … from "../foo";
        {
            match: isRelativeModule,
            sort: [dotSegmentCount, moduleName(naturally)],
            sortNamedMembers: alias(unicode)
        },
        { separator: true }
    ];
}
exports.default = default_1;