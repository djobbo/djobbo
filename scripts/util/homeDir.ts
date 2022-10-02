export const HOME = process.env.HOME

export const replaceHomeDirWithTilde = (path: string) => {
    if (path.startsWith(HOME)) {
        return "~" + path.slice(HOME.length)
    }

    return path
}
