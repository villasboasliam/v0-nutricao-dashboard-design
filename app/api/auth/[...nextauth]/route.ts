// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { cert } from "firebase-admin/app";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const serviceAccount = {
    type: "service_account",
    project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    universe_domain: "googleapis.com",
};

console.log("serviceAccount object:", serviceAccount);

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials: any) {
                const { email, password } = credentials;
                console.log("Tentativa de login para o email:", email);

                if (!email || !password) {
                    console.log("Email ou senha ausentes.");
                    return null;
                }

                try {
                    const ref = doc(db, "nutricionistas", email);
                    const snap = await getDoc(ref);

                    if (!snap.exists()) {
                        console.log("Usuário não encontrado para o email:", email);
                        return null;
                    }

                    const user = snap.data();
                    console.log("Dados do usuário encontrados:", user);

                    if (!user?.senha) {
                        console.log("Senha não definida para o usuário:", email);
                        return null;
                    }

                    if (user.senha !== password) {
                        console.log("Senha incorreta para o email:", email);
                        return null;
                    }

                    console.log("Login bem-sucedido para o email:", email);
                    return {
                        id: email,
                        name: user?.nome || email,
                        email: email,
                    };
                } catch (error: any) {
                    console.error("Erro durante a autorização:", error.message);
                    return null;
                }
            },
        }),
    ],
    adapter: FirestoreAdapter({
        credential: cert(serviceAccount as any),
    }),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) session.user.uid = token.uid;
            return session;
        },
    },
});

export { handler as GET, handler as POST };