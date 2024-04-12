import { STATUS_RESPONSE_SUCCESS } from "@/lib/utils/constants"

import Head from "next/head"

import { z } from "zod"
import { useState } from "react"

export default function Home() {

    const [usernameError, setUsernameError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const login = async (e) => {

        try {

            e.preventDefault()

            const data = {
                username: e.target.username.value ?? "",
                password: e.target.password.value ?? "",
            }

            const response = await fetch(`${process.env.api_url}item/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (result.status != STATUS_RESPONSE_SUCCESS) return

            // here, BLOQUE to save token as a cookie

        } catch (error) {

            console.log("Error al hacer la petición")

        }

    }

    const usernameValidation = (e) => {
        const schema = z.string().min(8, "Mínimo 8 caracteres").max(20, "Máximo 20 caracteres")
        setTimeout(() => {
            const { success, error } = schema.safeParse(e.target.value)
            setUsernameError(!success ? error.errors[0].message : "")
        }, 1000)
    }

    const passwordValidation = (e) => {
        const schema = z.string().min(8, "Mínimo 8 caracteres").max(20, "Máximo 20 caracteres")
        setTimeout(() => {
            const { success, error } = schema.safeParse(e.target.value)
            setPasswordError(!success ? error.errors[0].message : "")
        }, 1000);
    }

    return (
        <>
            <Head>
                <title>RSG Login | Welcome to login page</title>
                <meta name="description" content="RSG login page user" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="mdf-flex mdf-justify-center mdf-align-center" style={{ height: "100vh" }}>
                <div className="mdf-padding-xx mdf-border-content mdf-border-lg" style={{ width: "40%", minWidth: "300px", borderRadius: "10%" }}>
                    <h1 className="mdf-font-center mdf-marginB-xx">Login</h1>
                    <form onSubmit={login} className="mdf-paddingX-xx mdf-paddingT-xx">
                        <input type="text" name="username" onBlur={usernameValidation} minLength={8} maxLength={20} placeholder="Username" className="mdf-width-100 mdf-padding-sm mdf-border-content mdf-border-lg mdf-marginB-sm" required />
                        <p className="mdf-font-sm mdf-marginB-xx mdf-error">{usernameError}</p>
                        <input type="password" name="password" onBlur={passwordValidation} minLength={8} maxLength={20} placeholder="Password" className="mdf-width-100 mdf-padding-sm mdf-border-content mdf-border-lg mdf-marginB-sm" required />
                        <p className="mdf-font-sm mdf-marginB-xx mdf-error">{passwordError}</p>
                        <button type="submit" disabled={usernameError != "" || passwordError != ""} className="mdf-paddingY-sm mdf-paddingX-md mdf-font-600 mdf-marginX-auto mdf-marginY-xx">Enter</button>
                    </form>
                </div>
            </main>
        </>
    );
}
