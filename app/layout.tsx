import 'tailwindcss/tailwind.css';

import { Suspense } from 'react';
import { Footer } from '@/components/global/Footer';
import Navbar from '@/components/global/Navbar';

export default function IndexPage({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body>
            <Navbar />
            <main className="flex-grow bg-gray-200">
               <Suspense
                  fallback={
                     <div className="flex justify-center items-center min-h-screen">
                        <p>Loading...</p>
                     </div>
                  }
               >
                  {children}
               </Suspense>
            </main>
            <Footer />
         </body>
      </html>
   );
}
