import { useSnapshot } from "valtio";
import { Icon } from "./Icon";
import { appState as appStateProxy } from "./appState";
import classNames from "classnames";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { allConfigs, AllConfigNames } from "./handoutConfigs";

export const HandoutTypeSelectorFloating = () => {
  const appState = useSnapshot(appStateProxy);

  const [opened, { open, close }] = useDisclosure(false);

  const handleHandoutTypeChange = async (newType: AllConfigNames) => {
    appStateProxy.selectedHandoutType = newType;
    appStateProxy.selectedVersionId = "TRANSIENT";

    // Reset positioning controls when changing handout type
    const { db } = await import("./database");
    db.handouts
      .where("id")
      .equals(`TRANSIENT_${newType}`)
      .modify((handout: any) => {
        if (!handout.data.positioning) {
          handout.data.positioning = {};
        }
        handout.data.positioning.rotation = 0;
        handout.data.positioning.zoom = 1;
        handout.data.positioning.xOffset = 0;
        handout.data.positioning.yOffset = 0;
      });

    close();
  };

  const groupedConfigs = [
    {
      label: "'Pseudo' Paper / Print",
      type: "digital_paper" as const,
    },
    {
      label: "Sci-fi Screens",
      type: "scifi_screens" as const,
    },
    {
      label: "Objects",
      type: "object" as const,
    },
    {
      label: "Wooden Signs",
      type: "wooden_signs" as const,
    },
    {
      label: "Flags and Banners",
      type: "flags_and_banners" as const,
    },
  ];

  return (
    <>
      <div
        className={classNames(
          "fixed md:absolute top-6 left-6 transition-all z-50"
        )}
      >
        <span className="flex items-center gap-4">
          <button
            onClick={() => {
              open();
            }}
            className="background-selector bg-orange-500 rounded-full hover:scale-[1.03] active:scale-[.96] transition-transform p-2 flex gap-2"
          >
            <Icon name="file-description" colour="white" size="md" />
            <span className="text-white font-bold">Browse handouts</span>
          </button>
        </span>
        <span className="text-white italic font-bold">
          {appState.selectedHandoutType}
        </span>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title="Select Handout Type"
        centered
        size="90%"
      >
        <div className="space-y-8">
          {groupedConfigs.map((group) => {
            const configs = allConfigs.filter(
              (config) => config.type === group.type
            );
            if (configs.length === 0) return null;

            return (
              <div key={group.type}>
                <h3 className="text-lg font-bold mb-4 text-gray-700">
                  {group.label}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {configs.map((config) => {
                    const isSelected =
                      appState.selectedHandoutType === config.name;
                    return (
                      <button
                        key={config.name}
                        onClick={() => handleHandoutTypeChange(config.name)}
                        className={classNames(
                          "flex flex-col items-start p-4 rounded-lg border-2 transition-all hover:shadow-lg hover:-translate-y-1",
                          isSelected
                            ? "border-orange-500 bg-orange-50"
                            : "border-gray-200 hover:border-orange-300"
                        )}
                      >
                        {/* Placeholder image area */}
                        <div className="w-full aspect-video bg-gray-200 rounded mb-3 flex items-center justify-center">
                          <Icon name="photo" colour="#999" size="xl" />
                        </div>

                        {/* Handout name */}
                        <h4 className="font-bold text-left mb-1">
                          {config.displayName}
                        </h4>

                        {/* Caption */}
                        <p className="text-sm text-gray-600 text-left">
                          {config.caption}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};
