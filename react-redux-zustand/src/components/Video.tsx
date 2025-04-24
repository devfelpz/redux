import { Loader } from "lucide-react";
import ReactPlayer from "react-player";

import { useCurrentLesson, useStore } from "../zustand-store";

const Video = () => {

    const { currentLesson } = useCurrentLesson();



    const isLoading = useStore(store => store.isLoading)
    const next = useStore(store => store.next)

    if (!currentLesson) return null;

    function handlePlayNext() {
        next()
    }


    return (
        <div className="w-full bg-zinc-950 aspect-video">
            {isLoading ? (
                <div className="flex h-full items-center justify-center">
                    <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
                </div>
            ) :
                <ReactPlayer
                    width="100%"
                    height="100%"
                    controls
                    url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
                    onEnded={handlePlayNext}
                    playing />
            }

        </div>
    )
}

export default Video