export const getChunks = <T>(arr: T[], n: number): T[][] =>
    arr.length > 0 ? [arr.slice(0, n), ...getChunks(arr.slice(n), n)] : []
