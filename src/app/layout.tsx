import localFont from 'next/font/local';
import s from '@/styles/globals.module.scss';
import { Providers } from '@/components/providers/Providers';

const TWKLausanne = localFont({
   src: [
      {
         path: '../../public/fonts/twklausanne-250.ttf',
         weight: '250',
         style: 'normal',
      },
      {
         path: '../../public/fonts/twklausanne-300.ttf',
         weight: '300',
         style: 'normal',
      },
      {
         path: '../../public/fonts/twklausanne-350.ttf',
         weight: '350',
         style: 'normal',
      },
      {
         path: '../../public/fonts/twklausanne-400.ttf',
         weight: '400',
         style: 'normal',
      },
      {
         path: '../../public/fonts/twklausanne-500.ttf',
         weight: '500',
         style: 'normal',
      },
      {
         path: '../../public/fonts/twklausanne-550.ttf',
         weight: '550',
         style: 'normal',
      },
      {
         path: '../../public/fonts/twklausanne-650.ttf',
         weight: '650',
         style: 'normal',
      },
      {
         path: '../../public/fonts/twklausanne-700.ttf',
         weight: '700',
         style: 'normal',
      },
      {
         path: '../../public/fonts/twklausanne-750.ttf',
         weight: '750',
         style: 'normal',
      },
      {
         path: '../../public/fonts/twklausanne-800.ttf',
         weight: '800',
         style: 'normal',
      },
      {
         path: '../../public/fonts/twklausanne-850.ttf',
         weight: '850',
         style: 'normal',
      },
      {
         path: '../../public/fonts/twklausanne-900.ttf',
         weight: '900',
         style: 'normal',
      },
      {
         path: '../../public/fonts/twklausanne-950.ttf',
         weight: '950',
         style: 'normal',
      },
      {
         path: '../../public/fonts/twklausanne-1000.ttf',
         weight: '1000',
         style: 'normal',
      },
   ],
   variable: '--font-twklausanne',
});

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang='en'>
         <body className={`${TWKLausanne.variable} antialiased `}>
            <Providers>
               <main className={s.main}>{children}</main>
            </Providers>
         </body>
      </html>
   );
}
