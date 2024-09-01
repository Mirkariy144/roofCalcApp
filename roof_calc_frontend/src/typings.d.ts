declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

interface Window {
  store: any;
}

declare var window: Window;
declare module 'jsonwebtoken';
