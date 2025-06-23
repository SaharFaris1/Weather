import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-500 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            
            <h3 className="text-lg font-bold mb-4">About OpenWeather</h3>
            <p className="text-sm text-gray-300">
              Our website provides live and accurate weather forecasts for all cities in Saudi Arabia, with real-time alerts for bad weather.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/forecast" className="hover:underline">Forecast</a></li>
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-300 mb-4">
              Do you have suggestions or technical issues? Feel free to contact us!
            </p>
            
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} All rights reserved | Designed by WeatherApp Team
        </div>
      </div>
    </footer>
  );
};

export default Footer;