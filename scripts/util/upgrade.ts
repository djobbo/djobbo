import { $ } from "zx"

export const updatePackages = async () => {
    await $`sudo nala update`
}

export const upgradePackages = async () => {
    await updatePackages()
    await $`sudo nala upgrade`
}
