import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RxCross1 } from "react-icons/rx";
import { setShowTeambar } from "../features/teambarSlice";
import { useState } from "react";
import { updateMembers } from "../features/teambarDataSlice";
import { addTeams } from "../features/teamSlice";
import { LuLoader2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export const TeamBar = () => {
    const teambarShow = useAppSelector(state => state.teambar.showTeambar);
    const teambarData = useAppSelector(state => state.teambarData);
    const data = useAppSelector(state => state.team);
    const navigate = useNavigate();
    const { team, loading } = data;

    const [name, setName] = useState("");
    const [errors, setErrors] = useState("");
    const { members } = teambarData;

    const dispatch = useAppDispatch();

    const handleTeamSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.length === 0)
            return setErrors("Please fill team name");
        if (members.length < 2)
            return setErrors("Please choose atleast 2 users")
        dispatch(addTeams({ name, members }));
        navigate(`/team/${team._id}`);
    }

    const handleTeamReset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateMembers([]));
        setName("");
    }

    return (
        <aside className={`md:w-[320px] w-full z-10 h-screen text-slate-700 flex flex-col gap-y-5 ${teambarShow ? "right-0" : "-right-full"} transition-all fixed top-0 shadow-[0_0_20px] p-3 py-5 bg-white shadow-slate-300`}>
            <div className="flex justify-between items-center">
                <h2 className="text-xl">Create Teams</h2>
                <RxCross1 onClick={() => dispatch(setShowTeambar())} className="w-6 h-6 cursor-pointer" />
            </div>
            <form onSubmit={handleTeamSave} onReset={handleTeamReset} className="w-full flex flex-col gap-y-3">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Team Name" type="text" id="team-name" className="w-full focus:outline-none focus:border-blue-500 p-2 rounded-md border border-slate-300" />
                <h2 className="text-lg mt-2">Choose Team members</h2>
                <div className="w-full min-h-[calc(100vh-18rem)] flex flex-col gap-y-3">
                    {members.length !== 0
                        ? members.map(member => (
                            <div key={member._id} className="border border-slate-300 p-2 rounded-md">
                                <div className="flex items-center gap-x-2">
                                    <h2 className="font-bold">{member.first_name} {member.last_name} - </h2>
                                    <span className="text-sm">{member.domain}</span>
                                </div>
                                <div className="text-sm flex justify-between">
                                    <p>{member.email}</p>
                                    <p>{member.gender}</p>
                                </div>
                            </div>
                        ))
                        : <p className="text-sm">No Users selected yet</p>
                    }
                </div>
                <p className="text-center text-red-500">{errors}</p>
                <div className="flex items-center gap-x-2">
                    <button type="submit" className="p-2 w-full text-white bg-blue-500 rounded-md">
                        {loading === "Pending" ? <LuLoader2 className="h-[22px] w-[22px] text-white mx-auto animate-spin" /> : "Save"}
                    </button>
                    <button type="reset" className="p-2 w-full text-white bg-red-500 rounded-md">Reset</button>
                </div>
            </form>
        </aside>
    );
};
