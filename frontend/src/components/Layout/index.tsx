import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "components/Menu";
import Spinner from "components/Spinner";
import TopBar from "components/TopBar";
import useLogin from "../../hooks/useLogin";

const Feed = lazy(() => import("pages/Feed"));
const Profile = lazy(() => import("pages/Profile"));

function Layout() {
  useLogin();
  return (
    <TopBar menu={<Menu />}>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="not-found" element={<div>not found</div>} />
        </Routes>
      </Suspense>
    </TopBar>
  );
}

export default Layout;
