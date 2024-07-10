"use client";
import { useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const formRef = useRef(null);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/user/profile");
    }
  }, [status, router]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        signIn();
      }
    });
  };

  return (
    <div className="flex h-screen items-center">
      <form
        ref={formRef}
        className="flex w-full flex-col gap-4"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-center text-xl font-bold">Inscription</h1>
        <input
          type="text"
          name="email"
          placeholder="email"
          className="w-72 rounded-sm p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="w-72 rounded-sm p-2"
        />
        <input
          type="submit"
          value="S'inscrire"
          className="w-72 cursor-pointer rounded-sm bg-zinc-600 p-2 text-white hover:bg-zinc-700 active:bg-zinc-900"
        />
      </form>
    </div>
  );
};

export default SignupForm;
