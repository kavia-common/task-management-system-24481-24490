import React from "react";
import PropTypes from "prop-types";

/**
 * PUBLIC_INTERFACE
 * Filters
 * Provides filter buttons to choose between all/active/completed states.
 */
function Filters({ active, onChange }) {
  const filters = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];
  return (
    <div className="filters" role="region" aria-label="Filters">
      {filters.map((f) => {
        const isActive = active === f.key;
        return (
          <button
            key={f.key}
            className={`filter-btn${isActive ? " is-active" : ""}`}
            data-filter={f.key}
            aria-pressed={isActive ? "true" : "false"}
            type="button"
            onClick={() => onChange(f.key)}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}

Filters.propTypes = {
  active: PropTypes.oneOf(["all", "active", "completed"]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filters;
