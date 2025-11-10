import React from "react";
import {
  CheckCircle,
  Circle,
  Trash2,
  ArrowUp,
  ArrowDown,
  Edit3,
  Save,
  X,
} from "lucide-react";

const TodoCard = ({ todos, setTodos }) => {
  const [editingId, setEditingId] = React.useState(null);
  const [editText, setEditText] = React.useState("");

  const handleToggleStatus = (todo) => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          completed: !todo.completed,
        };
      }
      return t;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (todo) => {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
  };

  const handleUp = (index) => {
    if (index === 0) return;
    const newTodos = [...todos];
    [newTodos[index - 1], newTodos[index]] = [
      newTodos[index],
      newTodos[index - 1],
    ];
    setTodos(newTodos);
  };

  const handleDown = (index) => {
    if (index === todos.length - 1) return;
    const newTodos = [...todos];
    [newTodos[index], newTodos[index + 1]] = [
      newTodos[index + 1],
      newTodos[index],
    ];
    setTodos(newTodos);
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.todo);
  };

  const saveEdit = (todoId) => {
    const updatedTodos = todos.map((t) =>
      t.id === todoId ? { ...t, todo: editText } : t
    );
    setTodos(updatedTodos);
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const getCardStyle = (completed) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    margin: "8px 0",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    border: completed ? "2px solid #10b981" : "2px solid #3b82f6",
    backgroundColor: completed ? "#f0fdf4" : "#f8fafc",
    transition: "all 0.3s ease",
    gap: "12px",
  });

  const getTextStyle = (completed) => ({
    flex: 1,
    fontSize: "16px",
    fontWeight: "500",
    color: completed ? "#64748b" : "#1e293b",
    textDecoration: completed ? "line-through" : "none",
    margin: "0 12px",
  });

  const buttonStyle = {
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const getStatusBadgeStyle = (completed) => ({
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: completed ? "#10b981" : "#f59e0b",
    color: "white",
    margin: "0 8px",
  });

  return (
    <div style={{ marginTop: "20px", padding: "0 16px" }}>
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          style={getCardStyle(todo.completed)}
          className="todo-card"
        >
          {/* Status and Move Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => handleToggleStatus(todo)}
              style={{
                ...buttonStyle,
                backgroundColor: "transparent",
                color: todo.completed ? "#10b981" : "#64748b",
              }}
              title={todo.completed ? "Mark as Pending" : "Mark as Completed"}
            >
              {todo.completed ? (
                <CheckCircle size={20} />
              ) : (
                <Circle size={20} />
              )}
            </button>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <button
                onClick={() => handleUp(index)}
                disabled={index === 0}
                style={{
                  ...buttonStyle,
                  backgroundColor: index === 0 ? "#e2e8f0" : "#3b82f6",
                  color: "white",
                  padding: "4px",
                }}
                title="Move Up"
              >
                <ArrowUp size={14} />
              </button>
              <button
                onClick={() => handleDown(index)}
                disabled={index === todos.length - 1}
                style={{
                  ...buttonStyle,
                  backgroundColor:
                    index === todos.length - 1 ? "#e2e8f0" : "#3b82f6",
                  color: "white",
                  padding: "4px",
                }}
                title="Move Down"
              >
                <ArrowDown size={14} />
              </button>
            </div>
          </div>

          {/* Todo Content */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              gap: "12px",
            }}
          >
            {editingId === todo.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  border: "2px solid #3b82f6",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
                autoFocus
              />
            ) : (
              <span style={getTextStyle(todo.completed)}>{todo.todo}</span>
            )}

            <span style={getStatusBadgeStyle(todo.completed)}>
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {editingId === todo.id ? (
              <>
                <button
                  onClick={() => saveEdit(todo.id)}
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#10b981",
                    color: "white",
                  }}
                  title="Save"
                >
                  <Save size={18} />
                </button>
                <button
                  onClick={cancelEdit}
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#ef4444",
                    color: "white",
                  }}
                  title="Cancel"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => startEditing(todo)}
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#f59e0b",
                    color: "white",
                  }}
                  title="Edit"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(todo)}
                  style={{
                    ...buttonStyle,
                    backgroundColor: "#ef4444",
                    color: "white",
                  }}
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      <style jsx>{`
        .todo-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        button:hover:not(:disabled) {
          transform: scale(1.05);
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default TodoCard;
