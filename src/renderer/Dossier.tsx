import { DOSSIER } from "../config";

export const Dossier = ({ handout }: { handout: (typeof DOSSIER)["data"] }) => {
  return (
    <>
      <div className="relative">
        <div
          className={`paper bg-white paper-${handout.paper_texture.value} w-[600px] h-[700px] uppercase font-noticia-text absolute -left-[300px] top-0 z-10 -rotate-2`}
        >
          <div className="grid grid-cols-1 m-2 border-2 border-black">
            <div className=" border-b-2 last:border-b-0 border-black">
              <p className="p-2 flex gap-2 items-center">
                <span className="font-black">Name:</span>
                <span className="text-gray-800">Tom Gray</span>
              </p>
            </div>
            <div className=" border-b last:border-b-0">
              <p className="p-2">
                <span>Name:</span>
                <span>Tom Gray</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 p-2">
            <p className="p-2 border col-span-3">hello</p>
            <p className="p-2 border col-span-3">hello</p>
            <p className="p-2 border">hello</p>
            <p className="p-2 border">hello</p>
            <p className="p-2 border">hello</p>
            <p className="p-2 border">hello</p>
            <p className="p-2 border">hello</p>
            <p className="p-2 border">hello</p>
            <p className="p-2 border">hello</p>
            <p className="p-2 border">hello</p>
            <p className="p-2 border">hello</p>
            <p className="p-2 border">hello</p>
            <p className="p-2 border">hello</p>
            <p className="p-2 border">hello</p>
            <p className="p-2 border">hello</p>
            <p className="p-2 border">hello</p>
            <p className="p-2 border">hello</p>
          </div>
        </div>

        <div
          style={{
            boxShadow: "inset -10px 10px 25px #000000",
          }}
          className={`paper bg-white paper-${handout.paper_texture.value} w-[600px] h-[700px] absolute -left-[300px] rotate-2`}
        ></div>
      </div>
    </>
  );
};
