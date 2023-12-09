'use client';
import type { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc';
import type { TeamPayload } from '@/types';
import PortableTextComponent from '@/components/portabletext/PortableTextComponent';
import { staatliches } from '@/fonts';

interface SplineViewerProps extends React.HTMLAttributes<HTMLElement> {
   url: string;
}
declare global {
   namespace JSX {
      interface IntrinsicElements {
         'spline-viewer': SplineViewerProps;
      }
   }
}

export interface PageProps {
   data: TeamPayload | null;
   encodeDataAttribute?: EncodeDataAttributeCallback;
}

const Page: React.FC<PageProps> = ({ data, encodeDataAttribute }) => {
   const { role, name, bio, scene } = data ?? {};

   return (
      <div className="w-full flex flex-col h-full text-black justify-center flex items-center bg-black ">
         <div className="w-full h-full bg-black block">
            <script type="module" src="https://unpkg.com/@splinetool/viewer@0.9.506/build/spline-viewer.js"></script>
            <spline-viewer className="w-full h-[80vh] lg:h-[90vh]" url={scene || ''}></spline-viewer>
         </div>
         <div className="w-full p-4 flex flex-col justify-center items-center gap-2">
            <h1 className={`${staatliches.className} text-6xl font-bold text-gray-200`}>{name}</h1>
            <h2 className={`${staatliches.className} text-3xl font-normal text-gray-400`}>{role}</h2>
         </div>

         <div className="w-full h-auto bg-black lg:pt-24">
            <PortableTextComponent content={bio || []} template="team" />
         </div>
      </div>
   );
};

export default Page;