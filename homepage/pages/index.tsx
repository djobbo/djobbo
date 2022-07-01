import type { NextPage } from "next"
import { Header } from "../components/Header"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import type { FormEventHandler } from "react"
import { useQuery } from "react-query"
import Link from "next/link"
import { SearchIcon } from "@heroicons/react/solid"

const GOOGLE_SEARCH_URL = "https://www.google.com/search?q="

const getGoogleSearch = (search: string) => `${GOOGLE_SEARCH_URL}${search}`

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

const Home: NextPage = () => {
    const searchInputRef = useRef<HTMLInputElement>(null)
    const [search, setSearch] = useState("")
    const onSearch: FormEventHandler<HTMLFormElement> = (evt) => {
        evt.preventDefault()
        evt.stopPropagation()

        const url = getGoogleSearch(search)

        window.location.href = url
    }

    const debouncedSearch = useDebounce(search, 250)
    const { data: searchResults } = useQuery(
        ["search", debouncedSearch],
        () =>
            fetch(
                `/api/google-complete?search=${encodeURI(debouncedSearch)}`,
            ).then((res) => res.json() as Promise<string[]>),
        {
            enabled: !!debouncedSearch,
        },
    )

    console.log(searchResults)

    useEffect(() => {
        searchInputRef.current?.focus()
    }, [])

    return (
        <>
            <Header />
            <div className="flex flex-col items-center">
                <h1 className="py-6 text-3xl font-bold">
                    Welcome back, Djobbo
                </h1>
                <div className="relative w-full h-80 max-w-screen-xl overflow-hidden rounded-3xl z-0">
                    <Image
                        src="/aki.jpg"
                        layout="fill"
                        alt="landing-img"
                        objectFit="cover"
                        objectPosition="top"
                    />
                </div>
                <form
                    className="h-16 z-10 rounded-lg shadow-md w-full max-w-screen-md -mt-8 flex items-center bg-white"
                    onSubmit={onSearch}
                >
                    <input
                        type="search"
                        name="search"
                        ref={searchInputRef}
                        className="p-4 flex-1 rounded-l-lg h-full"
                        onChange={(evt) => setSearch(evt.target.value)}
                    />
                    <button
                        type="submit"
                        className="h-full flex items-center px-6 rounded-r-lg hover:bg-slate-200"
                    >
                        <SearchIcon className="w-6 h-6" />
                    </button>
                </form>
                <ul className="flex flex-wrap justify-center align-center w-full max-w-screen-md gap-2 text-center py-8">
                    {searchResults?.map((result) => (
                        <Link key={result} href={getGoogleSearch(result)}>
                            <a
                                dangerouslySetInnerHTML={{ __html: result }}
                                className="flex items-center px-2 py-1 bg-slate-700 text-white rounded-lg"
                            />
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Home
