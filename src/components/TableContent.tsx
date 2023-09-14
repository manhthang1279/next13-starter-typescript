import Table from 'react-bootstrap/Table';
import { Button } from "react-bootstrap";
import { useState } from 'react';
import AddForm from './AddForm';
import EditForm from './EditForm';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from 'swr';


interface IProps {
  blogs: IBlog[]

}

function TableContent(props: IProps) {
  const {blogs}=props;
 
  const [blog, setBlog] = useState<IBlog | null>(null);
  const[showForm, setShowForm] = useState<boolean>(false);
  const[showEditForm, setShowEditForm] = useState<boolean>(false);

  const handleDeleteBlog = (id: number) => {
    if (confirm(`Do you want to delete blog id = ${id}`)) {
      fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },    
    }).then(res => res.json())
      .then(res => {
        if (res) {
          toast.success("Blog is deleted!");
          mutate('http://localhost:8000/blogs');
        }
      });   
    }
  }


  return (
    <>
    <div className='mb-3'
    style={{display:'flex', justifyContent:"space-between"}}
    >
      <h3>Table Blogs</h3>
      <Button onClick={() => setShowForm(true)}>Add New</Button>
    </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Author</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map(item => {
          return(
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>
                
                <Link className="btn btn-primary
 "               href={`/blogs/${item.id}`}>View</Link>
               
                <Button variant='warning' 
                className='mx-3'
                onClick={() => {
                  setBlog(item);
                  setShowEditForm(true)
                }}
                >Edit</Button>
                <Button variant='danger'
                onClick={() => handleDeleteBlog(item.id)}
                >Delete</Button>
                </td>
            </tr>
          )
        })}
      </tbody>      
    </Table>
    <AddForm 
      showForm={showForm}  
      setShowForm={setShowForm}
    />
    <EditForm 
      showEditForm={showEditForm}  
      setShowEditForm={setShowEditForm}
      blog={blog}
      setBlog={setBlog}
    />
    </>
  );
}

export default TableContent;