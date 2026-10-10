import { Redirect } from "expo-router";
import { useAuth } from "@/context/AuthProvider";

export default function Index() {
  const { session } = useAuth();

  return <Redirect href={session ? "/tabs/home" : "/auth/welcome"} />;
}
