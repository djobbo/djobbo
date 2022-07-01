import type { NextApiHandler } from "next"

const getGoogleComplete = (search: string) =>
    `https://www.google.com/complete/search?q=${search}&client=gws-wiz&xssi=t`

type SearchResult = [text: string]
type SearchResults = [SearchResult[]]

const handler: NextApiHandler = async (req, res) => {
    const { query } = req

    const { search } = query

    if (!search || typeof search !== "string") {
        return res.status(400).json({ error: "Missing search query" })
    }

    const url = getGoogleComplete(search)

    try {
        const searchResults = await fetch(url)
            .then((res) => res.text())
            .then((text) => (text.startsWith(")]}'") ? text.slice(5) : text))
            .then((text) => JSON.parse(text) as SearchResults)
            .then((json) => json[0].map((result) => result[0]))

        console.log(searchResults)

        res.status(200).json(searchResults)
    } catch (err) {
        console.error(err)
        return res
            .status(500)
            .json({ error: "Error fetching search results", err })
    }
}

export default handler
