<template>
 <div id="app">
        <h1> Login</h1>
       
            <div class="login">
                 <form @submit.prevent="login">
         
            <input type="text" v-model="username" placeholder="user Name"/><br><br>
            <input type="text" v-model="password" placeholder="Enter Name" /><br><br>       
            <button type="submit">Login</button>
            <button v-on:click="test">Your Details</button>
              <button v-on:click="logout">Logout</button>
            </form>

            </div>



        </div>



</template>
<script>
import axios from 'axios'
import authHeader from '../authHeader'
export default {
    name:'Login',
    data()
    {
        return {
            username:'',
            password:''
         
        };
    },
    methods:
    {
            async login(){

           



        var fd={'username':this.username,'password':this.password}
  
           await axios.post('http://localhost:5001/user/signin', fd, {
          }).then((res) => {
          if(res.data.token){
          localStorage.setItem('user', JSON.stringify(res.data));
               console.log(res);
                this.store=res.data;
                this.username='';
                this.password='';
                console.log(res.data);
          }
          else if (res.data==1)
          {
              alert("invalid password");
          }


        });



    },

    async test(){



   
           await axios.get('http://localhost:5001/user/details', {headers:authHeader()
          }).then((res) => {
          if(res){
          console.log(res);      
              
        
          }
          else if (res.data==1)
          {
              alert("invalid password");
          }

        });



    },
    
         logout() {
    localStorage.removeItem('user');
    alert('logout successful');
  
    }


    }
}
</script>
