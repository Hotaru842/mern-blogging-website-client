import InputBox from '../components/input.component';

const UserAuthForm = ({ type }) => {
  return (
    <section className="flex items-center justify-center h-cover">
      <form className="w-[80%] max-w-[400px]">
        <h1 className="mb-24 text-4xl text-center capitalize font-gelasio">{type == "sign-in" ? "Welcome back" : "Join us today"}</h1>
        {type != "sign-in" ? <InputBox /> : ""}
      </form>
    </section>
  )
}

export default UserAuthForm;