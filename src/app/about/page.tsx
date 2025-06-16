import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are passionate about bringing you the best products at amazing prices. 
            Our mission is to make online shopping simple, safe, and enjoyable for everyone.
          </p>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Our Story */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, our e-commerce platform was born from a simple idea: 
              to create a seamless shopping experience that connects customers with 
              quality products from around the world.
            </p>
            <p className="text-gray-600 mb-4">
              We started as a small team of tech enthusiasts who believed that 
              online shopping should be intuitive, secure, and accessible to everyone. 
              Today, we continue to grow while maintaining our core values of 
              excellence and customer satisfaction.
            </p>
            <p className="text-gray-600">
              Every product on our platform is carefully selected to meet our high 
              standards of quality and value, ensuring that our customers always 
              get the best for their money.
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Quality First</h3>
                  <p className="text-gray-600">We curate only the best products that meet our strict quality standards.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Customer Satisfaction</h3>
                  <p className="text-gray-600">Your satisfaction is our priority. We're here to help every step of the way.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Innovation</h3>
                  <p className="text-gray-600">We continuously improve our platform to provide the best shopping experience.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Accessibility</h3>
                  <p className="text-gray-600">Making online shopping accessible and enjoyable for everyone, everywhere.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Products Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">99%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're a diverse team of developers, designers, and customer service specialists 
            working together to create the best shopping experience for you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">John Doe</h3>
              <p className="text-gray-600 text-sm">CEO & Founder</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                JS
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Jane Smith</h3>
              <p className="text-gray-600 text-sm">Head of Product</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-20 h-20 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                MB
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Mike Brown</h3>
              <p className="text-gray-600 text-sm">Lead Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}