import { auth } from '@/lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function useAuth() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            // console.log("User: ", user);
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return unsub;
    }, []);

    return { user };
};
