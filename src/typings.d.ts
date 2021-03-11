declare module '*.scss' {
    const content: { readonly [className: string]: string };
    export default content;
  }

  declare module '*.svg' {
    const content: { readonly string  };
    export default content;
  }