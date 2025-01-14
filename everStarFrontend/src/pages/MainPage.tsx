// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { decrement, increment, setSalary } from "../store/salary/salarySlice";
// import { RootState } from "../store/rootReducer"; // Assuming this is where your RootState is defined
// import { Button } from "../components/atoms/Button";
// import { Header } from "../components/molecules/Header";

// const MainPage: React.FC = () => {
//   const 월급 = useSelector((state: RootState) => state.salary);
//   const [newSalary, setNewSalary] = useState<number>(월급);

//   const dispatch = useDispatch();

//   return (
//     <div className="p-4">
//       <Header />
//       <h1 className="mb-4 text-2xl font-bold">Home</h1>
//       <div className="mb-4">
//         <span className="text-lg">월급 : {월급}</span>
//       </div>
//       <div className="mb-4">
//         <Button
//           label="월급업"
//           onClick={() => {
//             dispatch(increment());
//           }}
//         />
//         <Button
//           label="월급다운"
//           onClick={() => {
//             dispatch(decrement());
//           }}
//         />
//       </div>
//       <div className="flex items-center mb-4">
//         <input
//           type="number"
//           className="p-2 mr-2 border border-gray-300"
//           value={newSalary}
//           onChange={(e) => setNewSalary(Number(e.target.value))}
//           placeholder="원하는 월급"
//         />
//         <Button
//           label="이만큼 받을래요"
//           onClick={() => {
//             dispatch(setSalary(newSalary));
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default MainPage;

const MainPage = () => {
  return <div className="text-greyscaleblack-20">MainPage2</div>;
};

export default MainPage;
