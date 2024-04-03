import { HiBars3BottomLeft } from "react-icons/hi2";
import { useAppDispatch } from "../app/hooks";
import { setShowSidebar } from "../features/sidebarSlice";
import { setShowTeambar } from "../features/teambarSlice";

interface NavbarProps {
    title: string;
};

export const Navbar = ({ title }: NavbarProps) => {
    const dispatch = useAppDispatch();
    return (
        <nav className="h-14 shadow-[0_0_20px] shadow-slate-300 bg-white flex justify-between items-center sm:px-10 px-5">
            <div className="flex items-center gap-4">
                <HiBars3BottomLeft onClick={() => dispatch(setShowSidebar())} className="h-7 w-7 text-slate-700 sm:hidden cursor-pointer" />
                <h2 className='text-2xl text-blue-500 font-bold'>{title}</h2>
            </div>
            <button onClick={() => dispatch(setShowTeambar())} className='p-2 px-3 bg-blue-500 hover:bg-opacity-90 rounded-md text-white'>Create a Team</button>
        </nav>
    );
};