/**
 * ２次元連想配列の検索関数
 * @param {*} value [検索値]
 * @param {Array} arr [検索対象配列]
 * @param {*} prop [検索添字]
 * @return {Int} [添字 or -1]
 */
export default function getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
            return i;
        }
    }
    return -1;  // 検索できなかった場合
}