import * as Lint from "tslint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "Do not use window directly, use getWindowOrThrow() from /lib/ts/utils.ts instead";

    public static metadata: Lint.IRuleMetadata = {
        ruleName: "no-direct-window",
        description: "Enforces that code does not use the window object directly",
        optionsDescription: "Not configurable",
        options: null,
        type: "style",
        typescriptOnly: false,
    };

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk);
    }
}

function walk(ctx: Lint.WalkContext<void>) {
    function cb(node: ts.Node): void {
        let escapedText: string | undefined = node["escapedText"];

        if (escapedText !== undefined && escapedText === "window") {
            ctx.addFailureAt(node.getStart(), node.getWidth(), Rule.FAILURE_STRING);
        }

        return ts.forEachChild(node, cb);
    }

    return ts.forEachChild(ctx.sourceFile, cb);
}
