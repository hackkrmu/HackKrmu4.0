import { UserPlus, Search, Truck, Star } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="h-8 w-8 text-white" />,
      title: "Sign Up",
      description: "Join as a mother, day-scholar, or hostel student",
      color: "bg-primary-500"
    },
    {
      icon: <Search className="h-8 w-8 text-white" />,
      title: "Browse & Order",
      description: "Explore menus and place your orders in advance",
      color: "bg-primary-600"
    },
    {
      icon: <Truck className="h-8 w-8 text-white" />,
      title: "Get Delivered",
      description: "Receive fresh, home-cooked meals at your doorstep",
      color: "bg-primary-700"
    },
    {
      icon: <Star className="h-8 w-8 text-white" />,
      title: "Share Feedback",
      description: "Rate your experience and help others choose better",
      color: "bg-primary-800"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Four simple steps to get your home-cooked meals
          </p>
        </div>

        <div className="mt-12">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 w-full h-1 bg-gradient-to-r from-primary-200 to-primary-500 transform -translate-y-1/2" />
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center">
                    <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-4`}>
                      {step.icon}
                      <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
                        <span className="text-primary-600 font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-center text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a href="/auth" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:text-lg">
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;