import {rest} from 'msw'
import axios from 'axios'

export const handlers = rest.get(axios.get('http://localhost:5000/users/login',(req,res,ctx)=>{

       return res(
           ctx.status(200),
           ctx.json({
               mobile:7339467878,
               password:'Indhu@18'
           })

       )

    }))
