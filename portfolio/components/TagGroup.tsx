import { TagItem } from "./TagItem"
import { getChunks } from "../helpers/getChunks"

type TagGroupProps = {
    tags: string[]
}

export const TagGroup = ({ tags }: TagGroupProps) => {
    return (
        <div className="flex flex-wrap items-center gap-y-1">
            {tags.map((tag) => (
                <TagItem title={tag} key={tag} />
            ))}
        </div>
    )
}
