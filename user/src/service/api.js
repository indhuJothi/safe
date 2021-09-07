import axios from "axios"


let baseUrl
export default baseUrl= axios.create({
    baseURL: 'http://localhost:5000'
})


export function userAuthenticated()
{
    return baseUrl.get('/users/userdetails',{
        headers:{
            "access-token":sessionStorage.getItem("authToken")
        }
    })
    
}


export function bookedSeats(busdetails){
    return baseUrl.post('/users/bookedseats',
        {busdetails},{
    
    headers:{
        "access-token":sessionStorage.getItem("authToken")
    }
})
}

export function updateHistory(bushistoryPushDetails){
    return baseUrl.post('/users/updatehistory',
    {
     
         busdata:bushistoryPushDetails
     }
    ,
    {
headers:{
    "access-token":sessionStorage.getItem("authToken")
}
})

}






