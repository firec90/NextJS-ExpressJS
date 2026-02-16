import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function layout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <NavBar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}