"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceMap = void 0;
const binarySearch_1 = require("./binarySearch");
const translateOffset_1 = require("./translateOffset");
class SourceMap {
    constructor(mappings, scriptId) {
        this.mappings = mappings;
        this.scriptId = scriptId;
    }
    getSourceOffsets(generatedOffset) {
        return this.findMatching(generatedOffset, 'generatedOffsets', 'sourceOffsets');
    }
    getGeneratedOffsets(sourceOffset) {
        return this.findMatching(sourceOffset, 'sourceOffsets', 'generatedOffsets');
    }
    *findMatching(offset, fromRange, toRange) {
        const memo = this.getMemoBasedOnRange(fromRange);
        if (memo.offsets.length === 0) {
            return;
        }
        const { low: start, high: end } = (0, binarySearch_1.binarySearch)(memo.offsets, offset);
        const skip = new Set();
        for (let i = start; i <= end; i++) {
            for (const mapping of memo.mappings[i]) {
                if (skip.has(mapping)) {
                    continue;
                }
                skip.add(mapping);
                const mapped = (0, translateOffset_1.translateOffset)(offset, mapping[fromRange], mapping[toRange], getLengths(mapping, fromRange), getLengths(mapping, toRange));
                if (mapped !== undefined) {
                    yield [mapped, mapping];
                }
            }
        }
    }
    getMemoBasedOnRange(fromRange) {
        return fromRange === 'sourceOffsets'
            ? this.sourceCodeOffsetsMemo ??= this.createMemo('sourceOffsets')
            : this.generatedCodeOffsetsMemo ??= this.createMemo('generatedOffsets');
    }
    createMemo(key) {
        const offsetsSet = new Set();
        const filteredMappings = this.scriptId && key === 'sourceOffsets'
            ? this.mappings.filter(mapping => mapping.source === this.scriptId)
            : this.mappings;
        for (const mapping of filteredMappings) {
            for (let i = 0; i < mapping[key].length; i++) {
                offsetsSet.add(mapping[key][i]);
                offsetsSet.add(mapping[key][i] + getLengths(mapping, key)[i]);
            }
        }
        const offsets = [...offsetsSet].sort((a, b) => a - b);
        const mappings = offsets.map(() => new Set());
        for (const mapping of filteredMappings) {
            for (let i = 0; i < mapping[key].length; i++) {
                const startIndex = (0, binarySearch_1.binarySearch)(offsets, mapping[key][i]).match;
                const endIndex = (0, binarySearch_1.binarySearch)(offsets, mapping[key][i] + getLengths(mapping, key)[i]).match;
                for (let i = startIndex; i <= endIndex; i++) {
                    mappings[i].add(mapping);
                }
            }
        }
        return { offsets, mappings };
    }
}
exports.SourceMap = SourceMap;
function getLengths(mapping, key) {
    return key == "sourceOffsets" ? mapping.lengths : mapping.generatedLengths ?? mapping.lengths;
}
//# sourceMappingURL=sourceMap.js.map