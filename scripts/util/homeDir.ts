import { $ } from "zx"

$.verbose = false

export const HOME = (await $`echo ~`).toString().slice(0, -1)

export const replaceHomeDirWithTilde = (path: string) => {
    if (path.startsWith(HOME)) {
        return "~" + path.slice(HOME.length)
    }

    return path
}
