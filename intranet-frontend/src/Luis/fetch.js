export const fetch1 =  async () => {
    try {
        const response = await fetch('http://localhost:8000/api/login',{
            method: 'POST',
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: 'hola',
                password: 'hola'
            })
        })
        const data = await response.json()
        console.log(data);
        
    } catch (error) {
        console.log(error);
        
    }
}
