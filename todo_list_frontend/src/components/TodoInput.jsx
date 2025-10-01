import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * PUBLIC_INTERFACE
 * TodoInput
 * Header input and controls to add a new task with title, showing total count.
 * Emits onAdd(title) when clicking Add or pressing Enter.
 */
function TodoInput({ count, onAdd }) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle("");
  };

  return (
    <header className="app-header" role="banner">
      <div className="header-inner">
        <h1 className="app-title" aria-label="Shopping List">
          Shoping List
        </h1>
        <nav className="controls" aria-label="Add item">
          <div className="title-count">
            <label htmlFor="item-title" className="visually-hidden">
              Title
            </label>
            <div className="title-field">
              <input
                id="item-title"
                name="item-title"
                type="text"
                placeholder="Title..."
                aria-label="Item title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAdd();
                }}
              />
            </div>
            <div
              className="count-field"
              aria-live="polite"
              aria-atomic="true"
              title="Total items"
            >
              <span id="item-count">{count}</span>
            </div>
          </div>
          <button
            id="add-btn"
            className="btn add-btn"
            type="button"
            aria-label="Add item"
            onClick={handleAdd}
          >
            Add
          </button>
        </nav>
      </div>
    </header>
  );
}

TodoInput.propTypes = {
  count: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default TodoInput;
