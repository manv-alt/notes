 import React from 'react';
import { 
  useEffect,
  useState,
 } from 'react';

import axios from 'axios';
import "./notes.css";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    category: "",
  });

  const [editNoteId, setEditNoteId] = useState(null);

  //fetch notes
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getnotes");
      setNotes(response.data); //array of notes
    }catch (error) {
      console.log("fetch error:", error);
      alert("could not load notes");
    }
  };
  useEffect(() => {
    fetchNotes();
  })
  //handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData, //spread operator
      [e.target.name]: e.target.value
    });
  };

  // add // update notes
  const handlesubmit = async (e) => {
    e.preventDefault();
    const { title, message, category } = formData;

    try{
      if(editNoteId) {
      //update
      await axios.put(
        `http://localhost:8000/api/updatenote/${editNoteId}`,
        {title,message,category}
      );
      alert("Note updated");
      setEditNoteId(null);
    }else{

    //add 
    await axios.post("http://localhost:8000/api/createnote",{
    title,
    message,
    category
    });
    alert("Note added");
  }
   setFormData({ title: "", message: "", category: ""}); //clear fields
   fetchNotes(); //refresh list
} catch (error) {
  console.log("save eror:", error);
  alert("Failed to save note");
}
  };

  //edit
  const handleEdit = (note) => {
    setFormData({
      title: note.title,
      message: note.message,
      category: note.category
    });
    setEditNoteId(note._id);
  };
  // delete

  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://localhost:8000/api/deletenote/${id}`);
      fetchNotes();
      alert("Note deleted");
    } catch (error) {
      console.log("Delete error:", error);
      alert("failed to delete note");   
    }
  };
   return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Notes App</h2>

      <form onSubmit={handlesubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button type="submit" style={{ padding: "8px 16px" }}>
          {editNoteId ? "Update Note" : "Add Note"}
        </button>
      </form>

      {/* Notes List */}
      <div>
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "6px",
                marginBottom: "15px"
              }}
            >
              <h3>{note.title}</h3>
              <p>{note.message}</p>
              <p>
                <strong>Category:</strong> {note.category}
              </p>

              <button
                onClick={() => handleEdit(note)}
                style={{ marginRight: "10px" }}
              >
                Edit
              </button>

              <button onClick={() => handleDelete(note._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notes;
