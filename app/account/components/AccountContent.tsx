"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { postData } from "@/libs/helpers";

// the subsribed user's account page's content
const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, subscription, user } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  // lets redirect to the customer portal.
  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await postData({ //postData() from helpers
        url: '/api/create-portal-link'
      });
      window.location.assign(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
    setLoading(false);
  };

  return ( 
    <div className="mb-7 px-6">
      {!subscription && ( //if we don't have a subscription/active plans then open subscription modal
        <div className="flex flex-col gap-y-4">
        <p>No active plan.</p>
        <Button 
          onClick={subscribeModal.onOpen}
          className="w-[300px]"
        >
          Subscribe
        </Button>
      </div>
      )} 
      {subscription && (  // and if there is a subscription then show the plans(premium)
        <div className="flex flex-col gap-y-4">
          <p>You are currently on the 
            <b> {subscription?.prices?.products?.name} </b> 
            plan.
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  );
}
 
export default AccountContent;
