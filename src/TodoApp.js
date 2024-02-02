import React, { useState } from 'react';
import { Container, Form, Button, ListGroup, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedExpiresAt, setEditedExpiresAt] = useState('');

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditIndex(null);
    setEditedText('');
    setEditedTitle('');
    setEditedExpiresAt('');
  };

  const handleChange = (event) => {
    setTodoText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoText.trim() !== '') {
      const newTodo = {
        text: todoText,
        title: editedTitle,
        expiresAt: editedExpiresAt,
        completed: false,
        createdAt: new Date().toLocaleString(),
      };
      setTodos([...todos, newTodo]);
      setTodoText('');
      setEditedTitle('');
      setEditedExpiresAt('');
    }
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedText(todos[index].text);
    setEditedTitle(todos[index].title);
    setEditedExpiresAt(todos[index].expiresAt);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editedText.trim() !== '') {
      const updatedTodos = [...todos];
      updatedTodos[editIndex].text = editedText;
      updatedTodos[editIndex].title = editedTitle;
      updatedTodos[editIndex].expiresAt = editedExpiresAt;
      setTodos(updatedTodos);
      handleCloseEditModal();
    }
  };

  return (
    <Container>
      <h1 className="mt-4">Todo App</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title (Optional)"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicTodo">
          <Form.Label>Todo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Todo"
            value={todoText}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicExpiresAt">
          <Form.Label>Expires At</Form.Label>
          <Form.Control
            type="datetime-local"
            value={editedExpiresAt}
            onChange={(e) => setEditedExpiresAt(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Todo
        </Button>
      </Form>
      <ListGroup className="mt-4">
        {todos.map((todo, index) => (
          <ListGroup.Item
            key={index}
            className={todo.completed ? 'text-muted' : ''}
          >
            <div>{todo.text}</div>
            {todo.title && (
              <div>
                <small>Title: {todo.title}</small>
              </div>
            )}
            {todo.expiresAt && (
              <div>
                <small>Expires on: {todo.expiresAt}</small>
              </div>
            )}
            <br />
            <small>Created at: {todo.createdAt}</small>
            <Button
              variant="outline-info"
              className="ml-2"
              onClick={() => handleEdit(index)}
            >
              Edit
            </Button>
            <Button
              variant={todo.completed ? 'outline-warning' : 'outline-success'}
              className="ml-2"
              onClick={() => handleComplete(index)}
            >
              {todo.completed ? 'Undo' : 'Complete'}
            </Button>
            <Button
              variant="outline-danger"
              className="float-right"
              onClick={() => handleDelete(index)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicEditTodo">
            <Form.Label>Edit Todo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Edit Todo"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEditTitle">
            <Form.Label>Edit Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Edit Title (Optional)"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEditExpiresAt">
            <Form.Label>Edit Expires At</Form.Label>
            <Form.Control
              type="datetime-local"
              value={editedExpiresAt}
              onChange={(e) => setEditedExpiresAt(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TodoApp;
