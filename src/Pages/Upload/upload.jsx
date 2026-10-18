import { useState } from "react";
const ROLE = "admin";

export default function App() {
  return (
    <div className="app">
      <style>{css}</style>
      <main className="page">{ROLE === "admin" ? <AdminUpload /> : <StudentPortal />}</main>
    </div>
  );
}


function AdminUpload() {
  const [studentId, setStudentId] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploads, setUploads] = useState([]);

  const choose = (f) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!studentId.trim() || !file) return;

    // TODO: send studentId, title and file to your backend here
    setUploads([{ id: Date.now(), studentId, title: title || "Result", preview }, ...uploads]);

    setStudentId("");
    setTitle("");
    setFile(null);
    setPreview("");
  };

  const remove = (id) => {
    // TODO: delete on backend
    setUploads(uploads.filter((u) => u.id !== id));
  };

  return (
    <>
      <h1>Upload result</h1>

      <form className="box" onSubmit={submit}>
        <label>
          Student ID
          <input value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="e.g. 2024-0153" />
        </label>

        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Final exam" />
        </label>

        <label className="drop">
          <input type="file" accept="image/*" hidden onChange={(e) => choose(e.target.files[0])} />
          {preview ? <img src={preview} alt="Preview" /> : <span>Click to choose an image</span>}
        </label>

        <button className="primary" type="submit" disabled={!studentId.trim() || !file}>
          Upload
        </button>
      </form>

      <h2>Recent uploads</h2>
      {uploads.length === 0 ? (
        <p className="muted">No uploads yet.</p>
      ) : (
        <ul className="items">
          {uploads.map((u) => (
            <li key={u.id}>
              <img src={u.preview} alt="" />
              <div>
                <strong>{u.title}</strong>
                <span className="muted">{u.studentId}</span>
              </div>
              <button className="ghost danger" onClick={() => remove(u.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}


function StudentPortal() {
 
  const results = []; 
  const [selected, setSelected] = useState(null);

  return (
    <>
      <h1>My results</h1>
      {/* TODO: show student name and ID */}
      <p className="muted">Student ID: —</p>

      {results.length === 0 ? (
        <p className="muted">No results have been published for you yet.</p>
      ) : (
        <div className="grid">
          {results.map((r) => (
            <button key={r.id} className="tile" onClick={() => setSelected(r)}>
              <img src={r.url} alt={r.title} />
              <strong>{r.title}</strong>
              <span className="muted">{r.date}</span>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="overlay" onClick={() => setSelected(null)}>
          <img src={selected.url} alt={selected.title} />
        </div>
      )}
    </>
  );
}

/* ---------------------------- Styles ----------------------------- */

const css = `
.app{--bg:#f7f7f5;--card:#fff;--text:#1b1d21;--muted:#6f7480;--line:#e3e4e8;--brand:#1f3a8a;--danger:#b42318;
  min-height:100vh;background:var(--bg);color:var(--text);font:16px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
@media (prefers-color-scheme:dark){.app{--bg:#0f1115;--card:#171a20;--text:#eceef2;--muted:#9aa0ac;--line:#2a2e36;--brand:#8aa2ff;--danger:#ff8a7a}}
.app *{box-sizing:border-box}
.page{max-width:600px;margin:0 auto;padding:28px 16px 48px;display:grid;gap:16px}
h1{font-size:1.5rem;margin:0}
h2{font-size:1.05rem;margin:12px 0 0}
.box{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:20px;display:grid;gap:14px}
label{display:grid;gap:6px;font-size:.9rem;color:var(--muted)}
input{font:inherit;color:var(--text);background:var(--bg);border:1px solid var(--line);border-radius:6px;padding:10px 12px;width:100%}
.app :focus-visible{outline:2px solid var(--brand);outline-offset:2px}
.drop{border:1.5px dashed var(--line);border-radius:8px;min-height:150px;display:grid;place-items:center;text-align:center;padding:10px;cursor:pointer}
.drop:hover{border-color:var(--brand)}
.drop img{max-width:100%;max-height:240px;border-radius:4px}
.primary{font:inherit;font-weight:600;background:var(--brand);color:#fff;border:0;border-radius:6px;padding:11px 16px;cursor:pointer}
@media (prefers-color-scheme:dark){.primary{color:#0f1115}}
.primary:disabled{opacity:.45;cursor:not-allowed}
.ghost{font:inherit;background:none;border:0;color:var(--muted);cursor:pointer;padding:4px}
.ghost.danger{color:var(--danger)}
.muted{color:var(--muted);font-size:.9rem;margin:0}
.items{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.items li{display:grid;grid-template-columns:52px 1fr auto;gap:12px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:8px}
.items li div{display:grid}
.items img{width:52px;height:52px;object-fit:cover;border-radius:6px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px}
.tile{font:inherit;color:inherit;text-align:left;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:8px;display:grid;gap:4px;cursor:pointer}
.tile img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:4px}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.82);display:grid;place-items:center;padding:20px;cursor:zoom-out;z-index:10}
.overlay img{max-width:100%;max-height:100%;border-radius:6px}
`;