import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { filterUsers, searchUsers } from "../features/userSlice";
import { RxCross1 } from "react-icons/rx";
import { setShowSidebar } from "../features/sidebarSlice";

type FilterUsersType = {
    domain: string,
    available: boolean,
    gender: string
};

interface SidebarProps {
    page: number;
};

export const Sidebar = ({ page }: SidebarProps) => {
    const [searchName, setSearchName] = useState<string>("");
    const [filters, setFilters] = useState<FilterUsersType>({ domain: "", available: true, gender: "" });
    const { domain, available, gender } = filters;
    const showSidebar = useAppSelector(state => state.sidebar.showSidebar);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(searchUsers({ name: searchName, page }));
    }, [searchName]);

    const handleChange = (type: string, value: string) => {
        setFilters({ ...filters, [type]: value });
    };

    return (
        <aside className={`w-[280px] h-screen text-slate-700 flex flex-col gap-4 sm:left-0 ${showSidebar ? "left-0" : "-left-full"} transition-all sm:sticky fixed top-0 shadow-[0_0_20px] p-3 py-5 bg-white shadow-slate-300`}>
            <RxCross1 onClick={() => dispatch(setShowSidebar())} className={`h-5 w-5 ml-auto sm:hidden cursor-pointer`} />
            <input type="text" placeholder="Search" value={searchName} onChange={e => setSearchName(e.target.value)} className="border border-slate-400 placeholder:text-slate-500 rounded-md p-2 px-3 focus:border-blue-500 focus:outline-none" />
            <div className="flex flex-col gap-y-2">
                <h4 className="text-xl">Filters</h4>
                <FilterParams onChange={value => handleChange('domain', value)} title="Domain" value={domain} />
                <FilterParams onChange={value => handleChange('gender', value)} title="Gender" value={gender} />
                <FilterParams onChange={value => handleChange('available', value)} title="Available" value={available.toString()} />
            </div>
            <button onClick={() => dispatch(filterUsers({ ...filters, page }))} className="p-2 bg-blue-500 hover:bg-opacity-90 text-white rounded-md">Apply Filters</button>
        </aside>
    );
};

interface FilterParamsType {
    title: string;
    value: string;
    onChange: (value: string) => void;
}

export const FilterParams = ({ title, value, onChange }: FilterParamsType) => {
    return (
        <div className="w-full p-2 rounded flex flex-col gap-x-2">
            <label htmlFor={title} className="peer-hover:-translate-y-2 transition-all">{title}</label>
            <input placeholder={title} type="text" onChange={e => onChange(e.target.value)} id={title} value={value} className="w-full border border-slate-400 p-1 px-3 rounded" />
        </div>
    )
}
