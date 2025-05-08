declare module "@auth/firebase-adapter" {
    import { Adapter } from "next-auth/adapters";
    import { Firestore, Auth } from "firebase-admin/lib/auth";
    import { Credential } from "firebase-admin";
  
    export interface FirebaseAdapterConfig {
      credential?: Credential | null;
      db: Firestore;
      auth: Auth;
      usersCollection?: string;
      accountsCollection?: string;
      sessionsCollection?: string;
      verificationTokensCollection?: string;
    }
  
    export function FirebaseAdapter(config: FirebaseAdapterConfig): Adapter;
  }