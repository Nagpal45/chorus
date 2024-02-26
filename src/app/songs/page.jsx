import { auth } from "@/lib/auth"
export default async function Songs(){
    const session = await auth();
    console.log(session);

    const fetchData = async () => {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
            headers:{
                'Authorization': `Bearer ${session.accessToken}`
            }
        })
        const data = await response.json();
        console.log(data);
    }
    await fetchData();

    return (
        <div className='container'>
            
        </div>
    )
}