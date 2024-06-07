"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchVolarAndDecorateLanguageService = void 0;
const decorateLanguageServiceModule = require("@volar/typescript/lib/node/decorateLanguageService");
const utils_1 = require("@volar/typescript/lib/node/utils");
const transform_1 = require("@volar/typescript/lib/node/transform");
const code_1 = require("./code");
let decorated = false;
function patchVolarAndDecorateLanguageService() {
    if (decorated)
        return;
    decorated = true;
    let { decorateLanguageService } = decorateLanguageServiceModule;
    // @ts-ignore TS2540
    decorateLanguageServiceModule.decorateLanguageService =
        (language, languageService, caseSensitiveFileNames) => {
            decorateLanguageService(language, languageService /* due to difference in TS version we need to cast to any */, caseSensitiveFileNames);
            decorateNgLanguageServiceExtensions(language, languageService);
        };
}
exports.patchVolarAndDecorateLanguageService = patchVolarAndDecorateLanguageService;
function decorateNgLanguageServiceExtensions(language, languageService) {
    languageService.webStormNgUpdateTranspiledTemplate = (_ts, fileName, transpiledCode, sourceCode, mappings) => {
        var _a;
        const sourceScript = language.scripts.get(fileName);
        const virtualCode = (_a = sourceScript === null || sourceScript === void 0 ? void 0 : sourceScript.generated) === null || _a === void 0 ? void 0 : _a.root;
        if (sourceScript && virtualCode instanceof code_1.AngularVirtualCode) {
            virtualCode.transpiledTemplateUpdated(transpiledCode, sourceCode, mappings);
        }
    };
}
