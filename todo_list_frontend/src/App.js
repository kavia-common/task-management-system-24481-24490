import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import "./index.css";
import "./ocean.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";

/**
 * PUBLIC_INTERFACE
 * App
 * Main app replicating assets/index.html structure and behavior.
 * Features: add/edit/delete, toggle complete, filter all/active/completed, localStorage persistence.
 */
function App() {
  const STORAGE_KEY = "todo.tasks";
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    // Seed a few initial items similar to assets/app.js
    return [
      makeItem("Buy Benanas", 14),
      makeItem("Buy Apple", 11),
      makeItem("Buy Favorite Book", 9),
      makeItem("Pay Bill", 2),
      makeItem("Damdaran Milk", 10),
    ];
  });
  const [filter, setFilter] = useState(() => {
    try {
      const raw = localStorage.getItem("todo.filter");
      if (raw) return raw;
    } catch {}
    return "all";
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem("todo.filter", filter);
    } catch {}
  }, [filter]);

  const filteredItems = useMemo(() => {
    switch (filter) {
      case "active":
        return items.filter((i) => !i.completed);
      case "completed":
        return items.filter((i) => i.completed);
      default:
        return items;
    }
  }, [items, filter]);

  function getUuid() {
    // Prefer crypto.randomUUID if available in browsers
    if (typeof window !== "undefined" && window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    // Fallback
    return `id-${Math.random().toString(36).slice(2, 9)}`;
  }

  function makeItem(title, qty = 1) {
    return {
      id: getUuid(),
      title,
      qty,
      completed: false,
      createdAt: Date.now(),
    };
  }

  // PUBLIC_INTERFACE
  function addItem(title) {
    const newItem = makeItem(title, 1);
    setItems((prev) => [newItem, ...prev]);
  }

  // PUBLIC_INTERFACE
  function deleteItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  // PUBLIC_INTERFACE
  function toggleItem(id) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i))
    );
  }

  // PUBLIC_INTERFACE
  function editItem(id, newTitle) {
    const title = String(newTitle || "").trim();
    if (!title) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, title } : i)));
  }

  return (
    <div className="App" role="application" aria-label="Shopping List App">
      <TodoInput count={items.length} onAdd={addItem} />

      <main id="main" role="main">
        <section className="list-card" aria-labelledby="list-heading">
          <h2 id="list-heading" className="visually-hidden">
            Items
          </h2>

          <Filters active={filter} onChange={setFilter} />

          <TodoList
            items={filteredItems}
            onToggle={toggleItem}
            onDelete={deleteItem}
            onEdit={editItem}
          />
        </section>

        <aside className="artwork" aria-hidden="true">
          <img src="/assets/figma_image_5_2.png" alt="" />
        </aside>

        <div className="decor" aria-hidden="true">
          <div className="decor-panel">
            <div className="decor-mask">
              <div className="decor-ell decor-1"></div>
              <div className="decor-ell decor-2"></div>
              <div className="decor-ell decor-3"></div>
              <div className="decor-ell decor-4"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
