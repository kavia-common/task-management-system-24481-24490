import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

/**
 * PUBLIC_INTERFACE
 * TodoList
 * Renders the list wrapper and maps items to TodoItem components.
 */
function TodoList({ items, onToggle, onDelete, onEdit }) {
  return (
    <ul id="items" className="items" role="list">
      {items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      completed: PropTypes.bool,
      qty: PropTypes.number,
      createdAt: PropTypes.number,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TodoList;
