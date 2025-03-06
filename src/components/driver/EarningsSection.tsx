
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";

interface EarningItemProps {
  title: string;
  amount: string;
  description: string;
}

const earnings: EarningItemProps[] = [
  { title: "Base Delivery Fee", amount: "$3.50 - $7.50", description: "Per delivery, based on distance" },
  { title: "Typical Tips", amount: "$2 - $5", description: "Average per delivery" },
  { title: "Peak Hour Bonus", amount: "+$2", description: "During lunch and dinner rushes" },
  { title: "Weekly Bonus", amount: "Up to $100", description: "Based on 20+ deliveries per week" },
  { title: "Monthly Top Driver", amount: "$250", description: "For highest rated drivers" },
];

const EarningsSection = () => {
  return (
    <section id="earnings" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Earning Potential</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here's how you can earn with us. The more you deliver, the more you make.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="earnings" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="earnings">Earnings Breakdown</TabsTrigger>
              <TabsTrigger value="example">Example Scenarios</TabsTrigger>
            </TabsList>
            <TabsContent value="earnings">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Earnings</CardTitle>
                  <CardDescription>
                    Your earnings are based on delivery fees, tips, and bonuses.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {earnings.map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex justify-between items-center p-4 border-b border-gray-100 last:border-0"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <div className="text-xl font-bold text-brand-orange">
                          {item.amount}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="example">
              <Card>
                <CardHeader>
                  <CardTitle>Example Earnings</CardTitle>
                  <CardDescription>
                    Here are some real-world examples of what our delivery partners earn.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-lg font-medium mb-2">Part-Time (10-15 hours/week)</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>15-20 deliveries</span>
                          <span className="font-medium">$150-$250</span>
                        </li>
                        <li className="flex justify-between">
                          <span>+ Tips</span>
                          <span className="font-medium">$30-$75</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Average weekly total</span>
                          <span className="font-bold text-brand-orange">$180-$325</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="text-lg font-medium mb-2">Full-Time (30-40 hours/week)</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>40-50 deliveries</span>
                          <span className="font-medium">$350-$450</span>
                        </li>
                        <li className="flex justify-between">
                          <span>+ Tips</span>
                          <span className="font-medium">$80-$200</span>
                        </li>
                        <li className="flex justify-between">
                          <span>+ Weekly bonuses</span>
                          <span className="font-medium">$50-$100</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Average weekly total</span>
                          <span className="font-bold text-brand-orange">$480-$750</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="text-sm text-gray-500">
                  Actual earnings may vary based on delivery volume, distance, tips, and other factors.
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default EarningsSection;
