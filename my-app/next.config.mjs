import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  allowedDevOrigins: [
    'http://192.168.50.80:3000',
    '192.168.50.80'
  ],
};

export default withMDX(config);
