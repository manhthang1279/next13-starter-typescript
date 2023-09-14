'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from "swr";

interface IProps {
    showForm: boolean;
    setShowForm: (value: boolean) => void;
}

function AddForm(props: IProps) {
  const {showForm, setShowForm} = props;

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = () => {
    if (!title) {
      toast.error("Title empty");
      return;
    }
    if (!author) {
      toast.error("Author empty");
      return;
    }
    if (!content) {
      toast.error("Content empty");
      return;
    }
    fetch(`http://localhost:8000/blogs`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, author, content})
    }).then(res => res.json())
      .then(res => {
        if (res) {
          toast.success("Create success!");
          handleClose();
          mutate('http://localhost:8000/blogs');
        }
      });   
  }

  const handleClose = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setShowForm(false);
  }

  return (
    <>
      <Modal
        show={showForm}
        onHide={() => setShowForm(false)}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New A Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" placeholder="..." 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={3} 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddForm;