import { SignedIn, SignedOut, UserButton, Waitlist } from "@clerk/clerk-react";
import { useSnapshot } from "valtio";
import { Icon } from "./Icon";
import { appState as appStateProxy } from "./appState";
import classNames from "classnames";

export const SignInFloatingButton = () => {
  const appState = useSnapshot(appStateProxy);
  const isOpen = appState.waitlistSelectorState === "open";

  return (
    <div
      className={classNames("absolute bottom-4 right-4 transition-all z-50", {
        "bg-gray-600 p-4 rounded-md": isOpen,
      })}
    >
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        {!isOpen && (
          <button
            onClick={() => {
              appStateProxy.waitlistSelectorState = "open";
            }}
            className="bg-blue-500 px-3 py-1 rounded-full hover:-translate-y-1 active:scale-90 transition-transform"
          >
            <span className="flex items-center gap-2">
              <Icon name="check" colour="white" size="sm" />
              <span className="text-white font-bold text-sm">
                Join Waitlist
              </span>
            </span>
          </button>
        )}

        {isOpen && (
          <>
            <div className="min-w-[300px] max-w-[400px]">
              <div className="mb-4">
                <h3 className="text-white text-xl font-bold">
                  Join the Waitlist
                </h3>
                <p className="w-full text-white text-sm">
                  Some time soon I'm going to be adding some kind of low-cost
                  subscription model for this tool, which will give subscribers
                  a bunch of extra features - the idea being that the money will
                  go towards development/hosting costs, and in return you'll get
                  extra toys to play with.
                </p>
                <p className="w-full text-white text-sm mt-3">
                  I'm thinking of publishing a roadmap somewhere, letting people
                  vote on what sort of prop types/features they want to see
                  added, etc. that sort of thing.
                </p>
                <p className="w-full text-white text-sm mt-3">
                  So yeah - sign up using the form below, and I guess I'll let
                  you know!
                </p>
              </div>
              <Waitlist
                appearance={{
                  elements: {
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    footerAction: "hidden",
                  },
                }}
              />
            </div>

            <button
              onClick={() => {
                appStateProxy.waitlistSelectorState = "closed";
              }}
              className="absolute top-2 right-2 bg-red-500 rounded-full hover:-translate-y-1 active:scale-90 transition-transform p-1"
            >
              <Icon name="x" colour="white" size="sm" />
            </button>
          </>
        )}
      </SignedOut>
    </div>
  );
};
