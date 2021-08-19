import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GETAPPOINTMENT_BY_ID } from '../../utils/queries';
import './summary.css';

export default function AppointmentSummary(){
const {appointmentID} = useParams();
// const [date, setDate] = useState('');
// const [time, setTime] = useState("");
// const [services, setServices] = useState([]);
const [paymentID, setPaymentID] = useState("");

 const { loading, appointmentData} = useQuery (QUERY_GETAPPOINTMENT_BY_ID , {
     variables: {
        appointmentID:appointmentID
     }
 } );
 const [deleteAppointment, {error}] = useMutation(DELETE_APPOINTMENT);
 //Invoke stripe api. pass in public key
 const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

 const Cart = () => {
   const [state, dispatch] = useStoreContext();
   const [getCheckout, { data }] = useLazyQuery(QUERY_GETCHECKOUT_ID);
//if graphql returns a session,redirect strip to that session
   useEffect(() => {
      if (data) {
        stripePromise.then((res) => {
          res.redirectToCheckout({ sessionId: data.checkout.session });
        });
      }
    }, [data]);
    //watching the cart length in the state and the dispatch function
    useEffect(() => {
      async function getCart() {
        const cart = await idbPromise('cart', 'get');
        dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
      }

   if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
   const servicesIds = [];

   state.cart.forEach((item) => {
     for (let i = 0; i < item.serviceQuantity; i++) {
       servicesIds.push(item._id);
     }
   });

   getCheckout({
     variables: { appointmentID:appointmentID },
   });
 }
  
 //event handlers
 const handleServicePayment = (e)=>{
   setPaymentID({value: e.target.value});
   e.preventDefault();
 }

 const cancelAppointment = async (e)=>{
   e.preventDefault();
   const appointment = await deleteAppointment({
      appoitmentID: appointmentID
   });
   console.log(appointment);
}
    return(
        <div>
      
           <h1 className="appointmentHeader">Your appointment has been successfully created </h1>
           <div classname="summary "><h2 className='summary-form-input'>Appointment Summary</h2></div>
            <div className="date"><h3>Date:{appointmentData.date}</h3></div>
            <div className="time"><h3>Time:{appointmentData.time}</h3></div>
            <div classname="summary "><h3 className='summary-form-input'>List of Services</h3></div>
            <ul>{appointmentData.services.map(service => {return (<li>Service name:{service.name}, Service price:{service.name}</li>)})}</ul>
            <div className="totalPrice"><h3>Total Price: ${appointmentData.service.reduce((total, item) => {return total + item.price})}</h3></div>
            <div><button onClick={handleServicePayment} className='payButton' type="button">Pay Online</button></div>
            <div><button onClick={cancelAppointment} className='cancelButton' type="button">Cancel</button></div>
           </div>
          )
}

};
