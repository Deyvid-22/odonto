import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { subscriptionPlans } from "@/utils/plans";
import { SubscriptionButton } from "./subscription-button";

export function GridPlans() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 space-y-4 md:gap-5">
      {subscriptionPlans.map((plan, index) => (
        <Card
          key={plan.id}
          className={`flex py-0 flex-col w-full mx-auto relative ${
            index == 1 && "border-emerald-500"
          }  `}
        >
          {index === 1 && (
            <div className="bg-emerald-500 text-white rounded-t-xl py-3 w-full ">
              <p className="font-bold text-center">PROMOÇÃO EXCLUSIVA</p>
            </div>
          )}
          <CardHeader className="py-4">
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <CardContent>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="mt-4">
                <p className="text-gray-600 line-through">{plan.oldPrice}</p>
                <p className="text-black font-bold">{plan.price}</p>
              </div>
              <CardFooter className="mt-3">
                <SubscriptionButton
                  type={plan.id === "BASIC" ? "BASIC" : "PROFESSIONAL"}
                />
              </CardFooter>
            </CardContent>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
