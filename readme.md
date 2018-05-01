# VI - Interface Development and Angular

## Homework

[Download and install](https://www.mongodb.com/download-center#community) the community edition of Mongodb. https://www.mongodb.com/download-center#community

(Install instructions for [MacOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/))

Be sure to create a `/data/db/` directory at the top level of your hard drive.
Run `mongod` in a Terminal tab to start mongod and note any errors.

Try running a few commands _in another tab_ to ensure it's functioning:

```sh
$ mongo
> show dbs
> use puppies
> db.createCollection('toys')
> show collections
> db.toys.insert({name: 'yoyo', color: 'red'})
> db.toys.find()
> exit
```

Do a clean exit of mongod by closing the terminal tab.

If you need help setting the permissions on the db folder [see this post](http://stackoverflow.com/questions/28987347/setting-read-write-permissions-on-mongodb-folder).

## Flexbox & Transitions

```sh
cd myapp
npm i
npm run boom!
```

Review `public/index.html`.

### Editing

Unless you attended the first semester of this course you'll likely need a [flexbox formatting](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) cheat sheet for some of this.

Check and correct the sass settings in `.vscode`. Note that they are relative to Code's project space.

Enable sass processing in VS Code.

In `_base.scss`:

```css
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body {
  min-height: 100vh;
  margin: 0;
  background: linear-gradient(45deg, hsl(207, 50%, 55%) 0%, hsla(340, 100%, 55%, 0) 70%), 
    linear-gradient(135deg,hsl(227, 55%, 50%) 10%, hsla(225, 95%, 50%, 0) 80%), 
    linear-gradient(225deg, hsl(176, 60%, 50%) 10%, hsla(140, 90%, 50%, 0) 80%), 
    linear-gradient(315deg, hsl(307, 55%, 55%) 100%, hsla(35, 95%, 55%, 0) 70%);
}
```

Note the use of multiple background images.

Apply flex to the panels (the flex container).

In `_nav.scss`:

```css
nav {
  height: 6rem;
}

.panels {
  min-height: 100%;
  overflow: hidden;
  display: flex;
}
```

Note that the default flex behavior is to render the flex children horizontally on the x axis.

Apply `display: flex` to the individual panels (the flex children) in order to use align and justify content:

```css
.panel {
  flex: 1; /* Each panel takes an equal width */
  display: flex;
  background: #000;
  color: white;
  font-size: 1rem;
}
```

Assign the images:

```css
.panel1 {
  background-image: url(/img/1.jpg);
}
.panel2 {
  background-image: url(/img/2.jpg);
}
.panel3 {
  background-image: url(/img/4.jpg);
}
.panel4 {
  background-image: url(/img/3.jpg);
}
.panel5 {
  background-image: url(/img/5.jpg);
}
```

Assign the background properties:

```css
.panel {
  ...
  background-size: cover;
  background-position: center;
}
```

Below we are applying flex to the panel links - `.panel a` - and centering the contents horizontally and vertically as well as allowing the outlined items to expand vertically. Note - [Default is 0 1 auto](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

```css
.panel a {
  border: 1px solid red;
  flex: 1 0 auto; /*Allow the outlined items to expand vertically*/
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: 100%;
}
```

THe red border is there for illustration and is not a part of the design. Toggle the flex and display properties and note the red border.

Format the text:

```css
.panel a {
  ...
  color: #fff;
  text-decoration: none;
  font-family: 'Lobster', cursive;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.72), 0 0 14px rgba(0, 0, 0, 0.45);
  font-size: 1.5em;
}
```

## Setup for animation

Select the anchor tags (using `:first-child`) and move them off the bottom of their container:

```css
.panel :first-child {
  transform: translateY(100%);
}
```

We are going to use JS to add an `open-active` class that will animate the words in.

```css
.panel.open-active :first-child {
  transform: translateY(0);
}
```

Add a transition property to the `.panel a` css rule:

```css
.panel a {
  ...
  transition: transform 0.5s;
}
```

Select a panel in the element inspector and run `$0` in the console.

Run in the browser console:

`$0.classList.add('open-active')`

The text should animate in.

Add an `active` class.

```css
.panel.active {
  flex: 2;
  font-size: 2em;
}
```

Add a transition to the `.panel`:

```css
.panel {
  ...
  transition: font-size 0.7s linear, flex 0.7s linear;
}
```

Test in the browser's console:

`$0.classList.add('active')`

Notice the interaction with the background image via the css `cover` property.

Run the two scripts together in this sequence:

```sh
$0.classList.add('active')
$0.classList.add('open-active')
```

_Not_:

```sh
$0.classList.add('open-active')
$0.classList.add('active')
```

The panels should open _before_ the words animate in.

### JavaScript

We are working with a `nodeList` and using the `forEach` method.

In `src/myapp.js`:

```js
const panels = document.querySelectorAll('.panel');

function toggleActive() {
  this.classList.toggle('active');
}

panels.forEach(panel => panel.addEventListener('click', toggleActive));
```

In order to apply the second animation - `$0.classList.add('open-active')` - you might be tempted to use `setTimeout`, e.g.:

```js
setTimeout(function() {
  this.classList.toggle('open-active');
}, 3000);
```

We will use the `transitionend` event instead:

```js
function openActive(e) {
  console.log(e);
  // console.log(e.propertyName)
}

panels.forEach(panel => panel.addEventListener('transitionend', openActive));
```

Note the propertyname in the console.

Let's listen for the flex-grow property [transitionend](https://developer.mozilla.org/en-US/docs/Web/Events/transitionend) before toggling the open-active class:

```js
function openActive(e) {
  if (e.propertyName === 'flex-grow') {
    this.classList.toggle('open-active');
  }
}
```

As of this writing Safari needs a little assistance here:

* in Safari: transitionend event.propertyName === flex
* in Chrome and Firefox: transitionend event.propertyName === flex-grow

```js
function openActive(e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}
```

Select a panel and edit the transitions in the styles panel. Here's what I ended up with:

`transition: font-size 0.7s cubic-bezier(0.57,-0.43, 0.75, 1.23), flex 0.7s cubic-bezier(0.61,-0.19, 0.7,-0.11);`

Copy your results to replace the linear timing functions in the `.panel` css rule.

We should also close any open panels before opening the one just clicked on and prevent an open panel from toggling when clicked:

```js
function closePanels() {
  panels.forEach(panel => panel.classList.remove('active'));
}
```

Edit the toggleOpen function to call the closePanels function:

```js
function toggleActive() {
  closePanels();
  this.classList.toggle('active');
}
```

### Can You Say Mystery Meat?

Remove the red border and the following the css for usability:

```css
.panel a {
  // transition: transform 0.5s;
}

// .panel :first-child {
//   transform: translateY(-100%);
// }

// .panel.open-active :first-child {
//   transform: translateY(0);
// }
```

Add a border to the bottom of the selected nav element:

```css
.panel.active {
  flex: 2;
  font-size: 2em;
  border-bottom: 4px solid yellow;
}
```

Use the dev tools' color picker to isolate a better yellow from the images.

Remove a portion of the JavaScript:

```js
// function openActive(e) {
//   if (e.propertyName.includes('flex')) {
//     this.classList.toggle('open-active');
//   }
// }
// panels.forEach(panel => panel.addEventListener('transitionend', openActive));
```

## Angular Recipe Site

Let's create a component based site with recipes.

Import angular and ngRoute into `myapp.js`:

```js
import angular from 'angular';
import ngRoute from 'angular-route';
```

`ngSRoute` supplants Express routes for handling views. Always include a single route in Express for your SPA page, here `index.html`. Angular routes handle the view (templates) and the logic (controllers) for the views.

In `myapp.js` (after the import statements):

```js
const app = angular.module('foodApp', ['ngRoute']);
```

Bootstrap the app in `index.html`:

```html
<body ng-app="foodApp">
```

```html
<div>
  <recipe-list></recipe-list>
</div>
```

Create the first component:

```js
app.component('recipeList', {
  template: `<div class="wrap"><h1>test</h1></div>`,
  controller: function RecipeListController() {}
});
```

Add a template and data to the controller:

```js
app.component('recipeList', {
  template: `
  <div class="wrap">
    <ul>
      <li ng-repeat="recipe in $ctrl.recipes">
        <img ng-src="img/home/{{ recipe.image }}">
        <div>
          <h1><a href="#0">{{ recipe.title }}</a></h1>
          <p>{{ recipe.description }}</p>
        </div>
      </li>
    </ul>
  </div>
  `,

  controller: function RecipeListController() {
    this.recipes = [
      {
        name: 'recipe1309',
        title: 'Lasagna',
        date: '2013-09-01',
        description:
          'Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.',
        image: 'lasagne.png'
      },
      {
        name: 'recipe1404',
        title: 'Pho-Chicken Noodle Soup',
        date: '2014-04-15',
        description:
          'Pho (pronounced “fuh”) is the most popular food in Vietnam, often eaten for breakfast, lunch and dinner. It is made from a special broth that simmers for several hours infused with exotic spices and served over rice noodles with fresh herbs.',
        image: 'pho.png'
      },
      {
        name: 'recipe1210',
        title: 'Guacamole',
        date: '2012-10-01',
        description:
          'Guacamole is definitely a staple of Mexican cuisine. Even though Guacamole is pretty simple, it can be tough to get the perfect flavor – with this authentic Mexican guacamole recipe, though, you will be an expert in no time.',
        image: 'guacamole.png'
      },
      {
        name: 'recipe1810',
        title: 'Hamburger',
        date: '2012-10-20',
        description:
          'A Hamburger (or often called as burger) is a type of food in the form of a rounded bread sliced in half and its Center is filled with patty which is usually taken from the meat, then the vegetables be lettuce, tomatoes and onions.',
        image: 'hamburger.png'
      }
    ];
  }
});
```

Move the template html into a separate file in a new folder: `public > includes > recipes.html`

Edit the template declaration in myapp.js:

`templateUrl: '/includes/recipes.html',`

### Format the recipes

In `styles.scss`:

```css
@import 'imports/recipes';
```

In `_recipes.scss`:

```css
.wrap {
  background: #eee;
  max-width: 940px;
  margin: 0 1rem;
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    display: flex;
    padding: 1rem;
    img {
      width: 30%;
      height: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      margin-right: 1rem;
    }
    h1 {
      font-family: lobster;
      a {
        color: #666;
        text-decoration: none;
      }
    }
  }
}
```

Add a centering feature for wider screens using a media query:

```css
.wrap {
  background: #eee;
  max-width: 940px;
  margin: 0 1rem;
  @media (min-width: 940px){
    margin: 0 auto;
  }
  ...
}
```

### Routing and Multiple Components

Create our first view route:

```js
app.config(function config($locationProvider, $routeProvider) {
  $routeProvider.when('/', {
    template: 'recipe-list'
  });
  $locationProvider.html5Mode(true);
});
```

Add in the head of index.html:

`<base href="/">`

Currently the component is hard coded:

```html
  <div>
    <recipe-list></recipe-list>
  </div>
```

Use the `ng-view` directive to alow it to use whatever module we pass into it:

```html
<div ng-view></div>
```

And add the template to our Angular route:

```js
app.config(function config($locationProvider, $routeProvider) {
  $routeProvider.when('/', {
    template: '<recipe-list></recipe-list>'
  });
  $locationProvider.html5Mode(true);
});
```

Change the route (as per the navigation):

```js
app.config(function config($locationProvider, $routeProvider) {
  $routeProvider
    .when('/', {
      template: ''
    })
    .when('/recipes', {
      template: '<recipe-list></recipe-list>'
    });
  $locationProvider.html5Mode(true);
});
```

Test the route. Note we need to use a more general route (`*`) in Express `app.js`):

```js
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
```

### The Navbar

Check the links in our html, e.g.:

```html
<div class="panel panel1">
  <a href="/">Home</a>
</div>
<div class="panel panel2">
  <a href="/recipes">Recipes</a>
</div>
...
```

Using: `ng-class`

Create a new controller in `myapp`:

```js
app.controller('NavController', function($scope, $location) {
  $scope.isActive = function(viewLocation) {
    var active = viewLocation === $location.path();
    return active;
  };
});
```

Comment out / delete all the panel related js:

```js
// const panels = document.querySelectorAll('.panel')
// const triggers = document.querySelectorAll('a')

// function toggleOpen(){
//  closePanels()
//  this.classList.toggle('active')
// }

// function closePanels(){
//  panels.forEach( (panel) => panel.classList.remove('active'))
// }

// panels.forEach( panel => panel.addEventListener('click', toggleOpen))
```

Add controller to the nav html tag:

`<nav ng-controller="NavController">`

Edit the panels using `ng-class` and this pattern:

```html
<nav ng-controller="NavController">
  <div class="panels">
    <div class="panel panel1" ng-class="{ active: isActive('/') }">
      <a href="/">Home</a>
    </div>
    <div class="panel panel2" ng-class="{ active: isActive('/recipes') }">
      <a href="/recipes">Recipes</a>
    </div>
    <div class="panel panel3" ng-class="{ active: isActive('/reviews') }">
      <a href="/reviews">Reviews</a>
    </div>
    <div class="panel panel4" ng-class="{ active: isActive('/delivery') }">
      <a href="/delivery">Delivery</a>
    </div>
    <div class="panel panel5" ng-class="{ active: isActive('/about') }">
      <a href="/about">About</a>
    </div>
  </div>
</nav>
```

### $HTTP

Let's use `recipes.json` in the data folder instead of keeping the data model in the controller.

We fetch the dataset from our server using Angular's built-in [$http](https://docs.angularjs.org/api/ng/service/$http) service.

* a core (built into Angular) service that facilitates communication with the remote HTTP servers
* need to make it available to the recipeList component's controller via [dependency injection](https://docs.angularjs.org/guide/di).

Make $http available to the recipe list controller:

`controller: function RecipeListController($http) { ...`

Use `get` method with `$http` to fetch the json from the data folder:

```js
app.component('recipeList', {
  templateUrl: '/includes/recipes.html',
  controller: function RecipeListController($http) {
    $http.get('data/recipes.json').then(function(response) {
      this.recipes = response.data;
      console.log(this.recipes);
    });
  }
});
```

Test and note error.

Note: in JavaScript you can nest functions - define functions inside functions.

While nested functions capture variables defined in parent functions, they do not inherit `this`.

We are making the assignment of the recipes in a nested function (`.then(function (response) {}`), where the `this` value is not defined.

One Solution is to create a variable `self` - , we introduce a local variable called self that points back to the RecipeListController.

```js
controller: function RecipeListController($http) {
    var self = this;
    ...
  }
```

Here is the complete component:

```js
app.component('recipeList', {
  templateUrl: '/includes/recipes.html',

  controller: function RecipeListController($http) {
    var self = this;
    $http.get('data/recipes.json').then(function(response) {
      self.recipes = response.data;
      console.log(self.recipes);
    });
  }
});
```

A better solution is to use Arrow functions which avoid the 'this' problem. (No need for a `self` variable.) 

See `_arrow-functions`.

```js
app.component('recipeList', {
  templateUrl: '/includes/recipes.html',

  controller: function RecipeListController($http) {
    $http.get('data/recipes.json').then(response => (this.recipes = response.data));
  }
});
```

* `then` returns a `promise` which runs the following function when the data is received. We will look at those shortly.

### Filtering and Sorting

Add to the `recipes.html` template:

```html
<div class="wrap">
<ul>
  <li>
      <p>Filter: <input ng-model="$ctrl.query" /></p>
      <p>Sort by:
          <select ng-model="$ctrl.orderProp">
              <option value="title">Alphabetical</option>
              <option value="date">Newest</option>
          </select>
      </p>
  </li>
</ul>
</div>
```

Edit the ng-repeat:

`<li ng-repeat="recipe in $ctrl.recipes | filter:$ctrl.query | orderBy:$ctrl.orderProp">`

Add a line to the controller (after the recipes array) that sets the default value of orderProp to date. If we had not set a default value here, the orderBy filter would remain uninitialized until the user picked an option from the drop-down menu.

`this.orderProp = 'date';`

```js
  controller: function RecipeListController($http) {
    this.orderProp = 'date';
    $http.get('data/recipes.json').then(response => (this.recipes = response.data));
  }
```

[`orderBy`](https://docs.angularjs.org/api/ng/filter/orderBy) is a `filter` that takes an array, copies it, reorders the copy and returns it.

Data-binding is one of the core features in Angular. When the page loads, Angular binds the value of the input box to the data model variable specified with ngModel and keeps the two in sync.

The text that the user types into the input box (bound to `$ctrl.query`) is available as a filter input in the list repeater (`recipe in $ctrl.recipes | filter:$ctrl.query`). When changes to the data model cause the repeater's input to change, the repeater updates the DOM to reflect the current state of the model.

The [filter](https://docs.angularjs.org/api/ng/filter/filter) function uses the `$ctrl.query` value to create a new array that contains only those records that match the query.

Add css to support the form elements.

### Promises

see `index.html` in the `other/promises` folder:

```html
<script>
  console.log('fetch data from beers - like Angular\'s $http service.')
  const posts = fetch('https://api.punkapi.com/v2/beers/');
  console.log(posts)
</script>
```

`posts` is a promise.

Fetch returns a promise so we need to call `then`:

```js
const postsPromise = fetch('https://api.punkapi.com/v2/beers/');

postsPromise.then(data => {
  console.log(data);
});
```

`data` is a readable stream. Since a stream can be any type of data (images, audio, text) we need to convert it (not unlike the `body-parser` package for Express).

```js
const postsPromise = fetch('https://api.punkapi.com/v2/beers/');

postsPromise.then(data => data.json()).then(data => {
  console.log(data);
});
```

`.then` fires when there is a successful result. Listen for errors using `.catch`.

```js
const postsPromise = fetch('https://api.punk.com/v2/beers/');

postsPromise
.then(data => data.json())
.then(data => {
  console.log(data);
})
.catch(err => {
  console.error(err);
});
```

(Created an error by mangling the fetch URI.)

#### Custom Promises

See 1-custom-promise.html

##### Chaining (waterfall) Promises

See 2-chaining-promises.html

##### Multiple Promises

See 3-multiple-promises.html

## Adding Routing to Display Individual Recipes

### Recipes via JSON

Examine `recipe1309.json` in the data directory. This is the recipe for Lasagna.

Use the `recipe.name` expression in the anchor tag (`public/includes/recipes.html`):

`<h1><a href="/recipes/{{ recipe.name }} ">{{ recipe.title }}</a></h1>`

Now, clicking on the individual recipe shows a parameter in the browser's location bar. We do not have routes set up for these yet.

### Recall

A module's .config() method gives us access to tools for configuration.

To make the providers, services and directives defined in ngRoute available to our application, we added ngRoute as a dependency to our foodApp module:

```js
angular.module('foodApp', ['ngRoute']);
```

Application routes in Angular are declared via $routeProvider. This service makes it easy to wire together controllers, view templates, and the current URL location in the browser.

We can configure the $route service (using it's provider) for our application.

In order to be able to quickly locate the configuration code, we put it into a separate file and used the .config suffix.

Add a route in `myapp.js` for the new recipe links:

```js
.when('/recipes/:recipeId', {
  template: `<div class="wrap">Detail</div>`
});
```

* `:recipeId` - the `$route` service uses the route declaration — `/recipes/:recipeId` — as a template that is matched against the current URL.

All variables defined with the `:` prefix are extracted into the (injectable) $routeParams object.

Create a reference to the `recipe-detail` template:

```js
app.config(function config($locationProvider, $routeProvider) {
  $routeProvider
    .when('/', {
      template: ''
    })
    .when('/recipes', {
      template: '<recipe-list></recipe-list>'
    })
    .when('/recipes/:recipeId', {
      template: '<recipe-detail></recipe-detail>'
    });
  $locationProvider.html5Mode(true);
});
```

### Creating the Recipe Details Component

We inject the routeParams service of ngRoute into our controller so that we can extract the recipeId and use it in our stub.

```js
app.component('recipeDetail', {
  template: '<div class="wrap">Detail view for {{$ctrl.recipeId}}</div>',

  controller: function RecipeDetailController($routeParams) {
    this.recipeId = $routeParams.recipeId;
  }
});
```

Clicking on the recipe links in the list view should take you to our stub template.

### Adding JSON and the Detail Template

Review `data/recipe1309.json`:

```js
{
  "name": "recipe1309",
  "title": "Lasagna",
  "date": "2013-09-01",
  "description": "Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.",
  "mainImageUrl": "lasagna-1.png",
  "images": ["lasagna-1.png","lasagna-2.png","lasagna-3.png","lasagna-4.png"],

  "ingredients": ["lasagna pasta", "tomatoes", "onions", "ground beef", "garlic", "cheese"]
}
```

Create `includes/recipe.html`:

```html
<div class="wrap" itemscope itemtype="http://schema.org/Recipe">

    <h1>{{ $ctrl.recipe.title }}</h1>

    <p>{{ $ctrl.recipe.description }}</p>

    <h3>Ingredients</h3>
    <ul class="ingredients">
        <li ng-repeat="ingredient in $ctrl.recipe.ingredients">
            {{ ingredient }}
        </li>
    </ul>

</div>
```

Edit the component to use `templateUrl`:

```js
angular.module('foodApp').component('recipeDetail', {
  templateUrl: '/includes/recipe.html',
  ...
})
```

Add `$http` to the dependancy list for our controller so we can access the json via http"

`controller: function RecipeDetailController($http, $routeParams) {`

and use a function to load the data:

```js
$http.get('data/' + $routeParams.recipeId + '.json').then(response => (this.recipe = response.data));
```

## Adding an Image

Implement an image switcher within our recipe details component.

Note this entry in recipe1309.json: `"mainImageUrl": "lasagna-1.png",`

Add to the template after the header:

`<img ng-src="img/home/{{ $ctrl.recipe.mainImageUrl }}" />`

We are creating an image switcher so we will create a new function in the recipe-detail component:

```js
controller: function RecipeDetailController($http, $routeParams) {
  $http.get('data/' + $routeParams.recipeId + '.json').then(response => {
    this.recipe = response.data;
  });
  this.setImage = imageUrl => (this.mainImageUrl = imageUrl);
}
```

Followed by a call to the function _in the promise function_ to initialize the first image:

```js
controller: function RecipeDetailController($http, $routeParams) {
  $http.get('data/' + $routeParams.recipeId + '.json').then(response => {
    this.recipe = response.data;
    this.setImage(this.recipe.images[3]);
  });
  this.setImage = imageUrl => (this.mainImageUrl = imageUrl);
}
```

And make the following change to the template, adding a class for styling and a source which uses the `mainImageUrl` variable we created in the controller:

`<img ng-src="img/home/{{$ctrl.mainImageUrl}}" class="recipe-detail-image" />`

(Note: we no longer need `"mainImageUrl": "images/home/lasagna-1.png",` in the json since we are now refering to the images array.)

### ng-click

Add a list of images to the template that we will click on to swap out the main image.

Note the `ng-click` directive and its call to the setImage function we created earlier (this goes below the img tag):

```html
<ul class="recipe-thumbs">
    <li ng-repeat="img in $ctrl.recipe.images">
        <img ng-src="img/home/{{img}}" ng-click="$ctrl.setImage(img)" />
    </li>
</ul>
```

You should now be able to click on one of the images in the list to swap out the main image.

Final refactored component:

```js
app.component('recipeDetail', {
  templateUrl: '/includes/recipe.html',

  controller: function RecipeDetailController($http, $routeParams) {
    $http.get('data/' + $routeParams.recipeId + '.json').then(response => {
      this.recipe = response.data;
      this.setImage(this.recipe.images[3]);
    });
    this.setImage = imageUrl => (this.mainImageUrl = imageUrl);
  }
});
```

### Notes

```js
app.controller('NavController', function($scope, $location) {
  $scope.isActive = function(viewLocation) {
    // var active = (viewLocation === $location.path())
    // console.log('vl ' + viewLocation)
    // console.log('wl ' + window.location.href)
    var active = window.location.href.includes(viewLocation);
    return active;
  };
});
```

```css
.highlight {
  transition: all 0.2s;
  position: absolute;
  top: 0;
  background: rgba(255, 255, 255, 0.2);
  left: 0;
  z-index: 1;
  display: block;
  pointer-events: none;
}
```

```js
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight);

function highlightLink() {
  const linkCoords = this.getBoundingClientRect();
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
  };

  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

triggers.forEach(panel => panel.addEventListener('mouseenter', highlightLink));
```

```js
function highlightLink() {
  console.log(this);
}
```

```js
function highlightLink() {
  const linkCoords = this.getBoundingClientRect();
  console.log(linkCoords);
}
```

```js
function highlightLink() {
  const linkCoords = this.getBoundingClientRect();
  highlight.style.width = `${linkCoords.width}px`;
  highlight.style.height = `${linkCoords.height}px`;
}
```

```js
function highlightLink() {
  const linkCoords = this.getBoundingClientRect();
  highlight.style.width = `${linkCoords.width}px`;
  highlight.style.height = `${linkCoords.height}px`;
  highlight.style.transform = `translate(100px, 100px)`;
}
```

`<nav ng-include=" 'includes/nav.html' "></nav>`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Recipes</title>
  <script src="https://code.angularjs.org/1.6.2/angular.min.js"></script>
  <script src="https://code.angularjs.org/1.6.2/angular-route.js"></script>
  <script src="js/foodapp.module.js"></script>
  <script src="js/foodapp.config.js"></script>
  <script src="js/recipes/recipe-list.component.js"></script>

  <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">

  <base href="/">
</head>
<body ng-app="foodApp">
  <nav ng-include=" 'includes/nav.html' "></nav>
  <div ng-view></div>
  <script src="js/scripts.js"></script>
</body>
</html>
```
