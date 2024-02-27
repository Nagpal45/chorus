/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'images.pexels.com'
            },
            {
                protocol: 'https',
                hostname: 'image-cdn-ak.spotifycdn.com'
            },
            {
                protocol: 'https',
                hostname: 'image-cdn-fa.spotifycdn.com'
            },

        ]
    }
};

export default nextConfig;
