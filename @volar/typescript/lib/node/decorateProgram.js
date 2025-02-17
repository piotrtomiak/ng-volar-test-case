"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorateProgram = void 0;
const utils_1 = require("./utils");
const transform_1 = require("./transform");
function decorateProgram(language, program) {
    const emit = program.emit;
    // for tsc --noEmit
    const getSyntacticDiagnostics = program.getSyntacticDiagnostics;
    const getSemanticDiagnostics = program.getSemanticDiagnostics;
    const getGlobalDiagnostics = program.getGlobalDiagnostics;
    const getSourceFileByPath = program.getSourceFileByPath;
    // for tsc --noEmit --watch
    // @ts-ignore
    const getBindAndCheckDiagnostics = program.getBindAndCheckDiagnostics;
    program.emit = (...args) => {
        const result = emit(...args);
        return {
            ...result,
            diagnostics: result.diagnostics
                .map(d => (0, transform_1.transformDiagnostic)(language, d, program, true))
                .filter(utils_1.notEmpty),
        };
    };
    program.getSyntacticDiagnostics = (sourceFile, cancellationToken) => {
        if (!sourceFile) {
            return [];
        }
        const [_serviceScript, sourceScript] = (0, utils_1.getServiceScript)(language, sourceFile.fileName);
        const actualSourceFile = sourceScript ? program.getSourceFile(sourceScript.id) : sourceFile;
        return (0, transform_1.transformAndFilterDiagnostics)(getSyntacticDiagnostics(actualSourceFile, cancellationToken), language, sourceFile.fileName, program, true);
    };
    program.getSemanticDiagnostics = (sourceFile, cancellationToken) => {
        if (!sourceFile) {
            return [];
        }
        const [_serviceScript, sourceScript] = (0, utils_1.getServiceScript)(language, sourceFile.fileName);
        const actualSourceFile = sourceScript ? program.getSourceFile(sourceScript.id) : sourceFile;
        return (0, transform_1.transformAndFilterDiagnostics)(getSemanticDiagnostics(actualSourceFile, cancellationToken), language, sourceFile.fileName, program, true);
    };
    program.getGlobalDiagnostics = cancellationToken => {
        return getGlobalDiagnostics(cancellationToken)
            .map(d => (0, transform_1.transformDiagnostic)(language, d, program, true))
            .filter(utils_1.notEmpty);
    };
    // @ts-ignore
    program.getBindAndCheckDiagnostics = (sourceFile, cancellationToken) => {
        if (!sourceFile) {
            return [];
        }
        const [_serviceScript, sourceScript] = (0, utils_1.getServiceScript)(language, sourceFile.fileName);
        const actualSourceFile = sourceScript ? program.getSourceFile(sourceScript.id) : sourceFile;
        return (0, transform_1.transformAndFilterDiagnostics)(getBindAndCheckDiagnostics(actualSourceFile, cancellationToken), language, sourceFile.fileName, program, true);
    };
    // fix https://github.com/vuejs/language-tools/issues/4099 with `incremental`
    program.getSourceFileByPath = path => {
        const sourceFile = getSourceFileByPath(path);
        if (sourceFile) {
            (0, transform_1.fillSourceFileText)(language, sourceFile);
        }
        return sourceFile;
    };
}
exports.decorateProgram = decorateProgram;
//# sourceMappingURL=decorateProgram.js.map