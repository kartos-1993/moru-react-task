import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import PostDetail from "./pages/PostDetail"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/post/:postID",
    element: <PostDetail />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
      <App />
      </RouterProvider>
    </QueryClientProvider>
);
