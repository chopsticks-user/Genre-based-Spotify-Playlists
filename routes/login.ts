// import express, { Router } from 'express';
// import querystring from 'querystring';

// const clientID: string = '1c270aa60cd5497db5ed4f85ef876128';
// const redirectURI: string = 'http://localhost:8888/callback';

// export const router: Router = express.Router();

// const generateRandomString = (length: number): string =>
//     Math.random().toString(36).substring(2, length);

// router.get('/', (req, res) => {
//     res.redirect('https://accounts.spotify.com/authorize?' +
//         querystring.stringify({
//             response_type: 'code',
//             client_id: clientID,
//             scope: 'user-read-private user-read-email',
//             redirect_uri: redirectURI,
//             state: generateRandomString(16)
//         }));
// });

// router.post('/', (req, res) => {
//     console.log("POST /login");
// });
