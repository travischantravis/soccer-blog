import React, { useState, useEffect } from "react";

const AddCommentForm = () => {
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({ player_id: " ", rating: 0, comment: "" });

  useEffect(() => {
    fetch("/api/players/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayers(data);
        console.log(data);
      });
  }, []);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    // console.log(target.name);
    // console.log(target.value);
    setForm({ [name]: target.value });
    // console.log(form);
  };

  const handleSubmit = (e) => {};

  return (
    <form className="myform my-3" onSubmit={handleSubmit}>
      <div>
        <select name="player_id" onChange={handleInputChange}>
          {players &&
            players.map((d, i) => (
              <option key={i} value={d.p_id}>
                {d.name}
              </option>
            ))}
        </select>
      </div>
      <div>
        <input
          type="text"
          name="rating"
          placeholder="Rating"
          size="5"
          onChange={handleInputChange}
        ></input>
      </div>
      <div>
        <input
          type="text"
          name="comment"
          placeholder="Comments"
          onChange={handleInputChange}
        ></input>
      </div>
      <div>
        <input type="submit" text="Add" />
      </div>
    </form>
  );
};
export default AddCommentForm;
