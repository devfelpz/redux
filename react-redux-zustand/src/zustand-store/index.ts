import { create } from "zustand";
import { api } from "../lib/axios";


interface Course{
    id: number,
    title: string,
    modules: Array<{
        id:number,
        title:string,
        lessons: Array<{
            id:string,
            title:string,
            duration:string
        }>
    }>
}

interface PlayerState{
    course: Course | null,
    currentModuleIndex: number,
    currentLessonIndex: number,
    isLoading: boolean,

    play: (moduleAndLessonIndex:[number,number])=>void,
    next:()=>void,
    load: ()=> Promise<void>
}


export const useStore = create<PlayerState>((set, get)=>{

return {
    course: null, 
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: true,

    load: async()=>{
        set({isLoading: true})
        const response = await api.get('/courses/1')
        set({
            course: response.data,
            isLoading: false,
        })
        set({isLoading: false})
    },
    play: (moduleAndLessonIndex:[number, number])=> {
        const [moduleIndex, lessonIndex] = moduleAndLessonIndex;

        set({
            currentModuleIndex: moduleIndex,
            currentLessonIndex: lessonIndex,
        })

    },
    next:()=>{

            const {currentLessonIndex,currentModuleIndex,course} = get();
            const nextLessonIndex = currentLessonIndex + 1;
            const nextLesson = course?.modules[currentModuleIndex].lessons[nextLessonIndex];

            if(nextLesson){
                set({
                    currentLessonIndex: nextLessonIndex,
                })
            }else{
                const nextModuleIndex = currentModuleIndex + 1;
                const nextModule = course?.modules[nextModuleIndex];
                if(nextModule){
                    set({
                        currentModuleIndex: nextModuleIndex,
                        currentLessonIndex: 0,
                    })
                }
            }

    }
}
})

export const useCurrentLesson = ()=>{
    const currentModuleIndex = useStore(state => state.currentModuleIndex);
    const currentLessonIndex = useStore(state => state.currentLessonIndex);
    const course = useStore(state => state.course);

    const currentModule = course?.modules[currentModuleIndex];

    const currentLesson = currentModule?.lessons[currentLessonIndex];

    return { currentModule, currentLesson }
}
