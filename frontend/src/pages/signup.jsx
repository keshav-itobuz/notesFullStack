import { useRef} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SweetAlert, SweetAlertError } from "../components/sweetAlert";
export default function SignUp() {
    const getEmail = useRef();
    const getPassword = useRef()
    const getName = useRef();

    const navigator = useNavigate();
    async function registerUser(e) {
        e.preventDefault();
        try {
            await axios.post("https://notesfullstack-59iz.onrender.com/users/register", {
                name: getName.current.value,
                email: getEmail.current.value,
                password: getPassword.current.value
            });

            SweetAlert("successfully registered now kindly login!!!")
            navigator('/login');
        }
        catch (error) {
            const message = error.response.data.message
            SweetAlertError(message);
        }
    }
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form className=" max-w-full sm:max-w-[30rem] w-full h-full sm:h-2/3 flex flex-col justify-center gap-8 bg-slate-400 px-12 sm:rounded-lg">
                <h2 className="heading mx-auto mb-5">SignUp</h2>
                <input type="text" placeholder="name" ref={getName} className="border w-4/5 py-2 px-4 outline-none mx-auto" />
                <input type="email" placeholder="email" ref={getEmail} className="border w-4/5 py-2 px-4 outline-none mx-auto" />
                <input type="password" placeholder="password" ref={getPassword} className="border w-4/5 py-2 px-4 outline-none mx-auto" />
                <button onClick={registerUser} className='bg-blue-500 hover:bg-blue-700 text-white rounded-3xl py-2 w-1/3 mx-auto'>Register</button>
                <span className="mx-auto mt-8">Have an account? <Link to="/login" className=" text-violet-800 underline">Login Here</Link></span>
            </form>
        </div>
    )
}