
import LoginForm from "./Components/LoginFrom";
import OrderForm from "./Components/OrderForm";

export default function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <LoginForm></LoginForm>
      <OrderForm></OrderForm>
    </div>
  );
}
