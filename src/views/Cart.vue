<template>
  <div >
    <b-container >

    <b-row>
      <div class="selectparent">
        
      <div class="selectdiv bg-primary" variant="primary">
      <div class="wrapper1">
      <div class="selectdiv2"><h2 class="selecth2">The Shop</h2></div>
      <select class="selectbutton" v-model="selectedCategory" v-on:change="categoryChange()">
        <option disabled value="">Produkt-categorie</option>
        <option value="food">Food</option>
        <option value="electro">Electro</option>
        <option value="clothing">Clothing</option>
        <option value="all">Show all</option>
      </select>
      </div>
        <div class="wrapper">
       <router-link to="/login" class="login"> <button class="selectbutton" id="nav">Login</button></router-link>
       <router-link to="/register" class="login">  <button class="selectbutton">Register </button></router-link>
      
       </div>
      </div>
      
    
    </div>
  </b-row>

<b-row class="shopcontainer" >
  <b-col>
  <div class="products">

    <div class="shopcard" v-for="product in products" :key="product.id" v-show="product.show">
       <b-card
    :title= 'product.name'
    :img-src= "require(`@/assets/product${product.id}.jpeg`)"
    img-alt="Image"
    tag="article"
    style="max-width: 20rem;"
    class="mb-200"
  >
    <b-card-text>
      title: {{product.name}}
      Price: {{product.price}}
    </b-card-text>

   
    <b-button v-if="!product.cart" @click="add(product)"  href="#" variant="primary">Add to Shopping Cart</b-button>
     <b-button v-if="product.cart" @click="add(product)" :disabled="product.cart" href="#" variant="warning">Product added to Shopping Cart </b-button>
  </b-card>
    </div>
  </div>
  
  </b-col>
  </b-row>
  

  <b-row>
    <b-col>
      <h2>Shopping Cart</h2>
    </b-col>
  </b-row>


  <b-row>
    <b-col>
     <b-table bordered  hover :items="cart" :fields="fields">
       
      
          <template slot="#" slot-scope="data" >
       {{ data.index+1}}
      </template>
        <template slot="price" slot-scope="data" >
       {{ data.item.price * data.item.quantity}}
      </template>
       <template slot="remove" slot-scope="data" >
        <b-button @click="remove(data.item.id)" variant="danger"  class="mr-2">
          X
        </b-button>
      </template>
      <template slot="quantity" slot-scope="data">
        <b-row>
          <b-col cols="5">
             <b-button :disabled="data.item.quantity <=1" variant="primary" @click="decrement(data.item.id)"  class="mr-2">
          -
             </b-button>
          </b-col>
          <b-col cols="2">
            <h4>{{data.item.quantity}}</h4>
          </b-col>
          <b-col cols="5">
              <b-button variant="primary" @click="increment(data.item.id)" class="mr-2">
            +
        </b-button>
          </b-col>
        </b-row>
       
        
      
      </template>

      <template slot="image" slot-scope="data">
          <b-img style="max-width: 4rem;" :src= "require(`@/assets/product${data.item.id}.jpeg`)" fluid alt="Responsive image"></b-img>
       
      </template>
      
     </b-table>

    </b-col>
  </b-row>
  <b-row v-if="cart.length > 0">
     <b-col></b-col>
     <b-col></b-col>
     <b-col></b-col>
     <b-col></b-col>
     <b-col><h3>Total</h3></b-col>
     <b-col><h3>Euro {{ total }}.00</h3></b-col>
  </b-row>
  <b-row v-if="cart.length > 0">
     <b-col>
       <b-button @click="clean" variant="info" block class="mr-2 mb-4">
          Clear
        </b-button>
     </b-col>
    <b-col></b-col>
     <b-col cols="4">The Shop</b-col>
    
     <b-col>
        
     </b-col>
     <b-col>
        <b-button    @click="buy" variant="success" block class="mr-2">
          Buy
        </b-button>
     </b-col>
  </b-row>
   <b-modal hide-header-close no-close-on-esc no-close-on-backdrop ref="modal-1" centered title="Purchase ComplPurcheted ">
     <template slot="modal-footer">
      
       <router-link  to="/login" class="login" v-if="loggedIn"><b-button class="login1 mt-1" variant="success" block > <span v-if="loggedIn">Pay</span>
    <span v-else>Login</span></b-button></router-link>
       <router-link  to="/login" class="login" v-else><b-button id="login2" v-bind:class="{login1:loggedIn}"   block><span v-if="loggedIn">Pay</span>
    <span v-else>Login</span> </b-button></router-link>
            
       <b-button class="mt-3" background-color="light-gray" block @click="clean">Close</b-button>

       
    </template>
    <p  class="my-4">Products:</p>
    <ul v-for="productFinal in ticket.products" :key="productFinal.id">
      <li >
       Product name: {{ productFinal.name}}
      </li>
       <li >
       Quantity: {{ productFinal.quantity }} 
      </li>
       <li >
       Price: {{ productFinal.price }}  
      </li>
       <li >
       Total: {{ productFinal.price * productFinal.quantity }}
      </li>
      <hr>
    </ul>
    <h2 class="">Total: Euro {{ticket.total}}.00</h2>
   
    
  </b-modal>
  
  </b-container>
   
  </div>
