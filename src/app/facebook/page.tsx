"use client"
import { useRouter } from "next/navigation";

const Facebook = ()=> {
    const router = useRouter();
    const handleBtn = () => {       
        router.push("/")
    }
    return(
        <div>
            Facebook
            <div>

            <button onClick={handleBtn}>Back Home</button>
            </div>
        </div>
    )
}
export default Facebook;