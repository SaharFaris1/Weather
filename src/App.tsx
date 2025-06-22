
import Router from './router/Router'

function App() {


  return (
    <>
    <Router/>
    </>
  )
}

export default App
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


// import Signup from './pages/Signup';
// import Signin from './pages/Signin';
// import Weather from './pages/Weather';


// function UnauthenticatedRoute({ children }: { children: ReactElement }) {
//   const token = localStorage.getItem('token');

//   if (token) return <Navigate to="/weather" replace />;

//   return children;
// }


// function ProtectedRoute({ children }: { children: ReactElement }) {
//   const token = localStorage.getItem('token');

//   if (!token) return <Navigate to="/signup" replace />;

//   return children;
// }

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* تسجيل */}
//         <Route
//           path="/signup"
//           element={
//             <UnauthenticatedRoute>
//               <Signup />
//             </UnauthenticatedRoute>
//           }
//         />

//         {/* تسجيل الدخول */}
//         <Route
//           path="/signin"
//           element={
//             <UnauthenticatedRoute>
//               <Signin />
//             </UnauthenticatedRoute>
//           }
//         />

//         {/* صفحة الطقس الآمنة */}
//         <Route
//           path="/weather"
//           element={
//             <ProtectedRoute>
//               <Weather/>
//             </ProtectedRoute>
//           }
//         />

//         {/* الصفحة الرئيسية */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Weather />
//             </ProtectedRoute>
//           }
//         />

//  
//         <Route path="*" element={<div>404 - Not Found</div>} />
//       </Routes>
//     </Router>
//   );
// }