</template>

<script>

export default {
  name: 'Cart',
  props: {
    msg: String
  },
  data(){
    return {
      loggedIn: false,

      selectedCategory: "",
      ticket:{
        products: null,
        total:0
      },
      counter: 0,
      products: [
    {
        id:1,
        name:'Apple',
        price:1,
        cart:false,
        quantity:1,
        category: "food",
        show:true
    },
    {
        id:2,
        name:'Orange',
        price:2,
        cart:false,
        quantity:1,
        category: "food",
        show:true
    },
    {
        id:3,
        name:'Banana',
        price:3,
        cart:false,
        quantity:1,
        category: "food",
        show:true
    },
     {
        id:4,
        name:'Mixer',
        price:10,
        cart:false,
        quantity:1,
        category: "electro",
        show:true
    },
   {
        id:5,
        name:'Strijkijzer',
        price:20,
        cart:false,
        quantity:1,
        category: "electro",
        show:true
    },
    {
        id:6,
        name:'Koffiezet',
        price:30,
        cart:false,
        quantity:1,
        category: "electro",
        show:true
    },
    {
        id:7,
        name:'T-Shirt Rood',
        price:5,
        cart:false,
        quantity:1,
        category: "clothing",
        show:true
    },
    {
        id:8,
        name:'T-Shirt Geel',
        price:7,
        cart:false,
        quantity:1,
        category: "clothing",
        show:true
    },
  {
        id:9,
        name:'T-Shirt Zwart',
        price:15,
        cart:false,
        quantity:1,
        category: "clothing",
        show:true
    }
],
  cart:[],
  fields: ['#', 'remove', 'image','name','quantity','price']
    } // data return
  },
  methods: {
    categoryChange() {
        console.log(this.selectedCategory);
        this.products.forEach(element => {
          if (element.category == this.selectedCategory || this.selectedCategory == "all") element.show = true;
          else element.show = false;
        });
    },
     add(product){
       this.products[product.id-1].cart=true
       this.cart.push(product)
       this.counter++
     },
     clean(){
       this.cart=[];
      
       for (const key in this.products) {
          this.products[key].cart=false
          this.products[key].quantity=1
       }
       this.$refs['modal-1'].hide()
     },
    remove(id) {
      for (let index = 0; index < this.products.length; index++) {
       if (this.products[index].id == id) {
            this.products[index].cart=false
       } 
    }
    for (let index = 0; index < this.cart.length; index++) {
       if (this.cart[index].id == id) {
            this.cart.splice(index,1);
       } 
    }
    
},
buy(){
  this.ticket={
    products: this.cart,
    total: this.total
  }
  this.$refs['modal-1'].show()
  
}  ,
    increment(id){
      for (let index = 0; index < this.cart.length; index++) {
       if (this.cart[index].id == id) {
            this.cart[index].quantity++
       } 
    }
    },
    decrement(id){
      for (let index = 0; index < this.cart.length; index++) {
       if (this.cart[index].id == id) {
            this.cart[index].quantity--
       } 
    }
    }
  },
  computed: {
    total(){
      let t =0;
      for (let  index = 0; index < this.cart.length; index++) {
          t += this.cart[index].price*this.cart[index].quantity
      }
      return t
    }
  }
}
</script>

<style scoped>
.shopcontainer{
margin: 0 auto;
margin: 1vw 0vw 3vw 0vw;}

.products{ 
  padding: 0vw !important;
  display: flex;
  flex-wrap: wrap;
  justify-content:space-between; 
  }
.selectdiv{  
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;
  margin-left: -20vw;
  margin-right: auto;
  width: 105vw;
  padding: 2vw 0vw 2vw 0vw; 
 }
  
.selectdiv2{
top: 1.2vw;  
width: 50vw;
color: white;
text-align: left;
padding-left: 10vw;
}

.shopcard{ 
margin: 0vw auto; 
margin-bottom: 2vw;
}
.selectparent{ 
width: 100vw;
height: 15vw;
}

.selecth2{ 
font-size: 5vw;
}
.selectbutton{
  margin: 2px;
  height: 28px;
  border-radius: 3px;
}


.wrapper{
    display: flex !important;
    width: 200px;

}
.wrapper1{
  display: flex !important;
  flex-direction: column !important;
  justify-content: stretch !important;
  align-items: center;
}
.login1  {
  color: white !important;
  background-color: chartreuse;
}
#login2  {
  color: white !important;
  background-color: red;
}
.login {
  color: white !important;
  width: 100% !important;
}
</style>
 