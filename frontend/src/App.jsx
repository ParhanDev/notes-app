import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  const baseUrl = "https://notes-app-api-wine.vercel.app";

  const fetchNotes = async () => {
    try {
      const res = await fetch(`${baseUrl}/notes`);

      const result = await res.json();

      setNotes(result.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (newtitle, newcontent) => {
    try {
      const res = await fetch(`${baseUrl}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newtitle, content: newcontent }),
      });

      const result = await res.json();

      if (res.ok) {
        setNotes([...notes, result.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateNote = async (id, updateTitle, updateContent) => {
    try {
      const res = await fetch(`${baseUrl}/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: updateTitle, content: updateContent }),
      });

      const result = await res.json();

      setNotes((prevNotes) => {
        return prevNotes.map((note) => {
          note.id === id ? result.data : note;
        });
      });

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseUrl}/notes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setNotes((notes) => notes.filter((note) => note.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getNoteById = (id) => {
    console.log(id);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col pt-24 items-center bg-[#FEF3E2]">
        <NoteForm onAddNote={addNote} />
        <NoteList
          notes={notes}
          onDelete={handleDelete}
          onUpdate={handleUpdateNote}
          onGetById={getNoteById}
        />
      </main>
    </>
  );
}

export default App;

// ================== Komponen ==================

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 flex justify-center bg-gradient-to-r from-orange-400 to-orange-600">
      <div className="flex justify-between px-5 py-5 container">
        <img src="/logo-fh-project.svg" alt="Logo" className="h-8" />
      </div>
    </nav>
  );
};

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNote(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <section className="container max-w-xl px-5 mb-8">
      {/* Box putih pembungkus form */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Add New Note
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="rounded-md outline-none border border-gray-300 p-3 focus:ring-2 focus:ring-[#4faff4]"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="resize-y min-h-20 rounded-md outline-none border border-gray-300 p-3 focus:ring-2 focus:ring-[#4faff4]"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold rounded-lg py-3 hover:opacity-90 transition"
          >
            Add note
          </button>
        </form>
      </div>
    </section>
  );
};

const NoteItem = ({ note, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titleEdit, setTitleEdit] = useState(note.title);
  const [contentEdit, setContentEdit] = useState(note.content);

  const handleCancel = () => {
    setTitleEdit(note.title);
    setContentEdit(note.content);
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg shadow-md bg-white w-[300px] p-5">
      {isEditing ? (
        <>
          <input
            value={titleEdit}
            type="text"
            className="w-full rounded-sm outline outline-gray-400 p-2"
            onChange={(e) => setTitleEdit(e.target.value)}
          />

          <textarea
            value={contentEdit}
            type="text"
            className="w-full rounded-sm outline outline-gray-400 p-2 mt-2"
            onChange={(e) => setContentEdit(e.target.value)}
          />
          <div className="mt-4 flex gap-2">
            <button
              className="bg-gray-500 text-white px-3 py-1 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => {
                onUpdate(note.id, titleEdit, contentEdit);
                setIsEditing(false);
              }}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="font-medium text-xl">{note.title}</p>
          <p className="text-sm text-gray-500">
            ~{showFormattedDate(note.created_at)}
          </p>
          <p className="mt-2">{note.content}</p>
          <div className="mt-4 flex gap-2">
            <button
              className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded hover:opacity-90 transition"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-gradient-to-r from-red-400 to-red-600 text-white px-3 py-1 rounded hover:opacity-90 transition"
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const NoteList = ({ notes, onUpdate, onDelete }) => {
  return (
    <section className="container py-8">
      <h2 className="inline-flex items-center gap-2 text-2xl font-medium mb-6">
        <img src="/note.svg" alt="note icon" className="w-8 h-8" />
        Notes
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        ) : (
          <h1>Data Kosong</h1>
        )}
      </div>
    </section>
  );
};

// helper
const showFormattedDate = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    weekday: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};
