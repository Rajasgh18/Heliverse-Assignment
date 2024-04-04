import { useEffect } from 'react';
import NotFound from './not-found';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers } from '../features/userSlice';
import { User } from '../components/user';
import { Sidebar } from '../components/sidebar';
import { Navbar } from '../components/navbar';
import { TeamBar } from '../components/teambar';
import { Loader } from '../components/loader';
import { nextPage, prevPage, setPage } from '../features/pageSlice';

const Home = () => {
    const data = useAppSelector(state => state.user);
    const page = useAppSelector(state => state.page.page);
    const { members } = useAppSelector(state => state.teambarData);
    const { loading, users } = data;

    const dispatch = useAppDispatch();

    if (!page)
        return <NotFound />;

    useEffect(() => {
        dispatch(fetchUsers(page));

        if (page > data.totalPages)
            dispatch(setPage(1));
    }, [page, members]);

    return (
        <main className='flex'>
            <Sidebar page={page} />
            <TeamBar />
            <section className='flex flex-col w-full sm:p-0 p-2'>
                <Navbar title='Users' />
                {loading === 'Pending' && <Loader />}
                <section className='w-full min-h-[calc(100vh-3rem)] flex flex-col sm:p-4 gap-5'>
                    {loading === 'Rejected' && <p>Error occurred: Failed to fetch users</p>}
                    {loading === 'Fullfilled' && users.length === 0 && <p>User not found</p>}
                    <ul className='w-full h-full flex flex-wrap gap-8 justify-center p-8'>
                        {loading === 'Fullfilled' && users.map((user) => (
                            <User
                                key={user._id}
                                _id={user._id}
                                first_name={user.first_name}
                                last_name={user.last_name}
                                email={user.email}
                                domain={user.domain}
                                available={user.available}
                                avatar={user.avatar}
                                gender={user.gender}
                            />
                        ))}
                    </ul>
                    <div className='w-full flex justify-between items-center bg-white p-2 shadow-[0_0_20px] shadow-slate-300 rounded-md'>
                        <button onClick={() => dispatch(prevPage())} disabled={page === 1} className='p-2 px-3 rounded-md bg-blue-500 text-white'>Prev</button>
                        <span className='text-lg'>Page: {page} out of {data.totalPages}</span>
                        <button onClick={() => dispatch(nextPage())} disabled={page === data.totalPages} className='p-2 px-3 rounded-md bg-blue-500 text-white'>Next</button>
                    </div>
                </section>
            </section>
        </main >
    );
};

export default Home;