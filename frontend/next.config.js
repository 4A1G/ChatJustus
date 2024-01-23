/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public'
  })

const nextConfig = {
    output: 'export',
    basePath: '/ChatJustus'
}

module.exports = withPWA(nextConfig)
