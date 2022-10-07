import { ProjectData } from "../data/projects"
import { TagGroup } from "./TagGroup"
import { Button } from "./Button"
import Image from "next/image"

type ProjectProps = {
    projectData: ProjectData
}

export const ProjectItem = ({
    projectData: {
        name,
        tags,
        description,
        link,
        code,
        images,
        featured = false,
    },
}: ProjectProps) => {
    return (
        <div
            className={`bg-dark p-4 rounded-[0.25rem] relative grid ${
                featured ? "border-2 border-solid border-accent" : ""
            }`}
            style={{
                gridTemplateRows: "1fr auto",
            }}
        >
            {featured && (
                <span className="absolute -top-4 left-4 bg-accent rounded-[0.25rem] px-2 py-0.5">
                    Currently working on
                </span>
            )}
            <div>
                {images.length > 0 && (
                    <a
                        className="block border-2 border-darkVar1 rounded-[0.25rem] overflow-hidden hover:border-accent"
                        href={link ?? code}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Image
                            className="object-cover object-center"
                            src={images[0].src}
                            alt={images[0].alt}
                            width={16}
                            height={9}
                            layout="responsive"
                            quality={100}
                            placeholder="empty"
                        />
                    </a>
                )}
                <p className="text-4xl font-bold mt-4 mb-2">{name}</p>
                <TagGroup tags={tags} />
                <p className="mt-2">{description}</p>
            </div>
            <div className="mt-5 flex items-center gap-3">
                {link && (
                    <Button href={link} style="Primary" external>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M17.001 20H6.00101C5.47057 20 4.96187 19.7893 4.58679 19.4142C4.21172 19.0391 4.00101 18.5304 4.00101 18V7C4.00101 6.46957 4.21172 5.96086 4.58679 5.58579C4.96187 5.21071 5.47057 5 6.00101 5H10.001V7H6.00101V18H17.001V14H19.001V18C19.001 18.5304 18.7903 19.0391 18.4152 19.4142C18.0401 19.7893 17.5314 20 17.001 20ZM11.701 13.707L10.291 12.293L16.584 6H13.001V4H20.001V11H18.001V7.415L11.701 13.707Z" />
                        </svg>
                        Visit
                    </Button>
                )}
                {code && (
                    <Button href={code} external>
                        Code
                    </Button>
                )}
            </div>
        </div>
    )
}
