import { useCurrentLesson, useStore } from "../zustand-store";

const Header = () => {
    const { currentModule, currentLesson } = useCurrentLesson();
    const isLoading = useStore(store => store.isLoading);

    if (isLoading) {
        return (
            <h1 className="text-2xl font-bold">Carregando...</h1>
        );
    }

    return (
        <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">{currentLesson?.title}</h1>
            <span className="text-sm text-zinc-50">Módulo "{currentModule?.title}"</span>
        </div>
    )
}

export default Header