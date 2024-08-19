import { routes } from "../constants/routes";

export const isPublicRoute = (pathname: string) => {
  return Object.values(routes).some((route) => route.path === pathname && !route.protected);
};

export const isProtectedRoute = (pathname: string) => {
  return Object.values(routes).some((route) => route.path === pathname && route.protected);
};
