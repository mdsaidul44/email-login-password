import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config"; 
import { useRef, useState } from "react";
import { FaRegEye , FaRegEyeSlash  } from "react-icons/fa6";
import { Link } from "react-router-dom";


const Login = () => {
    const [LoginError ,setLoginError] = useState('')
    const [success ,setSuccess] = useState('')
    const [password ,setPassword] = useState(false)
    const emailRef =useRef(null)
    const handleLogin = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email,password,accepted)
        
        setSuccess('')
        setLoginError('')
        
        signInWithEmailAndPassword(auth,email,password)

        .then(result =>{
            console.log(result.user)
            if(result.user.emailVerified){
                setSuccess('user login in successfully')
            }else{
                alert('please verify your email address')
            }
        })
        .catch( error=>{
            setLoginError(error.message)
        })

        if(password.length < 6){
            setLoginError('please your password must be 6 character or longer')
            return;
        }else if(!/[a-z]/.test(password)){
            setLoginError('please must be provide a lower case')
            return
        }else if(!accepted){
            setLoginError('please accept our terms and condition')
            return
        }
 
    }

    const handleForgetPassword = () =>{
        const email = emailRef.current.value;
        if(!email){ 
            console.log('Please provide an email' ,emailRef.current.value)
            return;
        
        }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log('please write a valid email')
            return
        }

        // send validation email
        sendPasswordResetEmail(auth,email )

        .then(()=>{
            alert('Please check your email')
        })
        .catch(error =>{
            console.log(error)
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                            type="email" 
                            placeholder="email" 
                            name="email" 
                            ref={emailRef}
                            className="input input-bordered" 
                            required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={password ? "text" : "password"}  placeholder="password" name="password" className="input input-bordered" required />
                            <span onClick={()=> setPassword(!password)}>
                            {
                                password ? <FaRegEye/> : <FaRegEyeSlash/>
                            }
                            </span>
                            <span>
                                {

                                }
                            </span>
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                            <div>
                                {
                                    success && <p>{success}</p>
                                }
                                {
                                    LoginError && <p>{LoginError}</p>
                                }
                            </div>
                        </div>
                        <br />
                        <input type="checkbox" name="terms" id="terms" />
                        <br />
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                <p>New To This Website? please <Link className="hover:text-secondary" to='/register'>Register</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;