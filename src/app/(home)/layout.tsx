import {isAuthenticated} from "@/lib/auth";
import HomeShell from "@/app/_layouts/home-shell";
export default async function RootLayout(props: { children: React.ReactNode }) {

  const auth_token = isAuthenticated();
  return <HomeShell isAuthenticated={auth_token}>{props.children}</HomeShell>;
}