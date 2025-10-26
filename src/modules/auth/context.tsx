'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { AuthError, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createSupabaseClient } from '@/supabase';
import { AuthFunctions, AuthState } from './types';
import AuthService from './service';

interface AuthContextValue extends AuthState, AuthFunctions { }

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        session: null,
        isInitialized: false,
        isAuthenticated: false,
    });
    const router = useRouter();

    const updateAuthState = useCallback(async (session: Session | null) => {
        if (session) {
            try {
                setState({
                    user: session.user,
                    session: session,
                    isInitialized: true,
                    isAuthenticated: true,
                });
            } catch (err) {
                // Employee not found by uid, this shouldn't happen but handle gracefully
                console.error('Error loading employee:', err);
                setState({
                    user: session.user,
                    session: session,
                    isInitialized: true,
                    isAuthenticated: true,
                });
            }
        } else {
            setState({
                user: null,
                session: null,
                isInitialized: true,
                isAuthenticated: false,
            });
        }
    }, [router]);

    useEffect(() => {
        // console.log("Auth State", state);
    }, [state]);

    useEffect(() => {

        // Get the initial session
        const initializeAuth = async () => {
            const supabase = await createSupabaseClient();
            // Listen for auth changes
            const { data: { subscription } } = supabase.auth.onAuthStateChange(
                async (event: AuthChangeEvent, session) => {
                    switch (event) {
                        case 'INITIAL_SESSION':
                            // console.log('INITIAL_SESSION');
                            // console.log('SESSION', session);
                            updateAuthState(session);
                            break;
                        case 'SIGNED_OUT':
                            // console.log('SIGNED_OUT');
                            // console.log('SESSION', session);
                            updateAuthState(session);
                            break;
                        case 'SIGNED_IN':
                            // console.log('SIGNED_IN');
                            // console.log('SESSION', session);
                            updateAuthState(session);
                            break;
                        default:
                            // console.log('DEFAULT AUTH STATE CHANGE');
                            // console.log('SESSION', session);
                            break;

                    }
                }
            );

            // Clean up
            return () => {
                subscription.unsubscribe();
            };
        };

        initializeAuth();
    }, [updateAuthState]);



    const authFunctions: AuthFunctions = {
        signIn: async (credentials) => {
            const { user, error } = await AuthService.signIn(credentials);
            router.refresh();
            return { user, error: error as AuthError };
        },
        signUp: async (credentials) => {
            const { user, error } = await AuthService.signUp(credentials);
            router.refresh();
            return { user, error: error as AuthError };
        },
        signOut: async () => {
            const { error } = await AuthService.signOut();
            router.refresh();
            return { error: error as AuthError };
        },
        signInWithGoogle: async () => {
            const { data, error } = await AuthService.signInWithGoogle();
            return { data, error: error as AuthError };
        },
    };

    const value: AuthContextValue = {
        ...state,
        ...authFunctions,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}