import Login from "@/components/form/Login";
import DefaultLayout from "@/components/layouts/DefaultLayout";

export default function LoginPage() {
  return (
    <>
      <DefaultLayout />
      <main className="pt-20 max-w-xl mx-auto">
        <Login />
      </main>
    </>
  );
}
