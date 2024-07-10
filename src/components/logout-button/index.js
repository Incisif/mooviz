"use client"

import { signOut } from "next-auth/react";

const LogoutButton = () => {
    return (
        <div>
            <button onClick={()=> signOut({callbackUrl:"/"})} className="rounded bg-zinc-600 px-1  text-white duration-300 hover:bg-[var(--secondaryColor)] hover:text-zinc-800">Déconnexion</button>
        </div>
    );
}

export default LogoutButton;