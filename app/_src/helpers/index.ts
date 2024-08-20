import { routes } from "../constants/routes";

export const isPublicRoute = (pathname: string) => {
  return Object.values(routes).some((route) => route.path === pathname && !route.protected);
};

export const isProtectedRoute = (pathname: string) => {
  const [, firstSegment] = pathname.split("/");
  return Object.values(routes).some((route) => route.path === `/${firstSegment}` && route.protected);
};
