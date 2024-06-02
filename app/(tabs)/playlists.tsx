import {
    StyleSheet, SafeAreaView
} from 'react-native'
import React from 'react'
import ScrollablePinCollection from '@/components/ScrollablePinCollection';
import { Playlist, SimpliedPlaylist } from '@/spotify';

const playlists: SimpliedPlaylist[] = [
    {
        collaborative: false,
        description: "",
        external_urls: {
            spotify: "https://open.spotify.com/playlist/1CBGDKGM8kekBPfAG5jPZt"
        },
        href: "https://api.spotify.com/v1/playlists/1CBGDKGM8kekBPfAG5jPZt",
        id: "1CBGDKGM8kekBPfAG5jPZt",
        images: [
            {
                url: "https://mosaic.scdn.co/640/ab67616d00001e022910c6fc625b0d5ae2eed26aab67616d00001e023dc315e27e5cae6e5519823aab67616d00001e02d272c37389bd3d9c20564166ab67616d00001e02d5bb99cd52da195675b2f2cd",
                height: 640,
                width: 640
            },
            {
                url: "https://mosaic.scdn.co/300/ab67616d00001e022910c6fc625b0d5ae2eed26aab67616d00001e023dc315e27e5cae6e5519823aab67616d00001e02d272c37389bd3d9c20564166ab67616d00001e02d5bb99cd52da195675b2f2cd",
                height: 300,
                width: 300
            },
            {
                url: "https://mosaic.scdn.co/60/ab67616d00001e022910c6fc625b0d5ae2eed26aab67616d00001e023dc315e27e5cae6e5519823aab67616d00001e02d272c37389bd3d9c20564166ab67616d00001e02d5bb99cd52da195675b2f2cd",
                height: 60,
                width: 60
            }
        ],
        name: "Starred",
        owner: {
            external_urls: {
                spotify: "https://open.spotify.com/user/smedjan"
            },
            href: "https://api.spotify.com/v1/users/smedjan",
            id: "smedjan",
            type: "user",
            uri: "spotify:user:smedjan",
            display_name: "smedjan"
        },
        public: true,
        snapshot_id: "AAAABEP1mXdhPfoWmcM1L+GcTwxB8crh",
        tracks: {
            href: "https://api.spotify.com/v1/playlists/1CBGDKGM8kekBPfAG5jPZt/tracks",
            total: 118
        },
        type: "playlist",
        uri: "spotify:playlist:1CBGDKGM8kekBPfAG5jPZt",
    },
    {
        collaborative: false,
        description: 'Exhilarating fusion of mainstream and indie dance tracks, from disco to trance, pop and house. Curated by <a href=\"https://twitter.com/nicktoumpelis\">Nick Toumpelis</a>. Photography by <a href=\"https://unsplash.com/chrisjoelcampbell\">Christopher Campbell</a>.',
        external_urls: {
            spotify: "https://open.spotify.com/playlist/3tT3E3Q4u5Xd0v3ySPLR1O"
        },
        href: "https://api.spotify.com/v1/playlists/3tT3E3Q4u5Xd0v3ySPLR1O",
        id: "3tT3E3Q4u5Xd0v3ySPLR1O",
        images: [
            {
                url: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da845e937351a83b4014b68a09a0",
                height: null,
                width: null
            }
        ],
        name: "dance fusion",
        owner: {
            external_urls: {
                spotify: "https://open.spotify.com/user/1226836970"
            },
            href: "https://api.spotify.com/v1/users/1226836970",
            id: "1226836970",
            type: "user",
            uri: "spotify:user:1226836970",
            display_name: "Nick Toumpelis"
        },
        public: true,
        snapshot_id: "AAANZ2Fz46uhFVXH4YhXqNWhkuMVUoJt",
        tracks: {
            href: "https://api.spotify.com/v1/playlists/3tT3E3Q4u5Xd0v3ySPLR1O/tracks",
            total: 90
        },
        type: "playlist",
        uri: "spotify:playlist:3tT3E3Q4u5Xd0v3ySPLR1O",
    }
];

export default function Playlists() {
    return (
        <SafeAreaView>
            <ScrollablePinCollection itemType='playlist' items={playlists} />
        </SafeAreaView>
    );
}