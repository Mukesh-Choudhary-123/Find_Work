import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import {
  BriefcaseBusiness,
  BriefcaseBusinessIcon,
  Heart,
  PenBox,
} from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();

  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src="/logo.png" className="lg:h-14 md:h-12 h-10 sm:h-11 mt-2" />
        </Link>
        <div className="flex justify-between items-center">
          <SignedOut>
            <Button
              variant="outline"
              onClick={() => {
                setShowSignIn(true);
              }}
            >
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to={"/post-job"}>
                <Button variant="destructive" className="rounded-full mr-3">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: { avatarBox: "w-10 h-10" },
              }}
            ></UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 "
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            signUpFallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;

{
  /* <UserButton.MenuItems>
  <UserButton.Link
    label="My Jobs"
    labelIcon={<BriefcaseBusiness size={15} />}
    href="/my-jobs"
  />
  <UserButton.Link
    label="Saved Jobs"
    labelIcon={<Heart size={15} />}
    href="/saved-jobs"
  />
</UserButton.MenuItems>; */
}
