/**
 * tokenの有効期限チェック関数
 * @param  {Int} exp  [tokenの有効期限]
 * @param  {Int} time [比較したい時間]
 * @return {Int} diff [差分]
 */
export default function checkExp(exp, time) {
    const diff = exp - time
    if (diff < 0)
        return diff
    else
        return 0
}