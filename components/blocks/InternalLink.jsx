'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { jura, staatliches } from '@/fonts';
import { getPostData } from '@/app/api/actions/fetchInternalLink';
import Image from 'next/image';

import { urlForImage } from '@/sanity/lib/utils';

const InternalLink = ({ slug, children }) => {
   const [isDialogOpen, setDialogOpen] = useState(false);
   const [previewPostData, setPreviewPostData] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const openDialog = async e => {
      e.preventDefault();
      setIsLoading(true);
      setDialogOpen(true);

      if (!slug) {
         console.error('The slug is undefined.');
         setIsLoading(false);
         return;
      }

      try {
         const data = await getPostData(slug);
         setPreviewPostData(data);
      } catch (error) {
         console.error('Failed to fetch post data:', error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
         <Link href="#popup" onClick={openDialog} className={`${staatliches.className} text-xl text-black underline`}>
            {children}
         </Link>
         {isDialogOpen && (isLoading ? <LoadingIndicator /> : <ArticlePreviewDialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} postData={previewPostData} />)}
      </>
   );
};

export const ArticlePreviewDialog = ({ isOpen, onClose, postData }) => {
   if (!isOpen || !postData) return null;

   const firstBlock = postData?.block?.[0];

   const teamImage = firstBlock?.team?.image; // Assuming this is the URL or image object

   const formattedDate = firstBlock?.publicationDate
      ? new Date(firstBlock.publicationDate).toLocaleDateString('en-US', {
           year: 'numeric',
           month: 'long',
           day: 'numeric',
        })
      : 'Date not available';

   return (
      <div id="popup" className="flex flex-col my-5 items-center justify-center">
         <div className="w-full justify-center relative  h-[66vh] lg:h-[33vh] overflow-auto p-4 bg-gray-300 shadow-lg rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-4">
            {firstBlock && (
               <>
                  {firstBlock.image && (
                     <div className="relative ">
                        <ImageBox image={firstBlock.image} alt={`Cover Image for ${firstBlock.heading}`} classesWrapper="h-[250px] w-full transform rounded-[.5em] object-cover transition-transform duration-300 group-hover:scale-110" />
                     </div>
                  )}

                  <div>
                     <span className={`${staatliches.className} w-full flex h-auto mb-2 text-xs text-black uppercase tracking-widest`}>{formattedDate}</span>
                     <Link href={`/posts/${postData.slug.current}`} className={`${staatliches.className} text-black font-bold text-4xl mb-2`}>
                        {firstBlock.heading}
                     </Link>

                     {firstBlock.subheading && <p className={`${jura.className} text-black text-lg mb-4`}>{firstBlock.subheading}</p>}

                     {firstBlock.team && (
                        <Link href={`/team/${firstBlock.team.slug.current}`} className={`${staatliches.className} `}>
                           <div className="flex items-center p-2 w-full">
                              {teamImage && (
                                 <div className="overflow-hidden object-cover rounded-full">
                                    <TeamImageBox image={teamImage} alt={`Team member image for ${firstBlock.team.name}`} classesWrapper="h-[30px] w-[30px] object-cover cover" />
                                 </div>
                              )}
                              {firstBlock.team.name && <span className="ml-2 uppercase text-black font-semibold tracking-wide font-mono text-sm">By {firstBlock.team.name}</span>}
                           </div>
                        </Link>
                     )}
                  </div>
               </>
            )}

            <div className="flex w-full justify-between items-center col-span-1 lg:col-span-2">
               <Link href={`/posts/${postData.slug.current}`} className="w-full flex justify-center items-center px-6 py-2 bg-black text-white font-bold rounded hover:bg-black/75 transition-colors">
                  Read Now
               </Link>
            </div>
         </div>

         <div className="sticky top-0 right-0 pt-4">
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button onClick={onClose} className="px-4 py-2 text-black font-bold rounded hover:bg-gray-300 transition-colors">
               Close X
            </button>
         </div>
      </div>
   );
};

const LoadingIndicator = () => (
   <div className="flex my-4 items-center justify-center">
      <div className="w-full max-w-3xl h-[66vh] lg:h-[33vh]  overflow-auto flex justify-center items-center p-4 bg-gray-300 shadow-lg rounded-lg">
         {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
         <svg width="100" height="100" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="20" stroke="#888888" strokeWidth="5" fill="none" strokeDasharray="31.415, 31.415" strokeDashoffset="0">
               <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
            </circle>
         </svg>
      </div>
   </div>
);

function ImageBox({ image, alt = 'Cover image', width = 1500, height = 1000, size = '100vw', classesWrapper, ...props }) {
   const imageUrl = image && urlForImage(image)?.height(height).width(width).fit('crop').url();

   return (
      <div className={`w-full overflow-hidden ${classesWrapper}`} data-sanity={props['data-sanity']}>
         {imageUrl && <Image priority={true} className="object-cover cover h-full w-full" alt={alt} width={width} height={height} sizes={size} src={imageUrl} />}
      </div>
   );
}

function TeamImageBox({ image, alt = 'Cover image', width = 50, height = 50, size = '100vw', classesWrapper, ...props }) {
   const imageUrl = image && urlForImage(image)?.height(height).width(width).fit('crop').url();

   return (
      <div className={`w-full overflow-hidden ${classesWrapper}`} data-sanity={props['data-sanity']}>
         {imageUrl && <Image priority={true} className="object-cover cover h-full w-full" alt={alt} width={width} height={height} sizes={size} src={imageUrl} />}
      </div>
   );
}

export default InternalLink;
