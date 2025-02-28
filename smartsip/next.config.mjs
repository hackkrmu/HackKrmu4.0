
/** @type {import('next').NextConfig} */
const nextConfig = {
  
  async rewrites() {
    return [
      {
        source: "/api/proxy",
        destination: "https://api.tonystark.in/api.php", 
      },
      {
        source: "/api/proxy2",
        destination: "https://api.tonystark.in/data.php", 
      },
      {
        source: "/api/proxy3",
        destination: "https://api.tonystark.in/notify.php",
      },
    ];
  },
};

export default nextConfig;