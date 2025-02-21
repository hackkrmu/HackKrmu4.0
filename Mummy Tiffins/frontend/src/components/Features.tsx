import { CookingPot, Users, School, Heart, Clock, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <CookingPot className="h-8 w-8 text-primary-500" />,
      title: "Home-Cooked Meals",
      description: "Fresh, healthy meals prepared with love by experienced home cooks"
    },
    {
      icon: <Users className="h-8 w-8 text-primary-500" />,
      title: "Empower Mothers",
      description: "Support local mothers while they earn from their cooking skills"
    },
    {
      icon: <School className="h-8 w-8 text-primary-500" />,
      title: "Student-Friendly",
      description: "Affordable meal plans designed specifically for students"
    },
    {
      icon: <Heart className="h-8 w-8 text-primary-500" />,
      title: "Quality Assured",
      description: "All meals prepared following strict hygiene standards"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary-500" />,
      title: "Flexible Timing",
      description: "Schedule deliveries according to your class timings"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-500" />,
      title: "Verified Cooks",
      description: "All our home chefs are verified and regularly audited"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose HomeMeal Connect?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            We bring together the best of home cooking and convenience
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl 
                  transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;