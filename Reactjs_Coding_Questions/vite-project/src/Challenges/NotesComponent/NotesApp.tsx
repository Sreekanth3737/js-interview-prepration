import React, { useCallback, useMemo, useReducer } from "react";
import styles from "./noteApp.module.scss";

interface Note {
  title: string;
  status: string;
  id?: string;
}
type State = {
  title: string;
  status: string;
  notes: Note[];
  filter: string;
  error: boolean;
};

type Action =
  | { type: "title"; value: string }
  | { type: "status"; value: string }
  | { type: "filter"; value: string }
  | { type: "add" };

const TABS = ["All", "Active", "Completed"] as const;

const INITIAL_STATE: State = {
  title: "",
  status: "",
  notes: [],
  filter: "All",
  error: false,
};

const ACTIONS = {
  title: "title",
  status: "status",
  filter: "filter",
  add: "add",
} as const;

const STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

const INPUT_FIELDS = [
  {
    type: "text",
    name: "title",
    actionType: ACTIONS.title,
    id: "title-input",
  },
  {
    type: "text",
    name: "status",
    actionType: ACTIONS.status,
    id: "status-input",
  },
] as const;

function toLowerCase(str: string): string {
  return str.trim().toLowerCase();
}
function isActive(str: string): boolean {
  return toLowerCase(str) === STATUS.ACTIVE;
}
function isCompleted(str: string): boolean {
  return toLowerCase(str) === STATUS.COMPLETED;
}

function notesReducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.title:
      return { ...state, title: action.value };
    case ACTIONS.status:
      return { ...state, status: action.value };
    case ACTIONS.filter:
      return { ...state, filter: action.value };
    case ACTIONS.add: {
      const title = state.title.trim();
      const status = state.status.trim();
      if (!title.trim()) return state;

      const note: Note = {
        id: `${Date.now()}-${Math.random()}`,
        title,
        status,
      };

      return {
        ...state,
        notes: [...state.notes, note],
        title: "",
        status: "",
      };
    }
    default:
      return state;
  }
}

const NotesApp = () => {
  const [state, dispatch] = useReducer(notesReducer, INITIAL_STATE);
  const { notes, filter } = state;

  const filteredNotes = useMemo(() => {
    const active = notes.filter((note) => isActive(note.status));
    const completed = notes.filter((note) => isCompleted(note.status));
    const others = notes.filter(
      (note) => !isActive(note.status) && !isCompleted(note.status)
    );
    if (filter === STATUS.ACTIVE) return active;
    if (filter === STATUS.COMPLETED) return completed;
    return [...active, ...completed, ...others];
  }, [notes, filter]);

  const handleAddNotes = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      e.preventDefault?.();
      dispatch({ type: ACTIONS.add });
    },
    []
  );

  return (
    <div className={styles.noteAppContainer}>
      <div className={styles.actions}>
        {INPUT_FIELDS.map((field) => (
          <input
            key={field.id}
            type={field.type}
            name={field.name}
            value={state[field.name] as string}
            onChange={(e) =>
              dispatch({
                type: field.actionType,
                value: e.target.value,
              })
            }
          />
        ))}
        <button onClick={handleAddNotes} type="button">
          Add Notes
        </button>
      </div>
      <div className="tabs">
        <ul className={styles.tabs}>
          {TABS.map((tab, i) => (
            <li
              className={filter === tab.toLowerCase() ? styles.active : ""}
              key={i}
              onClick={() =>
                dispatch({ type: ACTIONS.filter, value: tab.toLowerCase() })
              }
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <table className={styles.notesTable}>
          <thead>
            <tr>
              <th>title</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotes.map((note) => (
              <tr key={note.id}>
                <td>{note.title}</td>
                <td>{note.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotesApp;
