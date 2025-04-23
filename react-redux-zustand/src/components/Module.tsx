import { ChevronDown } from 'lucide-react'
import { Collapsible } from 'radix-ui'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../store'
import { play } from '../store/slices/player'
import Leasson from './Lesson'

interface ModuleProps {
    moduleIndex: number,
    title: string,
    amountOfLessons: number,
}

const Module = ({ moduleIndex, title, amountOfLessons }: ModuleProps) => {

    const dispatch = useDispatch()
    const lessons = useAppSelector(state => {
        return state.player.course.modules[moduleIndex].lessons
    })
    const { currentModuleIndex, currentLessonIndex } = useAppSelector(state => {

        const { currentModuleIndex, currentLessonIndex } = state.player

        return { currentModuleIndex, currentLessonIndex }
    })
    return (
        <Collapsible.Root className='group' defaultOpen={moduleIndex === 0}>
            <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-900 text-xs">{moduleIndex + 1}</div>
                <div className="flex flex-col gap-1 text-left">
                    <strong className="text-sm">{title}</strong>
                    <span className="text-xm text-zinc-400">{amountOfLessons} aulas</span>
                </div>
                <ChevronDown className="w-4 h-4 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
            </Collapsible.Trigger>
            <Collapsible.Content>
                <nav className="relative flex flex-col gap-4 p-6">
                    {lessons.map((lesson, lessonIndex) => {
                        const isCurrent = currentModuleIndex === moduleIndex && currentLessonIndex === lessonIndex
                        return (
                            <Leasson
                                key={lesson.id}
                                title={lesson.title}
                                duration={lesson.duration}
                                onPlay={() => dispatch(play([moduleIndex, lessonIndex]))}
                                isCurrent={isCurrent}
                            />
                        )
                    })}
                </nav>

            </Collapsible.Content>

        </Collapsible.Root>
    )
}

export default Module