'use client'
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import useSWR, { Fetcher } from 'swr';

const ViewDetailBlog = ({ params }: { params: { id: string } }) => {
    const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
  if(!data){
    return <div>Loading...</div>
  }

  return (
    <div className='content'>
      <div className='my-3'>
        <Link href='/blogs'>Go back</Link>
      </div>
      <Card >
        <Card.Header>{data?.title}</Card.Header>
          <Card.Body>
            <Card.Text>{data?.content}</Card.Text>
          </Card.Body>
        <Card.Footer className='text-muted'>{data?.author}</Card.Footer>
      </Card>
    </div>    
  )
}
export default ViewDetailBlog;