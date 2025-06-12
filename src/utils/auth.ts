// lib/auth.ts

import { supabase } from './supabaseClient';  // Assuming supabaseClient is already set up

// Login function
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);  // Throw an error if login fails
  }

  return data;  // Return the user data if login succeeds
};

// Register function
export const register = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);  // Throw an error if signup fails
  }

  return data;  // Return user data if signup succeeds
};

// Logout function
export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);  // Throw an error if logout fails
  }

  return true;  // Return true if logout succeeds
};

// Get current user
export const getCurrentUser = () => {
  return supabase.auth.user();  // Get the currently logged-in user
};
