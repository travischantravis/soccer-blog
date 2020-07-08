import React, { useState, useEffect } from "react";

const AddCommentForm = (props) => {
  const { match_id } = props;
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({
    player_id: "",
    rating: 0,
    comment: "",
    match_id: match_id,
  });

  useEffect(() => {
    fetch("/api/players/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPlayers(data);
        // Default value for dropdown list
        setForm({ player_id: data[0].p_id, match_id: match_id });
        // console.log(data);
      });
  }, []);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    // console.log(target.name);
    // console.log(target.value);
    setForm((prev) => {
      return { ...prev, [name]: target.value };
    });
    // console.log(form);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
    fetch("/api/match/" + match_id + "/add", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.msg);
      })
      .catch((err) => console.log(err));
  };

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
          type="number"
          name="rating"
          placeholder="Rating"
          id="inputRating"
          step="0.1"
          min="0"
          max="10"
          onChange={handleInputChange}
        ></input>
      </div>
      <div>
        <input
          type="text"
          name="comment"
          placeholder="Comment"
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
