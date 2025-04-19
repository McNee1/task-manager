// import { lazy, Suspense, useEffect, useState } from 'react';

// import { AppModalProps } from './app-modal';

// const LazyAppModal = lazy(() => import('./app-modal'));

// export const AppModalSuspense = (props: AppModalProps & { lazy?: boolean }) => {
//   const { lazy = true, isOpen } = props;

//   const [keepMounted, setKeepMounted] = useState(false);

//   useEffect(() => {
//     if (!isOpen && keepMounted) {
//       const timer = setTimeout(() => {
//         setKeepMounted(false);
//       }, 100);

//       return () => {
//         clearTimeout(timer);
//       };
//     } else if (isOpen) {
//       setKeepMounted(true);
//     }
//   }, [isOpen, keepMounted]);

//   if (lazy) {
//     if (!isOpen && !keepMounted) {
//       return null;
//     }

//     return (
//       <Suspense fallback={null}>
//         <LazyAppModal {...props} />
//       </Suspense>
//     );
//   }
//   return <LazyAppModal {...props} />;
// };
