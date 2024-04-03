import { LuLoader2 } from "react-icons/lu";

export const Loader = () => {
    return (
        <div className="absolute h-screen w-[calc(100vw-280px)] text-blue-600 flex justify-center items-center">
            <LuLoader2 className="h-8 w-8 animate-spin" />
        </div>
    )
}
