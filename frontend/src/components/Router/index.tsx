import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
// import Layout from "components/Layout";
import Spinner from "components/Spinner";

const SignUp = lazy(() => import("pages/SignUp"));
const SignIn = lazy(() => import("pages/SignIn"));
const Layout = lazy(() => import("components/Layout"));

function Router() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="not-found" element={<div>not found</div>} />
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
