import { REGISTER_PET, ADD_USER, GET_PROFILE, GET_HISTORY } from './actions';

// Notice we moved the initial state object from our CarComponent to the reducer itself
// const initalState = {
//   cars: [
//     {
//       id: randomNum(),
//       make: 'Honda',
//       model: 'Civic',
//       year: '2008',
//       isRunning: false,
//     },
//     {
//       id: randomNum(),
//       make: 'Tesla',
//       model: 'Y',
//       year: '2021',
//       isRunning: false,
//     },
//   ]
// }

// Here we pass a default value of initalState if none is provided
// export default function reducer(state = initalState, action) {
//   switch (action.type) {
//     case ADD_CAR: {
//       const newCarId = state.cars[state.cars.length - 1].id + 1;
//       const newCar = { ...action.payload, id: newCarId };

//       return {
//         ...state,
//         cars: [...state.cars, newCar],
//       };
//     }
//     case START_CAR: {
//       const carIndex = state.cars.findIndex((car) => car.id === action.payload);
//       const updatedCar = { ...state.cars[carIndex], isRunning: true };

//       const carsCopy = [...state.cars];
//       carsCopy[carIndex] = updatedCar;

//       return {
//         ...state,
//         cars: carsCopy,
//       };
//     }
//     case STOP_CAR: {
//       const carIndex = state.cars.findIndex((car) => car.id === action.payload);
//       const updatedCar = { ...state.cars[carIndex], isRunning: false };

//       const carsCopy = [...state.cars];
//       carsCopy[carIndex] = updatedCar;

//       return {
//         ...state,
//         cars: carsCopy,
//       };
//     }
//     default: {
//       return state;
//     }
//   }
// }
