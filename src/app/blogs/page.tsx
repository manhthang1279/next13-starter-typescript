'use client'
import TableContent from "@/components/TableContent";
import useSWR from "swr";

const Blogs = ()=> {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
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
    return(
        <div className="content">   
        <TableContent
        blogs={data?.sort((a: any, b: any) => b.id - a.id)}
        />
      </div> 
    )
}
export default Blogs;