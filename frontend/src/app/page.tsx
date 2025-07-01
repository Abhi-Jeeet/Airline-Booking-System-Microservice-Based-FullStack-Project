import { Plane, Globe, Shield, Clock, Star, Users, Award, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Plane className="h-16 w-16 text-white" />
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Welcome to AeroLink
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Experience the future of air travel. Discover, compare, and book your next journey 
              with our premium airline booking platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/flights">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Search Flights
                </button>
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <Plane className="h-8 w-8 animate-bounce" />
        </div>
        <div className="absolute top-20 right-20 opacity-20">
          <Globe className="h-6 w-6 animate-pulse" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <Star className="h-6 w-6 animate-spin" />
        </div>
      </section>

      {/* About AeroLink Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About AeroLink
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AeroLink is a revolutionary airline booking platform that connects travelers with the world's 
              finest airlines. We believe that every journey should be extraordinary, from the moment you 
              search for flights to the instant you reach your destination.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Your Journey, Our Priority
              </h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At AeroLink, we understand that travel is more than just getting from point A to point B. 
                It's about creating memories, exploring new cultures, and experiencing the world in all its beauty.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform combines cutting-edge technology with personalized service to ensure that every 
                booking is seamless, every flight is comfortable, and every destination is within reach.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">1M+</h4>
                    <p className="text-sm text-gray-600">Happy Travelers</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">500+</h4>
                    <p className="text-sm text-gray-600">Awards Won</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">24/7</h4>
                    <p className="text-sm text-gray-600">Support</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">4.9/5</h4>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose AeroLink?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the best booking experience with cutting-edge technology and exceptional service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Secure Booking</h3>
              <p className="text-gray-600 leading-relaxed">
                Your data is protected with bank-level security and encryption. 
                We use the latest security protocols to ensure your information is always safe.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Instant Confirmation</h3>
              <p className="text-gray-600 leading-relaxed">
                Get your booking confirmed instantly with real-time processing. 
                No waiting, no delays - just immediate confirmation and peace of mind.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Premium Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Enjoy 24/7 customer support and personalized travel assistance. 
                Our dedicated team is always ready to help you with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of travelers who trust AeroLink for their air travel needs. 
            Experience the difference that premium service makes.
          </p>
          <Link href="/flights">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg">
              Start Searching Flights
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
