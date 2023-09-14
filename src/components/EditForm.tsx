'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from "swr";

interface IProps {
    showEditForm: boolean;
    setShowEditForm: (value: boolean) => void;
    blog: IBlog | null;
    setBlog: (value: IBlog | null) => void;
}

function EditForm(props: IProps) {
  const {showEditForm, setShowEditForm, blog, setBlog} = props;

  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (blog && blog.id) {
        setId(blog.id);
        setTitle(blog.title);
        setAuthor(blog.author);
        setContent(blog.content);
    }
  },[blog])

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
    fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, author, content})
    }).then(res => res.json())
      .then(res => {
        if (res) {
          toast.warning("Updated!");
          handleClose();
          mutate('http://localhost:8000/blogs');
        }
      });   
  }

  const handleClose = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setBlog(null);
    setShowEditForm(false);
  }

  return (
    <>
      <Modal
        show={showEditForm}
        onHide={() => setShowEditForm(false)}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
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

export default EditForm;