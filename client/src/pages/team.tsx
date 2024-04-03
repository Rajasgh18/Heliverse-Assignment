import { useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTeam } from "../features/teamSlice";
import NotFound from "./not-found";

const Team = () => {
    const { id } = useParams<string>();
    const team = useAppSelector(state => state.team.team);
    const { name, members } = team;
    const dispatch = useAppDispatch();

    if (!id) return <NotFound />

    useEffect(() => {
        dispatch(fetchTeam(id));
    }, []);

    return (
        <main className="h-screen w-full text-slate-700 flex justify-center items-center p-4">
            <section className=" md:w-1/2 sm:w-2/3 w-full flex flex-col gap-y-5 items-center rounded-md shadow-[0_0_20px] shadow-slate-300 p-5">
                <h2 className="text-2xl font-bold">Team Name: {name}</h2>
                <div className="w-full flex flex-wrap items-start justify-center gap-4 gap-y-3">
                    {members.length !== 0
                        ? members.map(member => (
                            <div key={member._id} className="border w-full border-slate-300 p-2 rounded-md">
                                <div className="flex items-center gap-x-2">
                                    <h2 className="font-bold">{member.first_name} {member.last_name} - </h2>
                                    <span className="text-sm">{member.domain}</span>
                                </div>
                                <div className="text-sm flex justify-between gap-x-5">
                                    <p>{member.email}</p>
                                    <p>{member.gender}</p>
                                </div>
                            </div>
                        ))
                        : <p>No members</p>
                    }
                </div>
                <Link to="/" className="p-3 text-blue-500 underline text-lg">Go back to home</Link>
            </section>
        </main>
    );
};

export default Team;