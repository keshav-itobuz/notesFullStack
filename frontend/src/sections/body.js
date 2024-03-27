import Card from '../components/card';
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Body({Loaded, setLoaded, editNote}) {

    const [dbData, setdbData] = useState(null);

    async function getData() {
        try {
            const response = await axios.get('http://localhost:5000/notes', {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjA0NWE2NWIyNjQ3ODY5NTc1OWRkNmIiLCJpYXQiOjE3MTE1NjEzMzMsImV4cCI6MTcxMTU4NTMzM30.wD5Rl8Dc898wSS1AzycPrCYmxIqQNF7Ekul9NLxSGTA"
                }
            })
            return setdbData(response.data);
        }
        catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getData();
    }, [Loaded])

    return (
        <div className="max-w-[60rem] w-full mx-auto">
            <h1 className="my-5 heading">Your Notes</h1>
            <div className="flex flex-wrap-reverse gap-5 justify-between">
                <div>
                    <div className="flex gap-5 menu">
                        <span className="all">ALL</span>
                        <span>PENDING</span>
                        <span>LATEST</span>
                        <span>HIDDEN</span>
                    </div>
                    <hr />
                </div>
                <div className="flex gap-3">
                    <button type="button" className="bg-red-500 text-white hover:bg-red-700 py-1 px-3 rounded-3xl">DELETE</button>
                    <button type="button" className="bg-blue-500 text-white hover:bg-blue-700 py-1 px-3 rounded-3xl">HIDE</button>
                </div>
            </div>
            <div className="flex flex-wrap justify-center justify-start-w-[1000px]  mt-10 max-w-[60rem] w-full gap-5 mx-auto">
                {
                    dbData?.data.map((item, index) => <Card {...item} key={index} setLoaded={setLoaded} editNote={editNote}/>)
                }
            </div>
        </div>
    )
}