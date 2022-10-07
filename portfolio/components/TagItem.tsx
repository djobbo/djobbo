type TagItemProps = {
    title: string
}

export const TagItem = ({ title }: TagItemProps) => {
    return (
        <span className="text-xs font-bold text-lightVar1 uppercase after:content-['•'] after:text-accent after:mx-2 after:my-0 last:after:content-['']">
            {title}
        </span>
    )
}
