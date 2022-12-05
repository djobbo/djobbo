import { ProjectData } from "../data/projects"
import { ProjectItem } from "./ProjectItem"

type ProjectGroupProps = {
    projects: ProjectData[]
}

export const ProjectGroup = ({ projects }: ProjectGroupProps) => {
    return (
        <div
            className="grid gap-8 px-0 py-8"
            style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            }}
        >
            {projects.map((projectData) => (
                <ProjectItem key={projectData.name} projectData={projectData} />
            ))}
        </div>
    )
}
