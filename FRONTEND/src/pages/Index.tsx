import { useState } from "react";
import { motion } from "framer-motion";
import ImageUpload from "@/components/ImageUpload";
import {  Recycle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const { toast } = useToast();

  const handleImageSelect = async (file: File) => {
    setIsProcessing(true);
    setResult(null);
    
    try {
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);
      const base64Data = await base64Promise;

      const apiUrl = import.meta.env.VITE_API_URL ;

      const response = await fetch(`${apiUrl}/detect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          image: base64Data 
        }),
      });

      if (!response.ok) throw new Error('Detection failed');

      const detectionResult = await response.json();
      setResult(detectionResult);
      
      toast({
        title: "Classification Complete",
        description: "We've analyzed your waste item successfully!",
      });
    } catch (error) {
      toast({
        title: "Classification Failed",
        description: "There was an error processing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-eco-sky to-white">
      <div className="container px-6 py-12 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-8">
            <div className="bg-eco-leaf/10 p-5 rounded-full transform hover:scale-105 transition-transform">
              <Recycle className="h-10 w-10 text-eco-leaf" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Recyclopedia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Upload an image of your waste item, and let our AI help you make the right disposal decision.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Upload Image</h2>
            <ImageUpload
              onImageSelect={handleImageSelect}
              isProcessing={isProcessing}
            />
            {isProcessing && (
              <p className="text-center mt-4 text-gray-600">
                Processing your image...
              </p>
            )}
          </div>

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">Classification Results</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4">Classified Objects</h3>
                    <div className="space-y-4">
                      {result.detections.length > 0 ? (
                        result.detections.map((detection: any, idx: number) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
                          >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <span className="text-lg font-medium capitalize">
                                  {detection.category}
                                </span>
                                <Badge 
                                  variant="outline" 
                                  className={`${
                                    detection.classification === "Organic" 
                                      ? "bg-green-50 text-green-600 border-green-200 group-hover:bg-green-100"
                                      : detection.classification === "Recyclable"
                                      ? "bg-blue-50 text-blue-600 border-blue-200 group-hover:bg-blue-100"
                                      : detection.classification === "Non-Recyclable"
                                      ? "bg-red-50 text-red-600 border-red-200 group-hover:bg-red-100"
                                      : "bg-gray-50 text-gray-600 border-gray-200 group-hover:bg-gray-100"
                                  } transition-colors duration-300`}
                                >
                                  {detection.classification}
                                </Badge>
                              </div>
                              <Badge 
                                variant="outline" 
                                className="bg-purple-50 text-purple-600 border-purple-200 group-hover:bg-purple-100 transition-colors duration-300"
                              >
                                Confidence: {(detection.score * 100).toFixed(1)}%
                              </Badge>
                            </div>

                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-200"
                        >
                          <div className="w-16 h-16 mb-4 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h4 className="text-lg font-semibold text-gray-700 mb-2">No Objects Detected</h4>
                          <p className="text-gray-500 text-center max-w-sm">
                            Our model couldn't detect any objects in this image. This might happen if:
                          </p>
                          <ul className="mt-3 text-sm text-gray-500 list-disc list-inside space-y-1">
                            <li>The image quality is too low</li>
                            <li>The objects are not in our training dataset</li>
                            <li>The objects are too small or unclear</li>
                          </ul>
                          <p className="mt-4 text-sm text-gray-500 text-center">
                            Try uploading a different image with clearer objects.
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <h3 className="text-xl font-medium mb-4">Visualization</h3>
                    {result.annotated_image && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative group"
                      >
                        <img 
                          src={result.annotated_image} 
                          alt="Detection Result" 
                          className="w-full rounded-xl shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-300" />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-eco-leaf/10 to-eco-sky/10 px-8 py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Recyclopedia
            </h2>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-4xl">
              Recyclopedia is an innovative solution designed for landfill areas to help properly classify and manage waste. Our machine learning model can accurately identify whether waste is organic, recyclable, or non-recyclable, helping communities maintain cleaner environments and more efficient waste management systems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-gray-50">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mx-auto mb-6">
                <span role="img" aria-label="leaf" className="text-4xl">🌿</span>
              </div>
              <h3 className="font-bold text-gray-800 text-xl mb-4 text-center">Organic Waste</h3>
              <p className="text-gray-600 text-center text-base md:text-lg leading-relaxed">
                Food scraps, yard waste, and biodegradable materials that can be composted.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 mx-auto mb-6">
                <span role="img" aria-label="recycle" className="text-4xl">♻️</span>
              </div>
              <h3 className="font-bold text-gray-800 text-xl mb-4 text-center">Recyclable Waste</h3>
              <p className="text-gray-600 text-center text-base md:text-lg leading-relaxed">
                Materials like paper, plastic, glass, and metal that can be processed and reused.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mx-auto mb-6">
                <span role="img" aria-label="no entry" className="text-4xl">🚫</span>
              </div>
              <h3 className="font-bold text-gray-800 text-xl mb-4 text-center">Non-Recyclable Waste</h3>
              <p className="text-gray-600 text-center text-base md:text-lg leading-relaxed">
                Items that cannot be recycled or composted and must be disposed of in landfills.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
