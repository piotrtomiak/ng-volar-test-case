"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngularVirtualCode = void 0;
class AngularVirtualCode {
    get id() {
        return "main";
    }
    get languageId() {
        return "typescript";
    }
    constructor(fileName, ctx, useCaseSensitiveFileNames) {
        this.fileName = fileName;
        this.ctx = ctx;
        this.useCaseSensitiveFileNames = useCaseSensitiveFileNames;
        this.snapshot = createEmptySnapshot();
        this.mappings = [];
        this.associatedScriptMappings = new Map();
        this.transpiledTemplate = {
          snapshot: createScriptSnapshot(`import { Component } from '@angular/core';

@Component({
  selector: 'app-tcb-check',
  standalone: true,
  imports: [],
  templateUrl: "./tcb-check.component.html",
  styles: ""
})
export class TcbCheckComponent {
  title = 'My Awesome Signal Store';
  ddsdfeh: string;
  ddsdfffeh: string;

  checkType(arg: number): string {
    return arg.toString()
  }
}


/* Additional imports */



/* TCB for tcb-check.component.html */

function _tcb_0(this: TcbCheckComponent) {
"" + this.titled;
"" + this.checkType(this.title);
"" + this.createProperty;
}`),
          sourceCode: {
            [this.normalizeId(fileName)]: `import { Component } from '@angular/core';

@Component({
  selector: 'app-tcb-check',
  standalone: true,
  imports: [],
  templateUrl: "./tcb-check.component.html",
  styles: ""
})
export class TcbCheckComponent {
  title = 'My Awesome Signal Store';
  ddsdfeh: string;
  ddsdfffeh: string;

  checkType(arg: number): string {
    return arg.toString()
  }
}
`,
            [this.normalizeId(fileName.slice(0, fileName.length-2) + "html")]: `<div title="{{titled}}"></div>
{{checkType(title)}}
{{createProperty}}
`},
          mappings: [
            {
              "source": fileName.slice(0, fileName.length-2) + "html",
              "sourceOffsets": [
                14,
                33,
                42,
                43,
                48,
                54
              ],
              "generatedOffsets": [
                483,
                501,
                510,
                516,
                521,
                534
              ],
              "lengths": [
                6,
                9,
                1,
                5,
                1,
                14
              ],
              "generatedLengths": [
                6,
                9,
                1,
                5,
                1,
                14
              ]
            },
            {
              "source": fileName,
              "sourceOffsets": [
                0
              ],
              "generatedOffsets": [
                0
              ],
              "lengths": [
                360
              ],
              "generatedLengths": [
                360
              ]
            }
          ]  
        }
    }
    sourceFileUpdated(snapshot, _languageId) {
        this.associatedScriptMappings.clear();
        if (this.transpiledTemplate) {
            // Check if the template is still valid
            if (snapshot.getChangeRange(this.transpiledTemplate.snapshot) !== undefined
                || !sameContents(snapshot, this.transpiledTemplate.sourceCode[this.normalizeId(this.fileName)])) {
                this.transpiledTemplate = undefined;
            }
            else if (this.transpiledTemplate.mappings.find(mapping => {
                var _a, _b, _c;
                return !sameContents((_a = this.ctx.getAssociatedScript(mapping.source)) === null || _a === void 0 ? void 0 : _a.snapshot, (_c = (_b = this.transpiledTemplate) === null || _b === void 0 ? void 0 : _b.sourceCode) === null || _c === void 0 ? void 0 : _c[this.normalizeId(mapping.source)]);
            })) {
              // mockup differs from the source
              this.snapshot = snapshot;
              this.mappings = [{
                      generatedOffsets: [0],
                      sourceOffsets: [0],
                      lengths: [snapshot.getLength()],
                      data: {
                          format: true,
                          completion: true,
                          navigation: true,
                          semantic: true,
                          structure: true,
                          verification: true,
                      }
                  }];
              return this;
            }
        }
        if (this.transpiledTemplate) {
            this.snapshot = this.transpiledTemplate.snapshot;
            this.mappings = [];
            this.transpiledTemplate.mappings.forEach(mapping => {
                const mappingWithData = {
                    sourceOffsets: mapping.sourceOffsets,
                    lengths: mapping.lengths,
                    generatedOffsets: mapping.generatedOffsets,
                    generatedLengths: mapping.generatedLengths,
                    data: {
                        format: mapping.source === this.fileName,
                        completion: true,
                        navigation: true,
                        semantic: true,
                        structure: true,
                        verification: true,
                    }
                };
                if (this.normalizeId(mapping.source) === this.normalizeId(this.fileName)) {
                    this.mappings.push(mappingWithData);
                }
                else {
                    const associatedScript = this.ctx.getAssociatedScript(mapping.source);
                    const scriptId = associatedScript === null || associatedScript === void 0 ? void 0 : associatedScript.id;
                    if (scriptId) {
                        if (!this.associatedScriptMappings.has(scriptId)) {
                            this.associatedScriptMappings.set(scriptId, []);
                        }
                        this.associatedScriptMappings.get(scriptId).push(mappingWithData);
                    }
                }
            });
        }
        else {
            this.snapshot = snapshot;
            this.mappings = [{
                    generatedOffsets: [0],
                    sourceOffsets: [0],
                    lengths: [snapshot.getLength()],
                    data: {
                        format: true,
                        completion: true,
                        navigation: true,
                        semantic: true,
                        structure: true,
                        verification: true,
                    }
                }];
        }
        return this;
    }
    transpiledTemplateUpdated(transpiledCode, sourceCode, mappings) {
        if (transpiledCode) {
            this.transpiledTemplate = {
                mappings,
                sourceCode: Object.fromEntries(Object.entries(sourceCode).map(([key, value]) => {
                    return [this.normalizeId(key), value];
                })),
                snapshot: createScriptSnapshot(transpiledCode)
            };
        }
        else {
            this.transpiledTemplate = undefined;
        }
    }
    normalizeId(id) {
        return this.useCaseSensitiveFileNames ? id : id.toLowerCase();
    }
}
exports.AngularVirtualCode = AngularVirtualCode;
function fullDiffTextChangeRange(oldText, newText) {
    for (let start = 0; start < oldText.length && start < newText.length; start++) {
        if (oldText[start] !== newText[start]) {
            let end = oldText.length;
            for (let i = 0; i < oldText.length - start && i < newText.length - start; i++) {
                if (oldText[oldText.length - i - 1] !== newText[newText.length - i - 1]) {
                    break;
                }
                end--;
            }
            let length = end - start;
            let newLength = length + (newText.length - oldText.length);
            if (newLength < 0) {
                length -= newLength;
                newLength = 0;
            }
            return {
                span: { start, length },
                newLength,
            };
        }
    }
    return undefined;
}
function sameContents(snapshot, code) {
    return !!snapshot && !!code && snapshot.getText(0, snapshot.getLength()) === code;
}
function createScriptSnapshot(code) {
    const changeRanges = new Map();
    return {
        getText: (start, end) => (code !== null && code !== void 0 ? code : "").slice(start, end),
        getLength: () => (code !== null && code !== void 0 ? code : "").length,
        getChangeRange(oldSnapshot) {
            if (!changeRanges.has(oldSnapshot)) {
                changeRanges.set(oldSnapshot, undefined);
                const oldText = oldSnapshot.getText(0, oldSnapshot.getLength());
                const changeRange = fullDiffTextChangeRange(oldText, (code !== null && code !== void 0 ? code : ""));
                if (changeRange) {
                    changeRanges.set(oldSnapshot, changeRange);
                }
            }
            return changeRanges.get(oldSnapshot);
        },
    };
}
function createEmptySnapshot() {
    return {
        getText: (start, end) => "",
        getLength: () => 0,
        getChangeRange(oldSnapshot) {
            return {
                span: {
                    start: 0,
                    length: oldSnapshot.getLength(),
                },
                newLength: 0
            };
        },
    };
}
