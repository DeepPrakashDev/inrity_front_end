/* old ===================================================================================
"use client";

import Cookies from "js-cookie";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get("_auth");
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    const login = (token) => {
        Cookies.set("_auth", token, { expires: 7 }); // store token 7 days
        setIsAuthenticated(true);
    };

    const logout = () => {
        Cookies.remove("_auth");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

==========================================================================================*/

"use client";

import Cookies from "js-cookie";
import { createContext, useState, useEffect, useContext, ReactNode } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext < AuthContextType | undefined > (undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get("_auth");
        setIsAuthenticated(!!token);
        setLoading(false);
    }, []);

    const login = (token: string) => {
        Cookies.set("_auth", token, { expires: 7 });
        setIsAuthenticated(true);
    };

    const logout = () => {
        Cookies.remove("_auth");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

