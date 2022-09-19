import spinners from "cli-spinners"
import ora, { Ora, Options } from "ora"

export const runWithSpinner = async <ReturnValue extends unknown>(
    run: () => ReturnValue,
    spinnerOptions: Options = {},
): Promise<ReturnValue> => {
    let spinner: Ora
    try {
        spinner = ora({
            spinner: spinners.dots,
            color: "yellow",
            ...spinnerOptions,
        }).start()

        const returnValue = await run()

        spinner.stop()

        return returnValue
    } catch (e) {
        spinner.stop()
        throw e
    }
}
