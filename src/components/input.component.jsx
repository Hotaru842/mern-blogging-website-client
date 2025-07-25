import { useState } from 'react';

const InputBox = ({ name, type, id, value, placeholder, icon, disabled = false }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative w-[100%] mb-4">
      <input 
        name={name}
        type={type == "password" ? passwordVisible ? "text" : "password" : type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        disabled={disabled}
        className="input-box"
      />
      <i className={"fi " + icon + " input-icon"} />
      { type == "password" ?
      <i 
        className={"fi fi-br-eye" + (!passwordVisible ? "-crossed" : "") + " input-icon left-[auto] right-4 cursor-pointer"}
        onClick={() => setPasswordVisible(currentVal => !currentVal)} 
      /> : "" }
    </div>
  )
}

export default InputBox;