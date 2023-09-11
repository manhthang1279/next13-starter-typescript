import Link from "next/link";


export default function Home() {
  return (
    <div>
      <ul>
       <Link href={("/facebook")}>Facebook</Link>
        <li>
          <a href="/youtube">Youtube Page</a>
        </li>          
        <li>
         <a href="/tiktok">Tiktok Page</a>
        </li>
      </ul>
    </div>  
  )
}
