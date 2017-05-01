![Brightfind](https://logo.clearbit.com/brightfind.com)

# Brightfind Appseed Repository

Welcome to the Brightfind Appseed Repository!

### Features
- **CSS:** [Sass](http://sass-lang.com/) (indented, scss, or both)
  - Libsass (node-sass) for super fast compiles
  - Autoprefixer - You do not need to add prefixes!
- **JS:** Modular ES6 with [Babel](http://babeljs.io/) and [Webpack](http://webpack.github.io/)
  - Async requires
  - Multiple bundles
  - Shared modules
  - Source Maps
- **HTML**: Static templating with [Nunjucks](https://mozilla.github.io/nunjucks/) and [gulp-data](https://github.com/colynb/gulp-data)
- **Development Mode:**
  - File Watching and Live Reloading with [BrowserSync](http://www.browsersync.io/)
  - Source Maps
- **Production Builds:**
  - JS and CSS are uglified and minified
  - File size reporting
  - Local production sever for testing
  - Custom environment dependent Vars!
- **Deployment:**
  - Quickly deploy `public` folder
- **Other:**
  - bLazy - JS Lazy Loader

## Process and Conventions

### HTML Templates

High level pages are in `html/` such as `index.html` or `search.html`, etc. 

These files have basic includes of `_shared` markup, static markup and components. These may contain components, but should only appear once per page. Within each layout are 'shared' markup, this includes:
- Head
- Hero
- Navigation
- Footer
- Etc.

Within the shared markup are components, this can include:
- Card & Blocks
- Search entries
- Calendar entries
- Components are small; repeatable bits of HTML. They can be repeated multiple times in a page. They should not have *ANY* includes. This would include a card block or a search entry
- Shared includes repeated code but not more than once on a page. These are more unique at the page level, but not at the site level. For example navigation should only appear once per page, but on several pages within a site
- Layouts have the master page

## Basic Usage

### Install Dependencies
```bash
npm install
```

### Start compiling, serving, and watching files
```bash
gulp
```

(or `npm run development`)

This runs `gulp` from `./node_modules/bin`, using the version installed with this project, rather than a globally installed instance. All commands in the package.json `scripts` work this way. The `gulp` command runs the `default` task, defined in `gulpfile.js/tasks/default.js`. 

All files will compile in development mode (uncompressed with source maps). [BrowserSync](http://www.browsersync.io/) will serve up files to `localhost:3000` and will stream live changes to the code and assets to all connected browsers. Don't forget about the additional BrowserSync tools available on `localhost:3001`!

To run any other existing task, simply add the task name after the `gulp` command. Example:

```bash
gulp production
```

### Configuration
Directory and top level settings are conveniently exposed in `gulpfile.js/config.json`. All task configuration objects have `src` and `dest` directories specified. These are relative to `root.src` and `root.dest` respectively. Each configuration also has an extensions array. This is used for file watching, and file deleting/replacing. 

If there is a feature you do not wish to use on your project, simply delete the configuration, and the task will be skipped.

### Build production-ready files
```bash
gulp production
```

This will compile revisions and compressed files to `./public`. To build production files and preview them locally, run 

```bash
gulp
```

This will start a static server that serves your production files to http://localhost:3000. This is primarily meant as a way to preview your production build locally, not necessarily for use as a live production server.

`webpack-multi-config.js`

This is where any webpack plugins and components are.

### Production/Development JS Vars
Now you can pass an object with key `production/development` and value
of the vars used in either environment. Here is an example

```js
// modules/my-module.js
import EnvVar from 'lib/envVar.js';
(function() {
  	'use strict';
	var env_url = EnvVar({
		development:'/data/dummy-data.json',
		production:'/Path/To/Controller.aspx'
	});
})();
```
Depending on the environment it will return the var assigned. If you run `gulp development` or `gulp` it will return `/data/dummy-data.json`. if you run `gulp production` it will return the `/Path/To/Controller.aspx`

## Task Details
### JS
```
gulpfile.js/tasks/webpackWatch
gulpfile.js/tasks/webpackProduction
```
Modular ES6 with [Babel](http://babeljs.io/) and [Webpack](http://webpack.github.io/)

If you need to add a new task, add your ```taskName.js``` to the tasks folder, then add the task to ```tasks/default.js``` in the ```gulpSequence()``` function.

Adjust the webpack config (`.gulpfile.js/config/webpack`) for the project.

There are a couple of webpack options exposed in the top-level `gulpfile.js/config.json` file.

`extractSharedJs`: Creates a `shared.js` file that contains any modules shared by multiple bundles. Useful on large sites with discrete js running on different pages that may share common modules or libraries. Not typically needed on smaller sites.

Vendor script go in the `javascript/vendor/` folder and are _**not**_ bundled via webpack.

Unbundled javascript files are for files what just need to be copied over, not bundled. This is used it bundling vendor scripts causes errors. Some scripts when bundled; especially if already minified will cause errors.

### CSS
`gulpfile.js/tasks/css`

Your Sass gets run through Autoprefixer, so don't prefix! So this:

```css
/* _block.scss */
.block{
	display: flex;
}
```
will automatically compile to:

```css
/* styles.css */
.block{
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
}
```

### BEM

The BEM approach ensures that everyone who participates in the development of a website works with a single codebase and speaks the same language. Using proper naming will prepare you for the changes in design of the website. This project uses the following naming conventions:


``` css
.block-name__element-name--modifier{}
.primary-nav__logo--sticky{}
```

This approach is easier to maintain. OOCSS can end up with a lot inline classes. With BEM you end up with very few classes in the HTML:

```html
<!--BEM-->
<header class="article__header article--lead">
	<h1>Main Header</h1>
</header>
...
<header class="article__header">
	<h2>Header</h2>
</header>

<!--OOCSS-->
<header class="article-header border-top-red margin-top-extra border-bottom-gray">
	<h1>Main Header</h1>
</header>
...
<header class="article-header border-bottom-gray">
	<h2>Header</h2>
</header>
```

### Block

Encapsulates a standalone entity that is meaningful on its own. While blocks can be nested and interact with each other, semantically they remain equal; there is no precedence or hierarchy. Holistic entities without DOM representation (such as controllers or models) can be blocks as well.

### Element

Parts of a block and have no standalone meaning. Any element is semantically tied to its block.

### Modifier

Flags on blocks or elements. Use them to change appearance, behavior or state.

```html
<nav class="nav nav--visible">
	<ul class="nav__menu">
		<li class="nav__item--selected"></li>
		<li class="nav__item"></li>
		<li class="nav__item"></li>
		<li class="nav__item"></li>
		<li class="nav__item"></li>
	</ul>
</nav>
```

### HTML
```
gulpfile.js/tasks/html
```
Robust templating with [Nunjucks](https://mozilla.github.io/nunjucks/). Nunjucks is nearly identical in syntax to Twig (PHP), and replaces Swig (and Twig-like js templating language), which is no longer maintained. We can have varying components without making a new component. Just set a parameter string or object to the include:

```html
{% set block = {
	classNames:'article--white article--selected',
	image:'images.png',
	heading:'Main Header'
}%}
{% include './_components/block.html' %}
```

In the component, I need to add:

```html
<article class="article__row {{ block.classNames }}">
	<h1>{{block.heading}}</h1>
  ...
</article>
```
For class names I use the variable className. You can also run loops if you need a bunch of entries. You can even count with `{{loop.index}}`.

```html
<!-- index.html-->
{% set tabs = [
	{title:"Organization"},
	{title:"Institutional"},
	{title:"International"}
] %}
{% include './_shared/tab-block.html' %}

<!-- _shared/tabs.html -->
<div class="tab__block">
	<nav class="tab__navigation">
	{% for tab in tabs %}
		<a href="#tab_{{loop.index}}" class="tab__button">{{tab.title}}</a>
	{% endfor %}
	</nav>
	<div class="tab__stage">
	{% for tab in tabs %}
		<article class="tab__content" data-trigger="#tab_{{loop.index}}">
			<span class="tab__jump" id="tab_{{tab.index}}"></span>
			<h2>{{tab.title}}</h2>
			...
		</article>
	{% endfor %}
	</div>
</div>
```

> Nunjucks variable are scoped with in the document and it's children

There is no way to pass an argument or variable _directly_ to an include; it will be available to all includes on the page. So if we have anything generic we need to set the variable to "" or null. This is beneficial in that you can set a varible like `pagename = 'Overview'` but i the name is generic like className it might get passed to something else. I recomend using objects so that `block.className` wont pick up `tabs.className`.  Here is an example:

```html
<!-- index.html-->
{% set params = {classNames:'article--selected', image:'images.png'} %}
{% include './_components/block.html' %}

{% set params = {classNames:'', image:'images.png'} %}
{% include './_components/block.html' %}

<!-- first "block.html"-->
<article class="article__row article--selected">
  ...
</article>

<!-- second "block.html"-->
<article class="article__row">
  ...
</article>
```

If we don't unset the variable classNames it will be available in all block.html on the page which might be undesirable and worth noting. If the variable is not called on in any of the includes then all is well. We just have to be mindful.

A global data file is set up at [src/html/data/global.json](src/html/data/global.json), is read in by the `html` task, and exposes the propertiesto your html templates. See [social-icons-font.html](src/html/shared/social-icons-font.