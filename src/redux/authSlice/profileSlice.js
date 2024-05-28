import { createSlice } from '@reduxjs/toolkit';

// Function to get user profile from cookies
const getCookieUser = () => {
    try {
        const profileCookie = document.cookie
            .split('; ')
            .find(row => row.startsWith('zeework_user='));
        if (profileCookie) {
            return JSON.parse(profileCookie.split('=')[1]);
        }
    } catch (error) {
        console.error('Error parsing user data:', error);
    }
    return {}; // Return empty object if unable to parse or not found
};

// Initial state from cookies
const initialState = {
    profile: getCookieUser(),
    agency: {} // Assuming agency is another piece of data you want to manage
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        profileData: (state, action) => {
            const { profile } = action.payload;
            state.profile = profile;
            document.cookie = `zeework_user=${JSON.stringify(profile)}`;
        },
        agencyData: (state, action) => {
            const { agency } = action.payload;
            state.agency = agency;
        },
        clearProfileData: (state) => {
            state.profile = {};
            state.agency = {};
            document.cookie = 'zeework_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        },
    },
});

export const { profileData, clearProfileData, agencyData } = profileSlice.actions;

export default profileSlice.reducer;
