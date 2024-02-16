import Signup from "@/components/form/Singup";
import DefaultLayout from "@/components/layouts/DefaultLayout";

export default function SignUpPage() {
  return (
    <>
      <DefaultLayout />
      <main className="pt-20 max-w-xl mx-auto">
        <Signup />
      </main>
    </>
  );
}
