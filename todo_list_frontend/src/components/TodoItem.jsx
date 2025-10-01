import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * PUBLIC_INTERFACE
 * TodoItem
 * A single todo item with quantity badge, editable label, and delete button.
 * Supports:
 * - Toggle complete via click/keyboard
 * - Edit-in-place on double click with Enter/Escape handling
 * - Accessible roles/labels
 */
function TodoItem({ item, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const commitEdit = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== item.title) {
      onEdit(item.id, trimmed);
    }
    setEditing(false);
    setDraft(item.title); // reset to latest value
  };

  const cancelEdit = () => {
    setEditing(false);
    setDraft(item.title);
  };

  return (
    <li className={`item${item.completed ? " completed" : ""}`} role="listitem">
      <div className="qty" aria-hidden="true">
        <span>{item.qty ?? 1}</span>
      </div>

      {!editing ? (
        <div
          className="label"
          role="button"
          tabIndex={0}
          title="Click to mark complete. Double-click to edit."
          aria-pressed={item.completed ? "true" : "false"}
          onClick={() => onToggle(item.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle(item.id);
            }
          }}
          onDoubleClick={() => setEditing(true)}
        >
          {item.title}
        </div>
      ) : (
        <input
          ref={inputRef}
          className="edit-input"
          style={{
            width: "100%",
            font: "inherit",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "6px",
            padding: "4px 6px",
          }}
          type="text"
          value={draft}
          aria-label={`Edit ${item.title}`}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitEdit();
            if (e.key === "Escape") cancelEdit();
          }}
        />
      )}

      <button
        type="button"
        className="delete-btn"
        aria-label={`Delete ${item.title}`}
        onClick={() => onDelete(item.id)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M7.05 6.343a1 1 0 0 0-1.414 1.414L9.172 11.293l-3.536 3.536a1 1 0 1 0 1.414 1.414l3.536-3.536 3.536 3.536a1 1 0 0 0 1.414-1.414l-3.536-3.536 3.536-3.536A1 1 0 1 0 16.242 6.343L12.707 9.88 9.172 6.343Z"></path>
        </svg>
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    qty: PropTypes.number,
    createdAt: PropTypes.number,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TodoItem;
