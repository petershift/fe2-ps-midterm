import angular from 'angular';
import ngRoute from 'angular-route';

const app = angular.module('foodApp', ['ngRoute']);
//const app = angular.module('recipeApp', ['ngAnimate', 'ngRoute']);


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

 
 /*
  app.controller('NavController', function($scope, $location) {
    $scope.isActive = function(viewLocation) {
      var active = viewLocation === $location.path();
      return active;
    };
  }); */

  app.controller('NavController', function($scope, $location) {
    $scope.isActive = function(viewLocation) {
      // var active = (viewLocation === $location.path())
      // console.log('vl ' + viewLocation)
      // console.log('wl ' + window.location.href)
      var active = window.location.href.includes(viewLocation);
      return active;
    };
  });

  
  app.component('recipeDetail', {
    //templateUrl: 'recipe-detail.template.html',
    //templateUrl: '/includes/recipe.html',
    templateUrl: '/includes/recipe-detail.template.html',
    controller:  function RecipeDetailController($http, $routeParams) {
        $http.get('/api/recipes/' + $routeParams.recipeId)
        .then((response) => this.recipe = response.data);
  
      this.back = () => window.history.back();
  
      this.editorEnabled = false;
      this.toggleEditor = () => this.editorEnabled = !this.editorEnabled;
  
      this.saveRecipe = (recipe, recipeid) => {
        $http.put('/api/recipes/' + recipeid, recipe)
        .then((res) => this.editorEnabled = false )
    }}
  }) 
  /*
  app.component('recipeDetail', {
    templateUrl: '/includes/recipe.html',
  
    controller: function RecipeDetailController($http, $routeParams) {
      $http.get('data/' + $routeParams.recipeId + '.json').then(response => {
        this.recipe = response.data;
        this.setImage(this.recipe.images[3]);
      });
      this.setImage = imageUrl => (this.mainImageUrl = imageUrl);
    }
  }); */
/*
  app.component('recipeList', {
    templateUrl: '/includes/recipes.html',
    controller: function RecipeAppController($http, $scope){
      this.orderProp = 'date';
      $http.get('/api/recipes').
      then( (res) => {
        $scope.recipes = res.data;
      })
  
      $scope.deleteRecipe = function(index, recipeid) {
        $http.delete('/api/recipes/' + recipeid)
        .then( () => $scope.recipes.splice(index, 1))
      }
      $scope.addRecipe = function (data) {
        $http.post('/api/recipes/', data)
        .then( (res) => {
            $scope.recipes.push(res.data);
            $scope.recipe = {};
        })
    };
    }
  }); */

  app.component('recipeList', {
    
    templateUrl: '/includes/recipes.html',
    controller: function RecipeAppController($http, $scope){
      $http.get('/api/recipes').then( (res) => {
        $scope.recipes = res.data;
      })
  
      $scope.deleteRecipe = function(index, recipeid) {
        $http.delete('/api/recipes/' + recipeid)
        .then( () => $scope.recipes.splice(index, 1))
      }
      $scope.addRecipe = function (data) {
        $http.post('/api/recipes/', data)
        .then( (res) => {
            $scope.recipes.push(res.data);
            $scope.recipe = {};
        })
    };
    }
  }) 
  

 /*
  app.component('recipeList', {
    templateUrl: '/includes/recipes.html',
    controller: function RecipeListController($http) {
      this.orderProp = 'date';
      $http.get('data/recipes.json').then(response =>
      {
      this.recipes = response.data;
      });
    }
  });*/

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

//triggers.forEach(panel => panel.addEventListener('mouseenter', highlightLink));

function highlightLink() {
    const linkCoords = this.getBoundingClientRect();
    highlight.style.width = `${linkCoords.width}px`;
    highlight.style.height = `${linkCoords.height}px`;
    highlight.style.transform = `translate(100px, 100px)`;
  }

  
/*
app.component('recipeList', {
    templateUrl: '/includes/recipes.html',
  
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
  });*/
/*
const panels = document.querySelectorAll('.panel');

function toggleActive() {
  closePanels();  
  this.classList.toggle('active');
}*/

//panels.forEach(panel => panel.addEventListener('click', toggleActive));
/*
function openActive(e) {
    if (e.propertyName.includes('flex')) {
      this.classList.toggle('open-active');
    }
  }*/
  /*
panels.forEach(panel => panel.addEventListener('transitionend', openActive));

function closePanels() {
    panels.forEach(panel => panel.classList.remove('active'));
  }*/

  

  