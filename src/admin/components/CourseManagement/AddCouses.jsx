import React, { useState } from "react";

const AddCourse = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, description });
    // Use axios to POST data to the API
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Course</h2>
      <input
        type="text"
        placeholder="Course Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button type="submit">Add Course</button>
    </form>
  );
};

export default AddCourse;
