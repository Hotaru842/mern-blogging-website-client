import { useState } from "react";

const Notifications = () => {
  const [filter, setFilter] = useState("all");

  let filters = ["all", "like", "comment", "reply"];

  return (
    <div>
      <h1 className="max-md:hidden">Recent Notifications</h1>
      <div className="flex gap-6 my-8">
        {
          filters.map((filterName, i) => {
            return <button key={i} className={"py-2 " + (filter == filterName ? "btn-dark" : " btn-light")}>{filterName}</button>
          })
        }
      </div>
    </div>
  )
}

export default Notifications;