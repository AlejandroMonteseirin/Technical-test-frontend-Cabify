# Cabify Challenge Frontend by Alejandro Monteseirin

## Configuration for Development: How to Start the Project

- Node version 16.15.0 (At the moment of development, this is the latest version of the Node LTS branch). Installable files are available from [here](https://nodejs.org/es/download/).

- Clone this repo using Git.

- Run "npm install" in the folder where package.json is located. This will install all the required dependencies.

- Run "npm run ng serve" to start a development server at http://localhost:4200/.

### Package.json Useful Commands:

- npm run ng serve: Run the development server at localhost:4200.
- npm run ng lint: Run the linter.
- npm run ng build: Compile an Angular app into an output directory named dist/ using the production environment and a few security and optimization changes.
- npm run ng build --configuration development: Compile an Angular app into an output directory named dist/ using the development environment.
- npm run ng test: Run the unit tests using Karma Jasmine.
- npm run ng e2e: Run the end-to-end tests using Cypress.

# Documentation

## Analysis

### Framework

The framework chosen for development is Angular, specifically its latest version 13.3.5 at the start of development. The reasons for choosing Angular are simply that it's the frontend framework I have the most experience with, and I believed I could deliver a satisfactory result more quickly. However, this doesn't mean I'm unfamiliar with React.js or Vue.js; I'm just more fluent with Angular at the moment.

### Ngrx-store

Ngrx-store was the element that I doubted adding and considered just working with component interactions or a service for state management. However, realizing that the application needs to be scalable and ready for production, I chose to analyze the pros and cons.
- The cons of the store include the added layer of complexity, as you have to work with actions and reducers, and consider the immutability of the states. Additionally, it will have lower performance than plain objects, as every state is a copy of the previous one.
- The pros include better scalability, more control of the states, the safety that every state is immutable, better debugging, and cleaner code. Also, as React is usually used with Redux, I thought it would be beneficial to have a more similar structure.
After analyzing the pros and cons, I decided to add it.

##### State Properties of the Store:
After a bit of analysis, the optimal solution for the values to save in the store was as follows:

- indexedObjectProduct: { [id: string]: Product }: The products indexed by code.
- indexedObjectQuantity: { [id: string]: number }: The quantity of products indexed by code.
- indexedObjectRules: { [id: string]: any }: The rules indexed by code of the affected product.
- modalValue: Product | null: The value of the modal (Null don't show the modal, a Product Show a Modal with that product).

### Mock API Service

Since the project has data to input in the application that should not be hard-coded (products and promotions), I have created a small service that simulates a call to an API that returns the data.
The service simply returns a Promise that resolves after 800 milliseconds and returns the data (to simulate a real API Call).
That allows easy connection of the application to an API in the future, only replacing this service for a real one. Additionally, this service can be used for testing purposes, as the service has control of the data returned.

### Models

Below, I briefly explain each model created, which can be found in src\app\models:

- Checkout Class and interface: Checkout class was implemented as a class that can be instantiated. It has all the properties needed to calculate the total cost and also the intermediate values (like discounted money, number of items...).
The properties needed are: The Products, the discount rules, and the quantity of products.
You can instantiate the class with the values or using the setters. As the constructor has optional arguments, for example, the OrderSummaryComponent instantiates the class empty, and when the store returns the data, the component uses the setters. Or, if you want to use the scan() and total() methods, you can instantiate the class with the rules and products and just start to use the scan method.

- Product class is a simple class that has the model of the product, with the properties "code", "name," and "price."

- OrderSummaryData is a simple class that has the model used for the OrderSummary Component, for readability and to avoid having disconnected properties. It has the properties shown in the component like "numberOfItems," "totalCost"...

- Discount class is a class with only a static method that receives the rules and the product code, price, and quantity. It returns the discount applied or null if there is no discount. The discount rules are configurable and have good performance (avoiding for loops for the rules and products). Moreover, new rules can be created like "5-for-3" or a new bulk discount without modifying the class (only adding the new rule to the Mock API). More info in the comments of the class.

### Component Decomposition and Component Interaction Analysis

Below, I briefly explain each component and its unique responsibility.
- AppComponent: The initialization of the Data, the mockApiService is called, and the products and rules are loaded in the store.
- ShoppingCartComponent: Is the "List" Component, Is subscribed to the store, and updates the List when the products in the store change.
- ShoppingCartRowComponent: Shows the data of a single product and its function is to manage the changes in quantity. Directly send the new quantity to the store.
- OrderSummaryComponent: Shows the Order summary data, it changes when the quantity of products is updated.
- ModalComponent: Shows the Modal view and allows the "add to cart" function, it changes when the modal value is updated.

Here's a simple image of all the components and the interaction:

![Component Interaction Analysis](/readme_assets/AnalysisComponentInteraction.png)

### Extra Dependencies/Libraries:

A few extra dependencies/Libraries are configured in the project apart from the base ones. They will be automatically installed with the "npm install" command. The following is a brief list and explanation of each of them and why I have decided to add them:

- ESlint: For linting purposes. [Link](https://eslint.org/)
- @ngrx/store: for state management (Equivalent to Redux in React but for Angular)
- Karma Jasmine dependencies, for unit testing using the command "npm run ng test"
- @cypress/schematic for end-to-end testing using the command "npm run ng e2e"
- @ngrx/store-devtools --save (for debugging and testing purposes) use [link](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related)

Below, there is an example GIF of how the store devtools working:

![Store Usage](/readme_assets/StoreUsage.gif)



## Testing

ESLint is run.

For Unit testing, I used Karma Jasmine and a few test cases to cover the checkout class instantiation, the scan() function, and the total() function. Also, Karma Jasmine checks that all components are correctly created. The tests can be found in the spec.ts file of every component and in the folder unit-test (src\app\unit-tests\checkout-class-tests.spec.ts).

![Unit testing results](/readme_assets/karmaJasmineTestResults.png)

For e2e Testing, I used Cypress and tests for covering the most of the use cases. In this implementation, I work with the example data that mock-api.service provides, so it's not necessary to preload mock data. In the future, the mock-api service will be used for Cypress and a real API service for production. It can be configured using, for example, environment variables. The tests can be found in CabifyChallengeFrontendAlejandroMonteseirin\cypress\integration\tests.ts.

![Cypress Testing](/readme_assets/CypressTesting.gif)

## Build the Deliverable

The default Angular application provides Webpack for building the application. To build the compiled deliverable, just use "npm run ng build --configuration=development". If you want a production-ready deliverable, you use "npm run ng build --configuration=production". This will use the environment variables of production and apply a few optimizations and security changes (In this project, there are not too many changes).

For this challenge, I didn't modify tsconfig.json or .browserslistrc. These files allow us to set the target browser of the build and the JavaScript revision. The default values seem reasonable as they will work in the majority of the browsers. More info: [Angular Build Guide](https://angular.io/guide/build)

## Test Deploy in Firebase

To check the deliverable and do some tests on a server, I have deployed the app to a test URL in Firebase. You can check the application deployed at [this link](https://challenge-cabify-alejandromp.web.app/).
