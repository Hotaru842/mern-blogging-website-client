import { Link } from "react-router-dom";
import InputBox from '../components/input.component';
import googleIcon from "../imgs/google.png"
import AnimationWrapper from "../common/page-animation";

const UserAuthForm = ({ type }) => {
  return (
    <AnimationWrapper keyValue={type}>
      <section className="flex items-center justify-center h-cover">
      <form className="w-[80%] max-w-[400px]">
        <h1 className="mb-24 text-4xl text-center capitalize font-gelasio">{type == "sign-in" ? "Welcome back" : "Join us today"}</h1>
        {type != "sign-in" ? 
          <InputBox 
            name="fullname"
            type="text"
            placeholder="Full Name"
            icon="fi-br-user"
          /> : ""}

          <InputBox 
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-br-envelope"
          />
          <InputBox 
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-br-key"
          />
          <button 
            className="btn-dark center mt-14"
            type="submit"  
          >
            {type.replace("-", " ")}
          </button>

          <div className="relative flex items-center w-full gap-2 my-10 font-bold text-black uppercase opacity-30">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button className="flex items-center justify-center btn-dark gap-4 w-[90%] center">
            <img src={googleIcon} alt="google icon" className="w-5" />
            continue with google
          </button>

          {
            type == "sign-in" ?
            <div className="flex items-center justify-center mt-6">
              <p className="text-xl text-center text-dark-grey">Don't have an account?</p>
              <Link to="/sign-up" className="ml-1 text-xl text-black underline">
                Join us today
              </Link>
            </div> : 
            <div className="flex items-center justify-center mt-6">
            <p className="text-xl text-center text-dark-grey">Already a member?</p>
            <Link to="/sign-in" className="ml-1 text-xl text-black underline">
              Sign In here
            </Link>
          </div>
          }
      </form>
    </section>
    </AnimationWrapper>
  )
}

export default UserAuthForm;