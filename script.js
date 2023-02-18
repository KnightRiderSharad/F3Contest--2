//Accessing all the items from HTML div element-
let Menu = document.querySelector('#Listitems');
let placedOrder = document.querySelector('#PlacedBurger');
let Preparation = document.querySelector('#prepare_Order');
let Payment = document.querySelector('#payment_Process');
let thankYouMsg = document.querySelector('#thankYou');

//1.This function will fetch the food items from an API and 
//  display them to the user when the screen loads.
function getmenu(){
    Menu.innerHTML = '';
    return new Promise((resolve, reject) => {

        console.log(`BurgerItems fetched`);
        fetch("https://free-food-menus-api-production.up.railway.app/burgers")
        .then((response)=> 
             response.json())
        .then((data)=>{

        let Item = [];
        for (const Items of data) {
            Item.push(Items.name);
            Menu.innerHTML += `<li style="text-align:center;">
                                   <img src=${Items.img} alt="photo"
                                        height="150"; 
                                        width="150"; 
                                        border="1px solid grey";
                                        box-sizing="border-box";
                                </li>
                                <br>                          
                                    Id: &nbsp ${Items.id}<br>
                                    Name: &nbsp ${Items.name}<br>
                                    Price: &nbsp ${Items.price}<br>
                                    Rate: &nbsp ${Items.rate}<br>
                                    Country: &nbsp ${Items.country}<br> <br> <br>`
                        
        }
        resolve(Item);
    })
  });
}

//2. This function will simulate the user placing an order. 
//   It will randomly select 3 burgers, add them to an object, and
//   then return a Promise that resolves after 2500 milliseconds.

function take_order(dataItem){
    placedOrder.innerHTML = '';

        //Selection of taking Random order of Burger- 
        let burgerIndex1 = Math.floor(Math.random()*57);
        let burgerIndex2 = burgerIndex1 + 1;
        let burgerIndex3 = burgerIndex1 + 2;

        //List of Burger Ordered-
        let order1 = dataItem[burgerIndex1];
        let order2 = dataItem[burgerIndex2];
        let order3 = dataItem[burgerIndex3];

        //Adding them to an Object-
        let obj = {
                    1: `${order1}`, 
                    2: `${order2}`, 
                    3: `${order3}`
                  };
        return new Promise((resolve,reject)=>{
        setTimeout(()=>{
                console.log(`
                             1: ${order1} 
                             2: ${order2} 
                             3: ${order3}
                          `);
                document.getElementById('all_Items').classList.add('hidden');
                placedOrder.innerHTML += `<div>1. First-Order: &nbsp Burger ${order1} </div> <div>2. Second-Order: &nbsp Burger ${order2} </div> <div>3. Third-Order: &nbsp Burger ${order3} <div> `
                resolve(obj)
            }, 2500)
        })
}

//3. This function will simulate the order preparation process.
//   It will return a Promise that resolves after 1500 milliseconds 
//   with the object {order_status:true, paid:false}.

function orderPrep(){
    Preparation.innerHTML = '';
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            Preparation.innerHTML += `Your order are placed. Please check into the Cart...!`
            console.log(`Order placed, Order is Preparing!!(resolves after 1500 milliseconds)`);
            console.log({
                         order_status:true, 
                         paid:false
                       });

                resolve({
                         order_status:true, 
                         paid:false
                       })

        },1500)
    })
}

//4. This function will simulate the payment process. 
//   It will return a Promise that resolves after 1000 milliseconds 
//   with the object {order_status:true, paid:true}.
function payOrder(){
    Payment.innerHTML = '';
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            Payment.innerHTML = `<h3 style="color:red";>Payment Processing...</h3><img src="https://www.aalpha.net/wp-content/uploads/2021/05/integrate-payment-gateway.gif" alt="Img" height=150px width=150px><br> 
                                    Payment Successful...Please take your Order!<img id="img1" src="https://media.tenor.com/yFi06hL-W1IAAAAM/smiley.gif" alt="Img" height=50px width=50px>`
            console.log(`Payment Info(resolves after 1000 milliseconds)`);
            console.log({
                         order_status:true, 
                         paid:true
                       });
                resolve({
                         order_status:true, 
                         paid:true
                       })
        },1000)
    })
}

//5. This function will display a thank you message once the payment is received. 
//   It will be called after the payOrder() function is resolved and the paid status is true.
function thankyouFnc(){
    thankYouMsg.innerHTML = '';

        return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(`Thank You, Visit again! (after the payOrder() Func is resolved and paidStatus:True)`); 
            thankYouMsg.innerHTML += `Your Order is delievered, Thank you for Ordering, Visit Again..! <br> <br> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQib7AyOeAgmY7nXm5DsCMB_HcyvM8q2Zk_0g&usqp=CAU" alt="Img">`
            resolve(alert('Your Order is delievered, Thank you for Ordering, Visit Again..!'))
        },1500)
    })
}
//Promise chaining-(allows you to chain together multiple asynchronous tasks in a specific order)-
getmenu()
    .then((data) => take_order(data))
    .then(() => orderPrep())
    .then(() => payOrder())
    .then(() => thankyouFnc())
    .catch((e) => {
        console.log("error", e);
      });