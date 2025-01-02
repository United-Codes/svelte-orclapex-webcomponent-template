# Svelte Oracle APEX WebComponent Template

Opinionated starter template to create WebComponents for intended use in Oracle APEX with Svelte.

## FAQ

- Q: **Why WebComponents?** 
  - A: WebComponents are a standard and can be used in any framework or library. They are exposed via own HTML tags which makes them easy to use in Oracle APEX plug-ins. Their style and logic is encapsulated and can be reused by just adding the tag to the page.
- Q: **Why Svelte?**
  - A: Svelte has a nice and easy to use syntax, an existing ecosystem and compiles to small and fast vanilla JS.
- Q: **How is this tailored for Oracle APEX?**
  - A: The template loads all the APEX sources so you can use Font APEX, APEX CSS classes and the APEX JS API while locally developing your WebComponent.
- Q: **Why a local development server?**
  - A: Speed. Put your editor and a browser side by side and see changes instantly. No need to upload files to APEX to see changes.

## Installation

The package manager and runtime of choice in this repository is [Bun](https://bun.sh/). Install Bun according to their instructions, then run

```sh
bun install
bun dev
```

The terminal will show your local address where you can view the example component and page.

# Get started

Write Svelte 5 components, and import them into `App.svelte` to preview in the browser. When you're finished, edit `rollup.config.js` to use your component as the input. Next, run `bun build`. You will find your exported web component files in the `public/build` folder. Specifically, we're interested in the `bundle.js` file, but you may also wish to include the map. The component css is not saved in the css file, so the bundle.css should be empty. You may rename `bundle.js` as you wish, it will not affect the component inside.

Getting these components onto the page can be done in a number of different ways. A few options are:

- Create a new template component. Import the js and css files and add them to the "Files to Load". Select the template component as the region type, then use attributes and a `select xyz from dual` query to populate any props.
- Add the file as application or workspace files, and import them to the entire app via User Interface Attributes. Now, when you'd like to see the Svelte component, you can use an APEX Static Region, and type in your custom element HTML.
- Add the file as application or workspace files, and import them to the page via page settings. Again, you'd use the Static Region to insert your Svelte components.

## Resources

- [Svelte Custom Elements API](https://svelte.dev/docs/custom-elements-api)
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)
- [Bun](https://bun.sh/)
- [Custom Elements (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
