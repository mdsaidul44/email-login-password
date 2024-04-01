import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaRegEye , FaRegEyeSlash  } from "react-icons/fa6";
import { Link } from "react-router-dom";


 
const Register = () => {
    const [registerError, setRegisterError] = useState('')
    const [success ,setSuccess] = useState('')
    const [showPassword , setShowPassword] = useState(false)
    const handleRegisterSubmit = (e) =>{
        e.preventDefault()
        // console.log('hye there')
        const name = e.target.name.value;
        const email = e.target.email.value;
        const  password = e.target.password.value;
        const accepted =e.target.terms.checked;
        console.log(name,email,password,accepted)
           // reset error
           setRegisterError('')
           setSuccess('')

        // console.log(typeof password)
        if(password.length <6){
            setRegisterError(' Password should be at least 6 characters or longer')
            return;
        }else if(!/[A-Z]/.test(password)){
            setRegisterError('Your password should have at least one upper case characters')
            return
        }else if(!accepted){
            setRegisterError('Please accept our terms and condition')
            return
        }
  

        // create user
        createUserWithEmailAndPassword(auth,email,password)
        .then( result =>{
            console.log(result.user)
            setSuccess('User created successfully')

            // update email
            updateProfile(result.user ,{
                displayName : name,
                photoURL :  "https://example.com/jane-q-user/profile.jpg"
            })
            .then(()=>{
                console.log('profile updated')
            })
            .catch(()=>{

            })

            //  sed verification email
            sendEmailVerification(result.user)
            .then(()=>{
                alert('Please check your email and verify your account ')
            })
        })
        .catch(error=>{
            console.log(error)
            setRegisterError( error.message)
        })

    }
    return (
        <div className="">
           <div className="mx-auto w-1/3">
           <h1 className="text-2xl mb-8">Please Register</h1>
            <form onSubmit={handleRegisterSubmit}>
                <input className="mb-4 w-full py-2 px-4" type="text" placeholder="Your name" required name="name" id="" />
                <br />
                <input className="mb-4 w-full py-2 px-4" type="email" placeholder="Email address" required name="email" id="" />
                <br />
               <div className="border relative">
               <input 
                className=" w-full py-2 px-4" 
                type={ showPassword ? "text":"password" }
                placeholder="Password" 
                name="password" id="" />
                <span className="absolute top-3 right-3" onClick={()=> setShowPassword(!showPassword)}>
                    {
                        showPassword ? <FaRegEye/> : <FaRegEyeSlash/>
                    }
                </span>
               </div>
                <br />
                <div className="mb-4">
                <input type="checkbox" name="terms" id="terms" />
                <label className="ml-2 " htmlFor="terms">Accept Out <a href="">Terms And Condition</a></label>
                </div>
                <br />
                <input className="btn btn-secondary w-full" type="submit" value="Register" />
            </form>
            {
                registerError && <p className="text-red-800">{registerError}</p>
            }
            {
                success && <p className="text-green-700">{success}</p>
            }
            <p>Already Have An Account? Please <Link className="hover:text-secondary" to='/login'>Login</Link></p>
           </div>
        </div>
    );
};

export default Register;