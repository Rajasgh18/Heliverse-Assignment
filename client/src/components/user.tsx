import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { UserType } from "../features/userSlice";
import { LuMinus, LuPlus } from "react-icons/lu";
import { setTeambarData, updateMembers } from "../features/teambarDataSlice";
import { useEffect, useState } from "react";

export const User = ({
    _id,
    first_name,
    last_name,
    email,
    domain,
    available,
    avatar,
    gender
}: UserType) => {
    const { members } = useAppSelector(state => state.teambarData);
    const [isMemberOfTeam, setIsMemberOfTeam] = useState<boolean>(false);
    const [unique, setUnique] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsMemberOfTeam(members.filter(member => member._id === _id).length !== 0);
        const checkingUnique = members.filter(member => member.domain === domain);
        if (checkingUnique.length !== 0 || !available)
            setUnique(false);
        else setUnique(true);
    }, [unique]);

    const handleUpdateMember = () => {
        if (isMemberOfTeam)
            return dispatch(updateMembers(members.filter(member => member._id !== _id)));

        dispatch(updateMembers([...members, { _id, first_name, last_name, email, domain, available, avatar, gender }]));
    }

    return (
        <div className="w-[300px] h-[300px] relative flex flex-col gap-y-3 rounded-md p-4 bg-white shadow-lg shadow-slate-300 text-slate-700">
            <button
                disabled={!unique && !isMemberOfTeam}
                onClick={handleUpdateMember}
                className={`absolute left-0 top-0 m-2 ${isMemberOfTeam ? "bg-red-500" : unique ? "bg-blue-500" : "bg-slate-700 cursor-not-allowed"} text-white rounded p-1 cursor-pointer`}>
                {isMemberOfTeam ? <LuMinus className="w-4 h-4" /> : <LuPlus className="w-4 h-4" />}
            </button>
            <img src={avatar} alt={first_name} className="h-[100px] bg-slate-200 rounded p-4 w-full object-contain" />
            <div className="grid grid-cols-2 gap-y-2">
                <Text title="Name" value={`${first_name} ${last_name}`} />
                <Text title="Email" value={email} />
                <Text title="Domain" value={domain} />
                <Text title="Available" value={available.toString()} />
                <Text title="Gender" value={gender} />
            </div>
        </div>
    );
};

interface TextProps {
    title: string,
    value: string,
}
export const Text = ({ title, value }: TextProps) => {
    return (
        <p className="flex flex-col text-sm">
            <span className="font-bold text-slate-800">{title}</span>
            <span className="text-slate-600 truncate">{value}</span>
        </p>
    )
}
