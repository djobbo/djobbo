import { useEffect, useState } from 'react'
import {keyframes} from '@emotion/css'

const dashArrayAnimation = keyframes`
    0% {
        stroke-dashoffset: 0;
    }
    100% {
        stroke-dashoffset: -100;
    }
`

export const TechStackArrow = () => {
    const [pageSize, setPageSize] = useState([0, 0])
    const [arrow, setArrow] = useState<[start:[x:number,y: number],end:[x:number,y:number]] | null>(null)
    const [showArrow, setShowArrow] = useState(false)

    const updateArrow = (techStackTitle: HTMLElement | null, viewStackLink: HTMLElement | null) => {
        setPageSize([document.documentElement.clientWidth, document.documentElement.clientHeight])

        if (!techStackTitle || !viewStackLink) {
            setArrow(null)
            return
        }

        setArrow([
            [
                viewStackLink.offsetLeft + viewStackLink.offsetWidth + 12,
                viewStackLink.offsetTop + (viewStackLink.offsetHeight / 2)
            ],
            [
                techStackTitle.offsetLeft - 16,
                techStackTitle.offsetTop + (techStackTitle.offsetHeight / 2)
            ]
        ])
    }

    useEffect(() => {
        const techStackTitle = document.getElementById('stack')
        const viewStackLink = document.getElementById('view-stack')

        const onWindowResize = () => updateArrow(techStackTitle, viewStackLink)
        const onViewStackLinkHover = () => setShowArrow(true)
        const onViewStackLinkLeave = () => setShowArrow(false)

        onWindowResize()
        window.addEventListener('resize', onWindowResize)
        viewStackLink?.addEventListener('mouseover', onViewStackLinkHover)
        viewStackLink?.addEventListener('mouseleave', onViewStackLinkLeave)

        return () => {
            window.removeEventListener('resize', onWindowResize)
            viewStackLink?.removeEventListener('mouseover', onViewStackLinkHover)
            viewStackLink?.removeEventListener('mouseleave', onViewStackLinkLeave)
        }

    }, [])

    if (!showArrow || !arrow) return null

    const anchorOffset = arrow[1][0] > arrow[0][0] ? (arrow[1][0] - arrow[0][0]) / 2.5 : 96
    const path = `M${arrow[0][0]} ${arrow[0][1]} C${arrow[0][0] + anchorOffset} ${arrow[0][1]} ${arrow[1][0] - anchorOffset} ${arrow[1][1]} ${arrow[1][0]} ${arrow[1][1]}`

    return (
        <svg
            className='absolute inset-0 fill-transparent stroke-secondary pointer-events-none overflow-visible'
            viewBox={`0 0 ${pageSize[0]} ${pageSize[1]}`}
        >
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="5"
                    markerHeight="5" 
                    refX="0"
                    refY="2.5"
                    orient="auto"
                >
                    <polygon className="fill-secondary stroke-transparent" points="0 0, 5 2.5, 0 5" />
                </marker>
            </defs>
            <path
                d={path}
                strokeWidth={2}
                strokeDasharray='5 5'
                marker-end="url(#arrowhead)"
                style={{
                    animation: `${dashArrayAnimation} 3s linear infinite`
                }}
            />
        </svg>
    )
}
