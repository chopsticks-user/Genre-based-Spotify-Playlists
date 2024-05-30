import React, { useEffect, useState } from 'react'
import { UserProfile, getUserProfile } from '@/spotify';
import { Linking } from 'react-native';
import { Image } from '@/spotify/types';

export function useUserProfile(): UserProfile {
    const [country, setCountry] = useState('Country');
    const [displayName, setDisplayName] = useState('Display Name');
    const [email, setEmail] = useState('id@email.com');
    const [spotifyURL, setSpotifyURL] = useState('url.spotify.com');
    const [spotifyID, setSpotifyID] = useState('spotifyID');
    const [images, setImages] = useState(<Image[]>{});

    const fetchUserProfife = async () => {
        const userProfile: UserProfile = await getUserProfile();
        return userProfile;
    };

    fetchUserProfife()
        .then(userProfile => {
            setCountry(userProfile.country);
            setDisplayName(userProfile.display_name);
            setEmail(userProfile.email);
            setSpotifyURL(userProfile.external_urls.spotify);
            setSpotifyID(userProfile.id);
            setImages(userProfile.images);
        })
        .catch(err => console.error(err));

    return {
        country: country,
        display_name: displayName,
        email: email,
        external_urls: { spotify: spotifyURL },
        id: spotifyID,
        images: images,
    };
}